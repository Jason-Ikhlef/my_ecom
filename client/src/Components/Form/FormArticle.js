import React from "react";
import { Link } from "react-router-dom";

export default function FormArticle(){
    return( 
        <div>
            <Link to='/articles'>Voir les articles</Link>
            <h1>Formulaire d'ajout d'article</h1>
            <form>
                <label htmlFor="title">Titre de l'article</label>
                <input type="text" id="title" name="title" placeholder="Titre de l'article"></input>
                <label htmlFor="description">Description de l'article</label>
                <input type="text" id="description" name="description" placeholder="Description de l'article"></input>
                <label htmlFor="price">Prix de l'article</label>
                <input type="number" id="price" name="price" placeholder="Prix de l'article"></input>
                <label htmlFor="caracteristics">Caractéristiques de l'article</label>
                <input type="text" id="caracteristics" name="caracteristics" placeholder="Caractéristiques de l'article"></input>
                <label htmlFor="photo">Photo de l'article</label>
                <input type="file" id="photo" name="photo" placeholder="Photo de l'article" multiple></input>
                <button type="submit">Ajouter l'article</button>
            </form>
           
        </div>
    )
}