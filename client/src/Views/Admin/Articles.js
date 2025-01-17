import React, { useState, useEffect } from "react";
import User from "../../Components/Widgets/User";
import CreateArticle from "../../Components/Form/FormArticle/CreateArticle";
import UpdateArticle from "../../Components/Form/FormArticle/UpdateArticle";
import Loader from "../../Components/Widgets/Loader";
import axios from "axios";
import Shipping from "../../Components/Widgets/Shipping";

export default function AdminCategories() {
  const { currentUser, userLoading } = User();
  const [state, setState] = useState("");
  const [articles, setArticles] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const { currentShipping, shippingLoading } = Shipping();
  const [newShipping, setNewShipping] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [currentPromotion, setCurrentPromotion] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get("http://localhost:8000/articles");
        setArticles(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchArticle();
  }, []);

  useEffect(() => {
    const fetchPromotion = async () => {
      try {
        const res = await axios.get("http://localhost:8000/get_promotions");

        setCurrentPromotion(res.data.promotion);

        let start = new Date(res.data.startDate);
        let year = start.getUTCFullYear();
        let month = (start.getUTCMonth() + 1).toString().padStart(2, '0');
        let day = start.getUTCDate().toString().padStart(2, '0');
        let formattedDate = year + "-" + month + "-" + day;

        setStartDate(formattedDate);

        start = new Date(res.data.endDate);
        year = start.getUTCFullYear();
        month = (start.getUTCMonth() + 1).toString().padStart(2, '0');
        day = start.getUTCDate().toString().padStart(2, '0');
        formattedDate = year + "-" + month + "-" + day;

        setEndDate(formattedDate);

      } catch (error) {
        console.error(error);
      }
    };

    fetchPromotion();
  }, [articles]);

  const handleClick = (e) => {
    if (e.target.name === "create") {
      setState("create");
      setIsEditing();
    } else if (e.target.name === "update") {
      setIsEditing(e.target.value);
      setState("update");
    }
  };

  const setShipping = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/changeShipping", {
        shipping: Number(newShipping),
      })
      .then((response) => {
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const setPromotionPeriod = (e) => {
    e.preventDefault();
    axios
        .post("http://localhost:8000/createPromotion", {
            startDate: startDate,
            endDate: endDate,
            promotion: currentPromotion,
            salePeriod: true,
        })
        .then((response) => {
            window.location.reload();
        })
        .catch((error) => {
            console.error(error)
        });
  };

  if (userLoading || shippingLoading) {
    return <Loader />;
  }

  if (!currentUser || currentUser.admin === false) {
    window.location.href = "http://localhost:3000";
  }

  return (
    <div>
      <div className="flex w-3/4 justify-center mx-auto mt-8">
        <button onClick={handleClick} name="create" className="mb-4 1/4 bg-[#C1E1C1] p-2 rounded-xl">
          Créer un article
        </button>
      </div>
      <form className=" w-fit mx-auto my-5 flex flex-col gap-8">
        <div className="flex gap-8">
          <label>Augmentation Frais de port (en %)</label>
          <input
            className="w-fit mx-auto border"
            defaultValue={currentShipping}
            onChange={(e) => setNewShipping(e.target.value)}
          />
        </div>
        <button className="bg-[#4FBEB7] p-2 rounded-xl w-1/4 mx-auto" onClick={setShipping}>Valider</button>
      </form>
      <div>
        <form className="flex flex-col w-1/2 justify-center mx-auto mt-8">
          <p className="text-center mb-8 bg-[#C1E1C1] w-1/2 mx-auto p-2 rounded-xl">Créer une période de promotion :</p>
          <div className="flex flex-col gap-8">
            <div>
              <label>Réduction sur tout le site (en %)</label>
              <input
                className="w-fit mx-auto border"
                defaultValue={currentPromotion}
                onChange={(e) => setCurrentPromotion(e.target.value)}
              ></input>
            </div>
            <div className="flex justify-between">
              <div>
                <label>Date de début :</label>
                <input
                  type="date"
                  defaultValue={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                ></input>
              </div>
              <div>
                <label>Date de fin :</label>
                <input
                  type="date"
                  defaultValue={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                ></input>
              </div>
            </div>
          </div>
          <button
            onClick={setPromotionPeriod}
            name="promotion"
            className="mb-8 mt-4 bg-[#4FBEB7] w-1/2 mx-auto p-2 rounded-xl"
          >
            Valider
          </button>
        </form>
      </div>
      {state === "create" ? (
        <div className="mb-5">
          <CreateArticle />
        </div>
      ) : (
        <div className="flex flex-col w-3/4 mx-auto gap-8">
          {!isEditing ? (
            articles.map((article) => (
              <div className="flex bg-[#4FBEB7] p-2 justify-between rounded-3xl">
                <div className="flex gap-8">
                  <p>{article.title}</p>
                  <p>
                    {article.stock > 0 ? "En stock" : "Victime de son succès"}
                  </p>
                </div>
                <button onClick={handleClick} name="update" value={article._id}>
                  Modifier l'article
                </button>
              </div>
            ))
          ) : (
            <UpdateArticle idArticle={isEditing} />
          )}
        </div>
      )}
    </div>
  );
}
