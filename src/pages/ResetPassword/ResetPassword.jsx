import { useState } from "react";
import  {  ToastContainer ,  toast  }  from  'react-toastify' ;
import { resetPassword } from "../../services/auth";
import { useNavigate, useSearchParams } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import "./resetPassword.scss";

function ResetPassword() {

    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [params, setParams] = useSearchParams();
    const token = params.get("token");

    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await resetPassword(password, token);
            toast.success(" Mot de passe modifier 👌", {
                position:"bottom-center"
            }) ;
    
            setTimeout(() => {
                navigate("/login");
              }, "3000")
    
            ;    
        } catch (error) {
            console.error(error);
        }
    }



    return (
        <>
            {error && <p>{error}</p>}
            <form  className="formLog"  onSubmit={handleSubmit}>

            <h1>Reinitialiser votre mot de passe</h1>

            <div className="inputForm">
            <input className="inputLogReg" type="password" placeholder="Nouveau mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>  

             < div>
            <button  type="submit" >Valider</button> 
            < ToastContainer /> 
            </div>  
             
            
            </form>

            
        </>
    );
}

export default ResetPassword;