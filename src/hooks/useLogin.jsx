import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const useLogin = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const data = localStorage.getItem("user");
    if (!data) {
      toast.warn("Login Terlebih Dahulu");
      navigate("/login");
    }
  }, [navigate]);
};

export default useLogin;
