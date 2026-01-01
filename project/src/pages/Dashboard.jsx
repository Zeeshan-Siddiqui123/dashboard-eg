import React from "react";
import { useSelector } from "react-redux";
import SiteHeader from "../components/SiteHeader";
import { useGetUsersQuery } from "../features/api/authApi"; 
import { useGetPostsQuery } from "../features/api/postApi";
import Loader from "../components/Loader";
import { PiHandWavingFill } from "react-icons/pi";
import { Users, FileText } from "lucide-react";
import Card from "../components/Card"; 

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const { data: users, isLoading: loadingUsers } = useGetUsersQuery();
  const { data: posts, isLoading: loadingPosts } = useGetPostsQuery();
  const isLoading = loadingUsers || loadingPosts;
  if (isLoading) return <Loader />;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* <SiteHeader /> */}
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <p className="text-2xl font-bold mt-2 flex items-center gap-2">
          Welcome back, {user?.name} <PiHandWavingFill color="orange" />
        </p>
        <p className="text-sm">Here is what happening with your account today</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
          <Card
            title="Total Users"
            value={users?.length || 0}
            icon={<Users color="blue" size={20} />}
          />
          <Card
            title="Total Posts"
            value={posts?.length || 0}
            icon={<FileText color="orange" size={20} />}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
