import api from "./api";

const getAllWines = () => {
  return api.get("/wines/");
};

const getWineById = (id) => {
  return api.get(`/wines/${id}`);
};

const deleteWine = (id) => {
  return api.delete(`/wines/${id}`);
};

export { getAllWines, deleteWine, getWineById };
