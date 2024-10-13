import { useContext, useState } from "react";
import logo from "/src/img/logo_shoope.png";
import { MdOutlineEmail, MdOutlineLock, MdOutlinePerson } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import { IoMdEye } from "react-icons/io";
import Footer from "@/components/auth/footer";
import Input from "../../components/auth/Input";
import Button from "../../components/auth/Button";
import { Form, redirect } from "react-router-dom";
import customAPI from "../../api";
import { toast } from "react-toastify";
import { registerUser, setLoading } from "../../features/userSlice";
import { ClipLoader, MoonLoader, SyncLoader } from "react-spinners";
import { useSelector } from "react-redux";
import { DarkModeContext } from "../../context/DarkMode";
import { FaMoon, FaSun } from "react-icons/fa";

export const action =
  (store) =>
  async ({ request }) => {
    const fromInputData = await request.formData();
    const data = Object.fromEntries(fromInputData);

    try {
      store.dispatch(setLoading(true));

      const response = await customAPI.post("/auth/register", data);
      store.dispatch(registerUser(response.data));

      toast.success("Register Success");

      return redirect("/");
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      toast.error(errorMessage);
      return null;
    } finally {
      store.dispatch(setLoading(false));
    }
  };

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const isLoading = useSelector((state) => state.userState.isLoading);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const isFormValid =
    formData.email.trim() !== "" && formData.password.trim() !== "";
  const handleShowPasswordClick = () => {
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
        <div>
          <img
            src={logo}
            alt=""
            className="mx-auto w-1/4 bg-blend-hard-light"
          />
        </div>

        <Form method="post">
          <div className="mt-4 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <MdOutlinePerson size={30} color="gray" />
              <Input
                id="name"
                name="name"
                placeholder="Name"
                type="text"
                onChange={handleInputChange}
                value={formData.name}
              />
            </div>
            <div className="flex items-center gap-2">
              <MdOutlineEmail size={30} color="gray" />
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
                <IoMdEye
                  onClick={handleShowPasswordClick}
                  size={30}
                  color="grey"
                />
              ) : (
                <RiEyeCloseLine
                  onClick={handleShowPasswordClick}
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
              {isLoading ? <ClipLoader size={20} color="white" /> : "Register"}
            </Button>
          </div>
        </Form>
      </div>
      <Footer type="register" />
    </div>
  );
};

export default RegisterPage;
