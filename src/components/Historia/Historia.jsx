import React from 'react';
import './Historia.css';

// Importações corretas das imagens
import enriquefernandesImg from '../../assets/enriquefernandes.png';
import kellycristinaImg from '../../assets/kellycristina.png';

const integrantes = [
 {
  nome: 'Enrique Fernandes',
  imagem: enriquefernandesImg,
  funcao: 'Product Designer & Front-End Developer',
  cargo: 'Responsável por UX/UI, design system, protótipos e desenvolvimento completo do front-end com foco em acessibilidade e responsividade.',
},

{
  nome: 'Kelly Cristina Alves dos Reis',
  imagem: kellycristinaImg,
  funcao: 'Tech Lead & Back-End Developer',
  cargo: 'Liderou a arquitetura técnica, desenvolveu APIs REST, integrou banco de dados e garantiu a escalabilidade e segurança do back-end.',
}
];

const Historia = () => {
  return (
    <main className="historia-container">
      <section className="historia-content">
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
            <div key={index} className="integrante-card">
              <img src={pessoa.imagem} alt={pessoa.nome} className="integrante-foto" />
              <h3 className="integrante-nome">{pessoa.nome}</h3>
              <p className="integrante-funcao">{pessoa.funcao}</p>
              <p className="integrante-descricao">{pessoa.cargo}</p>
            </div>
          ))}
        </div>

        <h2 className="tecnologias-title">Tecnologias Utilizadas</h2>
        <p className="historia-paragraph">
          O projeto foi desenvolvido com tecnologias ensinadas até a Fase 7 do curso, incluindo:
        </p>
        <ul className="tecnologias-lista">
          <li>✔️ HTML, CSS e JavaScript para estrutura e estilo;</li>
          <li>✔️ React.js para construção do front-end;</li>
          <li>✔️ Git e GitHub para versionamento e colaboração;</li>
          <li>✔️ APIs REST para integração com dados climáticos;</li>
          <li>✔️ JSON para manipulação de dados e simulação de base;</li>
          <li>✔️ Figma para prototipagem e design da interface;</li>
          <li>✔️ Bootstrap para responsividade e componentes.</li>
        </ul>

        <p className="historia-paragraph">
          Cada integrante atuou de forma estratégica dentro de sua especialidade, com base nas disciplinas práticas do curso, criando uma solução funcional, inovadora e socialmente necessária.
        </p>
      </section>
    </main>
  );
};

export default Historia;
