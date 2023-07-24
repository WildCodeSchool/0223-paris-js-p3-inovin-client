import api from "./api";

const register = async (data) => {
  return api.post("/users/register", data);
};

const login = async (email, password) => {
  return api.post("/users/login", { email, password });
};

const logout = async () => {
  return api.get("/users/logout");
};

const sendResetPassword = async (email) => {
  return api.post("/users/sendResetPassword", { email });
};

const resetPassword = async (password, token) => {
  return api.post("/users/resetPassword", { password, token });
};

export {register, login, logout, sendResetPassword, resetPassword };
export default { register, login, logout, sendResetPassword, resetPassword };
