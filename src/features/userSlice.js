import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isLoading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      const user = action.payload;
      //   SET NILAI DARI STATE
      state.user = user;
      localStorage.setItem("user", JSON.stringify(user));
    },
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem("user");

      toast.success("Berhasil Logout");
      window.location.href = "/login";
    },
    registerUser: (state, action) => {
      const user = action.payload;
      state.user = user;
      localStorage.setItem("user", JSON.stringify(user));
    },
    setLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export const { loginUser, logoutUser, registerUser, setLoading } =
  userSlice.actions;

export default userSlice.reducer;
