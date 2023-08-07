import React from "react";
import axios from "axios";

export default function SubPage() {
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
    <div id="subbutton">
      <div className="text-xl font-semibold mt-4 text-center">
        🛒 Abonnez-vous maintenant et libérez le plein potentiel de vos achats en
        ligne ! 🛒
        </div>
      </div>
    </div>
  );
}
