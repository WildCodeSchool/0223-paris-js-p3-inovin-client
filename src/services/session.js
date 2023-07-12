import api from "./api";

const getAllSessions = async () => {
  try {
    return api.get("/sessions");
  } catch (error) {
    console.error(error);
  }
};

const getSessionById = async (id) => {
  try {
    return api.get(`/sessions/${id}`);
  } catch (error) {
    console.error(error);
  }
};

const getWinesBySessionId = async (id) => {
  try {
    return api.get(`/sessions/${id}/wine`);
  } catch (error) {
    console.error(error);
  }
};

const getUsersBySessionId = async (id) => {
  try {
    return api.get(`/sessions/${id}/user`);
  } catch (error) {
    console.error(error);
  }
};

const postSession = async (newSession) => {
  try {
    return api.post(`/sessions`, newSession);
  } catch (error) {
    console.error(error);
  }
};

const deleteSession = async (id) => {
  try {
    return api.delete(`/sessions/${id}`);
  } catch (error) {
    console.error(error);
  }
};

const getLocations = async () => {
  try {
    return api.get("/locations");
  } catch (error) {
    console.error(error);
  }
};

const getRecipesBySessionId = async (id) => {
  try {
    return api.get(`/recipes/sessions/${id}`);
  } catch (error) {
    console.error(error);
  }
};

const deleteUserFromSession = async (sessionId, userId) => {
  try {
    return api.delete(`/sessions/${sessionId}/users/${userId}`);
  } catch (error) {}
};
const deleteWineFromSession = async (sessionId, wineId) => {
  try {
    return api.delete(`/sessions/${sessionId}/wine/${wineId}`);
  } catch (error) {}
};

export {
  getAllSessions,
  getSessionById,
  postSession,
  deleteSession,
  getUsersBySessionId,
  getWinesBySessionId,
  getLocations,
  deleteUserFromSession,
  deleteWineFromSession,
  getRecipesBySessionId,
};
