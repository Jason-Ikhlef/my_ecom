import React, { useState } from 'react';
import axios from "axios";
import { toast } from 'react-toastify';

export default function UpdateArticle() {
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

    const submit = async (e) => 
    {
        e.preventDefault();
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
                    <label htmlFor="characteristics">Caractéristiques de l'article</label>
                    <input
                        type="text"
                        id="characteristics"
                        name="characteristics"
                        value={form.characteristics}
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