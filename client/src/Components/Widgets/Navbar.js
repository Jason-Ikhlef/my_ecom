import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Logo from "../../assets/LogoImage.png";
import profilPicture from "../../assets/user-line.svg";
import cart from "../../assets/Cart.png";
import User from "../Widgets/User";
import { Dropdown } from "rsuite";
import DropdownItem from "rsuite/esm/Dropdown/DropdownItem";
import Loader from "./Loader";
import CartDropDown from "../User/CartDropdown";

export default function Navbar() {

    const { currentUser, userLoading } = User();
    const [categories, setCategories] = useState(null);

    useEffect(() => {
        const fetchAnimals = async () => {
            try {
                const response = await axios.get('http://localhost:8000/categories');
                setCategories(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchAnimals();
    }, []);

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
                {categories ? (
                    categories.map((category, indexOne) => (
                        <Dropdown key={indexOne} className="flex items-center" title={category.name} trigger="hover">
                            {category.categories.map((subcategory, indexTwo) => (
                                <Dropdown key={indexTwo} title={subcategory.name} trigger="hover">
                                    {subcategory.subCategories.map((subsubcategory, indexThree) => (
                                        <DropdownItem key={indexThree} className="text-black">
                                            {subsubcategory.name}
                                        </DropdownItem>
                                    ))}
                                </Dropdown>
                            ))}
                        </Dropdown>
                    ))
                ) : (
                    <Loader />
                )}
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
                            <DropdownItem as='a' href="http://localhost:3000/admin/categories">
                                Gestion des categories
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
            {
                currentUser ? 
                <div className="bg-[#4FBEB7] rounded-lg h-10 p-2 ml-[-50px] w-14 flex justify-center items-center relative">
                    <Dropdown trigger="hover" placement="bottomEnd" icon={<img src={cart} alt="Panier" />}>
                        <DropdownItem>
                            <CartDropDown />
                        </DropdownItem>
                    </Dropdown>
                </div> : null 
            }
        </div>
    );
}


// Commander
// Onglet View Historique