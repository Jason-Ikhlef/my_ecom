import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import User from "../../Widgets/User";
import Loader from "../../Widgets/Loader";

export default function UpdateUser() {
    const [form, setForm] = useState({
        email: "",
        password: "",
        admin: false,
    });

    const { currentUser, userLoading } = User();

    if (userLoading) {
        return <Loader />;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleClick = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(
                `http://localhost:8000/updateUser/${currentUser.id}`,
                { data: form, id: currentUser.id }
            );

            if (response.data === "success") {
                toast.success("Vos informations ont bien été modifiés");
                setTimeout(() => {
                    window.location.href = "http://localhost:3000/profil";
                }, 1500);
            } else {
                toast.error("Une erreur est survenue");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            toast.error(
                "Une erreur est survenue lors de la modification de vos données"
            );
        }

        console.log(form);
    };

    return currentUser ? (
        <div>
            <ToastContainer />
            <h1 className="text-center my-5">Modifier vos informations</h1>
            <div className="w-1/2 mx-auto">
                <form
                    onSubmit={handleClick}
                    className="flex flex-col border rounded-xl p-2">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="Email"
                        className="border"
                    />
                    <label htmlFor="password">Mot de passe</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        placeholder="Mot de passe"
                        className="border"
                    />
                    <button
                        type="submit"
                        className="mt-5 bg-[#4FBEB7] p-2 mb-2 rounded-lg">
                        Modifier
                    </button>
                </form>
            </div>
        </div>
    ) : (
        <p>PAS CO TOI BOUGE BOUGE</p>
    );
}
