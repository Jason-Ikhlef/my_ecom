import React, { useState } from 'react';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

export default function ReadUser ()
{

    const [form, setForm] = useState({
        email : '',
        password : '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm({ ...form, [name] : value })
    }

    const handleClick = async (e) => {
        e.preventDefault();

        try 
        {
            const response = await axios.post("http://localhost:8000/login", form, { withCredentials: true });
    
            if (response.data === "success") 
            {
                toast.success("Bienvenue !");
                setTimeout(() => {
                    window.location.href = 'http://localhost:3000'
                }, 1500);
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
        <div className='bg-[#C1E1C1] mt-10 w-1/2 mx-auto'>
            <ToastContainer />
            <h1 className='text-center my-5 bg-[#4FBEB7] p-2'>Se connecter</h1>
            <div className='w-1/2 mx-auto'>
                <form onSubmit={handleClick} className='flex flex-col'>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className='border'
                        autoComplete='on'
                    />
                    <label htmlFor="password">Mot de passe</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Mot de passe"
                        className='border'
                    />
                    <button type="submit" className='mt-5 bg-[#4FBEB7] p-2 mb-2'>Se connecter</button>
                </form>
                <div className='mt-2 pb-4'>
                    <p className='bg-[#4FBEB7] text-center'>
                        <Link to='http://localhost:3000/register'>
                            Pas de compte ? Inscrivez-vous !
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}