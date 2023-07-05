import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Reservation from "./pages/Reservation/Reservation";
import Navbar from "./components/Navbar/Navbar";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "./services/users";
import { useEffect } from "react";
import { login } from "./store/auth";
import "./App.scss";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    reloadStore();
  }, []);

  const reloadStore = async () => {
    try {
      const result = await getCurrentUser();
      dispatch(login(result.data));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/reservation" element={<Reservation />}></Route>
      </Routes>
    </>
  );
}

export default App;
