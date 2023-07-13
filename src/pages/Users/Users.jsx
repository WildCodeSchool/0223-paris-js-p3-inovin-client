import { useEffect, useState } from "react";

import "./Users.scss";
import { useNavigate, useParams } from "react-router-dom";
import { postUserHasSession } from "../../services/session";
import { getAllUsers } from "../../services/users";

export const Users = () => {
  const [users, setUsers] = useState({});
  let { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const getUsers = async () => {
      try {
        const usersInfos = await getAllUsers();
        setUsers(usersInfos.data);
      } catch (error) {
        console.error(error);
      }
    };
    getUsers();
  }, []);

  const handleAddClick = async (userId) => {
    try {
      await postUserHasSession(id, userId);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="usersForSession">
      <button
        onClick={() => navigate(`/ateliers/${id}`)}
        className="backButton"
      >
        Retour
      </button>
      {users?.length > 0 ? (
        <div>
          <h2>Utilisateurs inscrits</h2>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Prénom</th>
                <th>Nom</th>
                <th>Gestion</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                return (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.firstname}</td>
                    <td>{user.lastname}</td>
                    <td className="buttonCell">
                      <button
                        className="manageButton"
                        onClick={() => handleAddClick(user.id)}
                      >
                        Ajouter
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Aucun utilisateur</p>
      )}
    </div>
  );
};
