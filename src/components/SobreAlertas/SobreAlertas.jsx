import React from 'react';
import './SobreAlertas.css';
import { FaCloudShowersHeavy, FaThermometerHalf, FaTint, FaBolt } from 'react-icons/fa'; // Mantidos ícones relevantes
import { FaCircle, FaArrowRight } from 'react-icons/fa6';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faBolt as faSolidBolt } from '@fortawesome/free-solid-svg-icons'; // Usar faSolidBolt para evitar conflito de nome


const alertas = [
  {
    corCustom: "#22c55e", // Verde
    titulo: "Alerta Verde – Sem Perigo",
    pontos: [
      { label: "Situação", texto: "Condições normais do tempo." },
      { label: "Ação", texto: "Nenhuma precaução especial necessária." } // Texto ligeiramente ajustado
    ]
  },
  {
    corCustom: "#facc15", // Amarelo
    titulo: "Alerta Amarelo – Perigo Potencial",
    pontos: [
      { label: "Situação", texto: "Eventos moderados (chuva isolada, ventos)." }, // Texto resumido
      { label: "Riscos", texto: "Transtornos localizados (alagamentos, galhos)." }, // Texto resumido
      { label: "Ação", texto: "Fique atento às previsões e evite riscos." } // Texto resumido
    ]
  },
  {
    corCustom: "#fb923c", // Laranja
    titulo: "Alerta Laranja – Perigo",
    pontos: [
      { label: "Situação", texto: "Fenômenos intensos (chuvas volumosas, vendavais)." }, // Texto resumido
      { label: "Riscos", texto: "Danos materiais, riscos físicos, deslocamentos." }, // Texto resumido
      { label: "Ação", texto: "Siga Defesa Civil, evite áreas de risco." } // Texto resumido
    ]
  },
  {
    corCustom: "#ef4444", // Vermelho
    titulo: "Alerta Vermelho – Grande Perigo",
    pontos: [
      { label: "Situação", texto: "Eventos extremos (enchentes graves, ciclones)." }, // Texto resumido
      { label: "Riscos", texto: "Alto potencial de desastre, ameaça à vida." }, // Texto resumido
      { label: "Ação", texto: "Aja imediatamente. Busque abrigo seguro." } // Texto resumido
    ]
  }
];

const exemplos = [
  {
    icone: <FaBolt />, // Usando FaBolt importado
    titulo: "Tempestades severas",
    descricao: "Ventos fortes, raios, granizo."
  },
  {
    icone: <FaCloudShowersHeavy />,
    titulo: "Chuvas intensas",
    descricao: "Risco de alagamentos ou deslizamentos."
  },
  {
    icone: <FaThermometerHalf />,
    titulo: "Ondas de calor/frio",
    descricao: "Riscos à saúde."
  },
  {
    icone: <FaTint />,
    titulo: "Secas prolongadas",
    descricao: "Impacto no abastecimento de água."
  }
];

const SobreAlertas = () => {
  return (
    <main className='sobre-alertas-container'>
      {/* Container Glassmorphism */}
      <section className="sobre-alertas-glass-content">

        {/* Seção Intro */}
        <div className='intro-section'>
          <h1 className="main-title">Entenda os Alertas Climáticos</h1>
          <div className="intro-cards-grid">
            {/* Card 1 */}
            <div className="intro-card">
              <div className="intro-card-icon-wrapper warning">
                <FontAwesomeIcon icon={faExclamationTriangle} />
              </div>
              <p className="intro-card-text">
                Alertas climáticos são avisos sobre condições meteorológicas adversas que podem representar riscos à segurança, saúde ou infraestrutura.
              </p>
            </div>
            {/* Card 2 */}
            <div className="intro-card">
              <div className="intro-card-icon-wrapper danger">
                <FontAwesomeIcon icon={faSolidBolt} /> {/* Usando ícone renomeado */}
              </div>
              <p className="intro-card-text">
                Servem para prevenir acidentes e minimizar danos, classificados por níveis de severidade para indicar o grau de perigo.
              </p>
            </div>
          </div>
        </div>

        {/* Seção Exemplos */}
        <div className='section-divider'></div>
        <h2 className="section-title-examples">Exemplos Comuns de Alertas</h2>
        <div className="exemplos-grid">
          {exemplos.map((item, index) => (
            <div className="exemplo-card" key={index}>
              <div className="exemplo-icon-wrapper">
                {item.icone}
              </div>
              <h5>{item.titulo}</h5>
              <p>{item.descricao}</p>
            </div>
          ))}
        </div>

        {/* Seção Níveis de Alerta */}
        <div className='section-divider'></div>
        <h2 className="section-title">Interpretando os Níveis de Alerta</h2>
        <p className='section-subtitle'>
          Os níveis são representados por cores, indicando a intensidade do fenômeno e o grau de risco.
        </p>
        <div className="alertas-grid"> {/* Alterado de alertas-grid-2 */}
          {alertas.map((alerta, index) => (
            <div className="alert-card" key={index}>
              <div className="alert-card-header">
                <div className="alert-icon-wrapper" style={{ backgroundColor: `${alerta.corCustom}30` }}> {/* Fundo com opacidade */}
                  <FaCircle style={{ color: alerta.corCustom }} size={14} />
                </div>
                <h5 className='alerta-card-description'>{alerta.titulo}</h5>
              </div>
              <ul>
                {alerta.pontos.map((ponto, i) => (
                  <li key={i}>
                    <div className='alerta-card-arrows'>
                      <span className='alerta-card-arrows-icon'> <FaArrowRight /></span>
                      {ponto.texto}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

      </section>
    </main>
  );
};

export default SobreAlertas;
