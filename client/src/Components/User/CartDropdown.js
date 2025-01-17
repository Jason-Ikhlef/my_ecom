import React, { useState, useEffect } from "react";
import User from "../../Components/Widgets/User";
import Loader from "../../Components/Widgets/Loader";
import bin from "../../assets/delete-bin-line.svg";
import axios from "axios";

const CartDropDown = () => {
  const { currentUser, userLoading } = User();
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [cart, setCart] = useState(null);

  useEffect(() => {
    if (currentUser && !userLoading) {
      let price = 0;
      let quantity = 0;
      currentUser.cart.forEach((item) => {
        price += item.quantity * item.price;
        quantity += item.quantity;
      });

      setTotalPrice(price);
      setTotalQuantity(quantity);
      setCart(currentUser.cart);
    } else {
      const storage = JSON.parse(localStorage.getItem("cart")) || [];
      let price = 0;
      let quantity = 0;
      storage.forEach((item) => {
        price += item.quantity * item.price;
        quantity += item.quantity;
      });

      setTotalQuantity(quantity);
      setTotalPrice(price);
      setCart(storage);
    }
  }, [currentUser, userLoading]);


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
          const newQuantity = totalQuantity - quantity;
          setTotalPrice(newPrice);
          setTotalQuantity(newQuantity);
          setCart(response.data);
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

  if (userLoading) {
    return <Loader />;
  }

  return (
    <div>
      {cart && cart.length !== 0 ? (
        <div className="flex flex-col border-8 h-[425px] bg-white justify-around">
          <div className="flex gap-4 mb-2 p-2">
            <p className="text-xl">Mon panier, </p>
            <p className="text-xl">{totalQuantity > 99 ? `+ de 99` : totalQuantity} articles</p>
          </div>
          <div className="h-[200px] overflow-auto">
            {cart.map((item, index) => (
              <div key={index} className="bg-white p-2 border-b">
                <div className="flex justify-evenly">
                  <img
                    src={`http://localhost:8000/storage/${item.img}`}
                    alt="img articles"
                    className="w-[100px] h-[100px]"
                  />
                  <div className="flex flex-col w-1/3">
                    <p>{item.price.toFixed(2)} €</p>
                    <p className="whitespace-normal text-[12px]">{item.name}</p>
                    <p>Qté : {item.quantity}</p>
                    <img
                      src={bin}
                      className="w-[20px] h-[20px] self-end z-10"
                      alt="delete bin"
                      onClick={() =>
                        deleteArticle(item.articleId, item.price, item.quantity)
                      }
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="bg-gray-200 p-2 text-center">
            <p>prix total : {totalPrice.toFixed(2)} €</p>
          </div>
          <div className="bg-gray-300 p-2 text-center flex justify-between">
            <a href="http://localhost:3000/cart">
              <button className="bg-white p-2">Voir panier</button>
            </a>
            <button className="bg-[#C1E1C1] p-2" onClick={clearCart}>
              Supprimer panier
            </button>
          </div>
        </div>
      ) : (
        <p>Panier Vide</p>
      )}
    </div>
  );
};

export default CartDropDown;