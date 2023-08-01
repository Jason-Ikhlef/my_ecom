import React, { useState } from "react";
import User from '../../Components/Widgets/User';
import CreateArticle from "../../Components/Form/FormArticle/CreateArticle";
import UpdateArticle from "../../Components/Form/FormArticle/UpdateArticle";
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
                <button onClick={handleClick} id="create">Créer un article</button>
                {/* <button onClick={handleClick} id="update">Modifier un article</button> */}
            </div>
            {
                state === 'create' ?
                <CreateArticle />
                :
                null
            }
            {
                state === 'update' ?
                <UpdateArticle />
                :
                null
            }
        </div>
    
    )
}