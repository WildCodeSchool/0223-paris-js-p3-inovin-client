import api from "./api";

const getAllWines = () => {
  return api.get("/wines/");
};

export { getAllWines };
