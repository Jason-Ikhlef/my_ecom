import React, { useState, useEffect } from "react";
import Loader from "../../Components/Widgets/Loader";
import axios from "axios";

export default function DataManager() {
  const [userDisplay, setUserDisplay] = useState(false);
  const [userList, setUserList] = useState(null);

  useEffect(() => {
    if (!userList) {
      axios
        .get(`http://localhost:8000/users`)
        .then((res) => {
          setUserList(res.data);
        })
        .catch((err) => console.error(err));
    }
  }, [userDisplay]);

  const handleClick = async (e) => {
    e.preventDefault();
    let endpoint = null;
    let id = null;
    if (e.target.name === "user_unique") {
        endpoint = "get_user_data"
        id = e.target.value
    } else if (e.target.name === "user_general") {
        endpoint = "get_user_data"
    }

    axios
      .get(`http://localhost:8000/${endpoint}${id ? `/${id}` : ''}`, { responseType: "blob" })
      .then((res) => {
        console.log(res);
        const blobUrl = URL.createObjectURL(res.data);
        console.log(res.data);
        const link = document.createElement("a");
        link.href = blobUrl;

        let date = new Date();
        date = date.toLocaleDateString("fr").replaceAll("/", "-");

        if (endpoint === "get_user_data" && id !== null) {
          link.download = `user_data_${id}.csv`;
        } else {
          link.download = `general_user_${date}.csv`;
        }

        console.log(link)


        link.click();

        URL.revokeObjectURL(blobUrl);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <div>
        <button onClick={handleClick} name="user_general">
          Données utilisateur général
        </button>
      </div>
      <div>
        {userDisplay ? (
          <>
            <button onClick={() => setUserDisplay(false)}>
              Masquer les utilisateurs
            </button>
            {userList ? (
              <table>
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>Admin</th>
                    <th>Abonnement</th>
                    <th>Données</th>
                  </tr>
                </thead>
                <tbody>
                  {userList.map((user) => (
                    <tr key={user._id}>
                      <td>{user.email}</td>
                      <td>{user.admin ? "oui" : "non"}</td>
                      <td>
                        {user.subscribed.month
                          ? "Mensuel"
                          : user.subscribed.year
                          ? "Annuel"
                          : "Aucun"}
                      </td>
                      <td>
                        {" "}
                        <button onClick={handleClick} name="user_unique" value={user._id}>
                          Obtenir les données
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <Loader />
            )}
          </>
        ) : (
          <button onClick={() => setUserDisplay(true)}>
            Afficher les utilisateurs
          </button>
        )}
      </div>
    </div>
  );
}
