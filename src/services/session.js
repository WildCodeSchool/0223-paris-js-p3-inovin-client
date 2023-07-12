import api from "./api";

const getAllSessions = async () => {
  try {
    return api.get("/sessions");
  } catch (error) {
    console.error(error);
  }
};

// const postRegistration = async (id) => {
//   try {
//     return api.post(`/sessions/${id}/register`);
//   } catch (error) {
//     console.error(error);
//   }
// };

const getSessionById = async (id) => {
  try {
    return api.get(`/sessions/${id}`);
  } catch (error) {
    console.error(error);
  }
};

const postSession = async (newSession) => {
  console.log(newSession);
  try {
    return api.post(`/sessions`, newSession);
  } catch (error) {
    console.error(error);
  }
};

const deleteSession = async (id) => {
  console.log("session", id);
  try {
    return api.delete(`/sessions/${id}`);
  } catch (error) {
    console.error(error);
  }
};

export { getAllSessions, getSessionById, postSession, deleteSession };
