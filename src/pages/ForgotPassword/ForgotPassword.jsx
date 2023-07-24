import { useState } from "react";
import { sendResetPassword } from "../../services/auth";
import  {  ToastContainer ,  toast  }  from  'react-toastify' ;
import { useNavigate } from "react-router-dom";
import "../ForgotPassword/ForgotPassword.scss";
import 'react-toastify/dist/ReactToastify.css';

function ForgotPassword() {

    const [email, setEmail] = useState("");
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const regexEmail = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)


    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!regexEmail.test(email)){
             toast.error('Email invalide !', {
                position: toast.POSITION.TOP_CENTER
            });
            return
        }else{
           try {
                await sendResetPassword(email);   
                toast.success(" Email envoyé 👌", {
                    position:"bottom-center"
                }) ;
        
                setTimeout(() => {
                    navigate("/login");
                  }, "3000")
        
                ;         
            } catch (error) {
                toast.success(" Email envoyé 👌", {
                    position:"bottom-center"
                });
                console.error(error);
              
            }
        }

    }
       

    // const validate = () =>{
    //     alert("verifiez votre boite mail !");
    //     navigate("/login")
    // }
    

    // const notify = () =>{
    //     toast.success(" Email envoyé 👌", {
    //         position:"bottom-center"
    //     }) ;

    //     setTimeout(() => {
    //         navigate("/login");
    //       }, "3000")

    //     ;

    // } 

    return (
        <>
            {error && <p>{error}</p>}

            <form className="formLog" onSubmit={handleSubmit}>
            <h1 className="">Mot de passe oublié</h1>
            <p>Vous recevrez un e-mail avec des instructions pour réinitialiser votre mot de passe si un compte existe pour cette adresse e-mail.</p>
                    
            <div className="inputForm">
            <input className="inputLogReg"  type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
       
            < div>
            <button  type="submit" >Valider</button> 
            < ToastContainer /> 
            </div>  

            </form>
        </>
    );
}

export default ForgotPassword;