import React, { useState, useEffect } from "react";
import User from '../../Components/Widgets/User';
import CreateArticle from "../../Components/Form/FormArticle/CreateArticle";
import UpdateArticle from "../../Components/Form/FormArticle/UpdateArticle";
import Loader from "../../Components/Widgets/Loader";
import axios from "axios";

export default function AdminCategories ()
{
    const { currentUser, userLoading } = User()
    const [state, setState] = useState('');
    const [articles, setArticles] = useState([])
    const [isEditing, setIsEditing] = useState(false)
    const [isCreating, setIsCreating] = useState(false)

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await axios.get('http://localhost:8000/articles');
                setArticles(response.data)
            } catch (error) {
                console.error(error);
            }
        };
        fetchArticle();
    }, []);

    const handleClick = (e) => 
    {
        if(e.target.name === 'create')
        {
            setState("create");
            setIsEditing()
        }
        else if (e.target.name === 'update')
        {
            setIsEditing(e.target.value);
            setState("update");
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
            <div className="flex w-3/4 justify-center mx-auto mt-8">
                <button onClick={handleClick} name="create" className="mb-4">Créer un article</button>
            </div>
            {
                state === 'create' ?
                <div className="mb-5">
                    <CreateArticle />
                </div>
                :
                <div className="flex flex-col w-3/4 mx-auto gap-8">
                {
                    // !isEditing ?
                    // articles.map((article) => (
                    //     <div className="flex bg-[#4FBEB7] p-2 justify-between rounded-3xl">
                    //         <div className="flex gap-8">
                    //             <p>{article.title}</p>
                    //             <p>{article.state ? 'En stock' : 'Victime de son succès'}</p>
                    //         </div>
                    //         <button onClick={handleClick} name="update" value={article._id} >Modifier l'article</button>
                    //     </div>
                    // )) : 
                    <UpdateArticle idArticle={isEditing}/> 
                    }
                </div>  
            }
        </div>
    )
}