import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/LogoImage.png";
import Dog from "../../assets/Dog.png";
import Cat from "../../assets/Cat.png";
import Rodent from "../../assets/Rodent.png";
import Birds from "../../assets/Bird.png";
import Fish from "../../assets/Fish.png";
import Terra from "../../assets/Salamander.png";
import profilPicture from "../../assets/user-line.svg";
import Cart from "../../assets/Cart.png";

export default function Navbar() {
    return (
        <div className="flex bg-[#C1E1C1] p-2 justify-evenly items-center gap-8">
            <div className="flex items-center justify-between w-[200px]">
                <img src={Logo} alt="PetHeaven logo" className="bg-[#4FBEB7]" />
                <p className="text-xl font-semibold">PetHeaven</p>
            </div>
            <div className="navbar_categories flex w-1/2 justify-between items-center">
                <div className="flex items-center">
                    <img src={Dog} alt="Chien" />
                    <p className="text-xl">Chien</p>
                </div>
                <div className="flex items-center">
                    <img src={Cat} alt="Chat" />
                    <p className="text-xl">Chat</p>
                </div>
                <div className="flex items-center">
                    <img src={Rodent} alt="Rongeur" />
                    <p className="text-xl">Rongeur</p>
                </div>
                <div className="flex items-center">
                    <img src={Birds} alt="Oiseau" />
                    <p className="text-xl">Oiseau</p>
                </div>
                <div className="flex items-center">
                    <img src={Fish} alt="Aqua" />
                    <p className="text-xl">Aqua</p>
                </div>
                <div className="flex items-center">
                    <img src={Terra} alt="Terra" />
                    <p className="text-xl">Terra</p>
                </div>
            </div>
            <Link to="/createArticle">Ajouter un article</Link>
            <Link to='/createCategory'>Créer une catégorie</Link>
            <div className="navbar_login flex items-center justify-center w-[9%] bg-[#4FBEB7] rounded-lg h-10">
                <img src={profilPicture} alt="Profil" className="w-8" />
                <Link to="/login" className="text-xl">
                    Se connecter
                </Link>
            </div>
            <Link to="/register">Créer un compte</Link>
            <div className="navbar_profil flex items-center justify-center p-2 bg-[#4FBEB7] rounded-lg h-10 mr-[-50px]">
                <img src={profilPicture} alt="Profil" className="w-8" />
                <Link to="/profil" className="text-xl">
                    Profil
                </Link>
            </div>
            {/* <div className="bg-[#4FBEB7] rounded-lg h-10 p-2 ml-[-50px] w-14 flex justify-center items-center">
                <img src={Cart} alt="Panier" className="w-7" />
            </div> */}
        </div>
    );
}
