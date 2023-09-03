import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import NewsCarrousel from "../../Components/Carrousel/NewsCarrousel";
import PromotionCarrousel from "../../Components/Carrousel/PromotionCarrousel";
import RecommendCarrousel from "../../Components/Carrousel/RecommendCarrousel";

export default function HomePage(params) {
    const [carrousel, setCarrousel] = useState("news");
    const [getPromo, setGetPromo] = useState(null);
    const [articles, setArticles] = useState(null);

    const newsCarrousel = (e) => {
        setCarrousel("news");
    };

    const promotionCarrousel = (e) => {
        setCarrousel("promotion");
    };

    const recommendCarrousel = (e) => {
        setCarrousel("recommend");
    };

    useEffect(() => {
        axios.get("http://localhost:8000/get_promotions").then((res) => {
            if (res.data.salePeriod === true) {
                setGetPromo(res.data.salePeriod);
            }
        });
    });

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:8000/slider/promotions", 
                );
                setArticles(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchArticles();
    }, []);

    return (
        <div className="h-[780px] flex flex-col justify-evenly items-center">
            <div
                id="carrouselSwitchButton"
                className="flex justify-evenly w-1/2">
                <div>
                    <p
                        onClick={newsCarrousel}
                        className={`cursor-pointer ${
                            carrousel === "news"
                                ? "underline decoration-[#4FBEB7] underline-offset-[5px] decoration-4"
                                : ""
                        }`}>
                        Nouveautés
                    </p>
                </div>
                {
                    getPromo || articles && articles.length !== 0 ? 
                    <div>
                        <p
                            onClick={promotionCarrousel}
                            className={`cursor-pointer ${
                                carrousel === "promotion"
                                    ? "underline decoration-[#4FBEB7] underline-offset-[5px] decoration-4"
                                    : ""
                            }`}>
                            Promotions
                        </p>
                    </div> : null
                }
                <div>
                    <p
                        onClick={recommendCarrousel}
                        className={`cursor-pointer ${
                            carrousel === "recommend"
                                ? "underline decoration-[#4FBEB7] underline-offset-[5px] decoration-4"
                                : ""
                        }`}>
                        Recommendations
                    </p>
                </div>
            </div>
            {carrousel === "recommend" ? (
                <RecommendCarrousel />
            ) : carrousel === "promotion" ? (
                <PromotionCarrousel />
            ) : (
                <NewsCarrousel />
            )}
            <div className="flex justify-center items-center">
                <Link
                    to="/articles"
                    className="bg-[#4FBEB7] text-center mt-10 p-2 rounded-xl">
                    <p>Voir les articles</p>
                </Link>
            </div>
        </div>
    );
}
