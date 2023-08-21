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
            <div
                id="carrouselSwitchButton"
                className="flex justify-evenly w-1/2">
                <div
                    className={`border border-transparent ${
                        carrousel === "news"
                            ? "border-4 border-b-[#4FBEB7] rounded"
                            : ""
                    }`}>
                    <p onClick={newsCarrousel} className="cursor-pointer">
                        Nouveautés
                    </p>
                </div>
                <div
                    className={`border border-transparent ${
                        carrousel === "promotion"
                            ? "border-4 border-b-[#4FBEB7] rounded"
                            : ""
                    }`}>
                    <p onClick={promotionCarrousel} className="cursor-pointer">
                        Promotions
                    </p>
                </div>
                <div
                    className={`border border-transparent ${
                        carrousel === "recommend"
                            ? "border-4 border-b-[#4FBEB7] rounded"
                            : ""
                    }`}>
                    <p onClick={recommendCarrousel} className="cursor-pointer">
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
