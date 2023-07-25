import api from "./api";

const getAllUsers = () => {
  return api.get("/users/");
};

const getCurrentUser = () => {
  return api.get("/users/me");
};

const updateAvatar = (form) => {
  return api.post("/users/updateAvatar", form);
};

const updateComment = (comment) => {
  return api.put("/users/comment", { comment: comment });
};

const deleteUser = (id) => {
  return api.delete(`/users/${id}`);
};

export { getAllUsers, getCurrentUser, updateAvatar, updateComment, deleteUser };
export default { getAllUsers, getCurrentUser, updateAvatar, updateComment };
