import React from 'react';
import './SobreAlertas.css';
import { FaCircle } from 'react-icons/fa';

const alertas = [
  {
    corCustom: "#22c55e", // verde
    titulo: "Alerta de Cor Verde – Sem perigo",
    pontos: [
      { label: "Situação", texto: "Condições normais do tempo." },
      { label: "Ação", texto: "Não é necessário tomar precauções especiais." }
    ]
  },
  {
    corCustom: "#facc15", // amarelo
    titulo: "Alerta de Cor Amarela – Perigo Potencial",
    pontos: [
      { label: "Situação", texto: "Eventos moderadamente intensos (chuva forte isolada, ventos moderados, etc.)." },
      { label: "Riscos", texto: "Possíveis transtornos localizados (alagamentos pontuais, queda de galhos)." },
      { label: "Ação", texto: "Fique atento às previsões e evite riscos desnecessários." }
    ]
  },
  {
    corCustom: "#fb923c", // laranja corrigido
    titulo: "Alerta de Cor Laranja – Perigo",
    pontos: [
      { label: "Situação", texto: "Fenômenos meteorológicos intensos (chuvas volumosas, vendavais, geadas)." },
      { label: "Riscos", texto: "Danos materiais, riscos à integridade física e deslocamentos." },
      { label: "Ação", texto: "Siga orientações da Defesa Civil, evite áreas de risco e prepare-se para emergências." }
    ]
  },
  {
    corCustom: "#ef4444", // vermelho
    titulo: "Alerta de Cor Vermelha – Grande Perigo",
    pontos: [
      { label: "Situação", texto: "Eventos climáticos extremos e excepcionais (enchentes graves, ciclones, calor/frios extremos)." },
      { label: "Riscos", texto: "Alto potencial de desastre com ameaça à vida e grandes prejuízos." },
      { label: "Ação", texto: "Aja imediatamente. Busque abrigo seguro e acompanhe informações oficiais constantemente." }
    ]
  }
];

const SobreAlertas = () => {
  return (
    <main className='container my-5'>
      <div>
        <h2 className='mb-4'>O que são Alertas Climáticos?</h2>
        <p>
          Alertas climáticos são avisos emitidos por autoridades meteorológicas para informar a população sobre
          condições meteorológicas adversas que podem representar riscos à segurança, à saúde ou à infraestrutura.
        </p>
        <p>
          Esses alertas servem para prevenir acidentes e minimizar danos e geralmente são classificados por cores ou níveis de
          severidade, indicando o grau de perigo. Exemplos:
        </p>
        <ul>
          <li>Tempestades severas: ventos fortes, raios, granizo.</li>
          <li>Chuvas intensas: risco de alagamentos ou deslizamentos.</li>
          <li>Ondas de calor ou frio extremo: riscos à saúde.</li>
          <li>Vendavais ou ciclones: danos materiais e ferimentos.</li>
          <li>Geadas ou secas prolongadas: impacto na agricultura e abastecimento de água.</li>
        </ul>
      </div>

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
