import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useEffect, useState } from 'react';
import './DashboardPage3.css';
import { weatherAPI } from '../../APIs/weather';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faSun, faCloudShowersHeavy, faWind, faTint, faTachometerAlt, faSnowflake, faSmog, faTornado } from '@fortawesome/free-solid-svg-icons';
import { cities, getIconWithTemp, filterConditions } from '../../../data-dashboard-page3'


const DashboardPage3 = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [filter, setFilter] = useState('all');


  useEffect(() => {
    const fetchAllWeather = async () => {
      try {
        const results = await Promise.all(
          cities.map(async (city) => {
            const data = await weatherAPI.getCurrentWeather({
              lat: city.lat,
              lon: city.lon
            });
            return { ...data, name: city.name };
          })
        );
        setWeatherData(results);
      } catch (error) {
        console.error("Erro ao buscar dados do tempo:", error);
      }
    };

    fetchAllWeather();
  }, []);




  return (
    <div className='container-map'>
      {/* Buttons */}
      <div className="filter-buttons">
        {/* Todos */}
        <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>
          <FontAwesomeIcon className="icon-tempo" icon={faGlobe} />  <span className="btn-tempo">Todos</span>
        </button>

        {/* Calor */}
        <button className={filter === 'heat' ? 'active' : ''} onClick={() => setFilter('heat')}>
          <FontAwesomeIcon className="icon-tempo" icon={faSun} style={{ color: 'orange' }} />  <span className="btn-tempo">Calor</span>
        </button>

        {/* Chuva */}
        <button className={filter === 'rain' ? 'active' : ''} onClick={() => setFilter('rain')}>
          <FontAwesomeIcon className="icon-tempo" icon={faCloudShowersHeavy} style={{ color: 'blue' }} />  <span className="btn-tempo">Chuva</span>
        </button>

        {/* Vento */}
        <button className={filter === 'wind' ? 'active' : ''} onClick={() => setFilter('wind')}>
          <FontAwesomeIcon className="icon-tempo" icon={faWind} style={{ color: '#C5D3E8' }} />  <span className="btn-tempo">Vento</span>
        </button>

        {/* Frio */}
        <button className={filter === 'cold' ? 'active' : ''} onClick={() => setFilter('cold')}>
          <FontAwesomeIcon className="icon-tempo" icon={faSnowflake} style={{ color: 'lightblue' }} />  <span className="btn-tempo">Frio</span>
        </button>

        {/* Rajadas */}
        <button className={filter === 'gust' ? 'active' : ''} onClick={() => setFilter('gust')}>
          <FontAwesomeIcon className="icon-tempo" icon={faTornado} style={{ color: 'darkgray' }} />  <span className="btn-tempo">Rajadas</span>
        </button>

        {/* Ar seco */}
        <button className={filter === 'dry' ? 'active' : ''} onClick={() => setFilter('dry')}>
          <FontAwesomeIcon className="icon-tempo" icon={faTint} style={{ color: '#60B5FF' }} />  <span className="btn-tempo">Ar seco</span>
        </button>

        {/* Baixa Pressão */}
        <button className={filter === 'lowPressure' ? 'active' : ''} onClick={() => setFilter('lowPressure')}>
          <FontAwesomeIcon className="icon-tempo" icon={faTachometerAlt} style={{ color: 'green' }} />  <span className="btn-tempo">Baixa Pressão</span>
        </button>

        {/* Neblina */}
        <button className={filter === 'fog' ? 'active' : ''} onClick={() => setFilter('fog')}>
          <FontAwesomeIcon className="icon-tempo" icon={faSmog} style={{ color: 'gray' }} />  <span className="btn-tempo">Neblina</span>
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
          center={[-23.5, -46.3]}
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
  );
};

export default DashboardPage3;
