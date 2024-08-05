import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const Rewards = () => {
  const eventos = [
    {
      images: ["/images/blog1.jpg", "/images/blog1.2.jpg", "/images/blog1.3.jpg"],
      title: "BIENVENIDO A MAZATLAN!",
      subtitle: "Mazatlan Mx",
      author: "ViveViajes",
      date: "Domingo 19 de Marzo 2024",
      description: "Mazatlan lugar maravilloso en lo cual te puedes divertir o relajar segu tus necesidades",
      salida: "Domingo, 12:00am de Plaza san marcos y Chedraui SUR",
      regreso: "Mismo día 8:00pm",
    },
    {
      images: ["/images/blog2.jpg", "/images/blog2.1.jpg", "/images/blog2.3.jpg"],
      title: "SALTO EN PARACAIDAS ¡CUPO LIMITADO!",
      subtitle: "Tequesquitengo y Tepoztlan",
      author: "ViveViajes",
      date: "Domingo 17 de Marzo 2024",
      description: "¡Comienza el año cumpliendo esa lista de cosas que te gustaría hacer y nunca te habías animado, nosotros te acompañamos en esta aventura!",
      salida: "Domingo, 12:00am de Plaza san marcos y Chedraui SUR",
      regreso: "Mismo día 8:00pm",
    },
    {
      images: ["/images/blog3.jpg", "/images/blog3.1.jpg", "/images/blog3.2.jpg"],
      title: "SALTO EN PARACAIDAS ¡CUPO LIMITADO!",
      subtitle: "Tequesquitengo y Tepoztlan",
      author: "ViveViajes",
      date: "𝟏𝟔 𝐀𝐋 𝟏𝟖 𝐃𝐄 𝐌𝐀𝐑𝐙𝐎 𝟐𝟎𝟐𝟒",
      description: "Visitiando Xilitia, Castillo de Edward James, Tamui, Puente de dios y Tamasopo!",
      salida: "Domingo, 12:00am de Plaza san marcos y Chedraui SUR",
      regreso: "Lunes 18, 4:00pm",
    },
    {
      images: ["/images/blog4.jpg", "/images/blog4.1.jpg", "/images/blog4.3.jpg"],
      title: "MUNDO PIXAR! PORQUE USTEDES LO PIDIDIERON",
      subtitle: "Cuidad de Mexico",
      author: "ViveViajes",
      date: "Domingo 17 de Marzo 2024",
      description: "¡Acompáñanos en esta aventura y vive momentos inolvidables en familia en mundo PIXAR en ciudad de mexico!",
      salida: "1:00am de Plaza San marcos y Chedraui Sur Regreso: 9:00pm",
      regreso: "Mismo día 8:00pm",
    },
    {
      images: ["/images/blog5.jpg", "/images/blog5.1.jpg", "/images/blog5.3.jpg"],
      title: "VAMONOS A GRUTAS DE TOLANTONGO",
      author: "ViveViajes",
      date: "𝟐𝟑 𝐲 𝟐𝟒 𝐝𝐞 𝐌𝐚𝐫𝐳𝐨 𝟐𝟎𝟐𝟒",
      description: "¡Primer escapada del año a Grutas de Tolantongo, Esta es tu oportunidad de conocer este Oasis natural, disfruta con nosotros de sus deliciosas aguas termales, río turquesa, cascadas y túneles, dónde te sorprenderán las inmensas maravillas que nos ofrece este lugar!",
      salida: "Viernes 22, 11:00pm de Plaza San Marcos y Chedraui SUR",
      regreso: "Domingo 24, 4:00pm",
    },
    {
      images: ["/images/blog6.jpg", "/images/blog6.1.jpg", "/images/blog6.2.jpg"],
      title: "!DE TOUR POR GUANAJUATO!!",
      author: "ViveViajes",
      date: "𝐃𝐨𝐦𝐢𝐧𝐠𝐨 𝟏𝟐 𝐝𝐞 𝐌𝐚𝐲𝐨 𝟐𝟎𝟐𝟒",
      description: "Acompáñanos en esta aventura por Guanajuato, conocido por su rica historia, arquitectura colonial, cultura vibrante y paisajes pintorescos y considerado como Patrimonio de la Humanidad.",
      salida: "Domingo 12, 9:00am de Plaza San Marcos",
      regreso: "Mismo día 11:00pm",
    },
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <section className="py-16 bg-white text-black">
      <div className="container mx-auto px-4">
        <h2 className="font-bold text-3xl mb-8 text-center">ACTIVIDADES</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {eventos.map((event, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <Slider {...sliderSettings}>
                {event.images.map((img, idx) => (
                  <div key={idx}>
                    <img src={img} alt={`Event ${index} Image ${idx}`} className="w-full h-56 object-cover"/>
                  </div>
                ))}
              </Slider>
              <div className="p-4">
                <h3 className="font-bold text-xl mb-2 text-[#FF6737]">{event.title}</h3>
                <h4 className="text-lg font-semibold mb-2">{event.subtitle}</h4>
                <p className="text-gray-600 mb-2">by {event.author} • <span className="text-gray-500">{event.date}</span></p>
                <p className="text-gray-800 mb-4">{event.description}</p>
                <ul className="list-none text-gray-800">
                  <li className="mb-2">
                    <span className="font-bold">Salida:</span> {event.salida}
                  </li>
                  <li>
                    <span className="font-bold">Regreso:</span> {event.regreso}
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Rewards;