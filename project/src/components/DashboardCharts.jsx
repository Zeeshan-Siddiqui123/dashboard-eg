import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";

const COLORS = ["#2563eb", "#f97316"];

const DashboardCharts = ({ usersCount, postsCount }) => {
  const data = [
    { name: "Users", value: usersCount },
    { name: "Posts", value: postsCount },
  ];

  const trendData = [
    { day: "Mon", users: usersCount, posts: postsCount },
    { day: "Tue", users: usersCount, posts: 3},
    { day: "Wed", users: 6, posts: 2 },
    { day: "Thu", users: usersCount, posts: postsCount },
    { day: "Fri", users: 4, posts: 7},
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-6">Dashboard Analytics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-md font-medium mb-2">Users vs Posts</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#3b82f6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div>
          <h3 className="text-md font-medium mb-2">Data Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={data} dataKey="value" outerRadius={90} label>
                {data.map((_, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="mt-10">
        <h3 className="text-md font-medium mb-3">
          Weekly Growth (Users & Posts )
        </h3>

        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="users"
              stroke="#2563eb"
              fill="#2563eb"
              fillOpacity={0.2}
            />
            <Area
              type="monotone"
              dataKey="posts"
              stroke="#f97316"
              fill="#f97316"
              fillOpacity={0.2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardCharts;
