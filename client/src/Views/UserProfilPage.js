import React, { useState } from "react";
import profilPicture from "../assets/user-line.svg";
import { Link } from "react-router-dom";
import LogOut from "../Components/Widgets/LogOut";
import axios from "axios";
import User from "../Components/Widgets/User"
import ReadUser from "../Components/Form/User/ReadUser";
import UpdateUser from "../Components/Form/User/UpdateUser";

export default function UserProfilPage ()
{

    const { currentUser, userLoading } = User()
    const [update, setUpdate] = useState(false)

    if (userLoading) {

        return <p>Loading...</p>
    
    }

    const deleteOnClick = async (e) => 
    {
        e.preventDefault()

        await axios
        .delete(`http://localhost:8000/deleteUser/${currentUser.id}`, { withCredentials: true })
        .then(response => {
            response.data === "success" ? console.log('success') : console.log('fail');
            window.location.href = 'http://localhost:3000';
        })
        .catch(err => {
            console.error(err)
        })
    }

    return (
        <div>
            {
            currentUser
            ?
            <div>
                <div className="border w-3/4 mx-auto mt-10 rounded-3xl">
                    <div className="bg-[#C1E1C1] rounded-t-3xl relative p-8">
                        <h1 className="text-center text-3xl text-slate-400">Bonjour {currentUser.email}</h1>
                        <img src={profilPicture} alt="profilPicture" className="w-[100px] h-[100px] absolute bg-[#4FBEB7] rounded-full border-8"></img>
                    </div>
                    <div className="mt-2 bg-[#4FBEB7]">
                        <p className="text-center">Vos informations :</p>
                        <p className="text-center">Email : {currentUser.email}  </p>
                        <p className="text-center">Role: {currentUser.admin ? 'administrateur' : 'Utilisateur'}  </p>
                    </div>
                </div>
                <div className="flex">
                    <p className="mt-10 w-fit mx-auto p-2 rounded-3xl bg-[#4FBEB7] cursor-pointer" onClick={(e) => {setUpdate(true)}}>
                        Modifier
                    </p>
                    <p className="mt-10 w-fit mx-auto p-2 rounded-3xl bg-[#4FBEB7] cursor-pointer" onClick={LogOut}>
                        Se déconnecter
                    </p>
                    <p className="mt-10 w-fit mx-auto p-2 rounded-3xl bg-[#4FBEB7] cursor-pointer" onClick={deleteOnClick}>
                        Supprimer
                    </p>
                </div>
                {
                    update ? 
                    <UpdateUser /> : 
                    null
                }
            </div>
            :
            <ReadUser />
        }
        </div>
    )
}