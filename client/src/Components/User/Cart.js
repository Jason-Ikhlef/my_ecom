import React, { useState, useEffect } from "react";
import axios from "axios";
import User from "../../Components/Widgets/User";
import Loader from "../../Components/Widgets/Loader";
import bin from "../../assets/delete-bin-line.svg";
import mastercard from "../../assets/mastercard-6.svg";
import paypal from "../../assets/paypal-3.svg";
import visa from "../../assets/visa-4.svg";

const Cart = () => {

  const { currentUser,userLoading } = User();
  const [totalPrice, setTotalPrice] = useState(0)
  const [cart, setCart] = useState(null)

  useEffect(() => {
    if (currentUser && !userLoading) {
      let price = 0;
      currentUser.cart.map((item) => {
        price += item.quantity * item.price;
      });
          setTotalPrice(price)
          setCart(currentUser.cart)
      }
  },[currentUser, userLoading])

  const newOrder = async () => {
    
    await axios
    .post('http://localhost:8000/newOrder', {cart, totalPrice}, {withCredentials: true})
    .then(response => {
      setCart([])
      setTotalPrice(0)
    })
    .catch(err => {
      console.error(err)
    })
  }

  const deleteArticle = async (articleId, price, quantity) => {

    await axios
    .post('http://localhost:8000/removeFromCart', {articleId}, {withCredentials: true})
    .then(response => {
      const newPrice = totalPrice - (quantity * price)
      setTotalPrice(newPrice)
      setCart(response.data)
    })
    .catch(err => {
      console.error(err)
    })
  }

  const clearCart = async () => {

    await axios
    .get('http://localhost:8000/clearCart', {withCredentials: true})
    .then(response => {
      setCart(response.data)
      setTotalPrice(0)
    })
    .catch(err => {
      console.error(err)
    })
  }

if(userLoading) {
    return <Loader/>
}

  return (
    <>
      {cart && (
        <div className='w-3/4 mx-auto flex justify-center gap-4 mt-4'>
          <div className='w-1/2 border'>
            <p className='p-4 text-2xl'>Mon panier</p>
            {cart.map((item, index) => (
              <div className="bg-white p-2 border-b">
                  <div key={index} className='flex justify-evenly'>
                      <img src={`http://localhost:8000/storage/${item.img}`} alt='img articles' className='w-[100px] h-[100px]'></img>
                      <div className='flex flex-col w-1/3'>
                          <p>{item.price} €</p>
                          <p className='whitespace-normal text-[12px]'>{item.name}</p>
                          <p>Qté : {item.quantity}</p>
                          <img onClick={() => deleteArticle(item.articleId, item.price, item.quantity)} src={bin} className='w-[20px] h-[20px] self-end z-10 cursor-pointer' alt='delete bin'></img>
                      </div>
                  </div>
              </div>
            ))
            }
          </div>
          <div className="w-1/4 flex flex-col h-fit gap-4 sticky top-0">
            <div className="flex flex-col gap-4 border">
              <p className="p-4 text-2xl">Total</p>
              <hr></hr>
              <div className="flex justify-between mx-4">
                <p className="text-2xl">Sous-total</p>
                <p className="p-2">{totalPrice} €</p>
              </div>
              <div className="flex justify-between mx-4">
                <p className="text-2xl">Livraison</p>
                <p className="p-2">A venir</p>
              </div>
              <button
                onClick={newOrder}
                className="bg-[#4FBEB7] w-3/4 p-2 mx-auto "
              >
                Paiement
              </button>
              <p className="px-4 text-2xl">Nous acceptons :</p>
              <div className="flex justify-evenly mb-4">
                <img src={visa} alt="icon visa" className="w-[50px] h-[50px]"></img>
                <img
                  src={mastercard}
                  alt="icon visa"
                  className="w-[50px] h-[50px]"
                ></img>
                <img
                  src={paypal}
                  alt="icon visa"
                  className="w-[50px] h-[50px]"
                ></img>
              </div>
            </div>
            <div className="border w-full mx-auto p-4">
              <button onClick={clearCart} className="w-full p-2 bg-[#4FBEB7]">Vider le panier</button>
            </div>
          </div>
      </div>
      )}
    </>
    
  )};

  export default Cart;

/* 
  return (
    <div className="w-3/4 mx-auto flex justify-center gap-4 mt-4">
      <div className="w-1/2 border">
        <p className="p-4 text-2xl">Mon panier</p>
        {currentUser.cart.map((item) => (
          <div className="bg-white p-2 border-b">
            <div className="flex justify-evenly">
              <img
                src={`http://localhost:8000/storage/${item.img}`}
                alt="img articles"
                className="w-[100px] h-[100px]"
              ></img>
              <div className="flex flex-col w-1/3">
                <p>{item.price} €</p>
                <p className="whitespace-normal text-[12px]">{item.name}</p>
                <p>Qté : {item.quantity}</p>
                <img
                  src={bin}
                  className="w-[20px] h-[20px] self-end z-10 cursor-pointer"
                  alt="delete bin"
                ></img>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="w-1/4 flex flex-col h-fit gap-4 sticky top-0">
        <div className="flex flex-col gap-4 border">
          <p className="p-4 text-2xl">Total</p>
          <hr></hr>
          <div className="flex justify-between mx-4">
            <p className="text-2xl">Sous-total</p>
            <p className="p-2">{totalPrice} €</p>
          </div>
          <div className="flex justify-between mx-4">
            <p className="text-2xl">Livraison</p>
            <p className="p-2">A venir</p>
          </div>
          <button onClick={newOrder} className='bg-[#4FBEB7] w-3/4 p-2 mx-auto '>Paiement</button>
          <p className='px-4 text-2xl'>Nous acceptons :</p>
          <div className='flex justify-evenly mb-4'>
            <img src={visa} alt='icon visa' className='w-[50px] h-[50px]'></img>
            <img src={mastercard} alt='icon visa' className='w-[50px] h-[50px]'></img>
            <img src={paypal} alt='icon visa' className='w-[50px] h-[50px]'></img>
          </div>
        </div>
        <div className="border w-full mx-auto p-4">
          <button className="w-full p-2 bg-[#4FBEB7]">Vider le panier</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
*/
