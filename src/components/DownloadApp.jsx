import React from 'react';
import '../styles/DownloadApp.css';
import appstore from '../assets/appstore.png';
import googleplay from '../assets/googleplay.png';

const DownloadApp = () => {
  return (
    <section className="download-app-section">
      <div className="download-app-content">
        <h2>Baixe o Alertaê em qualquer dispositivo</h2>
        <p>Disponível para iOS e Android. Tenha segurança, praticidade e agilidade na palma da sua mão.</p>

        <div className="download-buttons">
          <a href="#">
            <img src={appstore} alt="Download on App Store" />
          </a>
          <a href="#">
            <img src={googleplay} alt="Get it on Google Play" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default DownloadApp;