import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img from '../assets/garden-path-ge6d499b25_640.jpg';
import img2 from '../assets/martial-arts-gd36c1998a_640.jpg';
import img3 from '../assets/Support.jpg'

export default function HomePage (params) 
{
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
                    <div>
                        <h2 className="text-center text-white text-2xl">Titre de l'article</h2>
                        <img src={img} className="border mx-auto w-full" alt="article img"></img>
                        <p className="text-center">Contenu de l'article</p>
                    </div>
                    <div>
                        <h2 className="text-center text-white text-2xl">Titre de l'article</h2>
                        <img src={img2} className="border mx-auto w-full" alt="article img"></img>
                        <p className="text-center">Contenu de l'article</p>
                    </div>
                    <div>
                        <h2 className="text-center text-white text-2xl">Titre de l'article</h2>
                        <img src={img3} className="border mx-auto w-full" alt="article img"></img>
                        <p className="text-center">Contenu de l'article</p>
                    </div>
                </Slider>
            </div>
        </div>
    )
}
