import React, { useState } from "react";
import SiteHeader from "../components/SiteHeader";
import { useGetPostsQuery, useCreatePostMutation, useUpdatePostMutation, useDeletePostMutation } from "../features/api/postApi";
import Loader from "../components/Loader";
import { Modal, message } from "antd";
import useAuthRedirect from "../hooks/useAuthRedirect";
import Input from "../components/Input";
import NoPostImage from "../assets/nopost.png";
import Card from "../components/Card";

const Posts = () => {
  useAuthRedirect(true);

  const { data: posts, isLoading, isError, refetch } = useGetPostsQuery();
  const [createPost] = useCreatePostMutation();
  const [updatePost] = useUpdatePostMutation();
  const [deletePost] = useDeletePostMutation();

  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({ title: "", image: "", description: "" });
  const [editingPost, setEditingPost] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCreateClick = () => {
    setEditingPost(null);
    setFormData({ title: "", image: "", description: "" });
    setModalOpen(true);
  };

  const handleEditClick = (post) => {
    setEditingPost(post);
    setFormData({ title: post.title, image: post.image, description: post.description });
    setModalOpen(true);
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.image || !formData.description) {
      message.error("All fields are required");
      return;
    }

    try {
      if (editingPost) {
        await updatePost({ id: editingPost.id, ...formData }).unwrap();
        message.success("Post updated successfully");
      } else {
        await createPost(formData).unwrap();
        message.success("Post created successfully");
      }

      setModalOpen(false);
      setEditingPost(null);
      setFormData({ title: "", image: "", description: "" });
      refetch();
    } catch (err) {
      console.error(err);
      message.error("Operation failed");
    }
  };

  const handleDelete = (postId) => {
    Modal.confirm({
      title: "Are you sure you want to delete this post?",
      okText: "Yes",
      cancelText: "No",
      okType: "danger",
      centered: true,
      onOk: async () => {
        try {
          await deletePost(postId).unwrap();
          refetch();
          message.success("Post deleted successfully");
        } catch (err) {
          console.error(err);
          message.error("Delete failed");
        }
      },
    });
  };

  return (
    <div className="flex min-h-screen">
      {/* <SiteHeader /> */}
      <div className="flex-1 p-6 bg-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Posts</h1>
          <button
            className="px-3 py-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-400"
            onClick={handleCreateClick}
          >
            Create Post +
          </button>
        </div>

        <Modal
          title={editingPost ? "Update Post" : "Create New Post"}
          open={modalOpen}
          onOk={handleSubmit}
          onCancel={() => setModalOpen(false)}
          okText={editingPost ? "Update" : "Submit"}
          cancelText="Cancel"
          centered
        >
          <div className="flex flex-col gap-4 mt-4">
            <Input
              label="Title"
              placeholder="Enter title"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
            <Input
              label="Image URL"
              placeholder="Enter image URL"
              name="image"
              value={formData.image}
              onChange={handleChange}
            />
            <div className="flex flex-col gap-1">
              <label className="text-black">Description</label>
              <textarea
                className="border p-3 rounded-xl outline-blue-500 resize-none text-gray-900 placeholder-gray-400"
                placeholder="Enter description"
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
              />
            </div>
          </div>
        </Modal>

        {isLoading && <Loader />}
        {isError && <div className="text-red-500">Error loading posts</div>}

        {posts && posts.length > 0 ? (
          <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {posts.map((post) => (
              <Card
                key={post.id}
                title={post.title}
                image={post.image}
                description={post.description}
                showActions={true}
                onEdit={() => handleEditClick(post)}
                onDelete={() => handleDelete(post.id)}
              />
            ))}
          </div>
        ) : (
          <img
            src={NoPostImage}
            alt="No posts"
            className="mx-auto rounded-full mt-20 w-50 h-50"
          />
        )}
      </div>
    </div>
  );
};

export default Posts;
