import { useState } from "react";
import  {  ToastContainer ,  toast  }  from  'react-toastify' ;
import { resetPassword } from "../../services/auth";
import { useNavigate, useSearchParams } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import "../Login/Login.scss";

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
            navigate("/login");
        } catch (error) {
            console.error(error);
        }
    }


    const notify = () => toast("Wow so easy !");
    // const  notify  =  ( )  =>   {
        
    //     toast.success(" Email envoyé 👌", {
    //         position: toast.POSITION.TOP_RIGHT
    //     });
    // };
 


    return (
        <>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}> 

            <div className="inputForm">
            <input className="inputLogReg" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>  

            < div>
            < bouton  onClick = { notify } > notify ! </ bouton > 
            < ToastContainer/> 
            </div>  

            <div className="inputForm">
            <input className="inputLogReg" type="submit" value="Reinitialiser mon mot de passe" />
            </div>   

           
            
            </form>

            
        </>
    );
}

export default ResetPassword;