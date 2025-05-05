import React from 'react';
import './Proposito.css';

const Proposito = () => {
  return (
    <main className="proposito-container">
      <section className="proposito-content">
        <h1 className="proposito-title">Propósito</h1>
        <p className="proposito-paragraph">
          O <strong>Alertaê</strong> é um aplicativo desenvolvido com o objetivo de alertar de maneira amigável e eficaz a população sobre condições climáticas adversas, como chuvas fortes, altas temperaturas e outros problemas ambientais que podem representar riscos à saúde e segurança das pessoas.
        </p>
        <p className="proposito-paragraph">
          Com uma interface intuitiva e acessível, o app oferece notificações em tempo real sobre eventos climáticos extremos e fornece recomendações de segurança personalizadas com base na localização do usuário. Além disso, o AlertaÊ tem como missão promover a conscientização ambiental, ajudando os cidadãos a tomarem decisões informadas para proteger sua saúde e bem-estar.
        </p>
        <p className="proposito-paragraph">
          Com o AlertaÊ, a informação chega de forma clara e direta, garantindo que todos possam se preparar e agir com antecedência diante de situações climáticas perigosas.
        </p>
      </section>
    </main>
  );
};

export default Proposito;
