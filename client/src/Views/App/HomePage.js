import React, { useState } from "react";
import { Link } from "react-router-dom";
import NewsCarrousel from "../../Components/Carrousel/NewsCarrousel";
import PromotionCarrousel from "../../Components/Carrousel/PromotionCarrousel";
import RecommendCarrousel from "../../Components/Carrousel/RecommendCarrousel";

export default function HomePage(params) {
    const [carrousel, setCarrousel] = useState("news");

    const newsCarrousel = (e) => {
        setCarrousel("news");
    };

    const promotionCarrousel = (e) => {
        setCarrousel("promotion");
    };

    const recommendCarrousel = (e) => {
        setCarrousel("recommend");
    };

    return (
        <div className="h-[780px] flex flex-col justify-evenly items-center">
            <div className="flex justify-evenly w-1/2">
                <p onClick={newsCarrousel}>Nouveautés</p>
                <p onClick={promotionCarrousel}>Promotions</p>
                <p onClick={recommendCarrousel}>Recommendations</p>
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
