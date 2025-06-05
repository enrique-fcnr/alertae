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
                        Alertaê: <span>esteja pronto antes, durante e depois do desastre</span>
                    </h1>
                    <p>
                        Do aviso em tempo real à rota segura, o Alertaê prepara você para agir com segurança,
                        aprender sobre prevenção e proteger quem você ama.
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
