import React from 'react';
import { Link } from 'react-router-dom';
import { FaSun, FaCloudSunRain, FaMapMarkedAlt, FaChartLine, FaBars } from 'react-icons/fa';
import './Sidebar.css';

function Sidebar() {
  return (
<>
      <div className="sidebar">
        <div className="sidebar-header">
          <form className="search-form" role="search">
            <input type="search" placeholder="Buscar..." className="search-input" />
          </form>
          <button className="btn-new">Novo</button>

          <>
            <div id="sidebar">
              <div>
                <form id="search-form" role="search">
                  <input
                    className='sidebar-input'
                    id="q"
                    aria-label="Search contacts"
                    placeholder="Search"
                    type="search"
                    name="q"
                  />

                </form>
                <form method="post">
                  <button className='btn-sidebar  ' type="submit">New</button>
                </form>
              </div>
              <nav>
                <ul>
                  <li>
                    <Link to="/dashboard/teste">Tempo do dia</Link>
                  </li>
                  <li>
                    <Link to="/dashboard/teste2">Item 2</Link>
                  </li>
                  <li>
                    <Link to="/dashboard/teste3">Mapa do tempo</Link>
                  </li>
                  <li>
                    <Link to="/contacts/2">Item 4</Link>
                  </li>
                  <li>
                    <Link to="/contacts/1">Item 5</Link>
                  </li>
                </ul>
              </nav>

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
        </>
        );
}

        export default Sidebar;