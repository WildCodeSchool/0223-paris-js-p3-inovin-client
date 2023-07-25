import { useEffect, useState } from "react";
import { getAllUsers } from "../../services/users";
import { useNavigate } from "react-router-dom";
import BtnBack from "../../components/BtnBack/BtnBack";
import Confirmbox from "../../components/ConfirmBox/Confirmbox";
import useConfirm from "../../services/useConfirm";
import BtnAdd from "../../components/BtnAdd/BtnAdd";
import { deleteUser } from "../../services/users";
import "./Users.scss";

const Users = () => {
  const { confirm, confirmState, onCancel, onConfirm } = useConfirm();
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await getAllUsers();
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getUsers();
  }, []);

  const handleDeleteUserClick = async (user) => {
    try {
      const isConfirmed = await confirm(
        `Etes-vous sure de vouloir supprimer l'utilisateur ${user.firstname} ${user.lastname} de la base de données ?`
      );
      if (isConfirmed) {
        await deleteUser(user.id);
        const updatedUsers = [...users].filter((e) => e.id != user.id);
        setUsers(updatedUsers);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="users">
      {confirmState.show ? (
        <Confirmbox
          text={confirmState.text}
          onConfirm={onConfirm}
          onCancel={onCancel}
        />
      ) : null}

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
                      onClick={() => navigate(`${user.id}`)}
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
