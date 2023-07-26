import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';

export default function UpdateArticle() {

    const [id, setId] = useState('');
    const [article, setArticle] = useState(null);
   
    const location = useLocation()

    useEffect(() => {

        location.state === null ? setId(window.location.href.split('/')[5]) : setId(location.state.id);

    },[location])

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/article/${id}`);
                setArticle(response.data)
            } catch (error) {
                console.error(error);
            }
        };

        fetchArticle();
    }, [id]);


    const [form, setForm] = useState({
        title: '',
        description: '',
        price: '',
        caracteristics: '',
        photo: null
    });

    useEffect(() => {
        if (article) {
            setForm ({
                title: article.title,
                description: article.description,
                price: article.price,
                caracteristics: article.caracteristics,
                photo: null
            })
        }
    },[article])
    
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
                    formData.append("id", id);

                                        if (form.photo) {
                        for (let i = 0; i < form.photo.length; i++) {
                            formData.append("photo", form.photo[i]);
                        }
                    }
                    console.log(formData);

                    const response = await axios.post("http://localhost:8000/UpdateArticle", formData);

                    console.log(response.data);

                    if (response.data.message === "success") {
                        toast.success("Nouvel article ajouté !");
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
            <h1 className='text-center my-5'>Mettre à jour l'article</h1>
            <div className='border w-1/2 mx-auto'>
                <form onSubmit={submit} className='flex flex-col'>
                    <label htmlFor="title">Titre de l'article</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        placeholder="Titre de l'article"
                    />
                    <label htmlFor="description">Description de l'article</label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Description de l'article"
                    />
                    <label htmlFor="price">Prix de l'article</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        value={form.price}
                        onChange={handleChange}
                        placeholder="Prix de l'article"
                    />
                    <label htmlFor="caracteristics">Caractéristiques de l'article</label>
                    <input
                        type="text"
                        id="caracteristics"
                        name="caracteristics"
                        value={form.caracteristics}
                        onChange={handleChange}
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
                    <button type="submit" className='border my-5'>Mettre à jour l'article</button>
                </form>
            </div>
        </div>
    );
}