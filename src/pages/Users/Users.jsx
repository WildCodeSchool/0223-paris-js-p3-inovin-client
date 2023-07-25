import { useEffect, useState } from "react";
import { getAllUsers } from "../../services/users";
import { useNavigate } from "react-router-dom";
import BtnBack from "../../components/BtnBack/BtnBack";
import BtnAdd from "../../components/BtnAdd/BtnAdd";
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
      <BtnBack handleBackClick={() => navigate("/")} />
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
                      className="WMButton btn"
                      onClick={() => handleSeeUserClick(user.id)}
                    >
                      Voir détails
                    </button>
                    <button
                      className="WMButton btn"
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
      <BtnAdd
        handleAddClick={() => navigate("new")}
        title={"Ajouter un utilisateur"}
      />
    </div>
  );
};

export default Users;
