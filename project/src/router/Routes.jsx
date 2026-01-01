import React from "react";
import { FileText, Home, User } from "lucide-react";
import Dashboard from "../pages/Dashboard";
import Posts from "../pages/Posts";
import Users from "../pages/Users";

export const routes = [
    {
        name: "Dashboard",
        link: "/dashboard",
        screen: <Dashboard/>,
        icon: <Home/>
    },
    {
        name: "Posts",
        link: "/posts",
        screen: <Posts/>,
        icon: <FileText/>
    },
    {
        name: "Users",
        link: "/users",
        screen: <Users/>,
        icon: <User/>
    },
]