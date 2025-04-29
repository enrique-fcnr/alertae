import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useEffect, useState } from 'react';
import './DashboardPage3.css';
import { weatherAPI } from '../../APIs/weather';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faSun, faCloudShowersHeavy, faWind, faTint, faTachometerAlt, faSnowflake, faSmog, faTornado } from '@fortawesome/free-solid-svg-icons';
import { fetchAllWeather, getIconWithTemp, filterConditions, legendaMeteorologica, cities } from '../../../data-dashboard-page3'
import CardDetails from '../CardDetails/CardDetails';



const DashboardPage3 = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [filter, setFilter] = useState('all');


  useEffect(() => {
    fetchAllWeather(cities, setWeatherData);
  }, []);



  return (
    <div>
      <div className='container-map'>
        {/* Buttons */}
<div className="filter-buttons">
  <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>
    <FontAwesomeIcon icon={faGlobe} /> Todos
  </button>
  <button className={filter === 'heat' ? 'active' : ''} onClick={() => setFilter('heat')}>
    <FontAwesomeIcon icon={faSun} style={{ color: 'orange' }} /> Calor
  </button>
  <button className={filter === 'rain' ? 'active' : ''} onClick={() => setFilter('rain')}>
    <FontAwesomeIcon icon={faCloudShowersHeavy} style={{ color: 'blue' }} /> Chuva
  </button>
  <button className={filter === 'wind' ? 'active' : ''} onClick={() => setFilter('wind')}>
    <FontAwesomeIcon icon={faWind} style={{ color: '#C5D3E8' }} /> Vento
  </button>
  <button className={filter === 'cold' ? 'active' : ''} onClick={() => setFilter('cold')}>
    <FontAwesomeIcon icon={faSnowflake} style={{ color: 'lightblue' }} /> Frio
  </button>
  <button className={filter === 'gust' ? 'active' : ''} onClick={() => setFilter('gust')}>
    <FontAwesomeIcon icon={faTornado} style={{ color: 'darkgray' }} /> Rajadas
  </button>
  <button className={filter === 'dry' ? 'active' : ''} onClick={() => setFilter('dry')}>
    <FontAwesomeIcon icon={faTint} style={{ color: '#60B5FF' }} /> Ar seco
  </button>
  <button className={filter === 'lowPressure' ? 'active' : ''} onClick={() => setFilter('lowPressure')}>
    <FontAwesomeIcon icon={faTachometerAlt} style={{ color: 'green' }} /> Baixa Pressão
  </button>
  <button className={filter === 'fog' ? 'active' : ''} onClick={() => setFilter('fog')}>
    <FontAwesomeIcon icon={faSmog} style={{ color: 'gray' }} /> Neblina
  </button>
</div>


        {/* Legendas */}
        <div className="map-legend">
          <strong>Legenda:</strong>
          <ul className='legend-list'>

            {/* Calor intenso */}
            <li>
              <FontAwesomeIcon icon={faSun} style={{ color: 'orange', marginRight: '10px' }} />
              Calor intenso (<span>&gt; 35°C</span>)
            </li>

            {/* Chuva intensa */}
            <li>
              <FontAwesomeIcon icon={faCloudShowersHeavy} style={{ color: 'blue', marginRight: '10px' }} />
              Chuva intensa (<span>&gt; 10 mm/h</span>)
            </li>

            {/* Ventos fortes */}
            <li>
              <FontAwesomeIcon icon={faWind} style={{ color: '#C5D3E8', marginRight: '10px' }} />
              Ventos fortes (<span>&gt; 10 m/s</span>)
            </li>

            {/* Frio intenso */}
            <li>
              <FontAwesomeIcon icon={faSnowflake} style={{ color: 'lightblue', marginRight: '10px' }} />
              Frio intenso (<span>&lt; 5°C</span>)
            </li>

            {/* Rajadas de vento */}
            <li>
              <FontAwesomeIcon icon={faTornado} style={{ color: 'darkgray', marginRight: '10px' }} />
              Rajadas de vento (<span>&gt; 15 m/s</span>)
            </li>

            {/* Ar seco */}
            <li>
              <FontAwesomeIcon icon={faTint} style={{ color: '#60B5FF', marginRight: '10px' }} />
              Ar seco (<span>&lt; 30%</span>)
            </li>

            {/* Baixa pressão */}
            <li>
              <FontAwesomeIcon icon={faTachometerAlt} style={{ color: 'green', marginRight: '10px' }} />
              Pressão atmosférica baixa (<span>&lt; 1000 hPa</span>)
            </li>

            {/* Neblina */}
            <li>
              <FontAwesomeIcon icon={faSmog} style={{ color: 'gray', marginRight: '10px' }} />
              Neblina (<span>&lt; 1000 m</span>)
            </li>

          </ul>
        </div>

        {/* Mapa */}
        <div className="w-100" style={{ height: '70vh' }}>
          <MapContainer
            className="shadow bg-white rounded h-100"
            center={[-23.5, -46.9]}
            zoom={9.3}
            style={{ width: '100%' }}
          >
            <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
            {weatherData.filter(filterConditions).map((data, i) => {
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
