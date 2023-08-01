import React, { useState, useEffect } from 'react';
import User from '../../Components/Widgets/User';
import Loader from '../../Components/Widgets/Loader';
import bin from "../../assets/delete-bin-line.svg";

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

    const deleteItemOnClick  = (e) => {
        console.log('bonjour Mr Perrier');
    }

    const deleteCartOnClick = (e) => {
        console.log('Je vous ai bien eu Mr Perrier');
    }

    if(userLoading){
        return <Loader/>
    }


    return (
        <div>
            {currentUser && currentUser.cart.length !== 0 ? 
            <div className='flex flex-col border-8 h-[425px] overflow-auto'>
                <div className='flex gap-4 mb-2 p-2'>
                    <p className='text-xl'>Mon panier, </p>
                    <p className='text-xl'>{totalQuantity} articles</p>
                </div>
                {currentUser.cart.map((item) => (
                <div className="bg-white p-2 border-b">
                    <div className='flex justify-evenly'>
                        <img src={`http://localhost:8000/storage/${item.img}`} alt='img articles' className='w-[100px] h-[100px]'></img>
                        <div className='flex flex-col w-1/3'>
                            <p>{item.price} €</p>
                            <p className='whitespace-normal text-[12px]'>{item.name}</p>
                            <p>Qté : {item.quantity}</p>
                            <img src={bin} className='w-[20px] h-[20px] self-end z-10' alt='delete bin' onClick={deleteItemOnClick}></img>
                        </div>
                    </div>
                </div>
                ))
                }
                <div className='bg-gray-200 p-2 text-center'>
                    <p>prix total : {totalPrice} €</p>
                </div>
                <div className='bg-gray-300 p-2 text-center flex justify-between'>
                    <a href='http://localhost:3000/cart'>
                        <button className='bg-white p-2'>Voir panier</button>
                    </a>
                    <button className='bg-[#C1E1C1] p-2' onClick={deleteCartOnClick}>Supprimer panier</button>
                </div>
                <div className='text-center'>
                    <button className='bg-[#4FBEB7] p-2'>Commander</button>    
                </div>
            </div> : null}
        </div>
    )
};
 
export default CartDropDown;