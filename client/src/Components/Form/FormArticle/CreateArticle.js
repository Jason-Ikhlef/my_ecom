import React, { useState } from 'react';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

export default function CreateArticle() {
    const [form, setForm] = useState({
        title: '',
        description: '',
        price: '',
        caracteristics: '',
        photo: null
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'photo') {
            setForm({ ...form, [name]: files });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const submit = async (e) => {
        e.preventDefault();
        try {
            if (form.title.length < 3) {
                toast.error("Le titre doit faire plus de 3 caractères");
            } else {
                try {
                    const formData = new FormData();
                    formData.append("title", form.title);
                    formData.append("description", form.description);
                    formData.append("price", form.price);
                    formData.append("caracteristics", form.caracteristics);

                                        if (form.photo) {
                        for (let i = 0; i < form.photo.length; i++) {
                            formData.append("photo", form.photo[i]);
                        }
                    }

                    const response = await axios.put("http://localhost:8000/AddArticle", formData, { withCredentials: true });

                    if (response.data === "success") {
                        toast.success("Nouvel article ajouté !");
                        setTimeout(() => {
                            window.location.href = 'http://localhost:3000/articles'
                        }, 1500);
                    } else {
                        toast.error("Une erreur est survenue");
                    }
                } catch (error) {
                    console.error("Error submitting form:", error);
                    toast.error("Une erreur est survenue lors de l'ajout de l'article");
                }
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div>
            <Link to='/articles'>Voir les articles</Link>
            <ToastContainer />
            <h1 className='text-center my-5'>Formulaire d'ajout d'article</h1>
            <div className='border w-1/2 mx-auto'>
                <form onSubmit={submit} className='flex flex-col'>
                    <label htmlFor="title">Titre de l'article</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        required
                        placeholder="Titre de l'article"
                    />
                    <label htmlFor="description">Description de l'article</label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        required
                        placeholder="Description de l'article"
                    />
                    <label htmlFor="price">Prix de l'article</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={form.price}
                        onChange={handleChange}
                        required
                        placeholder="Prix de l'article"
                    />
                    <label htmlFor="caracteristics">Caractéristiques de l'article</label>
                    <input
                        type="text"
                        id="caracteristics"
                        name="caracteristics"
                        value={form.caracteristics}
                        onChange={handleChange}
                        required
                        placeholder="Caractéristiques de l'article"
                    />
                    <label htmlFor="photo">Photo de l'article</label>
                    <input
                        type="file"
                        id="photo"
                        name="photo"
                        onChange={handleChange}
                        multiple
                    />
                    <button type="submit" className='border mt-5'>Ajouter l'article</button>
                </form>
            </div>
        </div>
    );
}