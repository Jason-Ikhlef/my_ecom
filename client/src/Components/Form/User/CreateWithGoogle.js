import React, { useEffect, useState } from "react";
import axios from "axios";
import GoogleLogo from "../../../assets/google-line.svg";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CreateWithGoogle() {
    const [user, setUser] = useState([]);
    const [profile, setProfile] = useState(null);
    const login = useGoogleLogin({
        onSuccess: (res) => setUser(res),
        onError: (err) => console.log(err),
    });

    useEffect(() => {
        if (user.access_token) {
            console.log("google");
            axios
                .get(
                    `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
                    {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: "application/json",
                        },
                    }
                )
                .then((res) => {
                    setProfile(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [user]);

    async function SendToDatabase() {

        const storage = JSON.parse(localStorage.getItem('cart')) || []
        await axios
            .post("http://localhost:8000/createGoogle", { storage, profile } , {
                withCredentials: true,
            })
            .then((res) => {
                if (storage.length > 0) localStorage.removeItem("cart")
                toast.success("Bienvenue !");
                setTimeout(() => {
                    window.location.href = "http://localhost:3000";
                }, 1500);
            })
            .catch((err) => console.log(err));
    }

    useEffect(() => {
        if (profile) {
            SendToDatabase();
        }
    }, [profile]);

    return (
        <div
            className="w-1/6 mx-auto mt-5 flex bg-gray-300 cursor-pointer px-4 py-2 rounded-3xl gap-8"
            onClick={() => login()}>
            <img
                src={GoogleLogo}
                className="w-[30px] h-[30px]"
                alt="google logo"></img>
            <button>Se connecter avec Google</button>
        </div>
    );
}
