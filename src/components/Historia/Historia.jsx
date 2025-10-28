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
  cargo: 'Liderança técnica e de produto, definindo a arquitetura Front-End e identidade visual. Responsável pelo UX/UI, prototipagem (Figma) e desenvolvimento do Front-End, incluindo módulos inovadores como a Central Alertaê (IA) e o Edukaê (Quizzes).',
},

{
  nome: 'Kelly Cristina',
  imagem: kellycristinaImg,
  funcao: 'Desenvolvedora Front-End & Integração de Dados',
  cargo: 'Especialista no desenvolvimento e implementação do Front-End da aplicação. Responsável por consumir e integrar APIs REST de dados meteorológicos para a criação de Dashboards intuitivos e responsivos.',
},
{
  nome: 'Eduardo Agustavo',
  imagem: eduardoagustavoImg,
  funcao: 'Engenheiro de Back-End & Desenvolvedor de Roteamento',
  cargo: 'Engenheiro de Back-End focado na lógica de sistemas críticos. Desenvolveu a arquitetura de envio de solicitações emergenciais e implementou a funcionalidade de "Rotas Seguras", integrando APIs de geolocalização para traçar caminhos otimizados para pontos de apoio.',
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
          O <strong>Alertaê</strong> foi desenvolvido por alunos do curso de Engenharia de Software da FIAP com o propósito de salvar vidas e prevenir tragédias causadas por desastres climáticos. Por meio de tecnologia acessível e linguagem simples, o app entrega alertas instantâneos sobre enchentes, calor extremo e outros eventos ambientais críticos.
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
          O projeto foi desenvolvido com tecnologias ensinadas até a Fase 7 do curso, incluindo:
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

        <p className="historia-paragraph final-paragraph">
          Cada integrante atuou de forma estratégica dentro de sua especialidade, com base nas disciplinas práticas do curso, criando uma solução funcional, inovadora e socialmente necessária.
        </p>
      </section>
    </main>
  );
};

export default Historia;

