import React, { useState, useEffect } from 'react';
import User from '../../Components/Widgets/User';
import Loader from '../../Components/Widgets/Loader';
import cart from "../../assets/Cart.png";

const CartDropDown = () => {
    const { currentUser,userLoading } = User();
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalQuantity, setTotalQuantity] = useState(0)

    useEffect(() => {
        if(currentUser && !userLoading)
        {
            let price = 0
            let quantity = 0
            currentUser.cart.map((item) => {
                price += (item.quantity * item.price)
                quantity += item.quantity
            })

            setTotalPrice(price)
            setTotalQuantity(quantity)

            if (totalQuantity > 99) setTotalQuantity("99+")
        }
    },[currentUser])

    if(userLoading){
        return <Loader/>
    }


    return (
        <div>
            {currentUser && currentUser.cart.length !== 0 ? 
            <div className='flex flex-col'>
                <div className='flex gap-4 mb-2'>
                    <p className='text-xl'>Mon panier, </p>
                    <p className='text-xl'>{totalQuantity} articles</p>
                </div>
                {currentUser.cart.map((item) => (
                <div className="bg-white p-2 border-b">
                    <div className='flex justify-evenly'>
                        <img src={`http://localhost:8000/storage/${item.img}`} alt='img articles' className='w-[100px] h-[100px]'></img>
                        <div className='flex flex-col align-top w-1/3'>
                            <p>{item.price} €</p>
                            <p>{item.name}</p>
                        </div>
                    </div>
                </div>
                ))
                }
                <div className='bg-gray-200'>
                    <p>prix total : {totalPrice} €</p>
                </div>
            </div> : null}
        </div>
    )
};
 
export default CartDropDown;