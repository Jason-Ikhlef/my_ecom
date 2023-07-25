import React, { useState } from 'react';
import axios from "axios";
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

export default function CreateArticle() {
    const [form, setForm] = useState({
        title: '',
        description: '',
        price: '',
        characteristics: '',
        photo: null
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'photo') {
            setForm({ ...form, [name]: files });
        } else {
            setForm({ ...form, [name]: value });
        }
    }

    const submit = async (e) => {
        e.preventDefault();
        if(form.title.length < 3)
        {
            toast.error('Non');
        }
        //  try {
        //      if (form.title.length < 3) {
        //          toast.error("Le titre doit faire plus de 3 caractères");
        //      } else {
        //          try {
        //              const response = await axios.post("http://localhost:8000/AddArticle", form);
        //              if (response.data === "success") {
        //                  toast.success("Nouvel article ajouté !");
        //              } else {
        //                  toast.error("Une erreur est survenue");
        //              }
        //          } catch (error) {
        //              console.error("Error submitting form:", error);
        //              toast.error("Une erreur est survenue lors de l'ajout de l'article");
        //          }
        //      }
        //  } catch (e) {
        //      console.log(e);
        //  }
    console.log(form)
     }

    return (
        <div>
            <Link to='/articles'>Voir les articles</Link>
            <h1>Formulaire d'ajout d'article</h1>
            <form onSubmit={submit}>
                <label htmlFor="title">Titre de l'article</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Titre de l'article"
                    className='border'
                />
                <label htmlFor="description">Description de l'article</label>
                <input
                    type="text"
                    id="description"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Description de l'article"
                    className='border'
                />
                <label htmlFor="price">Prix de l'article</label>
                <input
                    type="number"
                    id="price"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    placeholder="Prix de l'article"
                    className='border'
                />
                <label htmlFor="characteristics">Caractéristiques de l'article</label>
                <input
                    type="text"
                    id="characteristics"
                    name="characteristics"
                    value={form.characteristics}
                    onChange={handleChange}
                    placeholder="Caractéristiques de l'article"
                    className='border'
                />
                <label htmlFor="photo">Photo de l'article</label>
                <input
                    type="file"
                    id="photo"
                    name="photo"
                    className='border'
                    onChange={handleChange}
                    multiple
                />
                <button type="submit" className='border'>Ajouter l'article</button>
            </form>
        </div>
    );
}