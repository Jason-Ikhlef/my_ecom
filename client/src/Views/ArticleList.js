import React, {
  useEffect,
  useState
} from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// Modifier le to par : /articles/ID
// Mettre la map juste au dessus de la div avec content_border

export default function SimpleSlider() {

  const [articles, setArticles] = useState(null);

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

console.log(articles);

if (!articles) {
  return <p>Chargement des articles</p>;
}

    return (
      <>
      {articles.map((article) => (
        <div key={article._id} className="bg-red-200 w-3/4 mx-auto mt-10 content_border">
          <Link className="w-3/4 mx-auto" to={`/articles/${article._id}`} state={{ id : article._id}}>
            <p className="text-center text-white mb-6 p-2 bg-slate-400">{article.title}</p>
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
      </>
    );
  }
  