import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const Users = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

    const lugares = [
      { name: "Puerto Vallarta", percentage: 100, color: "bg-green-500" },
      { name: "Punta Perula", percentage: 70, color: "bg-red-500" },
      { name: "Huasteca", percentage: 40, color: "bg-gray-800" },
      { name: "Cancun", percentage: 60, color: "bg-red-400" },
      { name: "Tequila", percentage: 20, color: "bg-green-300" },
      { name: "Muruata", percentage: 50, color: "bg-gray-600" },
      { name: "Mazatlan", percentage: 85, color: "bg-yellow-500" },
      { name: "Mundo Pixar", percentage: 30, color: "bg-red-600" },
      { name: "Otros", percentage: 10, color: "bg-red-700" }
    ];


  const teamMembers = [
    {
      img: "/images/person_1.jpg",
      name: "Alfredo Ruiz",
      title: "Presidente - Creador y fundador de la empresa",
      role: "Creador y fundador de la empresa",
    },
    {
      img: "/images/person_2.jpg",
      name: "Kassandra Mp",
      title: "Subjefa - Cooperadora de conocimientos para el crecimiento e inversionistas",
      role: "Cooperadora de conocimientos para el crecimiento e inversionistas",
    },
    {
      img: "/images/person_3.jpg",
      name: "Eduardo Martinez",
      title: "Operador - Movimientos terrestres para cualquier lado de la república",
      role: "Movimientos terrestres para cualquier lado de la república",
    }
  ];

  return (
    <>
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <img
              src="/images/acerca1_bg.jpg"
              alt="Acerca de Vive Viajes"
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
          <div className="md:w-1/2 md:pl-8">
            <h2 className="font-bold text-3xl mb-4 text-[#FF6737]">Acerca de la Compañía</h2>
            <p className="text-white mb-6">
              Disfruta de un día totalmente fuera de la rutina, acompáñanos en un distinguido tour a cualquier lugar que prefieras, imagínate acompañado de tu persona favorita, tu familia o tus amigos!
            </p>
            <ul className="list-none space-y-2 text-white">
              <li className="flex items-center">
                <span className="text-[#FF6737] mr-2">✔</span>
                Viaje redondo en autobús
              </li>
              <li className="flex items-center">
                <span className="text-[#FF6737] mr-2">✔</span>
                Seguro de viajero
              </li>
              <li className="flex items-center">
                <span className="text-[#FF6737] mr-2">✔</span>
                Box Lunch
              </li>
              <li className="flex items-center">
                <span className="text-[#FF6737] mr-2">✔</span>
                ¡Viaja Seguro con nosotros!
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-16 bg-black text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-bold text-3xl mb-8">EQUIPO PRINCIPAL</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="mb-4">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-40 h-40 rounded-full object-cover"
                />
              </div>
              <h3 className="font-semibold text-xl">{member.name}</h3>
              <p className="text-white-600">{member.title}</p>
              <p className="text-white-600">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <section className="py-16 bg-black text-white">
      <div className="container mx-auto px-4">
        <h2 className="font-bold text-3xl mb-8 text-center">Porcentaje de lugares más visitados</h2>
        <div className="space-y-4">
          {lugares.map((lugar, index) => (
            <div key={index} className="w-full">
              <div className="flex justify-between mb-1">
                <span className="text-lg ext-white">{lugar.name}</span>
                <span className="text-lg ext-white">{lugar.percentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-6">
                <div
                  className={`h-6 rounded-full ${lugar.color}`}
                  style={{ width: `${lugar.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    </>
  );
};

export default Users;
