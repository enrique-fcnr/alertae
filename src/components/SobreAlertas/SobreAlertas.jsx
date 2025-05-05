import React from 'react';
import { FaCircle } from "react-icons/fa";


const SobreAlertas = () => {
  return (
    <main className='container my-5'>
      <div>
        <h2 className='mb-4'>O que são Alertas Climáticos?</h2>
        <p>
          Alertas climáticos são avisos emitidos por autoridades meteorológicas (como o INMET no Brasil ou o NOAA nos EUA) para
          informar a população sobre condições meteorológicas adversas que podem representar riscos à segurança, à saúde ou à
          infraestrutura.
        </p>
        <p>
          Esses alertas servem para prevenir acidentes e minimizar danos e geralmente são classificados por cores ou níveis de
          severidade, indicando o grau de perigo. Alguns exemplos comuns de alertas climáticos incluem:
        </p>
        <ul>
          <li>Tempestades severas: ventos fortes, raios, granizo.</li>
          <li>Chuvas intensas: risco de alagamentos ou deslizamentos.</li>
          <li>Ondas de calor ou frio extremo: riscos à saúde.</li>
          <li>Vendavais ou ciclones: risco de danos materiais e ferimentos.</li>
          <li>Geadas ou secas prolongadas: impacto na agricultura e no abastecimento de água.</li>
        </ul>
      </div>
      <div>
        <h2>Interpretando os Níveis de Alerta Climático:</h2>
        <p>
          Os níveis de alerta climático geralmente são representados por códigos de cor para indicar a intensidade do fenômeno e o
          grau de risco. No Brasil, o INMET (Instituto Nacional de Meteorologia) utiliza os padrões descritos abaixo:
        </p>
      </div>

      {/* Cards */}
      <div className='row d-flex w-full'>
        {/* Card 1 */}
        <div className='card mb-3' style={{ maxWidth: '540px' }}>
          <div className='row g-0'>
            <div className='col-md-2 d-flex justify-content-center mt-4 '>
              <FaCircle className='icon-circle text-success fs-5' />
            </div>
            <div className='col-md-8'>
              <div className='card-body'>
                <h5 className='card-title mb-4'>Alerta de Cor Verde – Sem perigo</h5>
                <ul>
                  <li><strong>Situação: </strong>Condições normais do tempo.</li>
                  <li><strong>Ação: </strong>Não é necessário tomar precauções especiais.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className='card mb-3' style={{ maxWidth: '540px' }}>
          <div className='row g-0'>
            <div className='col-md-2 d-flex justify-content-center mt-4 '>
              <FaCircle className='icon-circle text-warning fs-5' />
            </div>
            <div className='col-md-8'>
              <div className='card-body'>
                <h5 className='card-title mb-4'>Alerta de Cor Amarela – Perigo Potencial</h5>
                <ul>
                  <li><strong>Situação: </strong>Eventos moderadamente intensos (chuva forte isolada, ventos moderados, etc.).</li>
                  <li><strong>Riscos: </strong>Possíveis transtornos localizados (alagamentos pontuais, queda de galhos).</li>
                  <li><strong>Ação: </strong>Fique atento às previsões e evite riscos desnecessários.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cards 3 e 4 */}
      <div className='row d-flex'>
        {/* Card 3 */}
        <div className='card mb-3' style={{ maxWidth: '540px' }}>
          <div className='row g-0'>
            <div className='col-md-2 d-flex justify-content-center mt-4 '>
              <FaCircle className='icon-circle fs-5' style={{ color: "orange" }} />
            </div>
            <div className='col-md-8'>
              <div className='card-body'>
                <h5 className='card-title mb-4'>Alerta de Cor Laranja – Perigo</h5>
                <ul>
                  <li><strong>Situação: </strong>Fenômenos meteorológicos intensos (chuvas volumosas, vendavais, geadas).</li>
                  <li><strong>Riscos: </strong>Danos materiais, riscos à integridade física e deslocamentos.</li>
                  <li><strong>Ação: </strong>Siga orientações da Defesa Civil, evite áreas de risco e prepare-se para emergências.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div className='card mb-3' style={{ maxWidth: '540px' }}>
          <div className='row g-0'>
            <div className='col-md-2 d-flex justify-content-center mt-4 '>
              <FaCircle className='icon-circle text-danger fs-5' />
            </div>
            <div className='col-md-8'>
              <div className='card-body'>
                <h5 className='card-title mb-4'>Alerta de Cor Vermelha – Grande Perigo</h5>
                <ul>
                  <li><strong>Situação: </strong>Eventos climáticos extremos e excepcionais (enchentes graves, ciclones, calor/frios extremos).</li>
                  <li><strong>Riscos: </strong>Alto potencial de desastre com ameaça à vida e grandes prejuízos.</li>
                  <li><strong>Ação: </strong>Aja imediatamente. Busque abrigo seguro e acompanhe informações oficiais constantemente.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SobreAlertas;
