import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { GiHamburgerMenu } from "react-icons/gi";
import LogoText from "../../assets/logo-branca-sem-fundo-alertae.png"
import userImg from "../../assets/user-img.png"
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [selectedItem, setSelectedItem] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const cliente = localStorage.getItem("cliente");
    setIsLoggedIn(!!cliente);
  }, []);

  const handleItemClick = (item) => {
    setSelectedItem(selectedItem === item ? "" : item);
  };

  const handleLogout = () => {
    localStorage.removeItem("cliente");
    setIsLoggedIn(false);

    setTimeout(() => {
      navigate("/");
    }, 2000);
  }

  const menu = {
    section1: {
      title: "Sobre o projeto",
      subtitles: [
        { label: "Sobre o projeto", path: "/sobre/quem-somos" },
        { label: "Propósito do App", path: "/sobre/proposito" }
      ]
    },
    section2: {
      title: "Alertas",
      subtitles: [
        { label: "Conhecer Alertas", path: "/alertas/sobre" },
      ]
    },
    section3: {
      title: "Edukaê",
      subtitles: [
        { label: "Quiz Alertas", path: "/edukae/quiz" },
        { label: "Meu Ranking", path: "/edukae/ranking" },
        { label: "Recompensas", path: "/edukae/recompensas" }
      ]
    },
    section4: {
      title: "Dashboards",
      subtitles: [
        { label: "Tempo do dia", path: "/dashboard/tempo-dia" },
        { label: "Previsões", path: "/dashboard/previsoes" },
        { label: "Mapa do tempo", path: "/dashboard/mapa-tempo" },
        { label: "Estatísticas", path: "/dashboard/estatisticas" }
      ]
    },
    section5: {
      title: "Emergências",
      subtitles: [
        { label: "Rotas Seguras", path: "/emergencias/rotas-seguras" },
        { label: "Contatos de Emergência", path: "/emergencias/contatos" }
      ]
    }
  };


  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container-fluid">
        <Link to={"/"} className="box-img-logo">
          <img src={LogoText} alt="Logo" />
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown"
          aria-expanded="false" aria-label="Toggle navigation">
          <span className="icon-navbar"><GiHamburgerMenu size={25} /></span>
        </button>

        <div className="navbar-container collapse navbar-collapse" id="navbarNavDropdown">
          <div className="mx-auto mb-sm-3 justify-content-md-center">
            <ul className="navbar-nav mt-sm-3 mx-auto">
              {Object.entries(menu).map(([key, { title, subtitles }]) => (
                <li className="nav-item dropdown" key={key}>
                  <button
                    onClick={() => handleItemClick(key)}
                    className={`dropdown-toggle me-lg-2 ${selectedItem === key ? "active-link" : ""}`}
                    data-bs-toggle="dropdown"
                  >
                    {title}
                  </button>
                  <ul className={`dropdown-menu ${selectedItem === key ? "show" : ""}`}>
                    {subtitles.map(({ label, path }, idx) => (
                      <li key={idx}>
                        <Link to={path} className="dropdown-item" onClick={() => setSelectedItem("")}>
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>

          {!isLoggedIn ? (
            <form className="btn-form-navbar d-flex">
              <Link to="/login" className="button-navbar btn btn-outline-light">Login</Link>
            </form>
          ) : (
            <div className="main-user">
              <div className="container-user-img">
                <div className="btn-group">
                  <button type="button" className="btn btn-light">
                    <img src={userImg} alt="User" />
                  </button>
                  <button type="button" className="btn bg-primary text-light dropdown-toggle dropdown-toggle-split"
                    data-bs-toggle="dropdown" aria-expanded="false">
                    <span className="visually-hidden">Toggle Dropdown</span>
                  </button>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <button className="dropdown-item" onClick={handleLogout}>
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
