import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Reservation from "./pages/Reservation/Reservation";
import Navbar from "./components/Navbar/Navbar";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "./services/users";
import { useEffect } from "react";
import { login } from "./store/auth";
import WorkshopManager from "./pages/WorkshopManager/WorkshopManager";
import NewWorkshop from "./pages/NewWorkshop/NewWorkshop";
import WorkshopDetails from "./pages/WorkshopDetails/WorkshopDetails";
import Wines from "./pages/Wines/Wines";
import SelectedWine from "./pages/SelectedWine/SelectedWine";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import SelectedRecipe from "./pages/SelectedRecipe/SelectedRecipe";

import "./App.scss";
import { Users } from "./pages/Users/Users";

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
        <Route path="/profilepage" element={<ProfilePage />}></Route>
        <Route path="/ateliers" element={<WorkshopManager />}></Route>
        <Route path="/ateliers/new" element={<NewWorkshop />} />
        <Route path="/ateliers/:id" element={<WorkshopDetails />} />
        <Route path="/ateliers/:id/users" element={<Users />} />
        <Route path="/reservation" element={<Reservation />}></Route>
        <Route path="/wines" element={<Wines />}></Route>
        <Route path="/redwines" element={<Wines color="Rouge" />}></Route>
        <Route path="/whitewines" element={<Wines color="Blanc" />}></Route>
        <Route path="/wines/:id" element={<SelectedWine />}></Route>
        <Route path="/recipes/:id" element={<SelectedRecipe />}></Route>
      </Routes>
    </>
  );
}

export default App;
