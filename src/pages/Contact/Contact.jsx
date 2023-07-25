import React from "react";
import { useState } from "react";
import authService from "../../services/auth";
import { useNavigate } from "react-router-dom";
import "./Contact.scss";
 
 

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [object, setObject] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await authService.login(email, password);
       navigate("/");
    } catch (error) {
      console.log(error);
      if (error.response.status == 403 || error.response.status == 401) setError("email ou mot de passe incorrect");
    }
  };

  return (
    <>
      {error && <p>{error}</p>}
      
      <form className="formLog" onSubmit={handleSubmit}>
        
        <h1>Contact</h1>
        <div className="inputForm">
        <input className="inputLogReg" type="name" placeholder="Nom" value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="inputForm">        
        <input className="inputLogReg" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />   
        </div>

        
        <div className="inputForm">        
        <input className="inputLogReg" type="object" placeholder="Objet" value={email} onChange={(e) => setObject(e.target.value)} />   
        </div>

        <textarea
          placeholder="Message :"
          className="inputMessage"
          id="story"
          name="story"
          rows="5"
          cols="33"
          value={message}
          onChange={(e)=> setMessage(e.target.value)}          
        >

        </textarea>
        <button className="btn" type="submit">Se connecter</button>  
      </form>
     
    </>
  );
}

export default Contact;
