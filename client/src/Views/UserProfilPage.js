import React from "react";
import profilPicture from "../assets/user-line.svg";
import { Link } from "react-router-dom";
import LogOut from "../Components/LogOut";

export default function UserProfilPage ()
{

    const deleteOnClick = async (e) => 
    {
        console.log('Supprimer');
    }

    return (
        <div>
            <div className="border w-3/4 mx-auto mt-10 rounded-3xl">
                <div className="bg-[#C1E1C1] rounded-t-3xl relative p-8">
                    <h1 className="text-center text-3xl text-slate-400">Bonjour [nom de l'utilisateur]</h1>
                    <img src={profilPicture} alt="profilPicture" className="w-[100px] h-[100px] absolute bg-slate-400 rounded-full border-8"></img>
                </div>
                <div className="mt-2 bg-slate-400">
                    <p className="text-center">Vos informations :</p>
                    <p className="text-center">Nom :</p>
                    <p className="text-center">Prénom :</p>
                    <p className="text-center">Email :</p>
                    <p className="text-center">Vos informations :</p>
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
                    DECO
                </p>
                <p className="mt-10 w-fit mx-auto p-2 rounded-3xl bg-slate-400 cursor-pointer" onClick={deleteOnClick}>
                    Supprimer
                </p>
            </div>
        </div>
    )
}