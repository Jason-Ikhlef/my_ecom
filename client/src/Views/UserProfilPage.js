import React from "react";
import profilPicture from "../assets/user-line.svg";
import { Link } from "react-router-dom";
import LogOut from "../Components/Widgets/LogOut";
import axios from "axios";
import User from "../Components/Widgets/User"

export default function UserProfilPage ()
{

    const { currentUser, userLoading } = User()

    if (userLoading) {

        return <p>Loading...</p>
    }

    const deleteOnClick = async (e) => 
    {
        e.preventDefault()

        await axios
        .delete(`http://localhost:8000/deleteUser/${currentUser.id}`, { withCredentials: true })
        .then(response => {
            response.data === "success" ? console.log('success') : console.log('fail');;
        })
        .catch(err => {
            console.error(err)
        })
    }

    return (
        <div>
            <div className="border w-3/4 mx-auto mt-10 rounded-3xl">
                <div className="bg-[#C1E1C1] rounded-t-3xl relative p-8">
                    <h1 className="text-center text-3xl text-slate-400">Bonjour {currentUser.email}</h1>
                    <img src={profilPicture} alt="profilPicture" className="w-[100px] h-[100px] absolute bg-slate-400 rounded-full border-8"></img>
                </div>
                <div className="mt-2 bg-slate-400">
                    <p className="text-center">Vos informations :</p>
                    <p className="text-center">Email : {currentUser.email}  </p>
                    <p className="text-center">Role: {currentUser.admin ? 'administrateur' : 'Utilisateur'}  </p>
                </div>
            </div>
            <div className="flex">
                <p className="mt-10 w-fit mx-auto p-2 rounded-3xl bg-slate-400 cursor-pointer">
                    {/* <Link className="w-3/4 mx-auto" to={`/profil/update/${article._id}`} state={{ id : article._id}}>
                        Modifier 
                    </Link> */}
                    <Link className="w-3/4 mx-auto" to={`/profil/update`}>
                        Modifier 
                    </Link>
                </p>
                <p className="mt-10 w-fit mx-auto p-2 rounded-3xl bg-slate-400 cursor-pointer" onClick={LogOut}>
                    Se déconnecter
                </p>
                <p className="mt-10 w-fit mx-auto p-2 rounded-3xl bg-slate-400 cursor-pointer" onClick={deleteOnClick}>
                    Supprimer
                </p>
            </div>
        </div>
    )
}