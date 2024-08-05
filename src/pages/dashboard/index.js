import React from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Dashboard() {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">HOME</h1>
      {/* Slider Section */}
      <section className="py-20 w-full">
        <Slider {...sliderSettings}>
          <div className="relative">
            <img src="/images/index_bg_1.jpg" alt="Conocenos" className="w-full h-auto" />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center text-white">
              <h2 className="text-4xl font-bold">CONOCENOS</h2>
              <p className="text-lg max-w-lg mx-auto mt-4">
                Sumérgete en un viaje digital a través de las maravillas naturales de nuestro planeta. Desde las profundidades del océano hasta las cimas de las montañas más altas, descubre la belleza y la diversidad de la naturaleza a través de imágenes cautivadoras, vídeos fascinantes y relatos inspiradores.
              </p>
              <button className="mt-6 px-4 py-2 bg-red-500 text-white rounded">Acerca De</button>
            </div>
          </div>
          <div className="relative">
            <img src="/images/index_bg_2.jpg" alt="Conocenos" className="w-full h-auto" />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center text-white">
              <h2 className="text-4xl font-bold">CONOCENOS</h2>
              <p className="text-lg max-w-lg mx-auto mt-4">
                Sumérgete en un viaje digital a través de las maravillas naturales de nuestro planeta. Desde las profundidades del océano hasta las cimas de las montañas más altas, descubre la belleza y la diversidad de la naturaleza a través de imágenes cautivadoras, vídeos fascinantes y relatos inspiradores.
              </p>
              <button className="mt-6 px-4 py-2 bg-red-500 text-white rounded">Acerca De</button>
            </div>
          </div>

          <div className="relative">
            <img src="/images/index_bg_3.jpg" alt="Conocenos" className="w-full h-auto" />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center text-center text-white">
              <h2 className="text-4xl font-bold">CONOCENOS</h2>
              <p className="text-lg max-w-lg mx-auto mt-4">
                Sumérgete en un viaje digital a través de las maravillas naturales de nuestro planeta. Desde las profundidades del océano hasta las cimas de las montañas más altas, descubre la belleza y la diversidad de la naturaleza a través de imágenes cautivadoras, vídeos fascinantes y relatos inspiradores.
              </p>
              <button className="mt-6 px-4 py-2 bg-red-500 text-white rounded">Acerca De</button>
            </div>
          </div>


        </Slider>
      </section>

      <section>
        <div className="min-h-screen flex flex-col bg-black text-white">
          <main className="flex-grow container mx-auto px-4 py-16">
            <h1 className="font-bold text-[40px] font-montserrat text-center mb-8 text-[#FF6737]">
              ViveViajes!
            </h1>
            <p className="text-left font-bold font-montserrat mb-16 text-[16px]">
              G-Play is your ultimate destination for connecting, exploring, and
              experiencing new adventures. Whether you're looking to meet new
              people, discover exciting events, or simply expand your social circle,
              G-Play makes it all possible in one vibrant, dynamic platform.
            </p>
            <div className="grid md:grid-cols-2 gap-10 mb-12">
              <div className="flex flex-col items-center text-center md:items-start md:text-left">
                <div className="w-full">
                  <h2 className="font-bold font-montserrat mb-4 text-[20px]">
                    Bienvenido a ViveViajes
                  </h2>
                  <p className="text-[14px] font-montserrat mb-4">
                    ¡Bienvenido a ViveViajes, tu puerta de entrada a aventuras inolvidables en México y más allá!
                    Nuestro equipo de expertos en viajes está dedicado a brindarte el mejor servicio, 
                    desde la planificación personalizada hasta la atención detallada durante tu viaje.
                  </p>
                </div>
                <div className="w-full">
                  <img
                    src="/images/indexb1.jpg"
                    alt="Discover Events"
                    className="w-full h-auto mb-4"
                  />
                </div>
              </div>
              <div className="flex flex-col items-center text-center md:items-start md:text-left">
                <div className="w-full">
                  <h2 className="font-bold font-montserrat mb-4 text-[20px]">
                    Ofertas Disponibles
                  </h2>
                  <p className="text-[14px] font-montserrat mb-4">
                    Explora nuestro sitio para descubrir una amplia gama de paquetes de viaje, 
                    desde escapadas de fin de semana hasta aventuras épicas de varios días. 
                    ¡Cada viaje está diseñado para satisfacer tus deseos y presupuesto!
                    En ViveViajes, no solo vendemos viajes, creamos recuerdos inolvidables. 
                  </p>
                </div>
                <div className="w-full">
                  <img
                    src="/images/indexb2.jpg"
                    alt="Discover Events"
                    className="w-full h-auto mb-4"
                  />
                </div>
              </div>
            </div>
          </main>
        </div>
      </section>
      <section className="py-16 text-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-bold text-3xl mb-4 text-[#FF6737]">Nuestros Viajes</h2>
          <p className="text-white mb-12">
            Checa alguno de nuestros lugares más visitados en este apartado <span className="text-[#FF6737]">destinos</span>.
          </p>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <img
                src="/images/destinos_bg1.jpg"
                alt="Sayulita, MX"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <p className="text-red-500 font-bold">$1900 MXN</p>
                <h3 className="font-semibold text-xl">Sayulita, MX</h3>
              </div>
            </div>
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <img
                src="/images/destinos_bg2.jpg"
                alt="Punta Pérula"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <p className="text-red-500 font-bold">$1950 MXN</p>
                <h3 className="font-semibold text-xl">Punta Pérula</h3>
              </div>
            </div>
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <img
                src="/images/destinos_bg3.jpg"
                alt="Muruata"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <p className="text-red-500 font-bold">$1800 MXN</p>
                <h3 className="font-semibold text-xl">Muruata</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50 text-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-bold text-3xl mb-4 text-[#FF6737]">Nuestros servicios</h2>
          <p className="text-gray-600 mb-12">
            ViveViajes ofrece una gran variedad de servicios para tus necesidades de viaje,
            te presentamos algunas de ellas.
          </p>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <img
                src="/images/icon1.png"
                alt="Paquetes Tour"
                className="w-12 h-12 mb-4"
              />
              <h3 className="font-semibold text-xl mb-2">Paquetes Tour</h3>
              <p className="text-gray-600 mb-4">
                Variedad de viajes, excursiones con gran diversidad de experiencias únicas.
              </p>
              <a href="#" className="text-[#FF6737] font-semibold">Más información</a>
            </div>
            <div className="flex flex-col items-center text-center">
              <img
                src="/images/icon2.png"
                alt="Hoteles"
                className="w-12 h-12 mb-4"
              />
              <h3 className="font-semibold text-xl mb-2">Hoteles</h3>
              <p className="text-gray-600 mb-4">
                Diversidad de alojamientos para tu comodidad, llámanos vía Whatsapp.
              </p>
              <a href="#" className="text-[#FF6737] font-semibold">Más información</a>
            </div>
            <div className="flex flex-col items-center text-center">
              <img
                src="/images/icon3.png"
                alt="Exploración al mar"
                className="w-12 h-12 mb-4"
              />
              <h3 className="font-semibold text-xl mb-2">Exploración al mar</h3>
              <p className="text-gray-600 mb-4">
                Experiencias con entretenimiento y diversión al mar.
              </p>
              <a href="#" className="text-[#FF6737] font-semibold">Más información</a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

Dashboard.getLayout = function getLayout(page) {
  return page;
}
