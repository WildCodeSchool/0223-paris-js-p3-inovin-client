import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BtnLogRegister.scss";




function BtnLogRegister({type}) {
  
const navigate = useNavigate();
const handleclick= (path) => {
  navigate(path)
  }
  return (
    <div className="containerConnexion">
      <h1>Bienvenue</h1> 
      <div className="connecInscrire">    
      <button className={type == 'login'? "btnLogReg underline" : "btnLogReg" } onClick={()=>handleclick("/login")}>Se connecter</button>
      <button className={type == 'register'? "btnLogReg underline" : "btnLogReg" } onClick={()=>handleclick("/register")}>S'inscrire</button>    
      </div>
    </div>
  )
}


export default BtnLogRegister;


