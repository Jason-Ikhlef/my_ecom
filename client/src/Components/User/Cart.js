import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Dropdown } from 'rsuite';
import User from '../../Components/Widgets/User';
import Loader from '../../Components/Widgets/Loader';
// import cart from "../../assets/Cart.png";

const Cart = () => {
  const { currentUser,userLoading } = User();

if(userLoading){
    return <Loader/>
}


  return (
    <>
    {currentUser && (
        currentUser.cart.map((item) => (
            <div className="bg-white p-4 rounded-md shadow-md">
            <div className="text-xl font-semibold text-gray-800 mb-2">Nom : {item.name}</div>
            <div className="text-base text-gray-600 mb-2">Prix : {item.price}€</div>
            <div className="text-base text-gray-600">Quantité(s) : {item.quantity}</div>
          
            <div className="mt-4 flex justify-between items-center">
              <button
                type="button"
                className="px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-600"
              >
              SUPPRIMER TOUT LE PANIER 
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              >
                ACHETE LA
              </button>
            </div>
          </div>
          
          
      )  ))}
    
    </>
    // <p>{console.log(currentUser.cart)}</p>
    
  )};
 
export default Cart;
//mettre un bouton supprimer pour chaque item du panier