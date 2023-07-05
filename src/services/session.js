import api from "./api";

const getAllSessions = async (id) => {
  try {
    return api.get("/sessions");
  } catch (error) {}
};

export { getAllSessions };
