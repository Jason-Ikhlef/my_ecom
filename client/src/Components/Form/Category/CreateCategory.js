import React, { useState } from 'react';
import axios from "axios";
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

export default function CreateCategory ()
{

    const [form, setForm] = useState({
        category : ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm({ ...form, [name] : value })
    }

    const handleClick = async (e) => {
        e.preventDefault();

        // try 
        // {
        //     const response = await axios.post("http://localhost:8000/createUser", form);
        //     if (response.data === "success") 
        //     {
        //         toast.success("Bienvenue !");
        //     } 
        //     else 
        //     {
        //         toast.error("Une erreur est survenue");
        //     }
        // } 
        // catch (error) 
        // {
        //     console.error("Error submitting form:", error);
        //     toast.error("Une erreur est survenue lors de l'ajout de l'article");
        // }

        console.log(form);
    
    }


    return (
        <div>
            <h1 className='text-center my-5'>Créer une catégorie</h1>
            <div className='w-1/2 mx-auto'>
                <form onSubmit={handleClick} className='flex flex-col'>
                    <label htmlFor="category">Nom de la catégorie</label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        required
                        placeholder="Catégorie"
                        className='border'
                    />
                    <button type="submit" className='border mt-5'>Créer</button>
                </form>
            </div>
        </div>
    )
}