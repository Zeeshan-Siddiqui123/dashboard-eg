import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../features/auth/Login";
import AuthRoutes from "../features/auth/AuthRoutes";
import Signup from "../features/auth/Signup";
import DashboardLayout from "../Layout/DashboardLayout";
import { routes } from "./Routes";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Signup />} />
      <Route element={<DashboardLayout />}>
        {routes.map((route, index)=>(
          <Route key={index} path={route.link} element={<AuthRoutes>{route.screen}</AuthRoutes>}/>
        ))}
      </Route>

    </Routes>
  );
}
