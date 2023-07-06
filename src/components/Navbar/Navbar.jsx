import { Link } from "react-router-dom";
import "./navbar.scss";
import logo from "../../assets/logo.svg";
import { useSelector } from "react-redux/es/hooks/useSelector";
import profileicon from "../../assets/usernav.svg";

function Navbar() {
  const auth = useSelector((state) => state.auth);
  console.log(auth.user?.role);

  return (
    <div className="navbar">
      <Link to="/">
        <img className="logo" src={logo} alt="" />
      </Link>
      {auth.user?.role == "ROLE_ADMIN" ? (
        <ul>
          <li>Gestion des ateliers</li>
          <li>Gestion des vins</li>
          <li>Gestion des utilisateurs</li>
          <li>Gestion des créations</li>
        </ul>
      ) : (
        <ul>
          <li>Notre concept</li>
          <li>Les cépages</li>
          <Link to="/wines">
            <li>Les vins</li>
          </Link>
          <Link to="/atelier">
          <li>Nos ateliers</li>
          </Link>
          <li>Contactez-nous</li>
        </ul>
      )}

      <Link to={auth.isLogged ? "/profile" : "/login"}>
        <img className="profileicon" src={profileicon} alt="" />
      </Link>
    </div>
  );
}

export default Navbar;
