import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/LogoImage.png";
import profilPicture from "../../assets/user-line.svg";
import User from "../Widgets/User";
import { Dropdown } from "rsuite";
import DropdownItem from "rsuite/esm/Dropdown/DropdownItem";
import Loader from "./Loader";
import CartDropDown from "../User/CartDropdown";

export default function Navbar() {
  const { currentUser, userLoading } = User();
  const [categories, setCategories] = useState();
  const location = useLocation();

  useEffect(() => {
    const fetchAnimals = async () => {
      try {
        const response = await axios.get("http://localhost:8000/categories");
        setCategories(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAnimals();
  }, []);

  const handleClick = async (e) => {
    e.preventDefault();
    axios
      .get(`http://localhost:8000/get_csv`, { responseType: "blob" })
      .then((res) => {
        const blobUrl = URL.createObjectURL(res.data);
        const link = document.createElement("a");
        link.href = blobUrl;

        let date = new Date()
        date = date.toLocaleDateString("fr").replaceAll("/", "-");
  
        link.download = `general_user_${date}.csv`;
  
        link.click();
  
        URL.revokeObjectURL(blobUrl);
      })
      .catch((err) => console.error(err));
  };

  if (userLoading) {
    return <Loader />;
  }

  const isOnCartPage = location.pathname === "/cart";

  return (
    <div className="sticky z-40 w-full top-0 flex bg-[#C1E1C1] p-2 justify-evenly items-center gap-8">
      <div className="flex items-center justify-between w-[200px]">
        <Link to="http://localhost:3000">
          <img src={Logo} alt="PetHeaven logo" className="bg-[#4FBEB7]" />
          <p className="text-xl font-semibold">PetHeaven</p>
        </Link>
      </div>
      <div className="navbar_categories flex w-1/2 justify-between items-center">
        {categories ? (
          categories.map((category, indexOne) => (
            <Dropdown
              key={indexOne}
              className="flex items-center"
              title={category.name}
              trigger="hover"
            >
              {category.categories.map((subcategory, indexTwo) => (
                <Dropdown
                  key={indexTwo}
                  title={subcategory.name}
                  trigger="hover"
                >
                  {subcategory.subCategories.map(
                    (subsubcategory, indexThree) => (
                      <DropdownItem key={indexThree} className="text-black">
                        {subsubcategory.name}
                      </DropdownItem>
                    )
                  )}
                </Dropdown>
              ))}
            </Dropdown>
          ))
        ) : (
          <Loader />
        )}
      </div>
      {!isOnCartPage ? (
        <div className="bg-[#4FBEB7] rounded-lg h-9 p-2 mr-[-100px] w-13 flex justify-center items-center relative cartImg">
          <Dropdown trigger="hover" placement="bottomEnd">
            <DropdownItem>
              <CartDropDown />
            </DropdownItem>
          </Dropdown>
        </div>
      ) : null}
      {currentUser ? (
        <div className="flex items-center justify-center gap-8 mr-[-50px]">
          <Link
            to="/profil"
            className="text-sm flex bg-[#4FBEB7] p-2 rounded-lg"
          >
            <img src={profilPicture} alt="Profil" className="w-5" />
            Profil
          </Link>
          <div>
            {currentUser.admin ? (
              <div>
                <Dropdown title="Gestion admin">
                  <DropdownItem
                    as="a"
                    href="http://localhost:3000/admin/articles"
                  >
                    Gestion des articles
                  </DropdownItem>
                  <DropdownItem
                    as="a"
                    href="http://localhost:3000/admin/categories"
                  >
                    Gestion des categories
                  </DropdownItem>
                  <DropdownItem as="a" href="http://localhost:3000/admin/users">
                    Gestion des utilisateurs
                  </DropdownItem>
                  <DropdownItem as="bouton" onClick={handleClick}>
                    Exporter les données
                  </DropdownItem>
                </Dropdown>
              </div>
            ) : null}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <div className="bg-[#4FBEB7] rounded-xl px-2">
            <Link
              to="/login"
              className="text-sm flex bg-[#4FBEB7] py-2 rounded-lg"
            >
              <img src={profilPicture} alt="Profil" className="w-5" />
              Se connecter
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
