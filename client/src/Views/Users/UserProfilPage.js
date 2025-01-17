import React, { useEffect, useState } from "react";
import profilPicture from "../../assets/user-line.svg";
import { Link } from "react-router-dom";
import LogOut from "../../Components/Widgets/LogOut";
import axios from "axios";
import User from "../../Components/Widgets/User";
import ReadUser from "../../Components/Form/User/ReadUser";
import UpdateUser from "../../Components/Form/User/UpdateUser";
import Loader from "../../Components/Widgets/Loader";

export default function UserProfilPage ()
{

    const { currentUser, userLoading } = User()
    const [update, setUpdate] = useState(false)
    const [isAddingAddress, setIsAddingAddress] = useState(false)

    if (userLoading) {

        return <Loader />
    
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
                        <h1 className="text-center text-3xl text-slate-400">Bonjour {currentUser.email.split('@')[0]}</h1>
                        <img src={profilPicture} alt="profilPicture" className="w-[100px] h-[100px] absolute bg-[#4FBEB7] rounded-full border-8"></img>
                    </div>
                    <div className="mt-2 bg-[#4FBEB7]">
                        <p className="text-center">Vos informations :</p>
                        <p className="text-center">Email : {currentUser.email}  </p>
                        <p className="text-center">Role: {currentUser.admin ? 'Administrateur' : 'Utilisateur'}  </p>
                        {
                            currentUser.subscribe && currentUser.subscribe.month ?
                            <p className="text-center">Abonnement : Mensuel</p> : null
                        }
                        {
                            currentUser.subscribe && currentUser.subscribe.year ?
                            <p className="text-center">Abonnement : Annuel</p> : null
                        }
                    </div>
                </div>
                {
                    !update ? 
                    <div className="flex flex-col w-1/2 mx-auto gap-6">
                        <p className="mt-8 w-1/4 text-center mx-auto p-2 rounded-3xl bg-[#C1E1C1] cursor-pointer" onClick={(e) => {setUpdate(true)}}>
                            Modifier
                        </p>
                        <Link to="/history" className="w-1/4 text-center mx-auto p-2 rounded-3xl bg-[#C1E1C1] cursor-pointer">
                            Voir Historique
                        </Link>
                        <Link to="/addresses" className="w-1/4 text-center mx-auto p-2 rounded-3xl bg-[#C1E1C1] cursor-pointer">
                            Adresses
                        </Link>
                        <Link to="/payments" className="w-1/4 text-center mx-auto p-2 rounded-3xl bg-[#C1E1C1] cursor-pointer">
                            Moyens de paiement
                        </Link>
                        <p className="w-1/4 text-center mx-auto p-2 rounded-3xl bg-[#C1E1C1] cursor-pointer" onClick={LogOut}>
                            Se déconnecter
                        </p>
                        <p className="w-1/4 text-center mx-auto p-2 rounded-3xl bg-[#4FBEB7] cursor-pointer" onClick={deleteOnClick}>
                            Supprimer
                        </p>       
                    </div> : null
                }
                {
                    !currentUser.subscribe.month && !currentUser.subscribe.year ? (
                    <div>
                        <p className="mt-10 w-fit mx-auto p-2 rounded-3xl bg-[#4FBEB7] cursor-pointer">
                            <Link to="http://localhost:3000/SubPage">S'abonner</Link> 
                        </p>
                    </div>
                    ) : ( null )
                }
                
                {
                    update ? 
                    <div>
                        <p className="text-xl mx-auto mt-6 cursor-pointer w-fit bg-[#C1E1C1] p-2 rounded-xl" onClick={() => {setUpdate(null)}}>Annuler</p>
                        <UpdateUser />  
                    </div> :
                    null
                }
            </div>
            :
            <ReadUser />
            }
        </div>
    )
}