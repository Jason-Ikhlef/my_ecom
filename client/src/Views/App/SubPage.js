import React, { useState } from "react";
import axios from "axios";

export default function SubPage() {
  const [showPopup, setShowPopup] = useState(false);

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-center text-2xl md:text-4xl font-bold mb-6">
        🎉 Découvrez notre tout nouveau service d'abonnement exclusif : [Amazon Prime] ! 🎉
      </h1>

      <p className="text-lg mb-8">
        Vous aimez faire des économies tout en profitant d'une expérience de
        shopping exceptionnelle ? Ne cherchez pas plus loin, notre service
        d'abonnement est conçu pour vous offrir une multitude d'avantages
        incroyables.
      </p>

      <div className="text-xl font-semibold mb-2">
        💰 Frais de port gratuits, à chaque commande 💰
      </div>
      <p className="mb-6">
        Dites adieu aux soucis liés aux frais de livraison ! Avec notre
        abonnement, vous bénéficiez de la livraison gratuite sur chacune de vos
        commandes. Plus besoin de faire des calculs complexes pour savoir si ça
        vaut le coup, car chaque achat devient une opportunité d'économiser.
      </p>

      <div className="text-xl font-semibold mb-2">
        🛍️ Promotions exclusives, rien que pour vous 🛍️
      </div>
      <p className="mb-6">
        En tant que membre privilégié, vous aurez accès à des promotions
        spéciales réservées uniquement aux abonnés. Imaginez pouvoir profiter de
        réductions substantielles sur des articles que vous adorez, chaque fois
        que vous le souhaitez. C'est la porte ouverte à plus de shopping sans
        vous soucier du budget.
      </p>

      <div className="text-xl font-semibold mb-2">
        📦 Livraison prioritaire pour une satisfaction instantanée 📦
      </div>
      <p className="mb-6">
        Avec [Amazon Prime], vous ne devrez plus attendre longtemps pour vos
        colis. Profitez de la livraison prioritaire qui vous garantit une
        satisfaction instantanée. Vos produits préférés seront entre vos mains en
        un rien de temps.
      </p>

      <div className="text-xl font-semibold mb-2">
        🎁 Accès en avant-première aux nouveautés 🎁
      </div>
      <p className="mb-6">
        Soyez à la pointe de la tendance grâce à notre accès exclusif aux
        nouveaux produits. Soyez parmi les premiers à découvrir et à posséder
        les dernières trouvailles dans le monde du shopping en ligne.
      </p>

      <div className="text-xl font-semibold mb-2">
        🔒 Sécurité et flexibilité garanties 🔒
      </div>
      <p className="mb-6">
        Votre tranquillité d'esprit est notre priorité. Gérez facilement votre
        abonnement, mettez-le en pause ou annulez-le à tout moment. Nous avons
        conçu ce service pour s'adapter à vos besoins, car votre satisfaction est
        ce qui compte le plus.
      </p>

      <p className="text-xl mt-4">
        Ne laissez pas passer cette opportunité de transformer votre expérience
        d'achat en quelque chose d'extraordinaire. Rejoignez la communauté [Amazon Prime] dès aujourd'hui et commencez à profiter
        des avantages instantanément !
      </p>
      
      <div id="subbutton" onClick={openPopup} className="cursor-pointer">
        <div className="text-xl font-semibold mt-4 text-center">
          🛒 Abonnez-vous maintenant et libérez le plein potentiel de vos achats en ligne ! 🛒
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-10">
          <div className="bg-white rounded-lg p-8 max-w-md w-full shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Choisissez un abonnement</h2>
            <div className="flex gap-6">
              <div className="bg-blue-100 p-4 rounded-lg flex-1">
                <h3 className="text-lg font-semibold mb-2">Abonnement Mensuel</h3>
                <p className="text-gray-600">12€/mois</p>
                <button className="mt-2 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300">
                  S'abonner au mois
                </button>
              </div>
              <div className="bg-green-100 p-4 rounded-lg flex-1">
                <h3 className="text-lg font-semibold mb-2">Abonnement Annuel</h3>
                <p className="text-gray-600">120€/an</p>
                <button className="mt-2 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300">
                  S'abonner à l'année
                </button>
              </div>
            </div>
            <button
              onClick={closePopup}
              className="mt-6 w-full bg-gray-300 text-gray-800 py-2 rounded-lg hover:bg-gray-400 transition duration-300"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}