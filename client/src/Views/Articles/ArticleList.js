import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Search from "../../assets/search-line.svg";
import { Dropdown } from "rsuite";
import DropdownItem from "rsuite/esm/Dropdown/DropdownItem";
import Loader from "../../Components/Widgets/Loader";

export default function SimpleSlider() {
    const [articles, setArticles] = useState(null);

    const [animals, setAnimals] = useState(null);
    const [dropdownAnimals, setDropdownAnimals] = useState("Animaux");

    const [form, setForm] = useState({
        animals: "",
        search: "",
    });

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                let response = await axios.get(
                    "http://localhost:8000/articles"
                );
                setArticles(response.data);
                response = await axios.get("http://localhost:8000/categories");
                setAnimals(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchArticles();
    }, []);

    if (!articles) {
        return <Loader />;
    }

    async function searchArticle(e) {
        console.log(form);
        e.preventDefault();
        await axios
            .post(`http://localhost:8000/article/search`, form, {
                withCredentials: true,
            })
            .then((response) => {
                setArticles(response.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }

    const handleAnimals = (animal) => {
        if (animal === "Aucun") {
            setDropdownAnimals("Aucun");
            setForm((prevForm) => ({
                ...prevForm,
                animals: "",
            }));
        } else {
            setDropdownAnimals(animal.name);
            setForm((prevForm) => ({
                ...prevForm,
                animals: animal.name,
            }));
        }
    };

    const handleChange = (e) => {
        setForm((prevForm) => ({
            ...prevForm,
            search: e.target.value,
        }));
    };

    if (!animals) {
        return <Loader />;
    }

    return (
        <div className="scroll">
            <div className="wrap">
                <form
                    onSubmit={searchArticle}
                    className="search border w-1/3 mx-auto my-5 flex justify-between relative">
                    <div className="my-auto">
                        <Dropdown title={dropdownAnimals}>
                            <DropdownItem
                                onSelect={() => handleAnimals("Aucun")}>
                                Aucun
                            </DropdownItem>
                            {animals.map((animal) => (
                                <DropdownItem
                                    key={animal._id}
                                    onSelect={() => handleAnimals(animal)}>
                                    {animal.name}
                                </DropdownItem>
                            ))}
                        </Dropdown>
                    </div>
                    <input
                        type="text"
                        onChange={handleChange}
                        className="searchTerm w-full p-2"
                        placeholder="Que cherchez vous ?"
                    />
                    <button
                        type="submit"
                        className="searchButton absolute right-0 mr-2 p-2">
                        <img
                            src={Search}
                            alt="search icon"
                            className="w-[20px] h-[20px]"
                        />
                    </button>
                </form>
            </div>
            <div className="flex w-full lg:w-3/4 mx-auto justify-center flex-wrap gap-8 rounded-xl">
                {articles.map((article) => (
                    <div
                        key={article._id}
                        className={
                            "w-3/4 lg:w-1/6 border rounded-xl " +
                            (article.stock === 0 ? "opacity-50" : "")
                        }>
                        <Link
                            className="w-3/4 mx-auto relative"
                            to={`/articles/${article._id}`}
                            state={{ id: article._id }}>
                            <p className="text-center text-white mb-6 p-2 bg-[#4FBEB7] rounded-t-xl h-16 flex justify-center items-center">
                                {article.title}
                            </p>
                            {
                                article.reduction > 0 ? 
                                <p className=" absolute left-0 z-10 ml-2 bg-green-500 font-bold text-white text-xl h-fit my-auto rounded-lg px-2">-{article.reduction}%</p>
                                :
                                null
                            }
                            {article.stock === 0 ? (
                                <div className="bg-red-600 text-white w-[12.45%] mt-[-24px] flex justify-center items-center text-center relative">
                                    <h1
                                        id="outOfStock"
                                        className="text-lg font-bold">
                                        Rupture de stock
                                    </h1>
                                </div>
                            ) : (
                                null
                            )}
                            <img
                                src={`http://localhost:8000/storage/${article.pictures[0]}`}
                                className="w-[200px] h-[200px] mx-auto"
                                alt="article img"></img>                            
                            <p className="text-center my-6 h-16">
                                {article.description}
                            </p>
                            <div className="text-center">
                                <p>{article.price} €</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}