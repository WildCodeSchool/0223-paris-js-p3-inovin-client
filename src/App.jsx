import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import Atelier from "./components/Atelier/Atelier";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "./services/users";
import { useEffect } from "react";
import { login } from "./store/auth";
import "./App.scss";
import Wines from "./pages/Wines/Wines";

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
        <Route path="/wines" element={<Wines />}></Route>
      </Routes>
      <Atelier />
    </>
  );
}

export default App;
