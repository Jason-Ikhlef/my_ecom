import React, { useEffect, useState } from 'react';
import axios from "axios";
import { toast } from 'react-toastify';
import { Dropdown } from "rsuite";
import DropdownItem from "rsuite/esm/Dropdown/DropdownItem";
import Loader from '../../Widgets/Loader';

export default function CreateCategory() {
    const [animals, setAnimals] = useState(null);
    const [selectedAnimal, setSelectedAnimal] = useState(null);
    const [selectedCat, setSelectedCat] = useState(null);

    const [animalIndex, setAnimalIndex] = useState(null);
    const [catIndex, setCatIndex] = useState(null);

    const [dropdownAnimals, setDropdownAnimals] = useState("Animaux")
    const [dropdownCat, setDropdownCat] = useState("Categorie")
    const [dropdownSubCat, setDropdownSubCat] = useState("Sous-categorie")

    const [form, setForm] = useState({
        animals: '',
        category: '',
        subCategory: ''
    });

    useEffect(() => {
        axios
            .get('http://localhost:8000/categories')
            .then(res => {
                setAnimals(res.data);
            })
            .catch(err => console.error(err));

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
        const { name, value } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };

    const handleAnimals = (animal) => {
        if (animal === "Aucun") {
            setDropdownAnimals("Animal");
            setForm((prevForm) => ({
                ...prevForm,
                animals: null,
                category: null,
                subCategory: null
            }));
            setSelectedAnimal(null);
        } else {
            setDropdownAnimals(animal.name);
            setForm((prevForm) => ({
                ...prevForm,
                animals: animal.name,
                category: null,
                subCategory: null
            }));
            setSelectedAnimal(animal._id);
        }

        setSelectedCat(null)
    };

    const handleCat = (cat) => {
        if (cat === "Aucun") {
            setDropdownCat("Aucun")
            setForm((prevForm) => ({
                ...prevForm,
                category: null,
                subCategory: null
            }))
            setSelectedCat(null)
        } else {
            setDropdownCat(cat.name);
            setForm((prevForm) => ({
                ...prevForm,
                category: cat.name,
            }));
            setSelectedCat(cat._id);
        }
    };

    const handleSubCat = (subCat) => {
        if (subCat === "Aucun") {
            setDropdownSubCat("Aucun");
            setForm((prevForm) => ({
                ...prevForm,
                subCategory: null
            }))
        } else {
            setDropdownSubCat(subCat.name);
            setForm((prevForm) => ({
                ...prevForm,
                subCategory: subCat.name,
            }));
        }
    };

    const handleClick = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/NewCategory", form)
            .then(res => {
                if (res.data === "success") {
                    toast.success("Ajout effectué !");
                } else {
                    toast.error("Une erreur est survenue");
                }
            })
            .catch(err => {
                console.error(err);
                toast.error("Une erreur est survenue lors de l'ajout de votre catégorie");
            });
    };

    if (!animals) {
        return <Loader />
    }

    return (
        <div>
            <h1 className='text-center my-5'>Créer une catégorie</h1>
            <div className='w-1/2 mx-auto'>
                <form onSubmit={handleClick} className='flex flex-col'>
                    <div>
                        <label htmlFor="animals">Catégorie d'animal</label>
                        <input
                            type="text"
                            id="animals"
                            name="animals"
                            value={form.animals || ""}
                            onChange={handleChange}
                            required
                            placeholder="Animal"
                            className='border'
                        />
                        <Dropdown title={dropdownAnimals}>
                            <DropdownItem onSelect={() => handleAnimals("Aucun")}>
                                Aucun
                            </DropdownItem>
                            {animals.map((animal) => (
                                <DropdownItem key={animal._id} onSelect={() => handleAnimals(animal)}>
                                    {animal.name}
                                </DropdownItem>
                            ))}
                        </Dropdown>
                    </div>

                    <div>
                        <label htmlFor="category">Nom de la catégorie</label>
                        <input
                            type="text"
                            id="category"
                            name="category"
                            value={form.category  || ""}
                            onChange={handleChange}
                            placeholder="Catégorie"
                            className='border'
                        />
                        {selectedAnimal !== null && animalIndex !== null ? (
                            <Dropdown title={dropdownCat}>
                                <DropdownItem onSelect={() => handleCat("Aucun")}>
                                    Aucun
                                </DropdownItem>
                                {animals[animalIndex].categories.map((category) => (
                                    <DropdownItem key={category._id} onSelect={() => handleCat(category)}>
                                        {category.name}
                                    </DropdownItem>
                                ))}
                            </Dropdown>
                        ) : (
                            <Dropdown title="Categorie">
                                <DropdownItem >
                                    Choississez un animal
                                </DropdownItem>
                            </Dropdown>
                        )}
                    </div>

                    <div>
                        <label htmlFor="subCategory">Sous catégorie</label>
                        <input
                            type="text"
                            id="subCategory"
                            name="subCategory"
                            value={form.subCategory || ""}
                            onChange={handleChange}
                            placeholder="Sous catégorie"
                            className='border'
                        />
                        {selectedCat !== null && catIndex !== null ? (

                            <Dropdown title={dropdownSubCat}>
                                <DropdownItem onSelect={() => handleSubCat("Aucun")}>
                                    Aucun
                                </DropdownItem>
                                {animals[animalIndex].categories[catIndex].subCategories.map((subCategory) => (
                                    <DropdownItem key={subCategory._id} onSelect={() => handleSubCat(subCategory)}>
                                        {subCategory.name}
                                    </DropdownItem>
                                ))}
                            </Dropdown>
                        ) : (
                            <Dropdown title="Sous-catégorie">
                                <DropdownItem >
                                    Choississez une catégorie
                                </DropdownItem>
                            </Dropdown>
                        )}
                    </div>

                    <button type="submit" className='border mt-5'>Créer</button>
                </form>
            </div>
        </div>
    );
}