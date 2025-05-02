import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSun, FaCloudSunRain, FaMapMarkedAlt, FaChartLine, FaBars } from 'react-icons/fa';
import './Sidebar.css';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Botão Hamburguer (visível apenas no mobile) */}
      <button className="hamburger-btn" onClick={toggleSidebar}>
        <FaBars />
      </button>

      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <form className="search-form" role="search">
            <input type="search" placeholder="Buscar..." className="search-input" />
          </form>
          <button className="btn-new">Novo</button>
        </div>

        <nav className="sidebar-nav">
          <ul>
            <li><Link to="/dashboard/tempo-dia"><FaSun /> Tempo do dia</Link></li>
            <li><Link to="/dashboard/previsoes"><FaCloudSunRain /> Previsões</Link></li>
            <li><Link to="/dashboard/mapa-tempo"><FaMapMarkedAlt /> Mapa do tempo</Link></li>
            <li><Link to="/dashboard/estastisticas"><FaChartLine /> Estatísticas</Link></li>
            <li><Link to="/contacts/3"><FaBars /> Outros dados</Link></li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default Sidebar;
