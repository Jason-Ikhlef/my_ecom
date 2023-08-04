import React, { useEffect, useState } from 'react';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { Dropdown } from "rsuite";
import DropdownItem from "rsuite/esm/Dropdown/DropdownItem";
import Loader from '../../Widgets/Loader';

export default function CreateArticle() {

    const [animals, setAnimals] = useState(null);
    const [selectedAnimal, setSelectedAnimal] = useState(null);
    const [selectedCat, setSelectedCat] = useState(null);

    const [animalIndex, setAnimalIndex] = useState(null);
    const [catIndex, setCatIndex] = useState(null);

    const [dropdownAnimals, setDropdownAnimals] = useState("Animaux")
    const [dropdownCat, setDropdownCat] = useState("Categorie")
    const [dropdownSubCat, setDropdownSubCat] = useState("Sous-categorie")

    const [form, setForm] = useState({
        title: '',
        description: '',
        price: '',
        caracteristics: '',
        photo: null,
        animal: '',
        category: '',
        subCategory: '',
        animalName: '',
        categoryName: '',
        subCategoriesName: '',
        recommanded: false
    });

    useEffect(() => {
        const fetchAnimals = async () => {
            try {
                const response = await axios.get('http://localhost:8000/categories');
                setAnimals(response.data)

            } catch (error) {
                console.error(error);
            }
        };

        fetchAnimals();
    }, []);

    useEffect(() => {
        if (selectedAnimal) {
            const getAnimalIndex = async () => {
    
                animals.forEach(element => {
                    if (element._id === selectedAnimal) {
                        setAnimalIndex(animals.indexOf(element));
                    }
                });
            }
            getAnimalIndex();
        }
    }, [animalIndex, animals, selectedAnimal]);

    useEffect(() => {
        if (selectedCat) {
            const getCatIndex = async () => {
    
                animals[animalIndex].categories.forEach(element => {

                    if (element._id === selectedCat) {
                        setCatIndex(animals[animalIndex].categories.indexOf(element));
                    }
                });
            }

            getCatIndex();
        }
    }, [animalIndex, animals, catIndex, selectedCat]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'photo') {
            setForm({ ...form, [name]: files });
        } else if (name === "recommanded") {
            setForm({...form, [name]: !form.recommanded})
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleAnimals = (animal) => {
        setDropdownAnimals(animal.name);
        setForm((prevForm) => ({
          ...prevForm,
          animal: animal._id,
          animalName: animal.name
        }));
        setSelectedAnimal(animal._id);
      };
      
      const handleCat = (cat) => {
        setDropdownCat(cat.name);
        setForm((prevForm) => ({
          ...prevForm,
          category: cat._id,
          categoryName: cat.name
        }));
        setSelectedCat(cat._id);
      };
      
      const handleSubCat = (subCat) => {
        setDropdownSubCat(subCat.name);
        setForm((prevForm) => ({
          ...prevForm,
          subCategory: subCat._id,
          subCategoriesName: subCat.name
        }));
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
                    formData.append("stock", form.stock);
                    formData.append("animal", form.animal);
                    formData.append("category", form.category);
                    formData.append("subCategory", form.subCategory);
                    formData.append("animalsName", form.animalName);
                    formData.append("categoriesName", form.categoryName);
                    formData.append("subCategoriesName", form.subCategoriesName);
                    formData.append("recommanded", form.recommanded);

                    if (form.photo) {
                        for (let i = 0; i < form.photo.length; i++) {
                            formData.append("photo", form.photo[i]);
                        }
                    }

                    console.log(form);

                    const response = await axios.put("http://localhost:8000/AddArticle");

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

    if (!animals) {
        return <Loader />
    }

    return (
        <div>
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
                    <label htmlFor="stock">Stock (nombre)</label>
                    <input
                        type="number"
                        id="stock"
                        name="stock"
                        value={form.stock}
                        onChange={handleChange}
                        
                        placeholder="Stock (nombre)"
                    />
                    <label htmlFor="photo">Photo de l'article</label>
                    <input
                        type="file"
                        id="photo"
                        name="photo"
                        onChange={handleChange}
                        multiple
                    />
                    <div>
                        <Dropdown title={dropdownAnimals}>
                            {animals.map((animal) => (
                                <DropdownItem key={animal._id} onSelect={() => handleAnimals(animal)}>
                                    {animal.name}
                                </DropdownItem>
                            ))}
                        </Dropdown>
                    </div>
                    {selectedAnimal !== null && animalIndex !== null && (
                        <div>
                            <div>
                                <Dropdown title={dropdownCat}>
                                    {animals[animalIndex].categories.map((animal) => (
                                        <DropdownItem key={animal._id} onSelect={() => handleCat(animal)}>
                                            {animal.name}
                                        </DropdownItem>
                                    ))}
                                </Dropdown>
                            </div>
                        </div>
                    )}
                    {selectedCat !== null && catIndex !== null && (
                        <div>
                            <div>
                                <Dropdown title={dropdownSubCat}>
                                    {animals[animalIndex].categories[catIndex].subCategories.map((animal) => (
                                        <DropdownItem key={animal._id} onSelect={() => handleSubCat(animal)}>
                                            {animal.name}
                                        </DropdownItem>
                                    ))}
                                </Dropdown>
                            </div>
                        </div>
                    )}
                    <label htmlFor="recommanded">Recommander l'article :</label>
                    <input onChange={handleChange} type="checkbox" name="recommanded" />
                    <button type="submit" className='border mt-5'>Ajouter l'article</button>
                </form>
            </div>
        </div>
    );
}