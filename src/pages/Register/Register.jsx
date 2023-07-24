import React from "react";
import { useState } from "react";
import authService from "../../services/auth";
import { useNavigate } from "react-router-dom";
import "./Register.scss";
//import  BtnLogRegister from "../../components/BtnLogRegister.jsx"


function Register() {
        
    const [error, setError] = useState(null);
    const navigate = useNavigate();


    const [state, setState] = useState({ firstName: "",lastName:"",birthday:"", phone:"", email: "", password: "", repeatPassword:"" });
    
    const onChange= (event) => {
    const { name, value } = event.target;
    setState(prevState => ({ ...prevState, [name]: value }));    
    } 

    const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                await authService.register(state);
                navigate("/login?register=true");
            } catch (error) {
            console.log(error);
            if (error.response.status == 403 || error.response.status == 401) setError("Erreur de saisie");
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
    <form onSubmit={handleSubmit}>
 
      <label htmlFor="text">Nom *</label>
      <input type="text" value={state.lastName} id="lastName" name="lastName" onChange={onChange} />

      <label htmlFor="text">Prénom *</label>
      <input type="text" value={state.firstName} name="firstName" onChange={onChange} />

      <label htmlFor="date">Date de naissance *</label>
      <input type="date" value={state.birthday} id="birthday" name="birthday" max="2005-01-01" onChange={onChange} />

      <label htmlFor="tel">Téléphone</label>
      <input type="tel" value={state.phone} id="phone" name="phone" onChange={onChange} />

      <label htmlFor="email">Email</label>
      <input type="email" value={state.email} id="email" name="email" onChange={onChange} />
 
      <label htmlFor="password">Mot de passe *</label>
      <input type="password" value={state.password}  id="password" name="password" onChange={onChange} />

      <label htmlFor="phone">Confirmer le mot de passe *</label>  
      <input type="password" value={state.repeatPassword} id="repeatPassword" name="repeatPassword" onChange={onChange} />

      <button type="submit">S'inscrire</button>
      </form>
      
    </>
  );

}

export default Register;
