import React from "react";
import SiteHeader from "../components/SiteHeader";
import { useGetUsersQuery } from "../features/api/authApi";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell
} from "@heroui/react";
import Loader from "../components/Loader";
import useAuthRedirect from "../hooks/useAuthRedirect";

const Users = () => {
  useAuthRedirect(true)
  const { data: users, isLoading, isError } = useGetUsersQuery();

  if (isLoading) return <div className="p-6"><Loader /></div>;
  if (isError) return <div className="p-4 text-red-500">Error fetching users</div>;

  return (
    <div className="flex min-h-screen">
      <div className="flex-1 p-6 bg-gray-100">
        <h1 className="text-2xl font-bold mb-6">Users</h1>
        <div className="overflow-x-auto rounded-lg shadow-md bg-white">
          <Table aria-label="Users Table" className="min-w-full">
            <TableHeader>
              <TableColumn className="text-left text-sm font-semibold px-4 py-2 bg-black text-white">ID</TableColumn>
              <TableColumn className="text-left text-sm font-semibold px-4 py-2 bg-black text-white">Name</TableColumn>
              <TableColumn className="text-left text-sm font-semibold px-4 py-2 bg-black text-white">Email</TableColumn>
            </TableHeader>
            <TableBody>
              {users && users.map((user, index) => (
                <TableRow
                  key={user.id}
                  className={`transition-colors duration-200 mt-2 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-gray-100`}
                >
                  <TableCell className="px-4 py-2 text-sm">{user.id}</TableCell>
                  <TableCell className="px-4 py-2 text-sm">{user.name}</TableCell>
                  <TableCell className="px-4 py-2 text-sm">{user.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Users;
