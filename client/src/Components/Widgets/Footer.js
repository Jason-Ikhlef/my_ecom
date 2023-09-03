import React from "react";
import { useLocation } from "react-router-dom";

export default function Footer() {
    const location = useLocation();
    const isArticlePage =
        location.pathname === "/articles" ||
        location.pathname === "/admin/articles" ||
        location.pathname === "/SubPage";

    return (
        <div
            className={`bg-[#4FBEB7] p-4 flex mt-5 w-full justify-evenly ${
                isArticlePage ? "relative" : "fixed bottom-0"
            }`}>
            <div>
                <p>Conditions générales d'utilisation</p>
            </div>
            <div>
                <p>©2023 CopainFront</p>
            </div>
            <div>
                <p>Mentions légales</p>
            </div>
            <div>
                <p>Nous contacter</p>
            </div>
        </div>
    );
}
