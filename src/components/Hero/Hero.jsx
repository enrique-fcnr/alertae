import React from "react";
import "./Hero.css"
import mockup1 from "../../assets/mockup1.png";
import mockup2 from "../../assets/mockup2.png";

const Hero = () => {
    return (
        <section className="hero">
            <div className="hero-content">
                <div className="hero-text">
                    <h1>
                        Alertaê: <span>proteção em tempo real na palma da mão</span>
                    </h1>
                    <p>
                    Receba alertas de emergências climáticas e mantenha a sua família sempre em segurança.
                    Tome decisões assertivas com informações confiáveis e rotas seguras, direto no seu celular.
                    </p>
                    <div className="hero-buttons">
                        <a href="https://youtu.be/Rf00FlAprcY" className="btn-primary">Assitir Pitch</a>
                        <a href="https://googleplay.com" className="btn-outline" target="_blank" rel="noopener noreferrer">Baixar o App </a>
                    </div>
                </div>

                <div className="hero-mockups">
                    <img src={mockup2} alt="Mockup 2" className="mockup mockup-back" />
                    <img src={mockup1} alt="Mockup 1" className="mockup mockup-front" />
                </div>
            </div>
        </section>
    );
};

export default Hero;
