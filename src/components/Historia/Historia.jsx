import React from 'react';
import './Historia.css';

const Historia = () => {
  return (
    <main className="historia-container">
      <section className="historia-content">
        <h1 className="historia-title">Quem somos</h1>

        <p className="historia-paragraph">
          O <strong>Alertaê</strong> foi uma empresa criada por alunos do curso de Engenharia de Software da FIAP com a missão de informar e proteger. Desenvolvido para alertar a população sobre condições climáticas adversas — como chuvas intensas, ondas de calor e outros fenômenos ambientais de risco — o Alertaê combina tecnologia, acessibilidade e responsabilidade social para garantir que as pessoas estejam sempre preparadas.
        </p>

        <p className="historia-paragraph">
          Nosso compromisso é entregar informações confiáveis e em tempo real, com uma abordagem amigável e compreensível. Por meio de uma interface intuitiva, o app envia notificações instantâneas sobre eventos climáticos extremos e orientações personalizadas de segurança, levando em conta a localização do usuário.
        </p>

        <p className="historia-paragraph">
          Mais do que um serviço de alerta, o Alertaê é uma iniciativa de conscientização ambiental. Acreditamos que o acesso à informação é essencial para a prevenção de riscos, o cuidado com a saúde e o fortalecimento de comunidades mais resilientes.
        </p>

        <p className="historia-paragraph">
          Com o Alertaê, você fica bem informado, seguro e preparado para enfrentar os desafios que o clima pode trazer.
        </p>
      </section>
    </main>
  );
};

export default Historia;
