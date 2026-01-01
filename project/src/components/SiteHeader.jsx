import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { User, Listbox, ListboxItem, Button } from "@heroui/react";
import { Home, Users, FileText } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { routes } from "../router/Routes";

const SiteHeader = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);


  return (
    <div className="w-64 min-h-screen bg-gray-900 text-white flex flex-col fixed z-0">
      <div className="py-4 px-6 text-white text-3xl border-b border-gray-800">My App</div>

      {/* Sidebar Menu Items */}
      <div className="px-3 pt-6 space-y-2 grow">
        <Listbox variant="flat" className="bg-transparent">
          {routes.map((route) => (
            <ListboxItem
              key={route.name}
              startContent={route.icon}
              className={`rounded-lg py-3 px-2 cursor-pointer transition-all duration-200 
                hover:bg-gray-800 hover:scale-105
                ${location.pathname === route.link ? "bg-gray-700" : ""}
              `}
              onPress={() => navigate(route.link)}
            >
              {route.name}
            </ListboxItem>
          ))}
        </Listbox>
      </div>

      {/* Profile + Logout */}
      {/* Profile + Logout Section */}
      <div className="px-4 py-4 border-t border-gray-800 mt-auto flex flex-col gap-2">
        {user && (
          <User
            avatarProps={{ className: "w-10 h-10 rounded-full" }}
            name={user.name}
            className="flex items-center gap-2 w-full"
            nameClassName="font-semibold text-sm"
            descriptionClassName="text-xs text-gray-300"
          />
        )}

        {/* Custom Logout Button full width at bottom */}
        <button
          onClick={() => dispatch(logout())}
          className="w-full bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 transition-colors"
        >
          Logout
        </button>
      </div>

    </div>
  );
};

export default SiteHeader;
