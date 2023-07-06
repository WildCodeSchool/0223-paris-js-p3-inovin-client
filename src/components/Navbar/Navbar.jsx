import { Link } from "react-router-dom";
import "./navbar.scss";
import logo from "../../assets/logo.svg";
import { useSelector } from "react-redux/es/hooks/useSelector";
import profileicon from "../../assets/usernav.svg";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const [navHome, setNavHome] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (window.location.pathname == "/") {
      setNavHome(true);
    } else {
      setNavHome(false);
    }
  }, [navigate]);

  const handleScroll = () => {
    const currentScrollY = window.scrollY || 0;
    if (window.location.pathname === "/" && currentScrollY < 100) {
      setNavHome(true);
    } else {
      setNavHome(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = (path) => {
    navigate(path)
    setOpenMenu(false)
  }

  return (
    <>
      <div className={navHome && !openMenu? "navbar navbar-home" : "navbar"}>
        <div
          className={openMenu ? "menu-bg opened" : "menu-bg"}
          onClick={() => setOpenMenu(!openMenu)}
        >
          <div className="menu-bg__lines"></div>
          <div className="menu-bg__lines"></div>
          <div className="menu-bg__lines"></div>
        </div>
        <Link to="/">
          <img className="logo" src={logo} alt="" />
        </Link>
        {auth.user?.role == "ROLE_ADMIN" ? (
          <ul className="navlist">
            <li>Gestion des ateliers</li>
            <li>Gestion des vins</li>
            <li>Gestion des utilisateurs</li>
            <li>Gestion des créations</li>
          </ul>
        ) : (
          <ul className="navlist">
            <li>Notre concept</li>
            <li>Les cépages</li>
            <Link to="/wines">
              <li>Les vins</li>
            </Link>
            <li>Nos ateliers</li>
            <li>Contactez-nous</li>
          </ul>
        )}

        <Link to={auth.isLogged ? "/profile" : "/login"}>
          <img className="profileicon" src={profileicon} alt="" />
        </Link>
      </div>
      {openMenu && (
        <div className="menu-list">
          {auth.user?.role == "ROLE_ADMIN" ? (
            <ul className="navlist">
              <li>Gestion des ateliers</li>
              <li>Gestion des vins</li>
              <li>Gestion des utilisateurs</li>
              <li>Gestion des créations</li>
            </ul>
          ) : (
            <ul className="navlist">
              <li onClick={() => handleClick("/")}>Accueil</li>
              <li>Notre concept</li>
              <li>Les cépages</li>
              <li onClick={() => handleClick("/wines")}>Les vins</li>
              <li onClick={() => handleClick("/reservation")}>Nos ateliers</li>
              <li>Contactez-nous</li>
            </ul>
          )}
        </div>
      )}
    </>
  );
}

export default Navbar;
