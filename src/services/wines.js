import api from "./api";

const getAllWines = () => {
  return api.get("/wines/");
};

const deleteWine = (id) => {
  return api.delete(`/wines/${id}`);
};

export { getAllWines, deleteWine };
