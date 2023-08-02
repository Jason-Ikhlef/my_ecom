import React, { useState, useEffect } from 'react';
import axios from 'axios';
import User from '../../Components/Widgets/User';
import Loader from '../../Components/Widgets/Loader';
import Cart from '../../Components/User/Cart';

const UserCart = () => {
  const { currentUser, userLoading } = User();
  const [cart, setCart] = useState([]);


  if (userLoading) {
    return <Loader />;
  }

  return (
    <div>
         <Cart/>
    </div>
  );
};

export default UserCart;
