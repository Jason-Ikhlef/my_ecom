import React from "react";
import User from '../../Components/Widgets/User';
import CreateCategory from "../../Components/Form/Category/CreateCategory";

export default function AdminCategories ()
{
    const { currentUser, userLoading } = User()

    if (userLoading) {

        return <p>Loading...</p>
    }

    if(!currentUser || currentUser.admin === false)
    {
        window.location.href = 'http://localhost:3000'
    }

    return (

        <div>
            <CreateCategory />
        </div>
    
    )
}