import React from "react";
import { Link } from "react-router-dom";

export default function Navbar ()
{
    return (
        <div className="flex bg-slate-400 p-2">
            <div className="flex justify-evenly w-3/4 gap-8">
                <p>Chien</p>
                <p>Druide</p>
                <p>Chat</p>
                <Link to='/form'>Ajouter un article</Link>
            </div>

        </div>
    )
}