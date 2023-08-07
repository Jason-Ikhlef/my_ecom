import React from "react";
import { useLocation } from "react-router-dom";

export default function Footer() {
    let location = useLocation();

    return (
        <>
            {location.pathname === "/articles" ||
            location.pathname === "/admin/articles" ? (
                <div className="bg-[#4FBEB7] p-4 flex mt-5 w-full justify-evenly static bottom-0">
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
                        <p>Nous contactez</p>
                    </div>
                </div>
            ) : (
                <div className="bg-[#4FBEB7] p-4 flex mt-5 w-full justify-evenly fixed bottom-0">
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
                        <p>Nous contactez</p>
                    </div>
                </div>
            )}
        </>
    );
}
