import React, { useEffect, useState } from 'react';
import axios from "axios";
import { toast } from 'react-toastify';
import { Dropdown } from "rsuite";
import DropdownItem from "rsuite/esm/Dropdown/DropdownItem";
import Loader from '../../Widgets/Loader';

export default function DeleteCategory ()
{
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
        subCategory:''
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

    const handleClick = async (e) => {
        e.preventDefault();
        console.log(form);
        try {
          const response = await axios.post("http://localhost:8000/DeleteCategory", form);
          if (response.data === "success") {
            toast.success("Ajout effectué !");
          } else {
            toast.error("Une erreur est survenue");
          }
        } catch (error) {
          console.error("Error submitting form:", error);
          toast.error("Une erreur est survenue lors de la supression de votre catégorie");
        }
    }

    const handleAnimals = (animal) => {
        setDropdownAnimals(animal.name);
        setForm((prevForm) => ({
          ...prevForm,
          animals: animal.name,
        }));
        setSelectedAnimal(animal._id);
      };
      
      const handleCat = (cat) => {
        setDropdownCat(cat.name);
        setForm((prevForm) => ({
          ...prevForm,
          category: cat.name,
        }));
        setSelectedCat(cat._id);
      };
      
      const handleSubCat = (subCat) => {
        setDropdownSubCat(subCat.name);
        setForm((prevForm) => ({
          ...prevForm,
          subCategory: subCat.name,
        }));
      };

      if (!animals) 
        {
            return <Loader />
        }

    return (
        <div>
            <h1 className='text-center my-5'>Créer une catégorie</h1>
            <div className='w-1/2 mx-auto'>
                <form onSubmit={handleClick} className='flex flex-col'>
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
                    <button type="submit" className='border mt-5'>Supprimer</button>
                </form>
            </div>
        </div>
    )
}
