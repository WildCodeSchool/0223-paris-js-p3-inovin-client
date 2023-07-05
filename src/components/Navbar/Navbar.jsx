import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <Link to="/">
        <p>Home</p>
      </Link>
      <Link to="/login">
        <p>Login</p>
      </Link>
      <Link to="/reservation">
        <p>Reservation</p>
      </Link>
    </div>
  );
}

export default Navbar;
