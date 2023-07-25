import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import "./Home.scss";
import BtnInscription from "../../components/BtnInscription/BtnInscription";
import MapHomePage from "../../components/MapHomePage/MapHomePage";
import "mapbox-gl/dist/mapbox-gl.css";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { Link } from "react-router-dom";
import video from "../../assets/homevideo.mp4";
import logo from "../../assets/logo.svg";
import concept from "../../assets/concept.svg";
import img1 from "../../assets/image1.png";
import img2 from "../../assets/image2.png";
import img3 from "../../assets/image3.png";
import redwine from "../../assets/redwine.png";
import whitewine from "../../assets/whitewine.png";
import allwines from "../../assets/allwines.png";
import atelierdegust from "../../assets/atelierdegust.png";
import ateliercrea from "../../assets/ateliercrea.png";

function Home() {
  const auth = useSelector((state) => state.auth);
  const [visibleIndex, setVisibleIndex] = useState(0);
  const [regions, setRegions] = useState([]);
  const [cepages, setCepages] = useState([]);
  const [selectedRegionIndex, setSelectedRegionIndex] = useState("");
  const winesContainerRef = useRef(null);

  const getVisibleCardIndex = () => {
    const containerScrollLeft = winesContainerRef.current.scrollLeft;

    if (containerScrollLeft < 180) {
      setVisibleIndex(0);
    } else if (containerScrollLeft < 540) {
      setVisibleIndex(1);
    } else {
      setVisibleIndex(2);
    }
  };

  useEffect(() => {
    getVisibleCardIndex();

    winesContainerRef.current.addEventListener("scroll", getVisibleCardIndex);

    return () => {
      winesContainerRef.current?.removeEventListener("scroll", getVisibleCardIndex);
    };
  }, [visibleIndex]);

  useEffect(() => {
    axios.get(`http://localhost:8080/regions/`).then((result) => setRegions(result.data));
    axios.get(`http://localhost:8080/regions/cepages/`).then((result) => setCepages(result.data));
  }, []);

  return (
    <div className="homepage">
      <div className="video-container">
        <div>
          <img className="logo-video" src={logo} alt="" />
          <h1>Prêt à vivre un voyage gustatif plein de saveurs</h1>
        </div>
        <video autoPlay muted playsInline loop>
          <source src={video} type="video/mp4" />
        </video>
      </div>
      <div className="concept" id="concept">
        <h2>Notre concept</h2>
        <img className="logo-concept" src={concept} alt="" />
        <p className="concept-desc">
          L'atelier Inovin est une expérience unique vous permettant de créer votre propre vin au travers d’une
          dégustation de cépages vers votre assemblage...
        </p>
        <div className="img-container">
          <img src={img1} alt="" />
          <img src={img2} alt="" />
          <img src={img3} alt="" />
        </div>
      </div>
      <div className="cepage-section">
        <h2>Découvrir les Cépages et les Régions</h2>
        <div className="section-wrapper">
          <div className="map-container">
            <MapHomePage setSelectedRegionIndex={setSelectedRegionIndex} />
          </div>
          {selectedRegionIndex ? (
            <div className="region-info-container">
              <h3>{regions.find((region) => region.id === selectedRegionIndex).name}</h3>
              <p>{regions.find((region) => region.id === selectedRegionIndex).description}</p>
              <img src={regions[selectedRegionIndex - 1].image} alt={regions.name} />
              <h4> Les Cépages rouges </h4>
              <span>
                {cepages
                  .filter((cepage) => cepage.color === "red" && cepage.region_id === selectedRegionIndex)
                  .map((cepage, index) => (
                    <React.Fragment key={cepage.cepage_id}>
                      {index !== 0 && ", "}
                      {cepage.name}
                    </React.Fragment>
                  ))}
              </span>

              <h4> Les Cépages blancs </h4>
              <span>
                {cepages
                  .filter((cepage) => cepage.color === "red" && cepage.region_id === selectedRegionIndex)
                  .map((cepage, index) => (
                    <React.Fragment key={cepage.cepage_id}>
                      {index !== 0 && ", "}
                      {cepage.name}
                    </React.Fragment>
                  ))}
              </span>
            </div>
          ) : (
            <div className="region-info-container-welcome">
              <h4 className="welcome-title">Choisissez une région sur la carte</h4>
              <p className="welcome-message">
                Chez Inovin, nous voulons vous faire découvrir le vin et ses secrets. <br /> <br />
                Servez-vous de la carte pour explorer les régions, leur histoire, leurs cépages ...
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="wines">
        <h2>Découvrir nos vins</h2>
        <p>
          Dans les vignobles où le soleil danse, <br />
          Les ceps s'étirent, tels des bras en transe.
          <br />
          Le vin, tel un poème, coule dans les veines,
          <br />
          Des trésors en flacons, des élixirs sans peine.
          <br />
          Le Chardonnay, noble et audacieux,
          <br />
          Le Merlot, épicé et envoûtant, <br />
          Le Pinot Noir, subtil et délicat,
          <br />
          Le Sauvignon Blanc, frais et vif à souhait.
        </p>
        <div className="img-container" ref={winesContainerRef}>

          <Link to="/redwines">
            <div>
              <img src={redwine} alt="" />
              <span>Nos vins rouges</span>
            </div>
          </Link>

          <Link to="/whitewines">
            <div>
              <img src={whitewine} alt="" />
              <span>Nos vins blancs</span>
            </div>
          </Link>
          <Link to="/wines">
            <div>
              <img src={allwines} alt="" />
              <span>Tous nos vins</span>
            </div>
          </Link>
        </div>
        <div className="slide-indicator">
          <div
            className={
              visibleIndex ? (visibleIndex == 1 ? "indicator indicator_1" : "indicator indicator_2") : "indicator"
            }
          />
        </div>
      </div>
      <div className="ateliers">
        <h2>Découvrir nos ateliers</h2>
        <div className="atelier">
          <div className="atelier-desc">
            <h3>Atelier dégustation</h3>
            <p>
              Dans les vignobles où le soleil danse, Les ceps s'étirent, tels des bras en transe. Le vin, tel un poème,
              coule dans les veines, Des trésors en flacons, des élixirs sans peine. Le Chardonnay, noble et audacieux,
              Le Merlot, épicé et envoûtant, Le Pinot Noir, subtil et délicat, Le Sauvignon Blanc, frais et vif à
              souhait.
            </p>
            <Link to="/reservation">
              <BtnInscription type="dégustation" />
            </Link>
          </div>
          <img src={atelierdegust} alt="" />
        </div>
        <div className="atelier">
          <img src={ateliercrea} alt="" />
          <div className="atelier-desc">
            <h3>Atelier création</h3>
            <p>
              Dans les vignobles où le soleil danse, Les ceps s'étirent, tels des bras en transe. Le vin, tel un poème,
              coule dans les veines, Des trésors en flacons, des élixirs sans peine. Le Chardonnay, noble et audacieux,
              Le Merlot, épicé et envoûtant, Le Pinot Noir, subtil et délicat, Le Sauvignon Blanc, frais et vif à
              souhait.
            </p>
            <Link to="/reservation">
              <BtnInscription type="création" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
