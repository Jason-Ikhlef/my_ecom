import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Dropdown } from "rsuite";
import DropdownItem from "rsuite/esm/Dropdown/DropdownItem";
import Loader from '../../Widgets/Loader';

export default function UpdateArticle({ idArticle }) {

    const [id, setId] = useState('');
    const [article, setArticle] = useState(null);
    const [parentArticle, setParentArticle] = useState(null);
    const [isNew, setIsNew] = useState(false);

    const [recommanded, setRecommanded] = useState(true)
    const [img, setImg] = useState('');

    const [animals, setAnimals] = useState(null);
    const [selectedAnimal, setSelectedAnimal] = useState(null);
    const [selectedCat, setSelectedCat] = useState(null);

    const [animalIndex, setAnimalIndex] = useState(null);
    const [catIndex, setCatIndex] = useState(null);

    const [dropdownAnimals, setDropdownAnimals] = useState("Animaux")
    const [dropdownCat, setDropdownCat] = useState("Categorie")
    const [dropdownSubCat, setDropdownSubCat] = useState("Sous-categorie")
    const [dropDownName, setDropDownName] = useState(null);

    const location = useLocation()

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
        subCategoriesName: '',
        recommanded: false,
        weight: '',
        property: ''  
    });

    useEffect(() => {

        if (idArticle) {
            setId(idArticle);
        } else {
            setId(window.location.href.split('/')[5]);
        }

    }, [idArticle, location])

    useEffect(() => {

        async function fetchArticles() {
            if(!article) {
                await axios
                    .get(`http://localhost:8000/article/${id}`)
                    .then(res => {
                        setParentArticle(res.data);
                        setDropDownName(res.data.articles[0].property);
                        setArticle(res.data.articles[0]);
                        setImg(res.data.articles[0].pictures[0]);
                    })
                    .catch(err => console.error(err));
            }
        };

        fetchArticles();
    }, [article, id])

    useEffect(() => {
        if (article) {
            setForm({
                title: article.title,
                description: article.description,
                price: article.price,
                caracteristics: article.caracteristics,
                stock: article.stock,
                animal: article.animals,
                category: article.categories,
                subCategory: article.subCategories,
                animalName: article.animalsName,
                categoryName: article.categoriesName,
                subCategoriesName: article.subCategoriesName,
                recommanded: article.recommanded,
                weight: article.weight
            })

            setRecommanded(article.recommanded);
        }
    }, [article])

    useEffect(() => {
        async function fetchAnimals() {

            await axios
                .get('http://localhost:8000/categories')
                .then(res => {
                    setAnimals(res.data)
                })
                .catch(err => console.error(err));
        };

        fetchAnimals();

    }, [])

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
            addThumbnail(files);

        } else if (name === "recommanded") {
            setForm({ ...form, [name]: !form.recommanded })
            setRecommanded(!recommanded);
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleArticle = async (article) => {

        try {
            setId(article._id);
            setArticle(article);
            setImg(article.pictures[0]);
            setDropDownName(article.property);

        } catch (error) {
            console.log(error);
            toast.error("Une erreur est survenue");
        }
    }

    const handleAnimals = (animal) => {
        if (animal === "Aucun") {
            setDropdownAnimals("Aucun");
            setForm((prevForm) => ({
                ...prevForm,
                animal: null,
                animalName: null,
                category: null,
                categoryName: null,
                subCategory: null,
                subCategoriesName: null
            }));
            setSelectedAnimal(null);
            setSelectedCat(null)
        } else {
            setDropdownAnimals(animal.name);
            setForm((prevForm) => ({
                ...prevForm,
                animal: animal._id,
                animalName: animal.name,
                category: null,
                categoryName: null,
                subCategory: null,
                subCategoriesName: null
            }));
            setSelectedAnimal(animal._id);
            setSelectedCat(null)
        }
    };

    const handleCat = (cat) => {
        if (cat === "Aucun") {

            setDropdownCat("Aucun");
            setForm((prevForm) => ({
                ...prevForm,
                category: null,
                categoryName: null,
                subCategory: null,
                subCategoriesName: null
            }));
            setSelectedCat(null);
        } else {
            setDropdownCat(cat.name);
            setForm((prevForm) => ({
                ...prevForm,
                category: cat._id,
                categoryName: cat.name,
                subCategory: null,
                subCategoriesName: null
            }));
            setSelectedCat(cat._id);
        }
    };

    const handleSubCat = (subCat) => {
        if (subCat === "Aucun") {
            setDropdownSubCat("Aucun");
            setForm((prevForm) => ({
                ...prevForm,
                subCategory: null,
                subCategoriesName: null
            }));
        } else {
            setDropdownSubCat(subCat.name);
            setForm((prevForm) => ({
                ...prevForm,
                subCategory: subCat._id,
                subCategoriesName: subCat.name
            }));
        }
    };

    const deleteImg = (e) => {
        e.preventDefault();

        let tempArray = [];
        img.forEach(element => {
            if (element !== e.target.value) {
                tempArray.push(element);
            }
        });

        setImg(tempArray);

        e.target.parentNode.remove()
    }

    function addThumbnail(src) {
        for (let i = 0; i < src.length; i++) {

            const newDiv = document.createElement("div");
            newDiv.classList.add("border", "cursor-pointer");

            const button = document.createElement("button");
            button.textContent = "X";
            button.classList.add("z-10", "absolute", "ml-2", "font-bold")
            button.addEventListener("click", deleteImg);
            button.value = img;

            const imgElement = document.createElement("img");
            imgElement.src = URL.createObjectURL(src[i]);
            imgElement.alt = "imgProduct";
            imgElement.classList.add("w-[75px]", "h-[75px]" , "relative","m-3");

            newDiv.appendChild(button);
            newDiv.appendChild(imgElement);

            const ref = document.querySelector(".test");

            ref.appendChild(newDiv);
        }
    }

    const submit = (e) => {
        e.preventDefault();
        if (form.title.length < 3) {
            toast.error("Le titre doit faire plus de 3 caractères");
            return;
        }

        const formData = new FormData();
        formData.append("title", form.title);
        formData.append("description", form.description);
        formData.append("price", form.price);
        formData.append("caracteristics", form.caracteristics);
        formData.append("id", id);
        formData.append("stock", form.stock);
        formData.append("recommanded", form.recommanded);
        formData.append("pictures", img);
        formData.append("groupName", parentArticle.name);
        formData.append("weight", form.weight);

        if (isNew) {
            formData.append("property", form.property)
        }

        if (form.animal === null || form.category === null || form.subCategory === null) {
            formData.append("animal", article.animals);
            formData.append("category", article.categories);
            formData.append("subCategory", article.subCategories);
            formData.append("animalsName", article.animalsName);
            formData.append("categoriesName", article.categoriesName);
            formData.append("subCategoriesName", article.subCategoriesName);
        } else {
            formData.append("animal", form.animal);
            formData.append("category", form.category);
            formData.append("subCategory", form.subCategory);
            formData.append("animalsName", form.animalName);
            formData.append("categoriesName", form.categoryName);
            formData.append("subCategoriesName", form.subCategoriesName);
        }

        if (form.photo) {
            for (let i = 0; i < form.photo.length; i++) {
                formData.append("photo", form.photo[i]);
            }
        }

        if (isNew) {

            axios.put("http://localhost:8000/AddArticle", formData)
            .then(response => {
                if (response.data === "success") {
                    toast.success("Article créé !");
                    setTimeout(() => {
                        window.location.href = `http://localhost:3000/articles/${id}`;
                    }, 1500);
                } else {
                    toast.error("Une erreur est survenue");
                }
            })
            .catch(error => {
                console.error("Error submitting form:", error);
                toast.error("Une erreur est survenue lors de la modification de votre article");
            });
        } else {

            axios.put("http://localhost:8000/UpdateArticle", formData)
                .then(response => {
                    if (response.data === "success") {
                        toast.success("Article modifié !");
                        setTimeout(() => {
                            window.location.href = `http://localhost:3000/articles/${id}`;
                        }, 1500);
                    } else {
                        toast.error("Une erreur est survenue");
                    }
                })
                .catch(error => {
                    console.error("Error submitting form:", error);
                    toast.error("Une erreur est survenue lors de la modification de votre article");
                });
        }
    };

    if (!article) {
        return <Loader />
    }

    return (
        <div>
          <ToastContainer />
          
          <h1 className='text-center my-5'>Mettre à jour l'article</h1>
          <h2 className='text-center my-5 underline'>Les informations soulignées peuvent être modifiées</h2>
          <div className='w-full mx-auto flex flex-col'>
            <form onSubmit={submit} className='flex flex-wrap justify-center gap-8'>
                <div className='border rounded-t-2xl w-2/5'>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      className='bg-[#4FBEB7] text-center text-white p-2 rounded-t-2xl w-full underline'
                      value={form.title}
                      onChange={handleChange}
                      required
                      placeholder="Titre de l'article"
                    />
                    <img src={`http://localhost:8000/storage/${article.pictures[0]}`} className='w-[300px] h-[300px] mx-auto mt-8' alt='img product'></img>
                    <div className='flex justify-evenly'>
                        {article.pictures.length > 0 ? (
                            <div className="flex p-4 justify-evenly w-3/4 test">
                            {article.pictures.map((img) => (
                                <div key={img} className="border cursor-pointer">
                                    <button onClick={deleteImg} value={img} className='z-10 absolute ml-2 font-bold'>X</button>
                                    <img src={`http://localhost:8000/storage/${img}`} alt="imgProduct" className="w-[75px] h-[75px] relative m-3" />
                                </div>
                            ))}
                            </div>
                        ) : null}
                        <div className='my-auto mr-4'>
                            <label
                                htmlFor='photo'
                                className='text-3xl cursor-pointer'
                            >
                                +
                            </label>
                            <input
                                type="file"
                                id="photo"
                                name="photo"
                                onChange={handleChange}
                                className='border w-0 h-0'
                                multiple
                            />
                        </div>
                    </div>
                </div>
                <div className='w-1/3 flex flex-col border p-4'>
                    
                    <label htmlFor="description" className='underline'>Description de l'article</label>
                    <input
                        type="text"
                        id="description"
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        required
                        placeholder="Description de l'article"
                    />
                    <hr className='my-2'></hr>
                    <div className='w-full flex justify-center'>
                        <label htmlFor="price" className='underline'>Prix de l'article</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            className='text-center'
                            value={form.price}
                            onChange={handleChange}
                            required
                            placeholder="Prix de l'article"
                        />
                    </div>
                    <hr className='my-2'></hr>
                    <label htmlFor="caracteristics" className='underline'>Caractéristiques de l'article</label>
                    <input
                        type="text"
                        id="caracteristics"
                        name="caracteristics"
                        value={form.caracteristics}
                        onChange={handleChange}
                        required
                        placeholder="Caractéristiques de l'article"
                    />
                    <hr className='my-2'></hr>
                    <div className='w-full flex justify-center'>
                        <label htmlFor="stock" className='underline'>Stock (nombre)</label>
                        <input
                            type="number"
                            id="stock"
                            name="stock"
                            className='text-center'
                            value={form.stock}
                            onChange={handleChange}
                            required
                            placeholder="Stock (nombre)"
                        />
                    </div>
                    <hr className='my-2'></hr>
                    <p>Catégories actuelle :</p>
                    <div className='p-2 flex justify-evenly'>
                        <p>Animal : {article.animalsName}</p>
                        <p>Categorie : {article.categoriesName}</p>
                        <p>Sous-catégorie : {article.subCategoriesName}</p>
                    </div>
                    <hr className='my-2'></hr>
                    <p className='underline'> Pour changer de catégorie, choisir ici :</p>
                    <div className='p-2 flex justify-evenly'>
                        <Dropdown title={dropdownAnimals} trigger="hover">
                        <DropdownItem onSelect={() => handleAnimals("Aucun")}>
                            Aucun
                        </DropdownItem>
                        {animals.map((animal) => (
                            <DropdownItem key={animal._id} onSelect={() => handleAnimals(animal)}>
                            {animal.name}
                            </DropdownItem>
                        ))}
                        </Dropdown>
            
                        {selectedAnimal !== null && animalIndex !== null ? (
                        <Dropdown title={dropdownCat} trigger="hover">
                            <DropdownItem onSelect={() => handleCat("Aucun")}>
                            Aucun
                            </DropdownItem>
                            {animals[animalIndex].categories.map((animal) => (
                            <DropdownItem key={animal._id} onSelect={() => handleCat(animal)}>
                                {animal.name}
                            </DropdownItem>
                            ))}
                        </Dropdown>
                        ) : (
                        <Dropdown title="Categorie" trigger="hover">
                            <DropdownItem >
                            Choississez un animal
                            </DropdownItem>
                        </Dropdown>
                        )}
            
                        {selectedCat !== null && catIndex !== null ? (
                        <Dropdown title={dropdownSubCat} trigger="hover">
                            <DropdownItem onSelect={() => handleSubCat("Aucun")}>
                            Aucun
                            </DropdownItem>
                            {animals[animalIndex].categories[catIndex].subCategories.map((animal) => (
                            <DropdownItem key={animal._id} onSelect={() => handleSubCat(animal)}>
                                {animal.name}
                            </DropdownItem>
                            ))}
                        </Dropdown>
                        ) : (
                        <Dropdown title="Sous-catégorie" trigger="hover">
                            <DropdownItem >
                            Choississez une catégorie
                            </DropdownItem>
                        </Dropdown>
                        )}
                    </div>
                    <hr className='my-2'></hr>
                    <div className='flex justify-evenly'>                    
                        <label htmlFor="recommanded" className='underline'>Recommander l'article :</label>
                        <input onChange={handleChange} type="checkbox" name="recommanded" checked={recommanded} />
                    </div>
                    <div className='w-full flex justify-center'>
                        <label htmlFor="weight" className='underline'>Poids de l'article</label>
                        <input
                            type="number"
                            id="weight"
                            name="weight"
                            className='text-center'
                            value={form.weight}
                            onChange={handleChange}
                            required
                            placeholder="Poids de l'article"
                        />
                    </div>
                    <div>
                        {!isNew ? (
                            <>
                                <Dropdown title={dropDownName}>
                                    {parentArticle.articles.map((article) => (
                                        <DropdownItem key={article._id} onSelect={() => handleArticle(article)}>
                                            {article.property}
                                        </DropdownItem>
                                    ))}
                                </Dropdown><div onClick={() => setIsNew(true)}>Nouvel attribut</div>
                            </>
                        ) : (
                            <>
                                <label htmlFor="property" className='underline'>Nouvel attribut :</label>
                                <input
                                    type="text"
                                    id="property"
                                    name="property"
                                    value={form.property}
                                    onChange={handleChange}
                                    required
                                    placeholder="Nouvel attribut (poids, couleur, taille...)"
                                />
                            </>
                        )}
                    </div>
                </div>
            <button type="submit" className='border my-5 w-3/4 mx-auto'>Mettre à jour l'article</button>
            </form>
          </div>
        </div>
      );      
}