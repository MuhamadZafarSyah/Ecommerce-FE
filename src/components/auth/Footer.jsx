import { Link } from "react-router-dom";

const Footer = ({ type }) => {
  if (type === "register") {
    return (
      <footer className=" w-full absolute h-12 text-gray-400 flex justify-center items-center   bottom-0 text-center">
        <span>
          Sudah punya akun?{" "}
          <Link to="/login" className="text-blue-500">
            Login
          </Link>
        </span>
      </footer>
    );
  } else {
    return (
      <footer className=" w-full absolute h-12 text-gray-400 flex justify-center items-center   bottom-0 text-center">
        <span>
          Belum punya akun?{" "}
          <Link to="/register" className="text-blue-500">
            Daftar
          </Link>
        </span>
      </footer>
    );
  }
};

export default Footer;
