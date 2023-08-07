import React from "react";
import axios from "axios";
import User from '../../Components/Widgets/User';

export default function History() {
   
   const { currentUser, userLoading } = User()
   
   if (userLoading) {

        return <p>Loading...</p>
    
   }
 
   return (
         <div className="w-3/4 p-4 overflow-auto mx-auto flex flex-col gap-8">
            {currentUser.old_orders && (
               currentUser.old_orders.map((order, index) => (
                  <div className="flex flex-col" key={index}>
                  <div className="bg-gray-200 text-start p-2 rounded-t-xl flex justify-between">
                     <div className="flex gap-8">
                        <div className="flex flex-col">
                           <p>Commande effectuée le :</p>
                           <p>Date random</p>
                        </div>
                        <div className="flex flex-col">
                           <p>Total</p>
                           <p>Prix random</p>
                        </div>
                        <div className="flex flex-col">
                           <p>Livraison à</p>
                           <p>Bougzer</p>
                        </div>
                     </div>
                     <div className="flex">
                        <div className="flex flex-col mr-2">
                           <p>N° de commande</p>
                        </div>
                     </div>
                  </div>
                  <div className="border rounded-b-xl">
                     <div className="flex flex-col justify-start p-4">
                        <p>Livré : date</p>
                        <p>Etat colis (remis)</p>
                     </div>
                     <div className="flex p-4">
                        <div className="flex gap-8">
                           <p>Img du colis</p>
                           <div className="flex flex-col">
                              <p>Titre de l'article</p>
                              <p>Boutton voir article</p>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            ))
            )}
         </div>         
         
      // <div className="w-3/4 mx-auto text-center">
      // <div key={index}>
      //             {order.cart.map((element, elementIndex) => ( // tous les éléments de la commande avec pour chaque element : name, price, articleId, quantity.
      //             <div key={elementIndex}>
      //                <p>{element.name}</p>
      //             </div>
      //             ))} 
      //             <p>{order.totalPrice} €</p> {/* prix total de la commande */}
      //             <p>{order.date}</p> {/*la date sera a convertir en format JJ/MM/YY */}
      //          </div>
      // </div> 
   )

   // <div className="flex flex-col" key={index}>
   //             <div className="bg-gray-200 text-start p-2 rounded-t-xl flex justify-between">
   //                <div className="flex gap-8">
   //                   <div className="flex flex-col">
   //                      <p>Commande effectuée le :</p>
   //                      <p>Date random</p>
   //                   </div>
   //                   <div className="flex flex-col">
   //                      <p>Total</p>
   //                      <p>Prix random</p>
   //                   </div>
   //                   <div className="flex flex-col">
   //                      <p>Livraison à</p>
   //                      <p>Bougzer</p>
   //                   </div>
   //                </div>
   //                <div className="flex">
   //                   <div className="flex flex-col mr-2">
   //                      <p>N° de commande</p>
   //                   </div>
   //                </div>
   //             </div>
   //             <div className="border">
   //                <div className="flex flex-col justify-start p-4">
   //                   <p>Livré : date</p>
   //                   <p>Etat colis (remis)</p>
   //                </div>
   //                <div className="flex p-4">
   //                   <div className="flex gap-8">
   //                      <p>Img du colis</p>
   //                      <div className="flex flex-col">
   //                         <p>Titre de l'article</p>
   //                         <p>Boutton voir article</p>
   //                      </div>
   //                   </div>
   //                </div>
   //             </div>
   //          </div>
}