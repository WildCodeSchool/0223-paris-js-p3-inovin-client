import React from "react";
import { useState } from "react";
import userService from "../../services/users";
import { useNavigate } from "react-router-dom";
import  {  ToastContainer ,  toast  }  from  'react-toastify' ;
import 'react-toastify/dist/ReactToastify.css';
import "./Contact.scss";
 
 

function Contact() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await userService.sendContact({firstName, email, subject , message});
      toast.success(" Message envoyer 👌", {
        position:"bottom-center"
    }) ;
    setTimeout(() => {
      navigate("/");
    }, "3000");    

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {error && <p>{error}</p>}
      < ToastContainer /> 
      <form className="formLog" onSubmit={handleSubmit}>
        
        <h1>Contact</h1>
        <div className="inputForm">
        <input className="inputLogReg" type="text" placeholder="Nom" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </div>

        <div className="inputForm">        
        <input className="inputLogReg" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />   
        </div>
        
        <div className="inputForm">        
        <input className="inputLogReg" type="text" placeholder="Objet" value={subject} onChange={(e) => setSubject(e.target.value)} />   
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
        <button className="btn" type="submit">Envoyer</button>  
      </form>
     
    </>
  );
}

export default Contact;
