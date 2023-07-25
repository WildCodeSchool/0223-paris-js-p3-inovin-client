import api from "./api";

const getAllUsers = () => {
  return api.get("/users/");
};

const getCurrentUser = () => {
  return api.get("/users/me");
};

const sendContact = (form) => {
  return api.post("/users/contact", form);
};
 
const updateComment = (comment) =>{
  return api.put("/users/comment", {comment: comment})
}

const deleteUser = (id) => {
  return api.delete(`/users/${id}`);
};

export { getAllUsers, getCurrentUser, sendContact,updateComment, deleteUser };
export default { getAllUsers, getCurrentUser, sendContact,updateComment, deleteUser};
 