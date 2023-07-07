import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSessionById } from "../../services/session";
import "./WorkshopDetails.scss";

const WorkshopDetails = () => {
  const [session, setSession] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    console.log(id);
    const getSession = async (id) => {
      try {
        const result = await getSessionById(id);
        setSession(result.data);
      } catch (error) {
        console.error(error);
      }
    };
    getSession(id);
    console.log(session);
  }, []);
  return (
    <div className="workshopDetails">
      <button onClick={() => navigate("/ateliers")}>Retour</button>
    </div>
  );
};

export default WorkshopDetails;
