import React, { useState } from "react";
import axios from "axios";
import User from '../../Components/Widgets/User';
import Loader from "../../Components/Widgets/Loader";

export default function Addresses() {
   
   const { currentUser, userLoading } = User()
   const [isAddindAddress, setIsAddindAddress] = useState(null)

   if (userLoading) {

        return <Loader />
    
   }
 
   return (
    currentUser && (
        isAddindAddress ? (
            <>
                <p>Adresse</p>
                <p>Ville</p>
                <p>ZIP</p>
                <p>Pays</p>
                <p>submit</p>
            </>
        ) : (
            <p>les adresses</p>
        )
    )
   )
}