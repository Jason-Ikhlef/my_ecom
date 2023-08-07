import React from "react";
import axios from "axios";
import User from '../../Components/Widgets/User';




export default function History() {
    const { currentUser, userLoading } = User()
    if (userLoading) {

        return <p>Loading...</p>
    
    }
 return (
    <div className="w-3/4 mx-auto text-center">
   
    {currentUser.old_orders && (
        currentUser.old_orders.map((order, index) => (
            <div key={index}>
                {order.cart.map((element, elementIndex) => ( // tous les éléments de la commande avec pour chaque element : name, price, articleId, quantity.
                <div key={elementIndex}>
                    <p>{element.name}</p>
                </div>
                ))} 
            <p>{order.totalPrice} €</p> {/* prix total de la commande */}
            <p>{order.date}</p> {/*la date sera a convertir en format JJ/MM/YY */}
            </div>
        ))
    )}
</div> 
 )


}