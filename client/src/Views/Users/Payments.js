import React, { useState, useEffect } from "react";
import axios from "axios";
import User from "../../Components/Widgets/User";
import Loader from "../../Components/Widgets/Loader";

export default function Payments() {
  const { currentUser, userLoading } = User();
  const [isAddingCard, setIsAddingCard] = useState(null);
  const [card, setCard] = useState([]);
  const [isUpdatingCard, setIsUpdatingCard] = useState(null);

  const [form, setForm] = useState({
    name: "",
    card: "",
    date: Number(),
    cvv: "",
  });

  useEffect(() => {
    if (currentUser && card.length <= 0) {
      setCard(currentUser.data.cards);
    }
  }, [currentUser, card]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  if (userLoading) {
    return <Loader />;
  }

  const newCard = async (e) => {
    e.preventDefault();
    await axios
      .post(
        "http://localhost:8000/newCard",
        { form: form },
        { withCredentials: true }
      )
      .then((response) => {
        setCard(response.data)
        setIsAddingCard(null);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    currentUser &&
    (isAddingCard ? (
      <>
        <p
          onClick={() => {
            setIsAddingCard(null);
          }}
          className="text-center my-4"
        >
          Voir vos moyens de paiements
        </p>
        <form
          onSubmit={newCard}
          className="flex flex-col w-2/4 mx-auto mt-8 border rounded-xl p-2"
        >
          <label htmlFor="name">Titulaire de la carte</label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Nom et Prénom"
            className="border"
          />
          <label htmlFor="card">Numéro de carte</label>
          <input
            type="text"
            id="card"
            name="card"
            value={form.card}
            onChange={handleChange}
            required
            placeholder="Numéro"
            className="border"
          />
          <label htmlFor="date">Date d'expiration</label>
          <input
            type="text"
            id="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
            placeholder="Date"
            className="border"
          />
          <label htmlFor="cvv">CVV</label>
          <input
            type="password"
            id="cvv"
            name="cvv"
            value={form.cvv}
            onChange={handleChange}
            required
            className="border"
          />
          <button
            type="submit"
            className="mt-5 bg-[#4FBEB7] p-2 mb-2 rounded-lg"
          >
            Enregistrer la carte
          </button>
        </form>
      </>
    ) : (
      <div>
        <p
          onClick={() => {
            setIsAddingCard(true);
          }}
          className="text-center my-4"
        >
          Créer un nouveau moyen de paiement
        </p>
        <div className="border flex w-3/4 mx-auto text-center gap-8">
        {card.length > 0 &&
          card.map((item, index) => (
            <div key={index} className="w-1/4 border cursor-pointer" onClick={() => {setIsUpdatingCard(item)}}>           
              <p>{item.name}</p>
              <p>{item.card}</p>
              <p>{item.date}</p>
              <p>{item.cvv}</p>
            </div>
          ))
        }
        </div>
        {
          isUpdatingCard ? 
          (
            <form
              onSubmit={newCard}
              className="flex flex-col w-2/4 mx-auto mt-8 border rounded-xl p-2"
            >
            <label htmlFor="name">Titulaire de la carte</label>
            <input
              type="text"
              id="name"
              name="name"
              value={isUpdatingCard.name}
              onChange={handleChange}
              required
              placeholder="Nom et Prénom"
              className="border"
            />
            <label htmlFor="card">Numéro de carte</label>
            <input
              type="text"
              id="card"
              name="card"
              value={isUpdatingCard.card}
              onChange={handleChange}
              required
              placeholder="Numéro"
              className="border"
            />
            <label htmlFor="date">Date d'expiration</label>
            <input
              type="text"
              id="date"
              name="date"
              value={isUpdatingCard.date}
              onChange={handleChange}
              required
              placeholder="Date"
              className="border"
            />
            <label htmlFor="cvv">CVV</label>
            <input
              type="password"
              id="cvv"
              name="cvv"
              value={isUpdatingCard.cvv}
              onChange={handleChange}
              required
              className="border"
            />
            <button
              type="submit"
              className="mt-5 bg-[#4FBEB7] p-2 mb-2 rounded-lg"
            >
              Créer la nouvelle carte
            </button>
          </form>
          ) : 
          (null)
        }
      </div>
    ))
  );
}