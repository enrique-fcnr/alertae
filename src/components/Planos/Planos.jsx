import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FaCheckCircle } from "react-icons/fa";
import "./Planos.css";

const Planos = () => {
  const planos = [
    {
      nome: "BASIC",
      preco: "R$18",
      beneficios: [
        "Acesso a alertas de enchente em tempo real",
        "Visualização de rotas seguras",
        "Notificações push para áreas de risco",
        "Contato direto com órgãos de emergência",
        "Suporte via e-mail",
        "Até 2 usuários conectados",
      ],
    },
    {
      nome: "PRO",
      preco: "R$31",
      beneficios: [
        "Alertas personalizados por bairro ou cidade",
        "Histórico de zonas de risco na sua região",
        "Rotas seguras com atualização em tempo real",
        "Atendimento prioritário (WhatsApp ou chat)",
        "Suporte a múltiplos dispositivos (até 5 usuários)",
        "Monitoramento 24h com inteligência artificial",
      ],  
    },
  ];

  return (
    <section className="planos-section">
      <Container>
        <div className="text-center mb-5">
          <h2 className="titulo">Planos</h2>
          <p className="subtitulo">
            Escolha o plano que melhor se adapta às suas necessidades e mantenha
            sua família segura com alertas em tempo real,
            rotas seguras e suporte prioritário.
          </p>
        </div>
        <Row className="justify-content-center">
          {planos.map((plano, idx) => (
            <Col key={idx} md={4} lg={3} className="mb-4">
              <div className="card-plano">
                <h4>{plano.nome}</h4>
                <h2 className="preco">{plano.preco}</h2>
                <ul className="lista-beneficios">
                  {plano.beneficios.map((item, i) => (
                    <li key={i}>
                      <FaCheckCircle className="check-icon" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Button className="botao-plano">Começar</Button>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Planos;