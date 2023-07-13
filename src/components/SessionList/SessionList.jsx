import "./SessionList.scss";
import { useState } from "react";

function SessionList({
  filteredSessions,
  clickedLocation,
  sessionCategory,
  selectedSessionId,
  setSelectedSessionId,
  registeredSessions,
}) {
  const handleClickSession = (id) => {
    setSelectedSessionId(id);
  };

  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="session-list">
      <span className="session-title">Ateliers {sessionCategory}</span>

      {filteredSessions.filter(
        (session) => session.location_id === clickedLocation.id && session.category === sessionCategory
      ).length === 0 ? (
        <div className="comment">Il n'y a pas de dates disponibles</div>
      ) : (
        filteredSessions
          .filter((session) => session.location_id === clickedLocation.id && session.category === sessionCategory)
          .map((session, index) => {
            const options = {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
            };
            const date = new Date(session.date);
            return registeredSessions.some((e) => e.session_id === session.id) ? (
              <div
                key={session.id}
                className={session.id === selectedSessionId ? "session-selected" : "session"}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                {isHovered ? "Vous avez déjà réservé cet atelier" : date.toLocaleString("fr-FR", options)}
              </div>
            ) : (
              <div
                key={session.id}
                className={session.id === selectedSessionId ? "session-selected" : "session"}
                onClick={() => handleClickSession(session.id)}
              >
                {date.toLocaleString("fr-FR", options)}
              </div>
            );
          })
      )}
    </div>
  );
}

export default SessionList;
