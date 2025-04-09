import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "../styles/Depoimentos.css";

const depoimentos = [
  {
    nome: 'Pedro Antônio Silva',
    imagem: 'https://randomuser.me/api/portraits/men/10.jpg',
    estrelas: 5,
    texto: 'O Alertaê transformou nossa rotina. Agora conseguimos agir rápido diante de emergências na nossa região.',
  },
  {
    nome: 'Ana Clara Ribeiro',
    imagem: 'https://randomuser.me/api/portraits/women/2.jpg',
    estrelas: 5,
    texto: 'Simples, direto e essencial. Recebo alertas de enchente e consigo planejar minha rota com mais segurança.',
  },
  {
    nome: 'Carlos Eduardo Lima',
    imagem: 'https://randomuser.me/api/portraits/men/4.jpg',
    estrelas: 4,
    texto: 'O app é leve, intuitivo e muito útil no dia a dia. As atualizações em tempo real me ajudam muito!',
  }
];

const Depoimentos = () => {
  return (
    <section className="depoimentos-section">
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        speed={800}
      >
        {depoimentos.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="depoimento-card fade-in">
              <img src={item.imagem} alt={item.nome} className="avatar" />
              <h3>{item.nome}</h3>
              <div className="estrelas">
                {'★'.repeat(item.estrelas)}{'☆'.repeat(5 - item.estrelas)}
              </div>
              <p>"{item.texto}"</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Depoimentos;