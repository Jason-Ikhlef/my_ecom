import React, {useState} from "react";
import { Link } from "react-router-dom";

export default function Navbar ()
{

    return (
        <div className="flex bg-slate-400 p-2 justify-evenly gap-8">
            <p>Chien</p>
            <p>Druide</p>
            <p>Chat</p>
            <Link to='/createArticle'>Ajouter un article</Link>
            <Link to='/login'>Se connecter</Link>
            <Link to='/register'>Créer un compte</Link>
        </div>
    )
}