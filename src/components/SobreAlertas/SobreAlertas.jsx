import React from 'react';
import './SobreAlertas.css';
import { FaCloudShowersHeavy, FaThermometerHalf, FaTint, FaBolt } from 'react-icons/fa';
import { FaCircle } from 'react-icons/fa6';

const alertas = [
  {
    corCustom: "#22c55e",
    titulo: "Alerta de Cor Verde – Sem perigo",
    pontos: [
      { label: "Situação", texto: "Condições normais do tempo." },
      { label: "Ação", texto: "Não é necessário tomar precauções especiais." }
    ]
  },
  {
    corCustom: "#facc15",
    titulo: "Alerta de Cor Amarela – Perigo Potencial",
    pontos: [
      { label: "Situação", texto: "Eventos moderadamente intensos (chuva forte isolada, ventos moderados, etc.)." },
      { label: "Riscos", texto: "Possíveis transtornos localizados (alagamentos pontuais, queda de galhos)." },
      { label: "Ação", texto: "Fique atento às previsões e evite riscos desnecessários." }
    ]
  },
  {
    corCustom: "#fb923c",
    titulo: "Alerta de Cor Laranja – Perigo",
    pontos: [
      { label: "Situação", texto: "Fenômenos meteorológicos intensos (chuvas volumosas, vendavais, geadas)." },
      { label: "Riscos", texto: "Danos materiais, riscos à integridade física e deslocamentos." },
      { label: "Ação", texto: "Siga orientações da Defesa Civil, evite áreas de risco e prepare-se para emergências." }
    ]
  },
  {
    corCustom: "#ef4444",
    titulo: "Alerta de Cor Vermelha – Grande Perigo",
    pontos: [
      { label: "Situação", texto: "Eventos climáticos extremos e excepcionais (enchentes graves, ciclones, calor/frios extremos)." },
      { label: "Riscos", texto: "Alto potencial de desastre com ameaça à vida e grandes prejuízos." },
      { label: "Ação", texto: "Aja imediatamente. Busque abrigo seguro e acompanhe informações oficiais constantemente." }
    ]
  }
];

const exemplos = [
  {
    icone: <FaBolt size={26} className="text-primary" />,
    titulo: "Tempestades severas",
    descricao: "Ventos fortes, raios, granizo."
  },
  {
    icone: <FaCloudShowersHeavy size={26} className="text-primary" />,
    titulo: "Chuvas intensas",
    descricao: "Risco de alagamentos ou deslizamentos."
  },
  {
    icone: <FaThermometerHalf size={26} className="text-primary" />,
    titulo: "Ondas de calor ou frio extremo",
    descricao: "Riscos à saúde."
  },
  {
    icone: <FaTint size={26} className="text-primary" />,
    titulo: "Geadas ou secas prolongadas",
    descricao: "Impacto na agricultura e abastecimento de água."
  }
];

const SobreAlertas = () => {
  return (
    <main className='container my-5'>

      <section className="intro-alertas">
        <h2>O que são Alertas Climáticos?</h2>
        <p>
          Alertas climáticos são avisos emitidos por autoridades meteorológicas para informar a população sobre
          condições meteorológicas adversas que podem representar riscos à segurança, à saúde ou à infraestrutura.
        </p>
        <p>
          Esses alertas servem para prevenir acidentes e minimizar danos e são classificados por níveis de severidade ou indicando o grau de perigo.
        </p>

        <div className="exemplos-grid">
          {exemplos.map((item, index) => (
            <div className="exemplo-card" key={index}>
              <div className="icone-exemplo">{item.icone}</div>
              <h5>{item.titulo}</h5>
              <p>{item.descricao}</p>
            </div>
          ))}
        </div>
      </section>

      <div className='mt-5'>
        <h2>Interpretando os Níveis de Alerta Climático:</h2>
        <p>
          Os níveis de alerta climático geralmente são representados por códigos de cor, indicando a intensidade do fenômeno e o grau de risco.
        </p>
      </div>

      <div className="alertas-grid-2">
        {alertas.map((alerta, index) => (
          <div className="alert-card-upgraded" key={index}>
            <div className="icon-wrapper" style={{ backgroundColor: alerta.corCustom + "20" }}>
              <FaCircle color={alerta.corCustom} size={12} />
            </div>
            <h5>{alerta.titulo}</h5>
            <ul>
              {alerta.pontos.map((ponto, i) => (
                <li key={i}>
                  <strong>{ponto.label}:</strong> {ponto.texto}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </main>
  );
};

export default SobreAlertas;
