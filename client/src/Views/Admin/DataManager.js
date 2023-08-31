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
      endpoint = "get_user_data";
      id = e.target.value;
    } else if (e.target.name === "user_general") {
      endpoint = "get_user_data";
    } else if (e.target.name === "article_general") {
      endpoint = "get_article_data";
    } else if (e.target.name === "categorie_general") {
      endpoint = "get_categorie_data";
    } else if (e.target.name === "global_data") {
      endpoint = "get_general_data";
    }

    axios
      .get(`http://localhost:8000/${endpoint}${id ? `/${id}` : ""}`, {
        responseType: "blob",
      })
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
        } else if (endpoint === "get_user_data") {
          link.download = `general_user_${date}.csv`;
        } else if (endpoint === "get_article_data") {
          link.download = `general_article_${date}.csv`;
        } else if (endpoint === "get_categorie_data") {
          link.download = `general_categorie_${date}.csv`;
        } else if (endpoint === "get_general_data") {
          link.download = `general_infos_${date}.csv`;
        }

        link.click();

        URL.revokeObjectURL(blobUrl);
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="flex flex-col gap-6 w-1/2 mx-auto text-center mt-6">
      <div>
        {userDisplay ? (
          <>
            <button onClick={() => setUserDisplay(false)} className="bg-[#4FBEB7] p-2 rounded-xl mb-6">
              Masquer les utilisateurs
            </button>
            {userList ? (
              <table className="w-full">
                <thead className="bg-[#C1E1C1]">
                  <tr>
                    <th className="p-2">Email</th>
                    <th className="p-2">Admin</th>
                    <th className="p-2">Abonnement</th>
                    <th className="p-2">Données</th>
                  </tr>
                </thead>
                <tbody className="border">
                  {userList.map((user) => (
                    <tr key={user._id} className="border">
                      <td className="p-2">{user.email}</td>
                      <td className="p-2">{user.admin ? "oui" : "non"}</td>
                      <td className="p-2">
                        {user.subscribed.month
                          ? "Mensuel"
                          : user.subscribed.year
                          ? "Annuel"
                          : "Aucun"}
                      </td>
                      <td className="p-2">
                        {" "}
                        <button
                          onClick={handleClick}
                          name="user_unique"
                          value={user._id}
                        >
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
          <button onClick={() => setUserDisplay(true)} className="bg-[#4FBEB7] p-2 rounded-xl">
            Afficher les utilisateurs
          </button>
        )}
      </div>
      {
        !userDisplay ?
        <div className="flex flex-col gap-6 ">
          <div>
            <button onClick={handleClick} name="global_data" className="bg-[#C1E1C1] p-2 rounded-xl">
              Données globales du site
            </button>
          </div>
          <div>
            <button onClick={handleClick} name="article_general" className="bg-[#C1E1C1] p-2 rounded-xl">
              Données articles général
            </button>
          </div>
          <div>
            <button onClick={handleClick} name="categorie_general" className="bg-[#C1E1C1] p-2 rounded-xl">
              Données catégories général
            </button>
          </div>
          <div>
            <button onClick={handleClick} name="user_general" className="bg-[#C1E1C1] p-2 rounded-xl">
              Données utilisateur général
            </button>
          </div>
        </div> : null
      }
    </div>
  );
}
