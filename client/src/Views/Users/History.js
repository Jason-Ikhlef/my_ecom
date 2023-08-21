import React, { useState, useEffect } from "react";
import axios from "axios";
import User from '../../Components/Widgets/User';
import Loader from "../../Components/Widgets/Loader";
import { Dropdown } from "rsuite";
import DropdownItem from "rsuite/esm/Dropdown/DropdownItem";

export default function History() {
   
   const { currentUser, userLoading } = User()
   const [isWatchingOrder, setWatchingOrder] = useState(null)
   const [order, setOrder] = useState(null);

   function changeDate(date) 
   {
      const newDate = new Date(date).toLocaleString('fr-FR', {
         year : "numeric",
         month : "long",
         day : "numeric",
         hour : "2-digit",
         minute : "2-digit"
      })  
      return newDate; 
   }

   if (userLoading) {

        return <Loader />
    
   }

   console.log(currentUser.old_orders);
 
   return (
         <div className="w-3/4 p-4 overflow-auto mx-auto flex flex-col gap-8">
            {currentUser.old_orders && !order && (
               currentUser.old_orders.toReversed().map((order, index) => (
                  <div className="flex flex-col" key={index}> 
                     <div className="bg-gray-200 text-start p-2 rounded-t-xl flex justify-between">
                        <div className="flex gap-8">
                           <div className="flex flex-col">
                              <p>Commande effectuée le :</p>
                              <p>{changeDate(order.date)}</p>
                           </div>
                           <div className="flex flex-col">
                              <p>Total</p>
                              <p>{order.totalPrice.toFixed(2)} €</p>
                           </div>
                           <div className="flex flex-col">
                              <p>Livraison à</p>
                              <Dropdown title={currentUser.email} trigger="hover">
                                 <DropdownItem>
                                    <p>adresse</p>
                                 </DropdownItem>
                              </Dropdown>
                           </div>
                        </div>
                        <div className="flex">
                           <div className="flex flex-col mr-2">
                              <p>N° de commande : {order._id}</p>
                           </div>
                        </div>
                     </div>
                     <div className="border rounded-b-xl">
                        <div className="flex flex-col justify-start p-4">
                           <p>État de la commande : {order.state}</p>
                        </div>
                        <div className="flex justify-between p-4">
                           <div className="flex gap-8">
                              <img src={`http://localhost:8000/storage/${order.cart[0].img}`} alt="img history" className="w-[50px] h-[50px]"></img>
                              <div className="flex flex-col">
                                 <p>{order.cart[0].name}</p>
                                 <button className="cursor-pointer text-start">Voir article</button>
                              </div>
                           </div>
                           <div>
                              <p onClick={() => {setOrder(order)}} className="cursor-pointer">Voir détails de la commande</p>
                           </div>
                        </div>
                     </div>
                  </div>
               ))
            )}
            {
               order ? 
               <div className="flex flex-col gap-6">
                  <p className="text-2xl font-bold">Détails de la commande</p>
                  <div className="flex gap-6">
                     <p>Commandé le {changeDate(order.date)}</p>
                     <p>|</p>
                     <p>N° de commande : {order._id}</p>
                  </div>
                  <div className="border rounded-xl flex justify-between p-6">
                     <div className="flex flex-col">
                        <p className="font-bold">Adresse de livraison</p>
                        <p>Email</p>
                        <p>Rue</p>
                        <p>Ville, code postal</p>
                        <p>Pays</p>
                     </div>
                     <div className="flex flex-col">
                        <p className="font-bold">Mode de paiement</p>
                        <p>{'1291-1291-1291-1921'.slice(-5).padStart(8, '*')}</p>
                     </div>
                     <div className="flex flex-col">
                        <p className="font-bold">Récapitulatif de la commande</p>
                        <p>Article : {order.totalPrice.toFixed(2)} €</p>
                        <p>Livraison : ? €</p>
                        <p>Total : € </p>
                     </div>
                  </div>
                  <div className="border rounded-xl p-6">
                     <p className="font-bold text-xl mb-4">Livrée : date ?</p>
                     {
                        order.cart.map((items, index) => (
                           <div key={index} className="flex gap-4">
                              <img src={`http://localhost:8000/storage/${items.img}`} alt="article img" className="w-[100px] h-[100px]"></img>
                              <div className="flex flex-col">
                                 <p>{items.name}</p>
                                 <p className="text-[#4FBEB7]">{items.price.toFixed(2)} €</p>
                                 <p>x {items.quantity}</p>
                              </div>
                           </div>
                        ))
                     }
                  </div>
                  {console.log(order)}
               </div> 
               : 
               null
            }
         </div>
         )
}