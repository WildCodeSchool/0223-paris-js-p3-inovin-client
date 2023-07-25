import { useEffect, useState } from "react";

import "./Users.scss";
import { useNavigate, useParams } from "react-router-dom";
import {
  postUserHasSession,
  getUsersBySessionId,
} from "../../services/session";
import BtnBack from "../../components/BtnBack/BtnBack";
import { getAllUsers } from "../../services/users";

export const SessionAddUsers = () => {
  const [users, setUsers] = useState([]);
  const [registeredUsers, setRegisteredUsers] = useState([]);

  let { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const getUsers = async (id) => {
      try {
        const registeredUsersInfos = await getUsersBySessionId(id);
        const usersInfos = await getAllUsers();
        setRegisteredUsers(registeredUsersInfos.data);
        setUsers(usersInfos.data);
      } catch (error) {
        console.error(error);
      }
    };
    getUsers(id);
  }, []);

  const handleAddClick = async (event, user) => {
    console.log(user);
    try {
      await postUserHasSession(id, user.id);
      event.target.disabled = true;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="usersForSession">
      <BtnBack handleBackClick={() => navigate(`/ateliers/${id}`)} />

      {users?.length > 0 && registeredUsers ? (
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
                        className="manageButton btn"
                        onClick={(event) => handleAddClick(event, user)}
                        disabled={
                          registeredUsers.some(
                            (registeredUser) =>
                              registeredUser.user_id === user.id
                          )
                            ? true
                            : false
                        }
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
