import React, { useState } from 'react';
import axios from "axios";
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

export default function CreateUser ()
{

    const [form, setForm] = useState({
        email : '',
        password : '',
        admin : false
    });

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm({ ...form, [name] : value })
    }

    const handleClick = async (e) => {
        e.preventDefault();

        try 
        {
            const response = await axios.post("http://localhost:8000/createUser", form, { withCredentials: true });
            if (response.data === "success") 
            {
                toast.success("Bienvenue !");
            } 
            else 
            {
                toast.error("Une erreur est survenue");
            }
        } 
        catch (error) 
        {
            console.error("Error submitting form:", error);
            toast.error("Une erreur est survenue lors de l'ajout de l'article");
        }    
    }

    return (
        <div>
            <h1 className='text-center my-5'>Créer un compte</h1>
            <div className='w-1/2 mx-auto'>
                <form onSubmit={handleClick} className='flex flex-col'>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="Email"
                        className='border'
                    />
                    <label htmlFor="password">Mot de passe</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        placeholder="Mot de passe"
                        className='border'
                    />
                    <button type="submit" className='border mt-5'>S'enregistrer</button>
                </form>
            </div>
        </div>
    )
}