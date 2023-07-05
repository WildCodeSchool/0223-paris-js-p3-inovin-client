import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "./services/users";
import { useEffect } from "react";
import { login } from "./store/auth";
import "./App.scss";
import WorkshopManager from "./pages/WorkshopManager/WorkshopManager";

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
        <Route path="/ateliers" element={<WorkshopManager />}></Route>
        <Route path="/ateliers/new" element={<NewWorkshop />}></Route>
      </Routes>
    </>
  );
}

export default App;
