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
  filterConditions,
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
    <div className=' py-5 py-md-0'>
      <div className='container-map'>
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



        {/* Mapa padrão sem clustering */}
        <div className="w-100" style={{ height: '70vh' }}>
          <MapContainer
            className="shadow bg-white rounded h-100"
            center={[-23.5, -46.9]}
            zoom={9.3}
            style={{ width: '100%' }}
          >
            <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
            {weatherData.filter(filterConditions(filter)).map((data, i) => {
              const temp = data.main?.temp ?? 0;
              const rain = data.rain?.['1h'] || 0;
              const wind = data.wind?.speed ?? 0;

              return (
                <Marker
                  key={i}
                  position={[data.coord?.lat, data.coord?.lon]}
                  icon={getIconWithTemp({ temp, rain, wind })}
                >
                  <Popup>
                    <strong>{data.name}</strong><br />
                    🌡️ Temperatura: {temp}°C<br />
                    🌧️ Chuva: {rain} mm/h<br />
                    💨 Vento: {wind} m/s
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        </div>
      </div>

      {/* Explicações */}
      <div className="details-container card shadow-sm mb-4 p-3 h-100">
        <div className="card-header">
          <h5 className="card-title mb-0">Entenda como avaliar as Condições Climáticas:</h5>
        </div>
        <div className="card-body">
          <div className="row g-3">
            {legendaMeteorologica.map((data, index) => (
              <div className="col-12 col-md-6" key={index}>
                <div className="card legend-card shadow-sm p-3 d-flex flex-row align-items-center">
                  <div
                    className="icon-wrapper me-3"
                    style={{ background: `linear-gradient(135deg, ${data.gradientStart}, ${data.gradientEnd})` }}
                  >
                    <FontAwesomeIcon icon={data.icone} style={{ fontSize: '1.5rem', color: 'white' }} />
                  </div>
                  <div>
                    <div className="legend-title fw-bold mb-1">{data.titulo}</div>
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
