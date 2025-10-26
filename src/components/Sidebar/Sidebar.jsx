import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FaSun, FaCloudSunRain, FaMapMarkedAlt,
  FaChartLine, FaBars, FaWindowClose
} from 'react-icons/fa';
import { useLocationSearch } from '@/hooks/useWeather';
import './Sidebar.css';

function Sidebar({ onCitySelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const { data: searchResults, isLoading } = useLocationSearch(searchQuery);

  useEffect(() => {
    console.log("Search Query:", searchQuery);
    console.log("Search Results:", searchResults);
    console.log("Is Loading:", isLoading);
  }, [searchQuery, searchResults, isLoading]);

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

  const handleCitySelect = (city) => {
    console.log("Selected City:", city);
    onCitySelect({ lat: city.lat, lon: city.lon });
    setSearchQuery(''); // Clear search query after selection
    setIsOpen(false); // Close sidebar after selecting a city
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
          <form className="search-form" role="search" style={{ position: 'relative' }}>
            <div className="search-input-container">
              <input
                className="input-pesquisa"
                type="search"
                placeholder="Buscar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {isLoading && searchQuery.length >= 3 && (
                <div className="loading-indicator">Carregando...</div>
              )}
              {!isLoading && searchQuery.length >= 3 && searchResults && searchResults.length > 0 && (
                <ul className="search-results">
                  {searchResults.map((city) => (
                    <li
                      key={`${city.lat}-${city.lon}`}
                      onClick={() => handleCitySelect(city)}
                      className="search-result-item"
                    >
                      {city.name}, {city.state}, {city.country}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </form>
        </div>

        <nav className="sidebar-nav">
          <ul>
            <li><Link onClick={toggleSidebar} to="/dashboard/tempo-dia"><FaSun /> Tempo do dia</Link></li>
            <li><Link onClick={toggleSidebar} to="/dashboard/previsoes"><FaCloudSunRain /> Previsões</Link></li>
            <li><Link onClick={toggleSidebar} to="/dashboard/mapa-tempo"><FaMapMarkedAlt /> Mapa do tempo</Link></li>
            <li><Link onClick={toggleSidebar} to="/dashboard/estatisticas"><FaChartLine /> Estatísticas</Link></li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Sidebar;
