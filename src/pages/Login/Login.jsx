import React from "react";
import { useState } from "react";
import authService from "../../services/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./Login.scss";
import { login } from "../../store/auth";
//import  BtnLogRegister from "../../components/BtnLogRegister";


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await authService.login(email, password);
      dispatch(login(result.data));
      navigate("/");
    } catch (error) {
      console.log(error);
      if (error.response.status == 403 || error.response.status == 401) setError("email ou mot de passe incorrect");
    }
  };

  return (
    <>
      <div className="containerConnexion">
      <h1>Bienvenue</h1>     
      <button className="btnLogReg" onClick={() => navigate("/login")}>Se connecter</button>
      <button className="btnLogReg" onClick={() => navigate("/register")}>S'inscrire</button>
    </div>  
      {/* <BtnLogRegister/> */}
      {error && <p>{error}</p>}

      <form className="formLog" onSubmit={handleSubmit}>
        <input type="email" value={email} placeholder="email *" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" value={password} placeholder="password *" onChange={(e) => setPassword(e.target.value)} />
        <input className="btnLog"  type="submit" value="Se connecter" />

      </form>
      <button onClick={() => navigate("/forgotPassword")}>J'ai oublié mon mot de passe ?</button>
    </>
  );
}

export default Login;
