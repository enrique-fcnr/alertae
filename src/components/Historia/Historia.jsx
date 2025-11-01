import React from 'react';
import './Historia.css';

// Importações corretas das imagens
import enriquefernandesImg from '../../assets/enriquefernandes.png';
import kellycristinaImg from '../../assets/kellycristina.png';
import eduardoagustavoImg from '../../assets/eduardoagustavo.png';
import { FaHtml5, FaCss3Alt, FaJsSquare, FaReact, FaGitAlt, FaGithub, FaFigma, FaBootstrap } from 'react-icons/fa'; // Ícones de tecnologias
import { FaCloud, FaDatabase } from 'react-icons/fa6'; // Ícones de tecnologias


const integrantes = [
  {
    nome: 'Enrique Fernandes',
    imagem: enriquefernandesImg,
    funcao: 'Líder Técnico & Engenheiro de UX/UI',
    cargo: 'Liderança técnica e de produto, definindo arquitetura Front-End e identidade visual, responsável por UX/UI, prototipagem (Figma) e desenvolvimento de módulos inovadores como Central Alertaê (IA) e Edukaê (Quizzes).',
  },

  {
    nome: 'Kelly Cristina',
    imagem: kellycristinaImg,
    funcao: 'Desenvolvedora Front-End & Integração de Dados',
    cargo: 'Especialista em Front-End, responsável pelo consumo e integração de APIs REST de dados meteorológicos para criar dashboards intuitivos e responsivos.',
  },
  {
    nome: 'Eduardo Agustavo',
    imagem: eduardoagustavoImg,
    funcao: 'Engenheiro de Back-End & Desenvolvedor de Roteamento',
    cargo: 'Engenheiro de Back-End, desenvolveu arquitetura para envio de solicitações emergenciais e implementou APIs de geolocalização para caminhos otimizados.',
  }
];

const tecnologias = [
  { nome: 'HTML', icon: <FaHtml5 /> },
  { nome: 'CSS', icon: <FaCss3Alt /> },
  { nome: 'JavaScript', icon: <FaJsSquare /> },
  { nome: 'React.js', icon: <FaReact /> },
  { nome: 'Git', icon: <FaGitAlt /> },
  { nome: 'GitHub', icon: <FaGithub /> },
  { nome: 'APIs REST', icon: <FaCloud /> },
  { nome: 'JSON', icon: <FaDatabase /> },
  { nome: 'Figma', icon: <FaFigma /> },
  { nome: 'Bootstrap', icon: <FaBootstrap /> },
];

const Historia = () => {
  return (
    <main className="historia-container">
      {/* Container Glassmorphism */}
      <section className="historia-glass-content">
        <h1 className="historia-title">Sobre o Projeto</h1>

        <p className="historia-paragraph">
          O <strong>Alertaê</strong>, criado por alunos de Engenharia de Software da FIAP, visa salvar vidas prevenindo desastres climáticos. Com tecnologia acessível e linguagem simples, envia alertas instantâneos sobre enchentes, calor extremo e outros eventos críticos. Sua interface amigável, avisos personalizáveis e foco em públicos vulneráveis tornam-no uma solução social de potencial impacto nacional.
        </p>

        <p className="historia-paragraph">
          A interface amigável, os avisos personalizáveis e o foco em públicos vulneráveis — como idosos e pessoas com deficiência — fazem do Alertaê uma solução social com potencial de impacto nacional.
        </p>

        <h2 className="integrantes-title">Equipe Responsável</h2>
        <div className="integrantes-grid">
          {integrantes.map((pessoa, index) => (
            // Card Glassmorphism para integrantes
            <div key={index} className="integrante-card">
              <div className="integrante-foto-wrapper">
                <img src={pessoa.imagem} alt={pessoa.nome} className="integrante-foto" />
              </div>
              <h3 className="integrante-nome">{pessoa.nome}</h3>
              <p className="integrante-funcao">{pessoa.funcao}</p>
              <p className="integrante-descricao">{pessoa.cargo}</p>
            </div>
          ))}
        </div>

        <h2 className="tecnologias-title">Tecnologias Utilizadas</h2>
        <p className="historia-paragraph tech-intro">
          O projeto foi desenvolvido com tecnologias ensinadas até a Fase 7 do primeiro ano do curso, incluindo:
        </p>
        {/* Grid de Tecnologias */}
        <div className="tecnologias-grid">
          {tecnologias.map((tech, index) => (
            <div key={index} className="tecnologia-item">
              <span className="tecnologia-icon">{tech.icon}</span>
              <span className="tecnologia-nome">{tech.nome}</span>
            </div>
          ))}
        </div>

      </section>
    </main>
  );
};

export default Historia;

