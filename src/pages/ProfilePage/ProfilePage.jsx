import "./ProfilePage.scss";
import api from "../../services/api";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../store/auth";

function Profile() {
  const [favWines, setFavWines] = useState([]);
  const [workshop, setWorkshop] = useState([]);
  const [pastWorkshops, setPastWorkshops] = useState([]);
  const [upcomingWorkshops, setUpcomingWorkshops] = useState([]);
  const [creation, setCreation] = useState([]);

  const [currentPageWine, setCurrentPageWine] = useState(1);
  const [pagesWine, setPagesWine] = useState(1);
  const [currentPageCreation, setCurrentPageCreation] = useState(1);
  const [pagesCreation, setPagesCreation] = useState(1);

  const [itemPerPage, setItemPerPage] = useState(4);

  const nav = useNavigate();

  const dispatch = useDispatch();

  const date = Date.now();

  useEffect(() => {
    if (window.innerWidth <= 700) setItemPerPage(2);
    const handleResize = () => {
      if (window.innerWidth <= 700) return setItemPerPage(2);
      if (window.innerWidth > 700) return setItemPerPage(4);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    api.get("wines/favorites").then((result) => setFavWines(result.data));
    api.get("sessions/user").then((result) =>
      setWorkshop(
        result.data.map((e) => {
          e.time = new Date(e.date);
          return e;
        })
      )
    );
    api.get("recipes/user").then((result) =>
      setCreation(
        result.data.map((e) => {
          e.time = new Date(e.date);
          return e;
        })
      )
    );
  }, []);


  useEffect(() => {
    setPagesWine(Math.ceil(favWines.length / 4) || 1);
    setPagesCreation(Math.ceil(creation.length / 4) || 1);
  }, [favWines]);

  useEffect(() => {
    setPastWorkshops(
      workshop.filter((e) => date > e.time.getTime() + 43200000)
    );
    setUpcomingWorkshops(
      workshop.filter(
        (e) =>
          date < e.time.getTime() ||
          (date > e.time.getTime() - 43200000 &&
            date < e.time.getTime() + 43200000)
      )
    );
  }, [workshop]);

  const getWine = () => {
    const winesPerPage = itemPerPage;
    const indexOfLastWine = currentPageWine * winesPerPage;
    const indexOfFirstWine = indexOfLastWine - winesPerPage;
    return favWines.slice(indexOfFirstWine, indexOfLastWine);
  };

  const handlePaginationWine = (nb) => {
    setCurrentPageWine((current) => current + nb);
  };

  const getCreation = () => {
    const creationPerPage = itemPerPage;
    const indexOfLastCreation = currentPageCreation * creationPerPage;
    const indexOfFirstCreation = indexOfLastCreation - creationPerPage;
    return creation.slice(indexOfFirstCreation, indexOfLastCreation);
  };

  const handlePaginationCreation = (nb) => {
    setCurrentPageCreation((current) => current + nb);
  };

  const disconnect = async () => {
    await api.get("/users/logout");
    dispatch(logout());
    nav("/");
  };

  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  return (
    <div className="profilepage">
      <h1>Mon profil</h1>
      <div className="ateliers">
        <h2>Mes ateliers</h2>
        {!upcomingWorkshops.length && (
          <div className="empty-wine">
            <p>Vous n'êtes inscrit(e) à aucun atelier</p>
            <button className="btn" onClick={() => nav("/reservation")}>
              S'inscrire à un atelier
            </button>
          </div>
        )}
        {upcomingWorkshops.map((e, i) => {
          return (
            <div key={i} className="atelier">
              <img src={e.image} alt="" />
              <p>Atelier {e.category.toLowerCase()}</p>
              <p>{e.time.toLocaleDateString("fr-FR", options)}</p>
              <p>{e.place_name}</p>
              {date > e.time.getTime() - 300000 &&
                date < e.time.getTime() + 14400000 && (
                  <button className="btn">Commencer l'atelier</button>
                )}
            </div>
          );
        })}
      </div>
      <div className="favorites">
        <h2>Mes vins favoris</h2>
        {!favWines.length && (
          <div className="empty-wine">
            <p>Aucun vin sauvegardé...</p>
            <p>
              Pas de panique, explorez nos vins et cliquez sur le petit coeur
              pour les sauvegarder
            </p>
            <button className="btn btn-red" onClick={() => nav("/wines")}>Explorer nos vins</button>
          </div>
        )}
        {Boolean(favWines.length) && (
          <div className="wines-container">
            <div
              onClick={() => currentPageWine > 1 && handlePaginationWine(-1)}
              className={
                currentPageWine > 1
                  ? "pagination-btn pagination-btn-previous"
                  : "pagination-btn pagination-btn-previous pagination-btn-previous-disabled"
              }
            />
            {getWine()?.map((e) => {
              return (
                <div className="wine" key={e.id}>
                  <img src={e.image} onClick={() => nav(`/wines/${e.id}`)} />
                  <p>
                    {e.name}, {e.manufacture_year}
                  </p>
                </div>
              );
            })}
            <div
              onClick={() =>
                currentPageWine < pagesWine && handlePaginationWine(1)
              }
              className={
                currentPageWine === pagesWine
                  ? "pagination-btn pagination-btn-next pagination-btn-next-disabled"
                  : "pagination-btn pagination-btn-next"
              }
            />
          </div>
        )}
      </div>
      <div className="creations">
        <h2>Mes créations</h2>
        {!creation.length && (
          <div className="empty-wine">
            <p>Vous n'avez pas encore participé à un atelier création</p>
            <button className="btn btn-red" onClick={() => nav("/reservation")}>
              S'inscrire à un atelier
            </button>
          </div>
        )}
        {Boolean(creation.length) && (
          <div className="wines-container">
            <div
              onClick={() =>
                currentPageCreation > 1 && handlePaginationCreation(-1)
              }
              className={
                currentPageCreation > 1
                  ? "pagination-btn pagination-btn-previous"
                  : "pagination-btn pagination-btn-previous pagination-btn-previous-disabled"
              }
            />
            {getCreation().map((e) => {
              return (
                <div
                  className="wine"
                  key={e.id}
                  onClick={() => nav(`/recipes/${e.session_id}`)}
                >
                  <img src={e.image} />
                  <p>
                    {e.time.toLocaleDateString("fr-FR", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                  <p>{e.place_name}</p>
                </div>
              );
            })}
            <div
              onClick={() =>
                currentPageCreation < pagesCreation &&
                handlePaginationCreation(1)
              }
              className={
                currentPageCreation === pagesCreation
                  ? "pagination-btn pagination-btn-next pagination-btn-next-disabled"
                  : "pagination-btn pagination-btn-next"
              }
            />
          </div>
        )}
      </div>
      <button onClick={disconnect} className="btn logout">
        Se déconnecter
      </button>
    </div>
  );
}

export default Profile;
