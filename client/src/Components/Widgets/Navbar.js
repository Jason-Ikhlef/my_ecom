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
import User from "../Widgets/User";
import { Dropdown } from "rsuite";
import DropdownItem from "rsuite/esm/Dropdown/DropdownItem";

export default function Navbar() {

    const { currentUser, userLoading } = User();

    const options = [
        'Gérer les articles',
        'Gérer les utilisateurs'
    ];
    
    const defaultOption = options[0];

    if (userLoading) {

        return <p>Loading...</p>

    }


    return (
        <div className="flex bg-[#C1E1C1] p-2 justify-evenly items-center gap-8">
            <div className="flex items-center justify-between w-[200px]">
                <Link to='http://localhost:3000'>
                    <img src={Logo} alt="PetHeaven logo" className="bg-[#4FBEB7]" />
                    <p className="text-xl font-semibold">PetHeaven</p>
                </Link>
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
                {
                currentUser ? (
                    <div className="flex items-center justify-center gap-8  h-10 mr-[-50px]">
                        <Link to="/profil" className="text-xl flex bg-[#4FBEB7] p-2 rounded-lg">
                            <img src={profilPicture} alt="Profil" className="w-8" />
                            Profil
                        </Link>
                        <div>
                            {currentUser.admin
                            ?
                            <div>
                                <Dropdown title='Gestion admin'>
                                    <DropdownItem as='a' href="http://localhost:3000/admin/articles">
                                        Gestion des articles
                                    </DropdownItem>
                                    <DropdownItem as='a' href="http://localhost:3000/admin/users">
                                        Gestion des utilisateurs
                                    </DropdownItem>
                                </Dropdown>
                            </div>
                            :
                            null
                            }
                        </div>
                    </div>
                    
                ) : (
                    <div className="flex flex-col items-center">
                        <div className="bg-[#4FBEB7] rounded-xl px-2">
                            <Link to="/login" className="flex py-2">
                                <img src={profilPicture} alt="Profil" className="w-8" />
                                Se connecter
                            </Link>
                        </div>
                    </div>
                )
                }
                
            {/* <div className="bg-[#4FBEB7] rounded-lg h-10 p-2 ml-[-50px] w-14 flex justify-center items-center">
                <img src={Cart} alt="Panier" className="w-7" />
            </div> */}
        </div>
    );
}
