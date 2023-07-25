import React, { useEffect } from "react";
import { useState } from "react";
import authService from "../../services/auth";
import BtnLogRegister from "../../components/BtnLogRegister/BtnLogRegister";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./Login.scss";
import { login } from "../../store/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    if (!email) {
      setEmail("Erreur email");
      return;
    }
    if (!password) {
      setPassword("Erreur password");
      return;
    }

    e.preventDefault();
    try {
      const result = await authService.login(email, password);
      dispatch(login(result.data));
      navigate("/profilepage");
    } catch (error) {
      console.log(error);
      if (error.response.status == 403 || error.response.status == 401)
        setError("email ou mot de passe incorrect");
    }
  };

  return (
    <>
      <BtnLogRegister type={"login"} />
      {error && <p className="error">{error}</p>}

      <form className="formLog" onSubmit={handleSubmit}>
        <div className="inputForm">
          <input
            className="inputLogReg"
            type="email"
            placeholder="Email *"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="inputForm">
          <input
            className="inputLogReg"
            type="password"
            placeholder="Mot de passe *"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="btn" type="submit">
          Se connecter
        </button>
        <button
          className="forgetMotpasse"
          onClick={() => navigate("/forgotPassword")}
        >
          J'ai oublié mon mot de passe ?
        </button>
      </form>
    </>
  );
}

export default Login;
