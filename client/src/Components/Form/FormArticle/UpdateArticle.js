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
    });

    useEffect(() => {

        location.state === null ? setId(window.location.href.split('/')[5]) : setId(location.state.id);

    }, [location])

    useEffect(() => {

        async function fetchArticles() {

            await axios
                .get(`http://localhost:8000/article/${id}`)
                .then(res => {
                    setArticle(res.data)
                    setImg(res.data.pictures)
                })
                .catch(err => console.error(err));
        };

        fetchArticles();
    }, [id])

    useEffect(() => {
        if (article) {
            setForm({
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
                subCategoriesName: article.subCategoriesName,
                recommanded: article.recommanded
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

            e.target.value = '';
        } else if (name === "recommanded") {
            setForm({ ...form, [name]: !form.recommanded })
            setRecommanded(!recommanded);
        } else {
            setForm({ ...form, [name]: value });
        }
    };

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
            button.addEventListener("click", deleteImg);
            button.value = img;

            const imgElement = document.createElement("img");
            imgElement.src = URL.createObjectURL(src[i]);
            imgElement.alt = "imgProduct";
            imgElement.classList.add("w-[50px]", "h-[50px]");

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
    };

    if (!article) {
        return <Loader />
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
                  <Dropdown title={dropdownCat}>
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
                  <Dropdown title="Categorie">
                    <DropdownItem >
                      Choississez un animal
                    </DropdownItem>
                  </Dropdown>
                )}
      
                {selectedCat !== null && catIndex !== null ? (
                  <Dropdown title={dropdownSubCat}>
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
                  <Dropdown title="Sous-catégorie">
                    <DropdownItem >
                      Choississez une catégorie
                    </DropdownItem>
                  </Dropdown>
                )}
              </div>
              {article.pictures.length > 1 ? (
                <div className="flex p-4 justify-evenly test">
                  {article.pictures.map((img) => (
                    <div key={img} className="border cursor-pointer">
                      <button onClick={deleteImg} value={img}>X</button>
                      <img src={`http://localhost:8000/storage/${img}`} alt="imgProduct" className="w-[50px] h-[50px]" />
                    </div>
                  ))}
                </div>
              ) : null}
              <label htmlFor="recommanded">Recommander l'article :</label>
              <input onChange={handleChange} type="checkbox" name="recommanded" checked={recommanded} />
              <button type="submit" className='border my-5'>Mettre à jour l'article</button>
            </form>
          </div>
        </div>
      );      
}