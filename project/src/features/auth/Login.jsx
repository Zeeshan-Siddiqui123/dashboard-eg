import React, { useEffect, useState } from "react";
import { useGetUsersQuery } from "../api/authApi";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "./authSlice";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import Loader from "../../components/Loader";
import useAuthRedirect from "../../hooks/useAuthRedirect";

const Login = () => {
  useAuthRedirect(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: users, error, refetch } = useGetUsersQuery(undefined, {
    refetchOnFocus: true,
    refetchOnReconnect: true,
    pollingInterval: 10000,
  });

  const userLoggedIn = useSelector(state => state.auth.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(""); // For showing form errors



  const handleLogin = (e) => {
    e.preventDefault();
    if (!users) return;

    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      setLoading(true);
      setErrors(""); // Clear previous errors
      dispatch(setCredentials(user));
      setTimeout(() => navigate("/dashboard"), 2000);
    } else {
      setErrors("Invalid email or password"); // Show error in form
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-5">
      <div className="bg-white backdrop-blur-lg shadow-lg rounded-2xl px-8 py-10 max-w-sm w-full">
        <h2 className="text-3xl font-bold text-black text-center mb-6">Login</h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-2">
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email"
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            isPassword={true}
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-black hover:bg-black/80 text-white font-semibold"
          >
            {loading ? <Loader /> : "Login"}
          </button>

          {errors && (
            <p className="text-red-400 text-center mt-2 font-medium">{errors}</p>
          )}

          <p className="text-center text-black mt-4">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-black underline cursor-pointer"
            >
              Signup
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
