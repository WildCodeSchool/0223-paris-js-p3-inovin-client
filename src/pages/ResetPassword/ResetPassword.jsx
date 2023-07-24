import { useState } from "react";
import { resetPassword } from "../../services/auth"
import { useNavigate, useSearchParams } from "react-router-dom";

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


    return (
        <>
            {error && <p>{error}</p>}
            <form onSubmit={handleSubmit}>     
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <input type="submit" value="Reinitialiser mon mot de passe" />
            </form>
        </>
    );
}

export default ResetPassword;