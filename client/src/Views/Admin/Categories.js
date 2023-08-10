import React, { useState } from "react";
import User from '../../Components/Widgets/User';
import CreateCategory from "../../Components/Form/Category/CreateCategory";
import DeleteCategory from "../../Components/Form/Category/DeleteCategory";
import Loader from "../../Components/Widgets/Loader";

export default function AdminCategories ()
{
    const { currentUser, userLoading } = User()
    const [state, setState] = useState('');

    const handleClick = (e) => 
    {
        if(e.target.id === 'create')
        {
            setState("create");
        }
        else if (e.target.id === 'update')
        {
            setState("update");
        }
        else if (e.target.id === 'delete')
        {
            setState("delete");
        }
    }


    if (userLoading) {

        return <Loader />
    }

    if(!currentUser || currentUser.admin === false)
    {
        window.location.href = 'http://localhost:3000'
    }

    return (

        <div>
            <div className="flex w-3/4 mx-auto justify-center gap-8 mt-8">
                <button onClick={handleClick} id="create">Créer une catégorie</button>
                <button onClick={handleClick} id="update">Modifier une catégorie</button>
                <button onClick={handleClick} id="delete">Supprimer une catégorie</button>
            </div>
            {
                state === 'create' ?
                <CreateCategory />
                :
                null
            }
            {
                state === 'update' ?
                <CreateCategory />
                :
                null
            }
            {
                state === 'delete' ?
                <DeleteCategory />
                :
                null
            }
        </div>
    
    )
}