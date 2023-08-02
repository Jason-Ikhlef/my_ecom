import React, { useState, useEffect } from 'react';
import axios from 'axios';
import User from '../../Components/Widgets/User';
import Loader from '../../Components/Widgets/Loader';
import bin from "../../assets/delete-bin-line.svg";
import mastercard from "../../assets/mastercard-6.svg";
import paypal from "../../assets/paypal-3.svg";
import visa from "../../assets/visa-4.svg";

const Cart = () => {
  const { currentUser,userLoading } = User();
  const [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
      if(currentUser && !userLoading)
      {
          let price = 0
          currentUser.cart.map((item) => {
              price += (item.quantity * item.price)
          })

          setTotalPrice(price)

      }
  },[currentUser])

  const buyOnClick = (e) => {
    console.log('bravo MONSIEUR PERRIER !!');
  }

if(userLoading){
    return <Loader/>
}


  return (
    <div className='w-3/4 mx-auto flex justify-center gap-4 mt-4'>
      <div className='w-1/2 border'>
        <p className='p-4 text-2xl'>Mon panier</p>
        {currentUser.cart.map((item) => (
          <div className="bg-white p-2 border-b">
              <div className='flex justify-evenly'>
                  <img src={`http://localhost:8000/storage/${item.img}`} alt='img articles' className='w-[100px] h-[100px]'></img>
                  <div className='flex flex-col w-1/3'>
                      <p>{item.price} €</p>
                      <p className='whitespace-normal text-[12px]'>{item.name}</p>
                      <p>Qté : {item.quantity}</p>
                      <img src={bin} className='w-[20px] h-[20px] self-end z-10 cursor-pointer' alt='delete bin'></img>
                  </div>
              </div>
          </div>
        ))
        }
        <div className='flex justify-end gap-6 text-2xl p-4'>
          <p>Sous-total </p>
          <p>{totalPrice} €</p>
        </div>
      </div>
      <div className='w-1/4 flex flex-col border h-fit gap-4 sticky top-0'>
        <p className='p-4 text-2xl'>Total</p>
        <hr></hr>
        <div className='flex justify-between mx-4'>
          <p className='text-2xl'>Sous-total</p>
          <p className='p-2'>{totalPrice} €</p>
        </div>
        <div className='flex justify-between mx-4'>
          <p className='text-2xl'>Livraison</p>
          <p className='p-2'>A venir</p>
        </div>
        <button onClick={buyOnClick} className='bg-[#4FBEB7] w-3/4 p-2 mx-auto '>Paiement</button>
        <p className='px-4 text-2xl'>Nous acceptons :</p>
        <div className='flex justify-evenly mb-4'>
          <img src={visa} alt='icon visa' className='w-[50px] h-[50px]'></img>
          <img src={mastercard} alt='icon visa' className='w-[50px] h-[50px]'></img>
          <img src={paypal} alt='icon visa' className='w-[50px] h-[50px]'></img>
        </div>
      </div>
    </div>
    
  )};
 
export default Cart;