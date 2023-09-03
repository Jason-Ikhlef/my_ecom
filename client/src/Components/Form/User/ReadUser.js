import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import CreateWithGoogle from "./CreateWithGoogle";
import CreateWithFacebook from "./CreateWithFacebook";

export default function ReadUser() {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleClick = async (e) => {
        e.preventDefault();
        const storage = JSON.parse(localStorage.getItem("cart")) || [];

        try {
            const response = await axios.post(
                "http://localhost:8000/login",
                { form, storage },
                { withCredentials: true }
            );

            if (response.data === "success") {
                if (storage.length > 0) localStorage.removeItem("cart");
                toast.success("Bienvenue !");
                setTimeout(() => {
                    window.location.href = "http://localhost:3000";
                }, 1500);
            } else {
                toast.error("Une erreur est survenue");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            toast.error("Une erreur est survenue lors de votre connexion");
        }
    };

    return (
        <div className="flex flex-col">
            <div className="bg-[#C1E1C1] mt-10 w-1/2 mx-auto">
                <ToastContainer />
                <h1 className="text-center bg-[#4FBEB7] p-2">Se connecter</h1>
                <div className="w-1/2 mx-auto">
                    <form onSubmit={handleClick} className="flex flex-col">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="Email"
                            className="border"
                            autoComplete="on"
                        />
                        <label htmlFor="password">Mot de passe</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            placeholder="Mot de passe"
                            className="border"
                        />
                        <button
                            type="submit"
                            className="mt-5 bg-[#4FBEB7] p-2 mb-2">
                            Se connecter
                        </button>
                    </form>
                    <div className="mt-2 pb-4">
                        <Link to="http://localhost:3000/register">
                            <p className="bg-[#4FBEB7] text-center">
                                Pas de compte ? Inscrivez-vous !
                            </p>
                        </Link>
                    </div>
                </div>
            </div>
            <p className="text-center mt-5">Ou</p>
            <hr className="w-2/4 mx-auto my-5 "></hr>
            <div>
                <CreateWithGoogle />
                <CreateWithFacebook />
            </div>
        </div>
    );
}
