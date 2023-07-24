import { useEffect, useState } from "react";
import { getAllUsers } from "../../services/users";
import { useNavigate } from "react-router-dom";
import "./Users.scss";

const Users = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await getAllUsers();
        setUsers(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getUsers();
  }, []);

  return (
    <div className="users">
      <button onClick={() => navigate(`/`)} className="backButton">
        Retour
      </button>
      <h2>Utilisateurs enregistrés</h2>
      {users.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Prénom</th>
              <th>Nom</th>
              <th className="headerManager">Gestion</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => {
              return (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.firstname}</td>
                  <td>{user.lastname}</td>
                  <td className="buttonCell">
                    <button
                      className="WMButton"
                      onClick={() => handleSeeUserClick(user.user_id)}
                    >
                      Voir détails
                    </button>
                    <button
                      className="WMButton"
                      onClick={() => handleDeleteUserClick(user)}
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>Aucun utilisateur enregistrés dans la base de données</p>
      )}
    </div>
  );
};

export default Users;
