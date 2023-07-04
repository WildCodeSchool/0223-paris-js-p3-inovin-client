import React from "react";
import "./Home.scss";
import { useSelector } from "react-redux/es/hooks/useSelector";

function Home() {
  const auth = useSelector((state) => state.auth);

  return <div>Home {auth.user?.email}</div>;
}

export default Home;
