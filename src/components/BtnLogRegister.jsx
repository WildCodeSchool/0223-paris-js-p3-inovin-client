// import "../../pages/Login/Login.scss";
import { useNavigate } from "react-router-dom";
const navigate = useNavigate();

function BtnLogRegister() {
  return (
    <div className="containerConnexion">
      <h1>Bienvenue</h1>     
      <button className="btnLogReg" onClick={() => navigate("/login")}>Se connecter</button>
      <button className="btnLogReg" onClick={() => navigate("/register")}>S'inscrire</button>
    </div>
  )
}


export default BtnLogRegister;