import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Loader from "../../Components/Widgets/Loader";

export default function HomePage(params) {
    const [articles, setArticles] = useState(null);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:8000/slider/"
                );
                setArticles(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchArticles();
    }, []);

    var settings = {
        dots: true,
        autoplay: true,
        infinite: true,
        speed: 750,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    if (!articles) {
        return <Loader />;
    }

    return (
        <div>
            <div className="bg-[#4FBEB7] w-1/2 mx-auto mt-10">
                <Slider {...settings}>
                    {articles.map((article) => (
                        <Link
                            className="w-3/4 mx-auto"
                            to={`/articles/${article._id}`}
                            state={{ id: article._id }}
                            key={article._id}>
                            <div key={article._id}>
                                <h2 className="text-center text-white text-2xl">
                                    {article.title}
                                </h2>
                                <img
                                    src={`http://localhost:8000/storage/${article.pictures[0]}`}
                                    alt="Photo article"
                                    className="w-[200px] mx-auto"
                                />
                                <p className="text-center">
                                    {article.description}
                                </p>
                            </div>
                        </Link>
                    ))}
                </Slider>
            </div>
            <div className="flex justify-center items-center">
                <p className="bg-[#4FBEB7] text-center mt-10 p-2 rounded-xl">
                    <Link to="/articles">Voir les articles</Link>
                </p>
            </div>
        </div>
    );
}
