import { useContext, useState } from "react";
import logo from "/src/img/logo_shoope.png";
import { MdOutlineEmail, MdOutlineLock } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import { IoMdEye } from "react-icons/io";
import { Form, Link } from "react-router-dom";
import Button from "../../components/auth/Button";
import Input from "../../components/auth/Input";
import customAPI from "../../api";
import { toast } from "react-toastify";
import { loginUser, setLoading } from "../../features/userSlice";
import { redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import { DarkModeContext } from "../../context/DarkMode";
import { FaMoon, FaSun } from "react-icons/fa";

export const action =
  (store) =>
  async ({ request }) => {
    const fromInputData = await request.formData();
    const data = Object.fromEntries(fromInputData);

    try {
      store.dispatch(setLoading(true));

      const response = await customAPI.post("/auth/login", data);
      store.dispatch(loginUser(response.data.data));

      toast.success("Login Success");

      return redirect("/");
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      toast.error(errorMessage);
      return null;
    } finally {
      store.dispatch(setLoading(false));
    }
  };

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const isLoading = useSelector((state) => state.userState.isLoading);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const isFormValid =
    formData.email.trim() !== "" && formData.password.trim() !== "";
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const { isDarkMode, setIsDarkMode } = useContext(DarkModeContext);

  return (
    <div
      className={`flex h-dvh items-center justify-center ${
        isDarkMode ? "bg-secondary text-white" : "bg-whitemode text-black"
      }`}
    >
      <div className="absolute right-4 top-4">
        <div
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="center-center rounded-full bg-gray-800 p-2 opacity-60"
        >
          {!isDarkMode ? (
            <>
              <FaMoon size={18} color="white" />
            </>
          ) : (
            <>
              <FaSun size={18} color="white" />
            </>
          )}
        </div>
      </div>
      <div className="px-4">
        <div className="">
          <img
            src={logo}
            alt=""
            className="mx-auto w-1/4 bg-blend-hard-light"
          />
        </div>
        <Form method="post">
          <div className="mt-4 flex flex-col gap-2">
            <div className="flex items-center justify-center gap-2">
              <MdOutlineEmail size={30} color="gray" className="mt-2" />
              <Input
                id="email"
                name="email"
                placeholder="Email"
                type="email"
                onChange={handleInputChange}
                value={formData.email}
              />
            </div>
            <div className="flex items-center gap-2">
              <MdOutlineLock
                size={30}
                color="gray"
                className="mt-2 object-cover"
              />
              <Input
                id="password"
                name="password"
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                onChange={handleInputChange}
                value={formData.password}
              />
              {showPassword ? (
                <IoMdEye onClick={handleShowPassword} size={30} color="grey" />
              ) : (
                <RiEyeCloseLine
                  onClick={handleShowPassword}
                  size={30}
                  color="grey"
                />
              )}
            </div>
          </div>
          <div className="mt-4">
            <Button
              className={`${
                isFormValid ? "bg-[#E24325] text-white" : "cursor-not-allowed"
              } flex w-full items-center justify-center p-2`}
              disabled={!isFormValid || isLoading}
            >
              {isLoading ? <ClipLoader size={20} color="white" /> : "Log in"}
            </Button>
          </div>
        </Form>
      </div>
      <footer className="absolute bottom-0 flex h-12 w-full items-center justify-center text-center text-gray-400">
        <span>
          Belum punya akun?{" "}
          <Link to="/register" className="text-blue-500">
            Daftar
          </Link>
        </span>
      </footer>
    </div>
  );
};

export default LoginPage;
