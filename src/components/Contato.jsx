import React from "react";
import { BsTelephoneFill, BsEnvelopeFill, BsGeoAltFill } from "react-icons/bs";
import "../styles/Contato.css"; // garanta que esse arquivo exista

function Contato() {
  return (
    <section className="contato-section">
      <div className="contato-container">
        {/* Lado esquerdo com texto e ícones */}
        <div className="contato-info">
          <h2 className="contato-title">Fale Conosco!</h2>
          <div className="linha-azul"></div>
          <p className="contato-text">
            Estamos aqui para ajudar. Se você tiver dúvidas, sugestões ou quiser
            saber mais sobre nossos serviços, envie uma mensagem.
            Retornaremos o mais breve possível!
          </p>

          <div className="contato-item">
            <div className="icon">
              <BsTelephoneFill />
            </div>
            <span>(11) 98765-3210</span>
          </div>

          <div className="contato-item">
            <div className="icon">
              <BsEnvelopeFill />
            </div>
            <span>contato@alertae.com</span>
          </div>

          <div className="contato-item">
            <div className="icon">
              <BsGeoAltFill />
            </div>
            <span>Vila Mariana, São Paulo - SP</span>
          </div>
        </div>

        {/* Lado direito com o formulário */}
        <form className="contato-form">
          <input type="text" placeholder="Nome" required />
          <input type="email" placeholder="Seu melhor e-mail" required />
          <input type="text" placeholder="Assunto" required />
          <textarea placeholder="Mensagem" rows="5" required></textarea>
          <button type="submit">Enviar</button>
        </form>
      </div>
    </section>
  );
}

export default Contato;
