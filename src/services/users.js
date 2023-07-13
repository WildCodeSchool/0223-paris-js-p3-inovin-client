import api from "./api";

const getAllUsers = () => {
  return api.get("/users");
};

const getCurrentUser = () => {
  return api.get("/users/me");
};

const updateAvatar = (form) => {
  return api.post("/users/updateAvatar", form);
};

export { getAllUsers, getCurrentUser, updateAvatar };
