import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useEffect, useState } from 'react';
import './DashboardPage3.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGlobe, faSun, faCloudShowersHeavy, faWind, faTint,
  faTachometerAlt, faSnowflake, faSmog, faTornado
} from '@fortawesome/free-solid-svg-icons';
import {
  fetchAllWeather,
  getIconWithTemp,
  legendaMeteorologica,
  cities
} from '../../../data-dashboard-page3';


const DashboardPage3 = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchAllWeather(cities, setWeatherData);
  }, []);

  return (
    <div className=' card shadow-sm mb-4 p-3 h-100 p-4'>
      <h1 style={{ color: '#4C585B' }}>Mapa de Referências de alerta climático</h1>
      <p style={{ color: '#595b5b' }} className='p-0 text-start
'>Selecione um fator climático e clique na região do mapa para visualizar. </p>

      <div className='container-map' style={{ position: 'relative' }}>
        {/* Botões de filtro */}
        <div className="filter-buttons">
          {[
            { label: 'Todos', value: 'all', icon: faGlobe },
            { label: 'Calor', value: 'heat', icon: faSun, color: 'orange' },
            { label: 'Chuva', value: 'rain', icon: faCloudShowersHeavy, color: 'blue' },
            { label: 'Vento', value: 'wind', icon: faWind, color: '#C5D3E8' },
            { label: 'Frio', value: 'cold', icon: faSnowflake, color: 'lightblue' },
            { label: 'Rajadas', value: 'gust', icon: faTornado, color: 'darkgray' },
            { label: 'Ar seco', value: 'dry', icon: faTint, color: '#60B5FF' },
            { label: 'Baixa Pressão', value: 'lowPressure', icon: faTachometerAlt, color: 'green' },
            { label: 'Neblina', value: 'fog', icon: faSmog, color: 'gray' }
          ].map(({ label, value, icon, color }) => (
            <button
              key={value}
              className={filter === value ? 'active' : ''}
              onClick={() => setFilter(value)}
              data-tip={label}
            >
              <FontAwesomeIcon icon={icon} style={color ? { color } : {}} />
              <span className="remove-small-screen"> {label} </span>
            </button>

          ))}


        </div>

        {/* Legenda */}
        <div className="map-legend">
          <strong>Legenda:</strong>
          <ul className='legend-list'>
            <li><FontAwesomeIcon icon={faSun} style={{ color: 'orange', marginRight: '10px' }} /> <span className="remove-small-screen">Calor intenso (&gt; 35°C)</span></li>
            <li><FontAwesomeIcon icon={faCloudShowersHeavy} style={{ color: 'blue', marginRight: '10px' }} /> <span className="remove-small-screen">Chuva intensa (&gt; 10 mm/h)</span></li>
            <li><FontAwesomeIcon icon={faWind} style={{ color: '#C5D3E8', marginRight: '10px' }} /> <span className="remove-small-screen">Ventos fortes (&gt; 10 m/s)</span></li>
            <li><FontAwesomeIcon icon={faSnowflake} style={{ color: 'lightblue', marginRight: '10px' }} /> <span className="remove-small-screen">Frio intenso (&lt; 5°C)</span></li>
            <li><FontAwesomeIcon icon={faTornado} style={{ color: 'darkgray', marginRight: '10px' }} /> <span className="remove-small-screen">Rajadas (&gt; 15 m/s)</span></li>
            <li><FontAwesomeIcon icon={faTint} style={{ color: '#60B5FF', marginRight: '10px' }} /> <span className="remove-small-screen">Ar seco (&lt; 30%)</span></li>
            <li><FontAwesomeIcon icon={faTachometerAlt} style={{ color: 'green', marginRight: '10px' }} /> <span className="remove-small-screen">Baixa pressão (&lt; 1000 hPa)</span></li>
            <li><FontAwesomeIcon icon={faSmog} style={{ color: 'gray', marginRight: '10px' }} /> <span className="remove-small-screen">Neblina (&lt; 1000 m)</span></li>
          </ul>
        </div>

        {/* Mapa */}
        <div className="w-100" style={{ height: '70vh' }}>
          <MapContainer
            className="shadow bg-white rounded h-100"
            center={[-23.5, -46.9]}
            zoom={9.3}
            style={{ width: '100%', height: '100%', zIndex: 1 }}
          >
            <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
            {weatherData.map((data, i) => {
              const temp = data.main?.temp ?? 0;
              const rain = data.rain?.['1h'] || 0;
              const wind = data.wind?.speed ?? 0;
              const gust = data.wind?.gust ?? 0;
              const humidity = data.main?.humidity ?? 0;
              const pressure = data.main?.pressure ?? 1013;
              const visibility = data.visibility ?? 10000;

              const valueByFilter = {
                heat: `🌡️ Temperatura: ${temp}°C`,
                cold: `🌡️ Temperatura: ${temp}°C`,
                rain: `🌧️ Chuva: ${rain} mm/h`,
                wind: `💨 Vento: ${wind} m/s`,
                gust: `🌪️ Rajadas: ${gust} m/s`,
                dry: `💧 Umidade: ${humidity}%`,
                lowPressure: `⚖️ Pressão: ${pressure} hPa`,
                fog: `🌫️ Visibilidade: ${visibility} m`,
                all: `🌡️ Temp: ${temp}°C | 🌧️ ${rain}mm | 💨 ${wind}m/s`
              };

              return (
                <Marker
                  key={i}
                  position={[data.coord?.lat, data.coord?.lon]}
                  icon={getIconWithTemp({ temp, rain, wind, filter })}
                >
                  <Popup>
                    <strong>{data.name}</strong><br />
                    {valueByFilter[filter] || valueByFilter.all}
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        </div>
      </div>

      {/* Explicações */}
      <div className="details-container mb-3 p-0 h-100">
        <div className="card-header mb-3 bg-primary py-4">
          <h5 style={{ color: 'white' }} className="card-title mb-0">Guia para Avaliar as Condições Climáticas</h5>
        </div>
        <div className="card-body">
          <div className="row g-3">
            {legendaMeteorologica.map((data, index) => (
              <div className="col-12 col-md-6" key={index}>
                <div className="card legend-card shadow-sm p-3 d-flex flex-row align-items-center">
                  <div
                    className="col-8 icon-wrapper me-3"
                    style={{ background: 'linear-gradient(135deg, #1a73e8, #00c3ff)' }}
                  >
                    <FontAwesomeIcon icon={data.icone} style={{ fontSize: '1.5rem', color: 'white' }} />
                  </div>
                  <div>
                    <div style={{ color: '#0f68dc' }} className="legend-title fw-bold mb-1">{data.titulo}</div>
                    <div className="legend-desc small text-muted">{data.value}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage3;
