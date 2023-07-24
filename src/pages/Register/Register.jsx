import React, { useEffect } from "react";
import { useState } from "react";
import authService from "../../services/auth";
import  BtnLogRegister from "../../components/BtnLogRegister/BtnLogRegister";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../store/auth";
import "./Register.scss";



function Register() {
        
    const [error, setError] = useState(null);
    const [user, setUser] = useState({ firstName: "",lastName:"",birthday:"", phone:"", email: "", password: "", repeatPassword:"" });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onChange= (event) => {
    const { name, value } = event.target;
    setUser(prevState => ({ ...prevState, [name]: value }));    
    } 

    const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                await authService.register(user);
                const result = await authService.login( user.email, user.password); 
                dispatch(login(result.data));  
                navigate("/profile")
            } catch (error) {
            console.log(error);
            if (error.response.status == 403 || error.response.status == 401) setError("Erreur de saisie");
            }
        };



  return (
    <>
    <BtnLogRegister/>
    {error && <p>{error}</p>}
    <form className="formLog" onSubmit={handleSubmit}>

      <div className="inputForm">
      <input className="inputLogReg" type="text"  placeholder="Nom *" value={user.lastName} id="lastName" name="lastName" onChange={onChange} />
      </div>

      <div className="inputForm">
      <input className="inputLogReg" type="text"  placeholder="Prénom *" value={user.firstName} name="firstName" onChange={onChange} />
      </div> 

      <div className="inputForm">
      <input className="inputLogReg" type="date" placeholder="Date de naissance *" value={user.birthday}  id="birthday" name="birthday" max="2005-01-01" onChange={onChange} />
      </div> 

      <div className="inputForm">
      <input className="inputLogReg" type="tel" placeholder="Téléphone *" value={user.phone} id="phone" name="phone" onChange={onChange} />
      </div> 

      <div className="inputForm">
      <input className="inputLogReg" type="email" placeholder="Email *" value={user.email} id="email" name="email" onChange={onChange} />
      </div> 

      <div className="inputForm">
      <input className="inputLogReg" type="password" placeholder="Mot de passe *" value={user.password}  id="password" name="password" onChange={onChange} />
      </div> 

      <div className="inputForm">
      <input className="inputLogReg" type="password" placeholder="Confirmer le mot de passe *" value={user.repeatPassword} id="repeatPassword" name="repeatPassword" onChange={onChange} />
      </div> 

      <button type="submit"  >S'inscrire</button>
      </form>
      
    </>
  );

}

export default Register;
