import React from "react";
import { useLocation } from "react-router-dom";

export default function Footer() {
    let location = useLocation();

    return (
        <>
            {location.pathname === "/articles" ||
            window.location.pathname.includes("/articles/") ||
            location.pathname === "/admin/articles" ||
            location.pathname === "/cart" ? (
                <div className="bg-[#4FBEB7] p-4 flex mt-5 w-full justify-evenly static bottom-0">
                    <div className="flex flex-col">
                        <p>Info 4</p>
                        <p>Info 5</p>
                        <p>Info 6</p>
                    </div>
                    <div className="flex flex-col">
                        <p>Info 4</p>
                        <p>Info 5</p>
                        <p>Info 6</p>
                    </div>
                </div>
            ) : (
                <div className="bg-[#4FBEB7] p-4 flex mt-5 w-full justify-evenly fixed bottom-0">
                    <div className="flex flex-col">
                        <p>Info 1</p>
                        <p>Info 2</p>
                        <p>Info 3</p>
                    </div>
                    <div className="flex flex-col">
                        <p>Info 1</p>
                        <p>Info 2</p>
                        <p>Info 3</p>
                    </div>
                </div>
            )}
        </>
    );
}
