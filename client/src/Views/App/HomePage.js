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
                </div>
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
