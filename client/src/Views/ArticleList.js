import React from "react";
import img from '../assets/garden-path-ge6d499b25_640.jpg';
import { Link } from "react-router-dom";

// Modifier le to par : /articles/ID
// Mettre la map juste au dessus de la div avec content_border

export default function SimpleSlider() {
    return (
      <div className="bg-red-200 w-3/4 mx-auto mt-10 content_border">
        <Link className="w-3/4 mx-auto" to='/articles/1' state={{ id : '1'}}>
          <p className="text-center text-white mb-6 p-2 bg-slate-400">Titre de l'article</p>
          <img src={img} className="w-fit mx-auto" alt="article img"></img> 
          <p className="text-center my-10">Description de l'article</p>
          <div className="flex justify-around pb-5">
            <p>Prix de l'article</p>
            <p>Caractéristiques de l'article</p>
          </div>
        </Link>
      </div>
    );
  }
  