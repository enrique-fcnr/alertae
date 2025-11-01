import React from "react";
import {
  FiAlertCircle,
  FiLock,
  FiNavigation,
  FiPhoneCall
} from "react-icons/fi";
import { FaGraduationCap, FaMedal } from "react-icons/fa";
import "./Funcionalidades.css";

const features = [
  {
    Icon: FiAlertCircle,
    title: "Alertas em tempo real",
    desc: "Receba avisos sobre enchentes, calor extremo, deslizamentos e outros riscos ambientais da sua região."
  },
  {
    Icon: FaGraduationCap,
    title: "Edukaê: Aprenda e ganhe pontos",
    desc: "Participe de quizzes educativos e acumule pontos que podem ser trocados por recompensas exclusivas."
  },
  {
    Icon: FiNavigation,
    title: "Rotas seguras em emergências",
    desc: "Acesse rotas seguras e pontos de apoio durante situações de risco com base em sua localização atual."
  },
  {
    Icon: FiPhoneCall,
    title: "Contatos de emergência integrados",
    desc: "Ligue rapidamente para polícia, SAMU ou bombeiros com apenas um toque, direto pelo aplicativo."
  },
  {
    Icon: FaMedal,
    title: "Recompensas por engajamento",
    desc: "Troque seus pontos por brindes, descontos ou ajude ONGs com doações automáticas baseadas na sua pontuação."
  },
  {
    Icon: FiLock,
    title: "Segurança, privacidade e controle",
    desc: "Suas informações ficam protegidas com criptografia, e você escolhe o que receber e como interagir."
  }
];

const Funcionalidades = () => {
  return (
    <section className="funcionalidades-section" aria-labelledby="funcionalidades-title">
      <div className="funcionalidades-container">
        <h2 id="funcionalidades-title">Funcionalidades</h2>
        <div className="line-gradientt" aria-hidden="true"></div>
        <p className="section-sub">
          Descubra tudo o que o Alertaê pode fazer para te manter protegido e informado onde quer que você esteja.
        </p>

        <div className="funcionalidades-grid">
          {features.map(({ Icon, title, desc }) => (
            <article className="funcionalidade-item" key={title}>
              <div className="icon-wrapper" aria-hidden="true">
                <Icon className="icon" />
              </div>

              <div className="content">
                <h3>{title}</h3>
                <p>{desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Funcionalidades;
