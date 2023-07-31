import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Dropdown } from "rsuite";
import DropdownItem from "rsuite/esm/Dropdown/DropdownItem";

export default function UpdateArticle() {

    const [id, setId] = useState('');
    const [article, setArticle] = useState(null);

    const [animals, setAnimals] = useState(null);
    const [selectedAnimal, setSelectedAnimal] = useState(null);
    const [selectedCat, setSelectedCat] = useState(null);

    const [animalIndex, setAnimalIndex] = useState(null);
    const [catIndex, setCatIndex] = useState(null);

    const [dropdownAnimals, setDropdownAnimals] = useState("Animaux")
    const [dropdownCat, setDropdownCat] = useState("Categorie")
    const [dropdownSubCat, setDropdownSubCat] = useState("Sous-categorie")
   
    const location = useLocation()

    useEffect(() => {

        location.state === null ? setId(window.location.href.split('/')[5]) : setId(location.state.id);

    },[location])

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/article/${id}`, { withCredentials: true });
                setArticle(response.data)
            } catch (error) {
                console.error(error);
            }
        };

        fetchArticle();
    }, [id]);

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


    const [form, setForm] = useState({
        title: '',
        description: '',
        price: '',
        caracteristics: '',
        photo: null,
        stock: '',
        animal: '',
        category: '',
        subCategory: '',
        animalName: '',
        categoryName: '',
        subCategoriesName: ''
    });

    useEffect(() => {
        if (article) {
            setForm ({
                title: article.title,
                description: article.description,
                price: article.price,
                caracteristics: article.caracteristics,
                photo: null,
                stock: article.stock,
                animal: article.animals,
                category: article.categories,
                subCategory: article.subCategories,
                animalName: article.animalsName,
                categoryName: article.categoriesName,
                subCategoriesName: article.subCategoriesName
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
                    formData.append("id", id);
                    formData.append("stock", form.stock);
                    formData.append("animal", form.animal);
                    formData.append("category", form.category);
                    formData.append("subCategory", form.subCategory);
                    formData.append("animalsName", form.animalName);
                    formData.append("categoriesName", form.categoryName);
                    formData.append("subCategoriesName", form.subCategoriesName);

                    if (form.photo) {
                        for (let i = 0; i < form.photo.length; i++) {
                            formData.append("photo", form.photo[i]);
                        }
                    }

                    console.log(form);

                    const response = await axios.put("http://localhost:8000/UpdateArticle", formData);

                    if (response.data === "success") {
                        toast.success("Article modifié !");
                        setTimeout(() => {
                            window.location.href = `http://localhost:3000/articles/${id}`
                        }, 1500);
                    } else {
                        toast.error("Une erreur est survenue");
                    }
                } catch (error) {
                    console.error("Error submitting form:", error);
                    toast.error("Une erreur est survenue lors de la modification de votre article");
                }
            }
        } catch (e) {
            console.log(e);
        }
    };

    if (!article) {
        return (<div>Chargement de l'article</div>)
    }

    return (
        <div>
            <ToastContainer />
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
                    <label htmlFor="stock">Stock (nombre)</label>
                    <input
                        type="number"
                        id="stock"
                        name="stock"
                        value={form.stock}
                        onChange={handleChange}
                        required
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
                    <p>Catégories actuelle :</p>
                    <p>Animal : {article.animalsName}</p>
                    <p>Categorie : {article.categoriesName}</p>
                    <p>Sous-catégorie : {article.subCategoriesName}</p>
                    <div>
                        <p>Pour changer de catégorie, choisir ici :</p>
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
                    <button type="submit" className='border my-5'>Mettre à jour l'article</button>
                </form>
            </div>
        </div>
    );
}