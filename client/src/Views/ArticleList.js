import React, {
  useEffect,
  useState
} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Search from "../assets/search-line.svg"

export default function SimpleSlider() {

  const [articles, setArticles] = useState(null);
  const [searchValue, setSearchValue] = useState(null);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await axios.get('http://localhost:8000/articles');
                setArticles(response.data)
            } catch (error) {
                console.error(error);
            }
        };

        fetchArticles();
    }, []);

  if (!articles) {
    return <p>Chargement des articles</p>;
  }

  async function searchArticle() {

    await axios
    .get(`http://localhost:8000/article/search/${searchValue}`, { withCredentials: true })
    .then(response => {
      setArticles(response.data)
    })
    .catch(err => {
      console.error(err)
    })
  }

    return (
      <div className="scroll">
        <div className="wrap">
          <div className="search border w-1/3 mx-auto my-5 flex justify-between relative ">
              <input type="text" onChange={ (e) => setSearchValue(e.target.value) } className="searchTerm w-full p-2" placeholder="Que cherchez vous ?"></input>
              <button type="submit" onClick={searchArticle} className="searchButton absolute right-0 mr-2 p-2">
                <img src={Search} alt="search icon" className="w-[20px] h-[20px]"></img>
              </button>
          </div>
        </div>
        <button>Name</button>
        <button>Category</button>
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
              </div>
            </Link>
          </div>
        ))}
        </div>
      </div>
    );
  }
  