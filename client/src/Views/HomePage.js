import React, {
    useEffect,
    useState
} from "react";
import axios from "axios";
import {
    Link
} from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function HomePage(params) {
    const [articles, setArticles] = useState([]);

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

    var settings = {
        dots: true,
        autoplay: true,
        infinite: true,
        speed: 750,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <div>
            <div className="bg-red-300 text-center p-2">
                <h1>Page d'accueil</h1>
            </div>
            <p className="bg-slate-400 text-center mt-10">
                <Link to='/articles'>Voir les articles</Link>
            </p>
            <div className="bg-red-200 w-1/2 mx-auto mt-10">
                <Slider {...settings}>
                    {articles.map((article) => (
                        <div key={article._id}>
                            <h2 className="text-center text-white text-2xl">{article.title}</h2>
                            {/* <img src={`./../serveur/storage/${article.pictures[0]}`} className="border mx-auto w-full" alt="article img"></img> */}
                            <img src='http://localhost:8000/storage/1lABuXfU7j.jpg' alt="test" />

                            <p className="text-center">{article.description}</p>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    )
}