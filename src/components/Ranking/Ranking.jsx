// src/components/Ranking/Ranking.jsx

import React from 'react';
import './Ranking.css';
import { FaMedal, FaCrown, FaTrophy, FaUserAlt } from 'react-icons/fa';

const rankingData = [
  { nome: 'Joana Lima', pontos: 980 },
  { nome: 'Carlos Souza', pontos: 870 },
  { nome: 'Ana Clara', pontos: 820 },
  { nome: 'Lucas Andrade', pontos: 760 },
  { nome: 'Paula Mendes', pontos: 720 },
  { nome: 'Felipe Santos', pontos: 680 },
  { nome: 'Bruna Rocha', pontos: 640 },
  { nome: 'Diego Costa', pontos: 610 }
];

const Ranking = () => {
  return (
    <main className="ranking-page">
      <section className="ranking-box">
        <h1 className="ranking-title">🏆 Ranking Edukaê</h1>
        <p className="ranking-subtitle">
          Veja os usuários com melhor desempenho nos quizzes sobre prevenção e segurança.
        </p>

        <div className="podio">
          <div className="podio-item segundo">
            <FaMedal className="podio-icon prata" />
            <strong>{rankingData[1].nome}</strong>
            <span>{rankingData[1].pontos} pts</span>
          </div>
          <div className="podio-item primeiro">
            <FaCrown className="podio-icon ouro" />
            <strong>{rankingData[0].nome}</strong>
            <span>{rankingData[0].pontos} pts</span>
          </div>
          <div className="podio-item terceiro">
            <FaTrophy className="podio-icon bronze" />
            <strong>{rankingData[2].nome}</strong>
            <span>{rankingData[2].pontos} pts</span>
          </div>
        </div>

        <ul className="ranking-lista">
          {rankingData.slice(3).map((usuario, index) => (
            <li key={index} className="ranking-item">
              <span className="posicao">{index + 4}º</span>
              <FaUserAlt className="usuario-icone" />
              <span className="nome">{usuario.nome}</span>
              <span className="pontos">{usuario.pontos} pts</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default Ranking;

