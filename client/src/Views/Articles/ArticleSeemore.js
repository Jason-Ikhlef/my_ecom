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
import { Dropdown } from "rsuite";
import DropdownItem from "rsuite/esm/Dropdown/DropdownItem";

export default function ArticleSeeMore() {

  const [id, setId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [article, setArticle] = useState(null);
  const [parentArticle, setParentArticle] = useState(null);
  const [articleQuantity, setArticleQuantity] = useState(1);
  const [img, setImg] = useState("");
  const [dropDownName, setDropDownName] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [dateDiff, setDateDiff] = useState(null);
  const [remainingTime, setRemainingTime] = useState(null);
  const [opinions, setOpinions] = useState('');

  const handleSubmitOpinion = async () => {
    try {
      if(opinions === '') {
        toast.error('Veuillez remplir le champ avant validation')
      } else {
        toast.success('Merci pour votre avis !');
        
        let textarea = document.querySelector('textarea');
        textarea.value = '';
        
        setTimeout(() => {
          window.location.reload();
        }, 1500);

        await axios.post(`http://localhost:8000/AddOpinions/${id}`, { opinions: [opinions] }, { 
          withCredentials: true,
        });
        
      }
    } catch (e) {
      console.error(e);
    }
  }

  const currentDate = new Date();

    const disabledBtnProps = {};

    const { currentUser, userLoading } = User();

    const location = useLocation();

    useEffect(() => {
        location.state === null
            ? setId(window.location.href.split("/")[4])
            : setId(location.state.id);
    }, [location]);

    useEffect(() => {
        axios
            .get(`http://localhost:8000/article/${id}`)
            .then((res) => {
                setParentArticle(res.data);
                setDropDownName(res.data.articles[0].property);
                setArticle(res.data.articles[0]);
                setImg(res.data.articles[0].pictures[0]);
                setDeleteId(id);
            })
            .catch((err) => console.error(err));
    }, [id]);

    useEffect(() => {
        axios.get("http://localhost:8000/get_promotions").then((res) => {
            if (res.data.salePeriod === true) {
                setEndDate(res.data.endDate);
            }
        });
    });

    useEffect(() => {
        if (endDate) {
            const updateRemainingTime = () => {
                const currentTime = new Date();
                const targetDate = new Date(endDate);

                const differenceInMilliseconds = Math.max(
                    targetDate - currentTime,
                    0
                );

                const seconds = Math.floor(differenceInMilliseconds / 1000);
                const minutes = Math.floor(seconds / 60);
                const hours = Math.floor(minutes / 60);

                const remainingMinutes = minutes % 60;
                const remainingSeconds = seconds % 60;

                setRemainingTime(
                    `${hours}h: ${remainingMinutes}m: ${remainingSeconds}s`
                );
            };

            const intervalId = setInterval(updateRemainingTime, 1000);

            return () => clearInterval(intervalId);
        }
    }, [endDate]);

    const deleteOnClick = async (e) => {
        axios
            .delete(`http://localhost:8000/DeleteArticle/${deleteId}`)
            .then((res) => {
                if (res.data === "success") {
                    toast.success("Article supprimé !");
                    setTimeout(() => {
                        window.location.href = "http://localhost:3000/articles";
                    }, 1500);
                } else {
                    toast.error("Une erreur est survenue");
                }
            })
            .catch((err) => {
                console.log(err);
                toast.error("Une erreur est survenue");
            });
    };

    const handleChange = async (article) => {
        try {
            setArticle(article);
            setImg(article.pictures[0]);
            setDropDownName(article.property);
            setDeleteId(article._id);
        } catch (error) {
            console.log(error);
            toast.error("Une erreur est survenue");
        }
    };

    async function addToCart() {
        if (currentUser) {
            await axios
                .post(
                    "http://localhost:8000/addToCart",
                    {
                        articleId: article._id,
                        quantity: Number(articleQuantity),
                        img: article.pictures[0],
                        name: article.title,
                        price:
                            article.price -
                            ((article.reduction * article.price) / 100).toFixed(
                                2
                            ),
                        weight: article.weight,
                    },
                    { withCredentials: true }
                )
                .then((response) => {
                    toast.success("Article ajouté au panier");
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000);
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            const cart = JSON.parse(localStorage.getItem("cart")) || [];
            const articleExists = cart.find(
                (item) => item.articleId === article._id
            );
            const element = {
                articleId: article._id,
                quantity: Number(articleQuantity),
                img: article.pictures[0],
                name: article.title,
                price:
                    article.price -
                    ((article.reduction * article.price) / 100).toFixed(2),
                weight: article.weight,
            };
            articleExists
                ? (articleExists.quantity += element.quantity)
                : cart.push(element);
            localStorage.setItem("cart", JSON.stringify(cart));
            toast.success("Article ajouté au panier");
            setTimeout(() => {
                window.location.reload();
            }, 2000);
        }
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
          <ToastContainer />
          <div className="flex flex-col lg:flex-row w-3/4 mx-auto justify-evenly mt-10 z-10">
            <div className="flex flex-col w-full lg:w-2/5">
              <div className="bg-[#C1E1C1] border rounded-xl">
                {article.stock === 0 ? (
                  <div className="fixed w-[30%] h-[44.5%] rounded-xl flex justify-center items-center bg-gray-200/75">
                    <h1 className="text-red-600 text-7xl -rotate-45">
                      Rupture de stock
                    </h1>
                  </div>
                ) : null}
                <p className="text-center text-white mb-6 p-2 bg-[#4FBEB7] rounded-t-xl">
                  {article.title}
                </p>
                <img
                  src={`http://localhost:8000/storage/${img}`}
                  className="w-[300px] h-[300px] mx-auto my-10"
                  alt="article img"
                ></img>
                {currentUser && currentUser.admin ? (
                  <div className="flex pb-5">
                    <Link
                      className="mx-auto"
                      to={`/articles/update/${article._id}`}
                      state={{ id: article._id }}
                    >
                      <p className="mt-10 w-fit mx-auto p-2 rounded-3xl bg-[#4FBEB7]">
                        Modifier
                      </p>
                    </Link>
                    <p
                      className="mt-10 w-fit mx-auto p-2 rounded-3xl bg-[#4FBEB7] cursor-pointer"
                      onClick={deleteOnClick}
                    >
                      Supprimer
                    </p>
                  </div>
                ) : null}
              </div>
              {article.pictures.length > 1 ? (
                <div className="flex p-4 justify-evenly">
                  {article.pictures.map((img) => (
                    <div key={img} className="border cursor-pointer">
                      <img
                        src={`http://localhost:8000/storage/${img}`}
                        alt="imgProduct"
                        className="w-[50px] h-[50px]"
                        onClick={(e) => {
                          setImg(e.target.src.split("/")[4]);
                        }}
                      ></img>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="mt-10"></div>
              )}
              <div className="flex justify-center">
                <Dropdown title={dropDownName} className="text-center">
                  {parentArticle.articles.map((article) => (
                    <DropdownItem
                      key={article._id}
                      onSelect={() => handleChange(article)}
                    >
                      {article.property}
                    </DropdownItem>
                  ))}
                </Dropdown>
              </div>
            </div>
            <div className="border rounded-xl w-full lg:w-2/5 ">
              <div className="flex justify-between">
                <p className="p-2 ml-5">Livraison</p>
                {endDate ? <p className="font-bold p-2 text-green-500">Fin de la promotion dans : {remainingTime}</p> : null}
              </div>
              <div className="flex gap-8">
                <p className="p-2 ml-5">{article.price} €</p>
                {article.reduction > 0 ? (
                  <p className="bg-green-500 font-bold text-white text-xl h-fit my-auto rounded-lg px-2">
                    -{article.reduction}%
                  </p>
                ) : null}
              </div>
              {article.reduction > 0 ? (
                <p className="p-2 ml-5 font-bold text-green-500">
                  Prix avec promotion :{" "}
                  {(article.price - (article.reduction * article.price) / 100).toFixed(
                    2
                  )}
                  €
                </p>
              ) : null}
                <div className="p-2 ml-5">
                  {article.stock === 0 ? (
                    <p className="text-red-600">Victime de son succès</p>
                  ) : article.stock === 1 ? (
                    <p className="text-orange-500">
                      Il ne reste plus que {article.stock} article en stock
                    </p>
                  ) : article.stock <= 5 ? (
                    <p className="text-orange-500">
                      Il ne reste plus que {article.stock} articles en stock
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
                  max={article.stock}
                  min={1}
                ></input>
                <button
                  {...disabledBtnProps}
                  onClick={addToCart}
                  id="addToCartButton"
                  className={
                    (disabledBtnProps.disabled === true
                      ? "bg-gray-200"
                      : "bg-[#4FBEB7]") + " w-1/3 p-2 rounded-xl"
                  }
                >
                  Commander
                </button>
              </div>
      
              <hr className="mx-5"></hr>
              <div className="flex flex-col gap-4">
                <div className="flex my-4 ml-5 gap-8 w-full mx-auto">
                  <img
                    src={checked}
                    className="w-[20px] h-auto"
                    alt="Checkmark"
                  ></img>
                  <p>Livraison partout dans le monde</p>
                </div>
                <div className="flex my-4 ml-5 gap-8 w-full mx-auto">
                  <img
                    src={checked}
                    className="w-[20px] h-auto"
                    alt="Checkmark"
                  ></img>
                  <p>Délai court</p>
                </div>
                <div className="flex my-4 ml-5 gap-8 w-full mx-auto">
                  <img
                    src={checked}
                    className="w-[20px] h-auto"
                    alt="Checkmark"
                  ></img>
                  <p>2 ans de garantie d’usine</p>
                </div>
                <div className="flex my-4 ml-5 gap-8 w-full mx-auto">
                  <img
                    src={checked}
                    className="w-[20px] h-auto"
                    alt="Checkmark"
                  ></img>
                  <p>
                    Besoin de conseils ? Visitez notre jardinerie à Mouscron
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
                <div className="flex flex-col gap-4">
                  {article.opinions.map((item, index) => (
                    <p key={index} className="p-2">{item}</p>
                  ))}
                </div>
                {currentUser ? (
                  <div className="flex justify-between p-2 gap-2 rounded-2xl mt-5 bg-[#C1E1C1]">
                    <textarea
                      name="opinions"
                      value={opinions}
                      className="resize-none w-full bg-[#C1E1C1] border rounded-xl pl-2"
                      onChange={(event) => setOpinions(event.target.value)}
                      rows={1}
                      cols={50}
                    />
                    <button
                      onClick={handleSubmitOpinion}
                      type="submit"
                      className="bg-[#4FBEB7] px-3 rounded-2xl"
                    >
                      Valider
                    </button>
                  </div>
                ) : null}
              </TabPanel>
              <TabPanel>
                <p>Nos délais</p>
              </TabPanel>
              <TabPanel>
                <p>Potentiel form de prise de contact avec un admin</p>
              </TabPanel>
            </Tabs>
          </div>
        </div>
      );
}
