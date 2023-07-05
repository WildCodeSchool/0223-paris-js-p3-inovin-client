import { Link } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";

function Navbar() {
  const user = useSelector((state) => state.auth.user);

  return (
    <div>
      <Link to="/">
        <p>Home</p>
      </Link>
      <Link to="/login">
        <p>Login</p>
      </Link>
    </div>
  );
}

export default Navbar;
