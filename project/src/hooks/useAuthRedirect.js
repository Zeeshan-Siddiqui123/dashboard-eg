import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const useAuthRedirect = (shouldBeLoggedIn = false) => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user"); 

    if (shouldBeLoggedIn && !user && !storedUser) {
      navigate("/login");
    }

    if (!shouldBeLoggedIn && (user || storedUser)) {
      navigate("/dashboard");
    }
  }, [user, shouldBeLoggedIn, navigate]);
};

export default useAuthRedirect;
