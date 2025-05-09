import React from 'react';
import { FaMagic } from "react-icons/fa";
import './InterfaceApp.css';
import mockup3 from '../../assets/mockup3.png';
import mockup4 from '../../assets/mockup4.png';
import mockup5 from '../../assets/mockup5.png';

const InterfaceApp = () => {
  return (
    <section className="interface-app-section">
      <div className="interface-app-content">
        <div className="interface-app-header">
          <div className="interface-app-icon">
            <span className="magic-icon">
              <FaMagic />
            </span>
            Interface Inteligente
          </div>

          <h2>Interface Do App</h2>
          <p>Conheça a experiência completa do aplicativo Alertaê. Modernidade, agilidade e praticidade na palma da sua mão.</p>
        </div>

        <div className="mockups-wrapper">
          <div className="mockup-item side">
            <img src={mockup3} alt="Mockup 1" />
          </div>

          <div className="mockup-item center">
            <img src={mockup4} alt="Mockup 2" />
          </div>

          <div className="mockup-item side">
            <img src={mockup5} alt="Mockup 3" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default InterfaceApp;

