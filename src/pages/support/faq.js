import React, { useState } from 'react';
import { useRouter } from 'next/router';

export default function Destinos() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const router = useRouter();

  const cardDetails = [
    { image: "/images/destinos_bg2.jpg", price: "$1950 MXN", originalPrice: "$2300 MXN", title: "Punta Pérula", description: "Una tranquila y poco conocida playa en la costa de Jalisco." },
    { image: "/images/destinos_bg3.jpg", price: "$1800 MXN", originalPrice: "$2100 MXN", title: "Muruata", description: "Un pequeño pueblo pesquero con impresionantes playas vírgenes." },
    { image: "/images/destinos_bg5.jpg", price: "$950 MXN", originalPrice: "$1200 MXN", title: "Tequila", description: "El lugar de origen de la famosa bebida mexicana." },
    { image: "/images/destinos_bg7.jpg", price: "$2750 MXN", originalPrice: "$3000 MXN", title: "Tepoztlan", description: "Un pueblo mágico conocido por su energía mística." },
    { image: "/images/destinos_bg9.jpg", price: "$1950 MXN", originalPrice: "$2300 MXN", title: "Mundo Pixar", description: "Un parque temático basado en las películas de Pixar." },
    { image: "/images/destinos_bg11.jpg", price: "$950 MXN", originalPrice: "$1200 MXN", title: "Guanajuato", description: "Una ciudad colonial llena de historia, cultura y arquitectura impresionante." },
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
        <h2 className="font-bold text-3xl mb-4 text-[#FF6737]">OFERTAS</h2>
        <p className="text-white mb-12">
          Estas son una de las grandes ofertas que te ofrecemos por ser parte de viveviajes.
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
                <p className="text-red-500 font-bold">
                  <span className="line-through mr-2">{card.originalPrice}</span>
                  {card.price}
                </p>
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
