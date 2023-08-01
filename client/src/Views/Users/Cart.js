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
          <div>
            <div>Nom : {item.name}</div>
            <div>Prix : {item.price}</div>
            <div>Quantité(s) : {item.quantity}</div>
          </div>
      )  ))}
    
    </>
    // <p>{console.log(currentUser.cart)}</p>
    
  )};
 
export default Cart;
//mettre un bouton supprimer pour chaque item du panier