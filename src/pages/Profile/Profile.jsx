import "./Profile.scss";
import api from "../../services/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [favWines, setFavWines] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(1);

  const nav = useNavigate();

  useEffect(() => {
    api.get("wines/favorites").then((result) => setFavWines(result.data));
  }, []);

  useEffect(() => {
    setPages(Math.ceil(favWines.length / 4) || 1);
  }, [favWines]);

  const getCards = () => {
    const cardsPerPage = 4;
    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    return favWines.slice(indexOfFirstCard, indexOfLastCard);
  };

  const handlePagination = (nb) => {
    setCurrentPage((current) => current + nb);
  };

  return (
    <div className="profilepage">
      <h1>Mon profil</h1>
      <div className="ateliers">
        <h2>Mes ateliers</h2>
      </div>
      <div className="favorites">
        <h2>Mes vins favoris</h2>
        <div className="wines-container">
          <div onClick={() => currentPage > 1 && handlePagination(-1)} className={currentPage > 1 ? 'pagination-btn pagination-btn-previous' : 'pagination-btn pagination-btn-previous pagination-btn-previous-disabled'} />
          {getCards()?.map((e) => {
            return (
              <div className="wine" key={e.id}>
                <img src={e.image} onClick={() => nav(`/wines/${e.id}`)} />
                <p>
                  {e.name}, {e.manufacture_year}
                </p>
              </div>
            );
          })}
          <div onClick={() => currentPage < pages && handlePagination(1)} className={currentPage === pages ? 'pagination-btn pagination-btn-next pagination-btn-next-disabled' : 'pagination-btn pagination-btn-next'} /> 
        </div>
      </div>
    </div>
  );
}

export default Profile;
