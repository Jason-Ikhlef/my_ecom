import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import checked from "../../assets/checked.svg";
import User from "../../Components/Widgets/User";
import Loader from "../../Components/Widgets/Loader";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

export default function ArticleSeeMore() {
    const [id, setId] = useState("");
    const [article, setArticle] = useState(null);
    const [articleQuantity, setArticleQuantity] = useState(1);
    const [img, setImg] = useState("");

    const disabledBtnProps = {};

    const { currentUser, userLoading } = User();

    const location = useLocation();

    useEffect(() => {
        location.state === null
            ? setId(window.location.href.split("/")[4])
            : setId(location.state.id);
    }, [location]);

    const deleteOnClick = async (e) => {
        try {
            const response = await axios.delete(
                `http://localhost:8000/DeleteArticle/${id}`
            );
            if (response.data === "success") {
                toast.success("Article supprimé !");
                setTimeout(() => {
                    window.location.href = "http://localhost:3000/articles";
                }, 1500);
            } else {
                toast.error("Une erreur est survenue");
            }
        } catch (error) {
            console.log(error);
            toast.error("Une erreur est survenue");
        }
    };

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8000/article/${id}`
                );
                setArticle(response.data);
                setImg(response.data.pictures[0]);
                console.log(response.data.pictures.length);
            } catch (error) {
                console.error(error);
            }
        };

        fetchArticle();
    }, [id]);

    async function addToCart() {
        await axios
            .post(
                "http://localhost:8000/addToCart",
                {
                    articleId: article._id,
                    quantity: Number(articleQuantity),
                    img: article.pictures[0],
                    name: article.title,
                    price: article.price,
                },
                { withCredentials: true }
            )
            .then((response) => {
                console.log(response);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    if (!article) {
        return <Loader />;
    }

    if (userLoading) {
        return <Loader />;
    }

    if (article.stock === 0) {
        disabledBtnProps.disabled = true;
    }

    return (
        <div className="flex flex-col">
            <div className="flex flex-col lg:flex-row w-3/4 mx-auto justify-evenly mt-10">
                <div className="flex flex-col w-full lg:w-2/5">
                    <div className="bg-[#C1E1C1] border rounded-xl">
                        {article.stock === 0 ? (
                            <div className="fixed w-[30%] h-[44.5%] rounded-xl flex justify-center items-center bg-gray-200/75">
                                <h1 className="text-red-600 text-7xl -rotate-45">
                                    Rupture de stock
                                </h1>
                            </div>
                        ) : (
                            <></>
                        )}
                        <ToastContainer />
                        <p className="text-center text-white mb-6 p-2 bg-[#4FBEB7] rounded-t-xl">
                            {article.title}
                        </p>
                        <img
                            src={`http://localhost:8000/storage/${img}`}
                            className="w-[300px] h-[300px] mx-auto my-10"
                            alt="article img"></img>
                        {currentUser && currentUser.admin ? (
                            <div className="flex pb-5">
                                <p className="mt-10 w-fit mx-auto p-2 rounded-3xl bg-[#4FBEB7]">
                                    <Link
                                        className="w-3/4 mx-auto"
                                        to={`/articles/update/${article._id}`}
                                        state={{ id: article._id }}>
                                        Modifier
                                    </Link>
                                </p>
                                <p
                                    className="mt-10 w-fit mx-auto p-2 rounded-3xl bg-[#4FBEB7] cursor-pointer"
                                    onClick={deleteOnClick}>
                                    Supprimer
                                </p>
                            </div>
                        ) : null}
                    </div>
                    {article.pictures.length > 1 ? (
                        <div className="flex p-4 justify-evenly">
                            {article.pictures.map((img) => (
                                <div
                                    key={img}
                                    className="border cursor-pointer">
                                    <img
                                        src={`http://localhost:8000/storage/${img}`}
                                        alt="imgProduct"
                                        className="w-[50px] h-[50px]"
                                        onClick={(e) => {
                                            setImg(e.target.src.split("/")[4]);
                                        }}></img>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="mt-10"></div>
                    )}
                </div>
                <div className="border rounded-xl w-full lg:w-2/5 ">
                    <p className="p-2 ml-5">Livraison</p>
                    <p className="p-2 ml-5">{article.price} €</p>
                    <div className="p-2 ml-5">
                        {article.stock === 0 ? (
                            <p className="text-red-600">
                                Victime de son succès
                            </p>
                        ) : article.stock === 1 ? (
                            <p className="text-orange-500">
                                Il ne reste plus que {article.stock} article en
                                stock
                            </p>
                        ) : article.stock <= 5 ? (
                            <p className="text-orange-500">
                                Il ne reste plus que {article.stock} articles en
                                stock
                            </p>
                        ) : (
                            <p className="text-[#4FBEB7]">
                                Il reste {article.stock} articles en stock
                            </p>
                        )}
                    </div>
                    <hr className="mx-5"></hr>
                    <div className="flex my-4 justify-evenly w-full mx-auto">
                        <input
                            {...disabledBtnProps}
                            onChange={(e) => setArticleQuantity(e.target.value)}
                            type="number"
                            id="nbArticles"
                            name="nbArticles"
                            defaultValue={1}
                            className="w-1/3 p-2 rounded-xl"
                            max={article.stock}></input>
                        <button
                            {...disabledBtnProps}
                            onClick={addToCart}
                            id="addToCartButton"
                            className={
                                (disabledBtnProps.disabled === true
                                    ? "bg-gray-200"
                                    : "bg-[#4FBEB7]") + " w-1/3 p-2 rounded-xl"
                            }>
                            Commander
                        </button>
                    </div>
                    <hr className="mx-5"></hr>
                    <div className="flex flex-col gap-4">
                        <div className="flex my-4 ml-5 gap-8 w-full mx-auto">
                            <img
                                src={checked}
                                className="w-[20px] h-auto"
                                alt="Checkmark"></img>
                            <p>
                                Livraison à domicile en Belgique (gratuit) et en
                                France
                            </p>
                        </div>
                        <div className="flex my-4 ml-5 gap-8 w-full mx-auto">
                            <img
                                src={checked}
                                className="w-[20px] h-auto"
                                alt="Checkmark"></img>
                            <p>Délai court</p>
                        </div>
                        <div className="flex my-4 ml-5 gap-8 w-full mx-auto">
                            <img
                                src={checked}
                                className="w-[20px] h-auto"
                                alt="Checkmark"></img>
                            <p>2 ans de garantie d’usine</p>
                        </div>
                        <div className="flex my-4 ml-5 gap-8 w-full mx-auto">
                            <img
                                src={checked}
                                className="w-[20px] h-auto"
                                alt="Checkmark"></img>
                            <p>
                                Besoin de conseils ? Visitez notre jardinerie à
                                Mouscron
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-3/4 mx-auto mt-10">
                <Tabs>
                    <TabList>
                        <Tab>Description</Tab>
                        <Tab>Caracteristique</Tab>
                        <Tab>Commentaires</Tab>
                        <Tab>Délai</Tab>
                        <Tab>Demandez conseil</Tab>
                    </TabList>
                    <TabPanel>
                        <p>{article.description}</p>
                    </TabPanel>
                    <TabPanel>
                        <p>{article.caracteristics}</p>
                    </TabPanel>
                    <TabPanel>
                        <p>Potentiels commentaires d'un article </p>
                    </TabPanel>
                    <TabPanel>
                        <p>Nos délais</p>
                    </TabPanel>
                    <TabPanel>
                        <p>Potentiel form de prise de contact avec un admin </p>
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    );
}
