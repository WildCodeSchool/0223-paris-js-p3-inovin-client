import React from "react";

function SessionList({ filteredSessions, clickedLocation, sessionCategory, selectedSessionId, setSelectedSessionId }) {
  const handleClickSession = (date) => {
    setSelectedSessionId(date);
  };

  return (
    <div className="session-list">
      <span className="session-title">Ateliers {sessionCategory}</span>

      {filteredSessions.filter((session) => session.id === clickedLocation.id && session.category === sessionCategory)
        .length === 0 ? (
        <div>Il n'y a pas de dates disponibles</div>
      ) : (
        filteredSessions
          .filter((session) => session.id === clickedLocation.id && session.category === sessionCategory)
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
            return (
              <div
                key={session.date}
                className={session.date === selectedSessionId ? "session-selected" : "session"}
                onClick={() => handleClickSession(session.date)}
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
