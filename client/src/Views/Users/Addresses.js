import React, { useState } from "react";
import axios from "axios";
import User from '../../Components/Widgets/User';
import Loader from "../../Components/Widgets/Loader";

export default function Addresses() {
   
   const { currentUser, userLoading } = User()
   const [isAddindAddress, setIsAddindAddress] = useState(null)

//    const [form, setForm] = useState({
//         country: '',
//         city: '',
//         zipcode : Number(),
//         adress : ''
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setForm({ ...form, [name]: value });
//     };

   if (userLoading) {

        return <Loader />
    
   }
 
   return (
    currentUser && (
        isAddindAddress ? (
            <>
                <p onClick={() => {setIsAddindAddress(null)}}>fromage</p>
                <form /* onSubmit={handleSubmit} */ className="flex flex-col w-2/4 mx-auto mt-8 border rounded-xl p-2">
                    <label htmlFor="country">Votre pays</label>
                    <input
                        type="text"
                        id="country"
                        name="country"
                        /* value= {form.country} */
                        /* onChange={handleChange} */
                        required
                        placeholder="Pays"
                        className="border"
                    />
                    <label htmlFor="city">Votre ville</label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        /* value= {form.city} */
                        /* onChange={handleChange} */
                        required
                        placeholder="Ville"
                        className="border"
                    />
                    <label htmlFor="city">Code postal</label>
                    <input
                        type="text"
                        id="zipcode"
                        name="zipcode"
                        /* value= {form.zipcode} */
                        /* onChange={handleChange} */
                        required
                        placeholder="Code postal"
                        className="border"
                    />
                    <label htmlFor="adress">Votre adresse</label>
                    <input
                        type="text"
                        id="adress"
                        name="adress"
                        /* value= {form.adress} */
                        /* onChange={handleChange} */
                        required
                        placeholder="Adresse"
                        className="border"
                    />
                    <button type="submit" className="mt-5 bg-[#4FBEB7] p-2 mb-2 rounded-lg">
                        Créer la nouvelle adresse
                    </button>
                </form>
            </>
        ) : (
            <div>
                <p onClick={() => {setIsAddindAddress(true)}}>fromage</p>
            </div>
        )
    )
   )
}