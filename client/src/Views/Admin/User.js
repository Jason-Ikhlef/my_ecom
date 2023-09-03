import React from "react";
import User from '../../Components/Widgets/User';
import Loader from "../../Components/Widgets/Loader";

export default function AdminUser ()
{
    const { currentUser, userLoading } = User()

    if (userLoading) {

        return <Loader />
    }

    if(!currentUser || currentUser.admin === false)
    {
        window.location.href = 'http://localhost:3000'
    }

    return (
        <div>
            <h1>Bienvenue monsieur l'admin :)</h1>
        </div>
    )
}