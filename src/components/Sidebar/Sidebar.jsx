import React from 'react';
import { Link } from 'react-router-dom';
import { FaSun, FaCloudSunRain, FaMapMarkedAlt, FaChartLine, FaBars } from 'react-icons/fa';
import './Sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <form className="search-form" role="search">
          <input type="search" placeholder="Buscar..." className="search-input" />
        </form>
        <button className="btn-new">Novo</button>
      </div>

      <nav className="sidebar-nav">
        <ul>
          <li><Link to="/dashboard/teste"><FaSun /> Tempo do dia</Link></li>
          <li><Link to="/dashboard/teste2"><FaCloudSunRain /> Previsões</Link></li>
          <li><Link to="/contacts/1"><FaMapMarkedAlt /> Mapa do tempo</Link></li>
          <li><Link to="/contacts/2"><FaChartLine /> Estatísticas</Link></li>
          <li><Link to="/contacts/3"><FaBars /> Outros dados</Link></li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;