import React, { useState } from "react";
import "./Navbar.css";
import { GiHamburgerMenu } from "react-icons/gi";
import LogoText from "../../assets/logo-branca-sem-fundo-alertae.png"
import userImg from "../../assets/user-img.png"
import { MdOutlineKeyboardArrowDown } from "react-icons/md";



const Navbar = () => {
  const [selectedItem, setSelectedItem] = useState("");

  const handleItemClick = (item) => {
    // Se o item clicado for o mesmo que o selecionado, desmarque
    setSelectedItem(selectedItem === item ? "" : item);
  };

  const menu = {
    section1: {
      title: "Sobre",
      subtitles: ["Quem Somos", "Proposito do App"]
    },
    section2: {
      title: "Alertas",
      subtitles: ["O que são", "Recomendações"]
    },
    section3: {
      title: "Previsões",
      subtitles: ["Previsão próximas 24h", "Previsão próximos 4 dias", "Termos Meteorológicos"]
    },
    section4: {
      title: "Contatos",
      subtitles: ["Quando Contactar", "Contatos de Emergência"]
    }
  };

  return (
    // <nav className="navbar navbar-expand-lg navbar-dark">
    //   <div className="container-fluid">
    //     <div className="box-img-logo">
    //       <img src={LogoText} alt="" />
    //     </div>
    //     <button
    //       className="navbar-toggler"
    //       type="button"
    //       data-bs-toggle="collapse"
    //       data-bs-target="#navbarNavDropdown"
    //       aria-controls="navbarNavDropdown"
    //       aria-expanded="false"
    //       aria-label="Toggle navigation"
    //     >
    //       <span className="icon-navbar"><GiHamburgerMenu size={25} /></span>
    //     </button>

    //     <div className="navbar-container collapse navbar-collapse" id="navbarNavDropdown">
    //       <div className="mx-auto  mb-sm-3 justify-content-md-center">
    //         <ul className="navbar-nav mt-sm-3 mx-auto">
    //           {/* Mapeando as seções do menu */}
    //           {Object.entries(menu).map(([key, { title, subtitles }], index) => (
    //             <li className="nav-item dropdown" key={key}>
    //               <button
    //                 onClick={() => handleItemClick(key)}
    //                 className={`dropdown-toggle me-lg-2 ${selectedItem === key ? "active-link" : ""}`}
    //                 data-bs-toggle="dropdown"
    //                 aria-expanded={selectedItem === key ? "true" : "false"}
    //               >
    //                 {title}
    //               </button>
    //               <ul className={`dropdown-menu  ${selectedItem === key ? "show" : ""}`}>
    //                 {subtitles.map((subtitle, idx) => (
    //                   <li key={idx}>
    //                     <a className="dropdown-item" href="#">
    //                       {subtitle}
    //                     </a>
    //                   </li>
    //                 ))}
    //               </ul>
    //             </li>
    //           ))}
    //         </ul>
    //       </div>
    //       <form className="btn-form-navbar d-flex ">
    //         <button className="button-navbar btn btn-outline-light" type="button">
    //           Login
    //         </button>
    //       </form>
    //     </div>
    //   </div>
    // </nav>
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container-fluid">
        <div className="box-img-logo">
          <img src={LogoText} alt="" />
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="icon-navbar"><GiHamburgerMenu size={25} /></span>
        </button>

        <div className="navbar-container collapse navbar-collapse" id="navbarNavDropdown">
          <div className="mx-auto  mb-sm-3 justify-content-md-center">
            <ul className="navbar-nav mt-sm-3 mx-auto">
              {/* Mapeando as seções do menu */}
              {Object.entries(menu).map(([key, { title, subtitles }], index) => (
                <li className="nav-item dropdown" key={key}>
                  <button
                    onClick={() => handleItemClick(key)}
                    className={`dropdown-toggle me-lg-2 ${selectedItem === key ? "active-link" : ""}`}
                    data-bs-toggle="dropdown"
                    aria-expanded={selectedItem === key ? "true" : "false"}
                  >
                    {title}
                  </button>
                  <ul className={`dropdown-menu  ${selectedItem === key ? "show" : ""}`}>
                    {subtitles.map((subtitle, idx) => (
                      <li key={idx}>
                        <a className="dropdown-item" href="#">
                          {subtitle}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>

          {/* User Menu */}
          <div className="main-user">
            <div className="container-user-img">
              <div className="btn-group">
                <button type="button" className="btn btn-light">
                  <img src={userImg} alt="" />
                </button>
                <button
                  type="button"
                  className="btn-logout-click btn bg-primary text-light dropdown-toggle dropdown-toggle-split"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span className="visually-hidden">Toggle Dropdown</span>
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li><a className="logout-item dropdown-item" href="#">Logout</a></li>

                </ul>
              </div>
            </div>

          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


