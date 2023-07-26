import React, {
    useEffect,
    useState
} from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function ArticleSeeMore ()
{
    
    const [id, setId] = useState('');
    const [article, setArticle] = useState(null);

    const location = useLocation()

    useEffect(() => {

        location.state === null ? setId(window.location.href.split('/')[4]) : setId(location.state.id);

    },[location])

    const deleteOnClick = async (e) => 
    {
        try {
            const response = await axios.delete(`http://localhost:8000/DeleteArticle/${id}`);
            if (response.data.message === "success") {
                toast.success("Article supprimé !");
            } else {
                toast.error("Une erreur est survenue");
            }
        } catch (error) {
            console.log(error);
            toast.error("Une erreur est survenue");
        }
    }

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/article/${id}`);
                setArticle(response.data)
            } catch (error) {
                console.error(error);
            }
        };

        fetchArticle();
    }, [id]);

    console.log(article);

    if (!article) {
        return <p>Chargement de l'article...</p>;
    }

    return (
        <div className="bg-red-200 w-3/4 mx-auto mt-10 content_border">
            <p className="text-center text-white mb-6 p-2 bg-slate-400">{article.title}</p>
            <img src={`http://localhost:8000/storage/${article.pictures[0]}`} className="w-fit mx-auto" alt="article img"></img> 
            <p className="text-center my-10">{article.description}</p>
            <div className="flex justify-around pb-5">
                <p>{article.price} €</p>
                <p>{article.caracteristique}</p>
            </div>

            <p className="mt-10 w-fit mx-auto p-2 rounded-3xl bg-slate-400">
                <Link className="w-3/4 mx-auto" to={`/articles/update/${article._id}`} state={{ id : article._id}}>
                    Modifier 
                </Link>
            </p>
            <p className="mt-10 w-fit mx-auto p-2 rounded-3xl bg-slate-400" onClick={deleteOnClick}>
                Supprimer
            </p>
      </div>
    )

}