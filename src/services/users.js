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

export { getAllUsers, getCurrentUser, sendContact,updateComment };
export default { getAllUsers, getCurrentUser, sendContact,updateComment };
