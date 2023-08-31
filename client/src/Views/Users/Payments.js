import React, { useState, useEffect } from "react";
import axios from "axios";
import User from "../../Components/Widgets/User";
import Loader from "../../Components/Widgets/Loader";
import bar from "../../assets/bar.svg"
import cb from "../../assets/cb.svg"
import chip from "../../assets/chip.png"
import visa from "../../assets/Symbole-Visa.png"

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

    const [editForm, setEditForm] = useState({
        name: "",
        card: "",
        date: Number(),
        cvv: "",
    });

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditForm({ ...editForm, [name]: value });
    };

    useEffect(() => {
        if (currentUser && card.length <= 0) {
            setCard(currentUser.data.cards);
        }
        if (isUpdatingCard) {
            setEditForm({
                name: isUpdatingCard.data.name,
                card: isUpdatingCard.data.card,
                date: isUpdatingCard.data.date,
                cvv: isUpdatingCard.data.cvv,
            });
        }
    }, [currentUser, card, isUpdatingCard]);

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
                setCard(response.data);
                setIsAddingCard(null);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const editCard = async () => {
        axios
            .put(
                "http://localhost:8000/updateCard",
                { data: editForm, index: isUpdatingCard.index },
                { withCredentials: true }
            )
            .then((response) => {
                console.log(response);
                setIsUpdatingCard(null)
            })
            .catch((err) => {
                console.error(err);
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
                    className="text-center my-4 cursor-pointer">
                    Voir vos moyens de paiements
                </p>
                <form
                    onSubmit={newCard}
                    className="flex flex-col w-2/4 mx-auto mt-8 border rounded-xl p-2">
                    <label htmlFor="name">Titulaire de la carte</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        defaultValue={form.name}
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
                        defaultValue={form.card}
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
                        defaultValue={form.date}
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
                        defaultValue={form.cvv}
                        onChange={handleChange}
                        required
                        className="border"
                    />
                    <button
                        type="submit"
                        className="mt-5 bg-[#4FBEB7] p-2 mb-2 rounded-lg">
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
                    className="text-center my-4 cursor-pointer">
                    Créer un nouveau moyen de paiement
                </p>
                {
                    !isUpdatingCard ? (
                        <div className="flex flex-col w-1/4 mx-auto gap-8">
                            {card.length > 0 &&
                                card.map((item, index) => (
                                    <div
                                        key={index}
                                        className=" border cursor-pointer p-2 flex flex-col rounded-xl card"
                                        onClick={() => {
                                            setIsUpdatingCard({
                                                data: item,
                                                index: index,
                                            });
                                        }}>
                                        <div className="flex justify-between p-2">
                                            <img src={bar} alt="bar" className="w-[30px] h-[30px] bar"></img>
                                            <img src={cb} alt="cb" className="w-[50px] h-[50px]"></img>
                                        </div>
                                        <img src={chip} alt="chip" className="w-[70px] h-[50px] ml-4"></img>
                                        <p className="text-gray-300 font-bold ml-8 mt-2 text-3xl">{item.card.match(/.{1,4}/g).join('-')}</p>
                                        <div className="text-center flex flex-col items-center text-white">
                                            <p className="text-sm font-bold">Credit</p>
                                            <div className="flex gap-4">
                                                <div className="text-right text-sm font-bold">
                                                    <p>Expire</p>
                                                    <p>a fin</p>
                                                </div>
                                                <p className="text-xl p-2">{item.date}</p>
                                            </div>
                                        </div>
                                        <div className="flex justify-between p-2">
                                            <p className="text-gray-300 font-bold ml-6 mt-2">{item.name}</p>
                                            <img src={visa} alt="visa" className="w-[70px] h-[40px]"></img>
                                        </div>
                                    </div>
                                ))}
                        </div>
                    ) : 
                    <form
                        onSubmit={editCard}
                        className="flex flex-col w-2/4 mx-auto mt-8 border rounded-xl p-2">
                        <label htmlFor="name">Titulaire de la carte</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            onChange={handleEditChange}
                            required
                            placeholder={isUpdatingCard.data.name}
                            className="border"
                        />
                        {console.log(isUpdatingCard)}
                        <label htmlFor="card">Numéro de carte</label>
                        <input
                            type="text"
                            id="card"
                            name="card"
                            onChange={handleEditChange}
                            required
                            placeholder={isUpdatingCard.data.card}
                            className="border"
                        />
                        <label htmlFor="date">Date d'expiration</label>
                        <input
                            type="text"
                            id="date"
                            name="date"
                            onChange={handleEditChange}
                            required
                            placeholder={isUpdatingCard.data.date}
                            className="border"
                        />
                        <label htmlFor="cvv">CVV</label>
                        <input
                            type="password"
                            id="cvv"
                            name="cvv"
                            onChange={handleEditChange}
                            required
                            className="border"
                        />
                        <button
                            type="submit"
                            className="mt-5 bg-[#4FBEB7] p-2 mb-2 rounded-lg">
                            Mettre à jour la carte
                        </button>
                    </form>
                }
            </div>
        ))
    );
}
