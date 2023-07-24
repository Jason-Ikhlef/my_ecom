import React, {useEffect, useState} from "react";
import { useLocation} from "react-router-dom";
import img from '../assets/garden-path-ge6d499b25_640.jpg';

export default function Article_seemore ()
{
    
    const [id, setId] = useState('');

    const location = useLocation()

    useEffect(() => {
        location.state === null ? setId(window.location.href.split('/')[4]) : setId(location.state.id);

    },[location])

    return (
        <div className="bg-red-200 w-3/4 mx-auto mt-10 content_border">
            <p className="text-center text-white mb-6 p-2 bg-slate-400">Titre de l'article numéro : {id}</p>
            <img src={img} className="w-fit mx-auto" alt="article img"></img> 
            <p className="text-center my-10">Description de l'article</p>
            <div className="flex justify-around pb-5">
                <p>Prix de l'article</p>
                <p>Caractéristiques de l'article</p>
            </div>
      </div>
    )

}