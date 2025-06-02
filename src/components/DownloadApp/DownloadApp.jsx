import React from 'react';
import './DownloadApp.css';
import appstore from "../../assets/appstore.png";
import googleplay from "../../assets/googleplay.png";

const DownloadApp = () => {
  return (
    <section className="download-app-section">
      <div className="download-app-content">
        <h2>Baixe o Alertaê em qualquer dispositivo</h2>
        <p>Disponível para iOS e Android. Tenha segurança, praticidade e agilidade na palma da sua mão.</p>

        <div className="download-buttons">
          <a href="https://www.apple.com/br/app-store/" target="_blank" rel="noopener noreferrer">
            <img src={appstore} alt="Download on App Store" />
          </a>
          <a href="https://play.google.com/store/apps?hl=pt_BR" target="_blank" rel="noopener noreferrer">
            <img src={googleplay} alt="Get it on Google Play" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default DownloadApp;