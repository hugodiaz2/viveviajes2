import React, { useState } from 'react';
import { useRouter } from 'next/router';

export default function Destinos() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const router = useRouter();

  const cardDetails = [
    { image: "/images/destinos_bg1.jpg", price: "$1900 MXN", title: "Sayulita, MX", description: "Es un destino popular para los amantes del surf y el yoga." },
    { image: "/images/destinos_bg2.jpg", price: "$1950 MXN", title: "Punta Pérula", description: "Una tranquila y poco conocida playa en la costa de Jalisco." },
    { image: "/images/destinos_bg3.jpg", price: "$1800 MXN", title: "Muruata", description: "Un pequeño pueblo pesquero con impresionantes playas vírgenes." },
    { image: "/images/destinos_bg4.jpg", price: "$2000 MXN", title: "Mazatlan", description: "Una animada ciudad costera conocida por su malecón y playas extensas." },
    { image: "/images/destinos_bg5.jpg", price: "$950 MXN", title: "Tequila", description: "El lugar de origen de la famosa bebida mexicana." },
    { image: "/images/destinos_bg6.jpg", price: "$2550 MXN", title: "Mazamitla", description: "Un encantador pueblo de montaña conocido como la Suiza Mexicana." },
    { image: "/images/destinos_bg7.jpg", price: "$2750 MXN", title: "Tepoztlan", description: "Un pueblo mágico conocido por su energía mística." },
    { image: "/images/destinos_bg8.jpg", price: "$2550 MXN", title: "Huasteca", description: "Una región con espectaculares paisajes naturales, incluyendo cascadas." },
    { image: "/images/destinos_bg9.jpg", price: "$1950 MXN", title: "Mundo Pixar", description: "Un parque temático basado en las películas de Pixar." },
    { image: "/images/destinos_bg10.jpg", price: "$1950 MXN", title: "Talantongo", description: "Un impresionante conjunto de cuevas y aguas termales en un cañón." },
    { image: "/images/destinos_bg11.jpg", price: "$950 MXN", title: "Guanajuato", description: "Una ciudad colonial llena de historia, cultura y arquitectura impresionante." },
    { image: "/images/destinos_bg12.jpg", price: "$4500 MXN", title: "Puerto Vallarta", description: "Un popular destino turístico en la costa del Pacífico." }
  ];

  const openModal = (card) => {
    setSelectedCard(card);
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedCard(null);
    setModalVisible(false);
  };

  const handleReserveClick = () => {
    router.push(`/fees?title=${encodeURIComponent(selectedCard.title)}&price=${encodeURIComponent(selectedCard.price)}`);
  };

  return (
    <section className="py-16 text-black">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-bold text-3xl mb-4 text-[#FF6737]">DESTINOS</h2>
        <p className="text-white mb-12">
          Algunos de nuestros lugares listos para visitar y pasar un tiempo.
        </p>
        <div className="grid gap-8 md:grid-cols-3">
          {cardDetails.map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-md cursor-pointer"
              onClick={() => openModal(card)}
            >
              <img
                src={card.image}
                alt={card.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <p className="text-red-500 font-bold">{card.price}</p>
                <h3 className="font-semibold text-xl">{card.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {modalVisible && selectedCard && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-8 max-w-md mx-auto">
            <h3 className="font-bold text-2xl mb-4">{selectedCard.title}</h3>
            <p className="text-gray-600 mb-4">{selectedCard.description}</p>
            <img src={selectedCard.image} alt={selectedCard.title} className="w-full h-auto mb-4" />
            <div className="flex justify-end space-x-4">
              <button className="px-4 py-2 bg-red-500 text-white rounded" onClick={closeModal}>Cerrar</button>
              <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={handleReserveClick}>Reservar</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
