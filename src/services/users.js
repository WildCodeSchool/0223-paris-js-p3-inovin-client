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


const updateComment = (comment) =>{
  return api.put("/users/comment", {comment: comment})
}

export { getAllUsers, getCurrentUser, updateAvatar,updateComment };
export default { getAllUsers, getCurrentUser, updateAvatar,updateComment };
