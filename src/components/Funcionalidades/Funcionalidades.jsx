import React from 'react';
import {
  FiAlertCircle,
  FiLock,
  FiNavigation,
  FiPhoneCall
} from 'react-icons/fi';
import { FaGraduationCap, FaMedal } from 'react-icons/fa';
import "./Funcionalidades.css";

const Funcionalidades = () => {
  return (
    <section className="funcionalidades-section">
      <div className="funcionalidades-container">
        <h2>Funcionalidades</h2>
        <div className="line-gradientt"></div>
        <p>Descubra tudo o que o Alertaê pode fazer para te manter protegido e informado onde quer que você esteja.</p>

        <div className="funcionalidades-grid">
          <div className="funcionalidade-item">
            <FiAlertCircle className="icon" />
            <h3>Alertas em tempo real</h3>
            <p>Receba avisos sobre enchentes, calor extremo, deslizamentos e outros riscos ambientais da sua região.</p>
          </div>

          <div className="funcionalidade-item">
            <FaGraduationCap className="icon" />
            <h3>Edukaê: Aprenda e ganhe pontos</h3>
            <p>Participe de quizzes educativos e acumule pontos que podem ser trocados por recompensas exclusivas.</p>
          </div>

          <div className="funcionalidade-item">
            <FiNavigation className="icon" />
            <h3>Rotas seguras em emergências</h3>
            <p>Acesse rotas seguras e pontos de apoio durante situações de risco com base em sua localização atual.</p>
          </div>

          <div className="funcionalidade-item">
            <FiPhoneCall className="icon" />
            <h3>Contatos de emergência integrados</h3>
            <p>Ligue rapidamente para polícia, SAMU ou bombeiros com apenas um toque, direto pelo aplicativo.</p>
          </div>

          <div className="funcionalidade-item">
            <FaMedal className="icon" />
            <h3>Recompensas por engajamento</h3>
            <p>Troque seus pontos por brindes, descontos ou ajude ONGs com doações automáticas baseadas na sua pontuação.</p>
          </div>

          <div className="funcionalidade-item">
            <FiLock className="icon" />
            <h3>Segurança, privacidade e controle</h3>
            <p>Suas informações ficam protegidas com criptografia, e você escolhe o que receber e como interagir.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Funcionalidades;



  