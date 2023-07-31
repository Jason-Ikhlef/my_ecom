import React, {
  useEffect,
  useState
} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Search from "../assets/search-line.svg";
import { Dropdown } from "rsuite";
import DropdownItem from "rsuite/esm/Dropdown/DropdownItem";

export default function SimpleSlider() {

  const [articles, setArticles] = useState(null);
  const [searchValue, setSearchValue] = useState(null);

  const [animals, setAnimals] = useState(null);
  const [dropdownAnimals, setDropdownAnimals] = useState("Animaux");

  const [form, setForm] = useState({
    animals: '',
    search: ''
  });

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        let response = await axios.get('http://localhost:8000/articles');
        setArticles(response.data)
        response = await axios.get('http://localhost:8000/categories');
        setAnimals(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchArticles();
  }, []);

  if (!articles) {
    return <p>Chargement des articles</p>;
  }

  async function searchArticle(e) {

    console.log(form);
    e.preventDefault();
    await axios
      .post(`http://localhost:8000/article/search`, form, {
        withCredentials: true
      })
      .then(response => {
        setArticles(response.data)
      })
      .catch(err => {
        console.error(err)
      })
  }

  const handleAnimals = (animal) => {
    if (animal === "Aucun") {
      setDropdownAnimals("Aucun");
      setForm((prevForm) => ({
        ...prevForm,
        animals: "",
      }));
    } else {
      setDropdownAnimals(animal.name);
      setForm((prevForm) => ({
        ...prevForm,
        animals: animal.name,
      }));
    }
  };

  const handleChange = (e) => {
    setForm((prevForm) => ({
      ...prevForm,
      search: e.target.value
    }));
  }


  if (!animals) {
    return(
      <div>Chargement des catégories</div>
    )
  }

  return (
    <div className="scroll">
      <div className="wrap">
        <form onSubmit={searchArticle} className="search border w-1/3 mx-auto my-5 flex justify-between relative">
          <div>
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
          <input
            type="text"
            onChange={handleChange}
            className="searchTerm w-full p-2"
            placeholder="Que cherchez vous ?" />
          <button type="submit" className="searchButton absolute right-0 mr-2 p-2">
            <img src={Search} alt="search icon" className="w-[20px] h-[20px]" />
          </button>
        </div>
      </div>
      <button>Name</button><button>Category</button>
      <div className="flex w-full lg:w-3/4 mx-auto justify-center flex-wrap gap-8 rounded-xl">
        {articles.map((article) => (
          <div key={article._id} className=" w-3/4 lg:w-1/6 border rounded-xl ">
            <Link className="w-3/4 mx-auto" to={`/articles/${article._id}`} state={{ id : article._id}}>
              <p className="text-center text-white mb-6 p-2 bg-[#4FBEB7] rounded-t-xl">{article.title}</p>
              <img src={`http://localhost:8000/storage/${article.pictures[0]}`} className="w-[200px] mx-auto" alt="article img"></img> 
              <p className="text-center my-10">{article.description}</p>
              <div className="flex justify-around pb-5">
                {/* pour etat : article.state */}
                <p>Stock: {article.stock}</p>
                <p>{article.price} €</p>
                <p>{article.caracteristics}</p>
              {/* <p>{article.animalsName}</p>
            <p>{article.categoriesName}</p>
            <p>{article.subCategoriesName}</p> */}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}