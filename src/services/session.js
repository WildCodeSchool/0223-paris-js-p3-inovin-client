import api from "./api";

const postRegistration = async (id) => {
  try {
    return api.post(`/sessions/${id}/register`);
  } catch (error) {
    console.error(error);
  }
};

export { postRegistration };
