import React, { useState, useEffect } from "react";
import axios from "axios";
import visa from "../../assets/visa-4.svg";
import User from "../../Components/Widgets/User";
import Loader from "../../Components/Widgets/Loader";
import bin from "../../assets/delete-bin-line.svg";
import mastercard from "../../assets/mastercard-6.svg";
import paypal from "../../assets/paypal-3.svg";
import { Link } from "react-router-dom";
import Shipping from "../Widgets/Shipping";
import { ToastContainer, toast } from "react-toastify";


const Cart = () => {
  const { currentUser, userLoading } = User();
  const { currentShipping, shippingLoading } = Shipping();
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalWeight, setTotalWeight] = useState(0);
  const [cart, setCart] = useState(null);
  const [easyPost, setEasyPost] = useState(null);
  const [selectedOffer, setSelectedOffer] = useState('Priority')
  const [totallySprice, setTotallySprice] = useState(0)
  const [logIn, setLogIn] = useState(true);
  const [showPopup, setShowPopup] = useState(false);

  const handlePaymentClick = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };


    useEffect(() => {
        if (currentUser && !userLoading) {
            let weight = 0
            let price = 0;
            currentUser.cart.map((item) => {
                weight += item.weight * item.quantity
                price += item.quantity * item.price;
            });
            setTotalPrice(price);
            setCart(currentUser.cart);
            setTotalWeight(Number((weight * 0.00220462).toFixed(2)))
        } else {
            const storage = JSON.parse(localStorage.getItem("cart")) || [];
            let weight = 0
            let price = 0;
            storage.map((item) => {
                weight += item.weight * item.quantity
                price += item.quantity * item.price;
            });

            setTotalPrice(price);
            setCart(storage);
            setTotalWeight(Number((weight * 0.00220462).toFixed(2)))
        }
    }, [currentUser, userLoading]);

  useEffect(() => {
    if (!totallySprice) {
    axios
      .post("http://localhost:8000/getShippingCost", {weight: totalWeight})
      .then((response) => {
        setEasyPost(response.data);
        setSelectedOffer(response.data[0])
      })
      .catch((err) => {
        console.log(err);
      });
    }

      if (totalWeight > 0) setTotallySprice((((Number(selectedOffer.rate) * Number(currentShipping)) / 100) + (Number(selectedOffer.rate))).toFixed(2))
  }, [selectedOffer, currentShipping, totalWeight]);

  const newOrder = async () => {
    if (currentUser) {
      await axios
        .post(
          "http://localhost:8000/newOrder",
          { cart, totalPrice },
          { withCredentials: true }
        )
        .then((response) => {
          setCart([]);
          setTotalPrice(0);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      // pop up qui demande si l'utilisateur non connecté veut se connecter, s'inscrire ou procéder au paiement sans se co
      setLogIn(false);
    }
  };

  const orderWithoutUser = () => {
    setLogIn(true);
  };

  const deleteArticle = async (articleId, price, quantity) => {
    if (currentUser) {
      await axios
        .post(
          "http://localhost:8000/removeFromCart",
          { articleId },
          { withCredentials: true }
        )
        .then((response) => {
          const newPrice = totalPrice - quantity * price;
          setTotalPrice(newPrice);
          setCart(response.data);
          setTotallySprice(0)
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      const storage = JSON.parse(localStorage.getItem("cart")) || [];
      const newPrice = totalPrice - quantity * price;
      const article = storage.find((item) => item.articleId === articleId);
      const index = storage.indexOf(article);

      if (index !== -1) {
        storage.splice(index, 1);
      }
      setCart(storage);
      setTotalPrice(newPrice);
      localStorage.setItem("cart", JSON.stringify(storage));
    }
  };

  const clearCart = async () => {
    if (currentUser) {
      await axios
        .get("http://localhost:8000/clearCart", { withCredentials: true })
        .then((response) => {
          setCart(response.data);
          setTotalPrice(0);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      setCart([]);
      setTotalPrice(0);
      localStorage.removeItem("cart");
    }
  };

  const selectOffer = (offer) => {
    easyPost.map((item) => {
      if(item.service === offer){
        setSelectedOffer(item)
      }
    })
  }

  if ((userLoading || (!easyPost && cart.length !== 0) || shippingLoading)) {
    return <Loader />;
  }
  return(
  <>
  <ToastContainer />
  {cart && (
    <div>
      <div id="subbutton" className="w-3/5 p-2 bg-[#4FBEB7]">
          <Link to="http://localhost:3000/SubPage">DEFILE STRplaIT</Link>
      </div>
      <div className="w-3/4 mx-auto flex justify-center gap-4 mt-4">
        {logIn === false ? (
          <div className="w-1/2 border flex flex-col justify-evenly items-center">
            <p className="my-4 text-2xl">
              Souhaitez-vous vous connecter avant de payer ?
            </p>
            <div className="flex flex-col justify-evenly items-center h-1/2">
              <button
                onClick={() => {
                  window.location.href = "http://localhost:3000/register";
                }}
                className="w-full text-center bg-[#4FBEB7] p-2 text-lg"
              >
                M'inscrire
              </button>
              <button
                onClick={() => {
                  window.location.href = "http://localhost:3000/login";
                }}
                className="w-full text-center bg-[#4FBEB7] p-2 text-lg"
              >
                Me connecter
              </button>
              <button
                onClick={orderWithoutUser}
                className="w-full text-center bg-[#4FBEB7] p-2 text-lg"
              >
                Continuer sans me connecter
              </button>
            </div>
          </div>
        ) : (
          <div className="w-1/2 border">
            <p className="p-4 text-2xl">Mon panier</p>
            {cart.map((item, index) => (
              <div className="bg-white p-2 border-b" key={index}>
                <div className="flex justify-evenly">
                  <img
                    src={`http://localhost:8000/storage/${item.img}`}
                    alt="img articles"
                    className="w-[100px] h-[100px]"
                  />
                  <div className="flex flex-col w-1/3">
                    <p>{item.price} €</p>
                    <p className="whitespace-normal text-[12px]">{item.name}</p>
                    <p>Qté : {item.quantity}</p>
                    <img
                      onClick={() =>
                        deleteArticle(item.articleId, item.price, item.quantity)
                      }
                      src={bin}
                      className="w-[20px] h-[20px] self-end z-10 cursor-pointer"
                      alt="delete bin"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="w-1/4 flex flex-col h-fit gap-4 sticky top-0 border">
          <div className="flex flex-col gap-4 border">
            <p className="p-4 text-2xl text-center">Résumé</p>
            <hr/>
          </div>
          <div className="flex justify-between mx-4">
            <p className="text-2xl">Panier</p>
            <p className="p-2">{totalPrice.toFixed(2)} €</p>
          </div>
            <div className="flex justify-between mx-4">
              <p className="text-2xl">Frais de port</p>
              <p className="p-2">{totallySprice} €</p>
            </div>
          <div className="flex justify-between mx-4">
            <p className="text-2xl">Prix total</p>
            <p className="p-2">
              {(Number(totallySprice) + Number(totalPrice)).toFixed(2)} €
            </p>
          </div>
          {
            currentUser 
            ?
            <div className="flex justify-between mx-4">
              <p className="text-2xl">avec prime</p>
              <p className="p-2">{(totalPrice).toFixed(2)} €</p>
            </div>
            :
            null
          }
          
          <div className="flex justify-between mx-4">
            <p className="text-lg">Livraison</p>
            <p className="p-2 text-sm">{selectedOffer.delivery_days} jours</p>
          </div>
          <div>
            {easyPost && (
            <div>
              <div className="w-full p-4 flex justify-center ">
                <select
                  className="w-full text-center bg-[#4FBEB7]"
                  onChange={(e) => selectOffer(e.target.value)}
                >
                  {easyPost.map(item => (
                    <option className="border" key={item.id} value={item.service}>
                      {item.service === "Priority" ? "Express" : "Standard" }
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-full flex justify-center p-4">
                <button
                  onClick={handlePaymentClick}
                  className="bg-[#4FBEB7] w-full mx-auto p-2 border "
                >
                  Paiement
                </button>
              </div>
              <p className="px-4 text-2xl">Nous acceptons :</p>
              <div className="flex justify-evenly mb-4">
                <img
                  src={visa}
                  alt="icon visa"
                  className="w-[50px] h-[50px]"
                />
                <img
                  src={mastercard}
                  alt="icon visa"
                  className="w-[50px] h-[50px]"
                />
                <img
                  src={paypal}
                  alt="icon visa"
                  className="w-[50px] h-[50px]"
                />
              </div>
              <div className="border w-full mx-auto p-4">
                <button
                  onClick={clearCart}
                  className="w-full p-2 bg-[#4FBEB7]"
                >
                  Vider le panier
                </button>
              </div>
            </div>
          )}
          </div>
        </div>
        
      </div>
      {/* Le pop-up */}
    {showPopup && (
      <div className="popup-overlay">
        <div className="popup-container">
          <h2 className="text-2xl font-semibold mb-4">Vos Addresses</h2>
          <div className="flex gap-6">
            {/* ecris */}
            
          </div>
          <button
            onClick={() => {
              closePopup();
              newOrder();
            }}
            className="w-full p-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition duration-300"
          >
            Fermer
          </button>
        </div>
      </div>
    )}
    </div>
  )}
</>
)};


export default Cart;
