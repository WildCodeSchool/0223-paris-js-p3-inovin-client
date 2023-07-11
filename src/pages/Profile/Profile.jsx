import "./Profile.scss";
import api from "../../services/api";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [favWines, setFavWines] = useState([]);
  const [workshop, setWorkshop] = useState([]);
  const [pastWorkshops, setPastWorkshops] = useState([]);
  const [upcomingWorkshops, setUpcomingWorkshops] = useState([]);
  const [creation, setCreation] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(1);

  const nav = useNavigate();

  const date = Date.now();

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
    setPages(Math.ceil(favWines.length / 4) || 1);
  }, [favWines]);

  useEffect(() => {
    // console.log("today is : ", date);
    // console.log("workshop1 : ", workshop[0]?.time.getTime(), workshop[0]?.time );
    // console.log("workshop2 : ", workshop[1]?.time.getTime(), workshop[1]?.time);
    // console.log("workshop3 : ", workshop[2]?.time.getTime(), workshop[2]?.time);

    // console.log("date > workshop1", date > workshop[0]?.time.getTime());
    // console.log("date > workshop2", date > workshop[1]?.time.getTime());
    // console.log("date > workshop3", date > workshop[2]?.time.getTime());

    // console.log('workshop1 today ?', date > workshop[0]?.time.getTime() - 43200000 && date < workshop[0]?.time.getTime() + 43200000 )
    // console.log('workshop2 today ?', date > workshop[1]?.time.getTime() - 43200000 && date < workshop[1]?.time.getTime() + 43200000 )
    // console.log('workshop3 today ?', date > workshop[2]?.time.getTime() - 43200000 && date < workshop[2]?.time.getTime() + 43200000 )

    // // console.log(workshop)

    console.log(
      "passés worskshop",
      workshop.filter((e) => date > e.time.getTime() + 43200000)
    );
    console.log(
      "futur worskshop",
      workshop.filter((e) => date < e.time.getTime())
    );
    console.log(
      "workshop aujourd'hui",
      workshop.filter(
        (e) =>
          date > e.time.getTime() - 43200000 &&
          date < e.time.getTime() + 43200000
      )
    );

    console.log(
      "workshop en cours : ",
      workshop.filter(
        (e) =>
          date < e.time.getTime() ||
          (date > e.time.getTime() - 43200000 &&
            date < e.time.getTime() + 43200000)
      )
    );
  }, [workshop]);

  const getCards = () => {
    const cardsPerPage = 4;
    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    return favWines.slice(indexOfFirstCard, indexOfLastCard);
  };

  const handlePagination = (nb) => {
    setCurrentPage((current) => current + nb);
  };

  const logout = async () => {
    await api.get("/users/logout");
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
        {workshop
          .filter(
            (e) =>
              date < e.time.getTime() ||
              (date > e.time.getTime() - 43200000 &&
                date < e.time.getTime() + 43200000)
          )
          .map((e) => {
            return (
              <React.Fragment key={e.id}>
                <img src={e.image} alt="" />
                <p>Atelier {e.category.toLowerCase()}</p>
                <p>{e.time.toLocaleDateString("fr-FR", options)}</p>
                <p>{e.place_name}</p>
              </React.Fragment>
            );
          })}
      </div>
      <div className="favorites">
        <h2>Mes vins favoris</h2>
        <div className="wines-container">
          <div
            onClick={() => currentPage > 1 && handlePagination(-1)}
            className={
              currentPage > 1
                ? "pagination-btn pagination-btn-previous"
                : "pagination-btn pagination-btn-previous pagination-btn-previous-disabled"
            }
          />
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
          <div
            onClick={() => currentPage < pages && handlePagination(1)}
            className={
              currentPage === pages
                ? "pagination-btn pagination-btn-next pagination-btn-next-disabled"
                : "pagination-btn pagination-btn-next"
            }
          />
        </div>
      </div>
      <div className="creations">
        <h2>Mes créations</h2>
        {creation.map((e) => {
          return (
            <div
              className="wine"
              key={e.id}
              onClick={() => nav(`/recipes/${e.id}`)}
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
      </div>
      <button onClick={logout}>Se déconnecter</button>
    </div>
  );
}

export default Profile;
