import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FaCheckCircle } from "react-icons/fa";
import "../styles/Planos.css";

const Planos = () => {
  const planos = [
    {
      nome: "BASIC",
      preco: "$18",
      beneficios: [
        "Voluptate fugit necessitatibus ob lorem",
        "Nunc malesuada nulla ut commodo",
        "Phasellus suscipit nulla elit et",
        "Luctus fringilla ligula nisi in pretium",
        "Suspendisse id venenatis libero",
        "Ut pretium, massa venenatis dictum",
      ],
    },
    {
      nome: "PRO",
      preco: "$31",
      beneficios: [
        "Voluptate fugit necessitatibus ob lorem",
        "Nunc malesuada nulla ut commodo",
        "Phasellus suscipit nulla elit et",
        "Luctus fringilla ligula nisi in pretium",
        "Suspendisse id venenatis libero",
        "Ut pretium, massa venenatis dictum",
      ],
    },
  ];

  return (
    <section className="planos-section">
      <Container>
        <div className="text-center mb-5">
          <h2 className="titulo">planos</h2>
          <p className="subtitulo">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
            maximus, nulla ut commodo sagittis, sapien dui mattis dui, non
            pulvinar lorem felis nec erat!
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
                <Button className="botao-plano">Get Started</Button>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Planos;