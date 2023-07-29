import React, {
    useEffect,
    useState
} from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import checked from "../assets/checked.svg"

export default function ArticleSeeMore ()
{
    
    const [id, setId] = useState('');
    const [article, setArticle] = useState(null);
    const [img, setImg] = useState('');

    const location = useLocation()

    useEffect(() => {

        location.state === null ? setId(window.location.href.split('/')[4]) : setId(location.state.id);

    },[location])

    const deleteOnClick = async (e) => 
    {
        try {
            const response = await axios.delete(`http://localhost:8000/DeleteArticle/${id}`);
            if (response.data === "success") {
                toast.success("Article supprimé !");
                setTimeout(() => {
                    window.location.href = 'http://localhost:3000/articles'
                }, 1500);
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
                setImg(response.data.pictures[0])
                console.log(response.data.pictures.length);
            } catch (error) {
                console.error(error);
            }
        };

        fetchArticle();
    }, [id]);

    

    if (!article) {
        
        return <p>Chargement des articles</p>;
    }

    return (
    <div className="flex flex-col lg:flex-row w-3/4 mx-auto justify-evenly mt-10">
        <div className="flex flex-col w-full lg:w-2/5">
            <div className="bg-[#C1E1C1] border rounded-xl">
                <ToastContainer />
                <p className="text-center text-white mb-6 p-2 bg-[#4FBEB7] rounded-t-xl">{article.title}</p>
                <img src={`http://localhost:8000/storage/${img}`} className="w-[200px] mx-auto" alt="article img"></img> 
                <p className="text-center my-10">{article.description}</p>
                <div className="flex justify-around pb-5">
                    <p>Stock : {article.stock}</p>
                    <p>{article.price} €</p>
                    <p>{article.caracteristique}</p>
                </div>
                <div className="flex pb-5">
                    <p className="mt-10 w-fit mx-auto p-2 rounded-3xl bg-[#4FBEB7]">
                        <Link className="w-3/4 mx-auto" to={`/articles/update/${article._id}`} state={{ id : article._id}}>
                            Modifier 
                        </Link>
                    </p>
                    <p className="mt-10 w-fit mx-auto p-2 rounded-3xl bg-[#4FBEB7] cursor-pointer" onClick={deleteOnClick}>
                        Supprimer
                    </p>
                </div>
            </div>
            {
                article.pictures.length > 1
                ?
                <div className="flex p-4 justify-evenly">
                {article.pictures.map((img) => (
                    <div key={img} className="p-2 border cursor-pointer">
                        <img src={`http://localhost:8000/storage/${img}`} className="w-[50px] h-auto" onClick={(e) => {setImg(e.target.src.split('/')[4])}}></img>
                    </div>
                )
                )}
                </div>
                :
                null
            }
        </div>
        <div className="border rounded-xl w-full lg:w-2/5 ">
            <p className="p-2 ml-5">Livraison</p>
            <p className="p-2 ml-5">{article.price} €</p>
            <hr className="mx-5"></hr>
            <div className="flex my-4 justify-evenly w-full mx-auto">
                <input type="number" id="nbArticles" name="nbArticles" value='1' className="w-1/3 p-2 rounded-xl"
                max="100"></input>
                <button className="bg-[#4FBEB7] w-1/3 p-2 rounded-xl">Commander</button>
            </div>
            <hr className="mx-5"></hr>
            <div className="flex flex-col gap-4">
                <div className="flex my-4 ml-5 gap-8 w-full mx-auto">
                    <img src={checked} className="w-[20px] h-auto"></img>
                    <p>Livraison à domicile en Belgique (gratuit) et en France</p>
                </div>
                <div className="flex my-4 ml-5 gap-8 w-full mx-auto">
                    <img src={checked} className="w-[20px] h-auto"></img>
                    <p>Délai court</p>
                </div>
                <div className="flex my-4 ml-5 gap-8 w-full mx-auto">
                    <img src={checked} className="w-[20px] h-auto"></img>
                    <p>2 ans de garantie d’usine</p>
                </div>
                <div className="flex my-4 ml-5 gap-8 w-full mx-auto">
                    <img src={checked} className="w-[20px] h-auto"></img>
                    <p>Besoin de conseils ? Visitez notre jardinerie à Mouscron</p>
                </div>
            </div>
        </div>
    </div>
    )

}