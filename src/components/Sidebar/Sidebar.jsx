import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaSun, FaCloudSunRain, FaMapMarkedAlt,
  FaChartLine, FaBars, FaWindowClose
} from 'react-icons/fa';
import './Sidebar.css';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  const toggleSidebar = () => {
    if (isOpen) {
      setIsOpen(false);
      setIsAnimating(true);
    } else {
      setIsOpen(true);
      setShowButton(false);
    }
  };

  const handleTransitionEnd = () => {
    if (!isOpen) {
      setShowButton(true);
      setIsAnimating(false);
    }
  };

  return (

    <div className='side-container' style={{ position: 'relative' }}>
      {/* Botão Menu */}
      <button
        className={`menu-btn ${showButton ? 'show' : 'hide'}`}
        onClick={toggleSidebar}
      >
        Menu
      </button>

      {/* Sidebar */}
      <div
        className={`sidebar ${isOpen ? 'open' : ''}`}
        onTransitionEnd={handleTransitionEnd}
      >
        <div className='container-close'>
          <button onClick={toggleSidebar} className="close-btn">
            <FaWindowClose className='icon-close' />
          </button>
        </div>
        <div className="sidebar-header">
          <form className="search-form" role="search">
            <input className="input-pesquisa" type="search" placeholder="Buscar..." />
            <button className="btn-pesquisar">Buscar</button>
          </form>

        </div>

        <nav className="sidebar-nav">
          <ul>
            <li><Link onClick={toggleSidebar} to="/dashboard/tempo-dia"><FaSun /> Tempo do dia</Link></li>
            <li><Link onClick={toggleSidebar} to="/dashboard/previsoes"><FaCloudSunRain /> Previsões</Link></li>
            <li><Link onClick={toggleSidebar} to="/dashboard/mapa-tempo"><FaMapMarkedAlt /> Mapa do tempo</Link></li>
            <li><Link onClick={toggleSidebar} to="/dashboard/estatisticas"><FaChartLine /> Estatísticas</Link></li>
            <li><Link onClick={toggleSidebar} to="/contacts/3"><FaBars /> Outros dados</Link></li>
          </ul>
        </nav>
      </div>
    </div>


  );
}

export default Sidebar;
