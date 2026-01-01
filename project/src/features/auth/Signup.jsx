import React, { useState } from "react";
import { useCreateUserMutation } from "../api/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import Loader from "../../components/Loader";
import useAuthRedirect from "../../hooks/useAuthRedirect";

const Signup = () => {
  useAuthRedirect((false))
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [createUser] = useCreateUserMutation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await createUser({ name, email, password }).unwrap(); // POST request
      dispatch(setCredentials(user));
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError("Signup failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-5">
      <div className="bg-white backdrop-blur-lg shadow-lg rounded-2xl px-8 py-10 max-w-sm w-full">
        <h2 className="text-3xl font-bold text-black text-center mb-6">Create Account</h2>
        <form onSubmit={handleSignup} className="flex flex-col gap-2">
          <Input label="Name" type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Your name" />
          <Input label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
          <Input label="Password" type="password" value={password} isPassword={true} onChange={e => setPassword(e.target.value)} placeholder="Password" />
          <button type="submit" disabled={loading} className="w-full py-3 rounded-xl bg-black hover:bg-black/80 text-white font-semibold">
            {loading ? <Loader /> : "Sign Up"}
          </button>
        </form>
        {error && <p className="text-red-300 mt-4 text-center">{error}</p>}
        <p className="text-center text-black/80 mt-4">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-black underline cursor-pointer"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
