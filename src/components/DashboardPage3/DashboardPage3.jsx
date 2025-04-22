import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { useEffect, useState } from 'react';
import './DashboardPage3.css';
import { weatherAPI } from '../../APIs/weather';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faCloudShowersHeavy, faWind, faTint, faTachometerAlt, faSnowflake, faSmog, faTornado } from '@fortawesome/free-solid-svg-icons';
import cities from '../../../list-city'


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

  const getIconWithTemp = ({ temp, rain, wind }) => {
    let url = 'https://cdn-icons-png.flaticon.com/512/1163/1163657.png';
    if (temp > 35) url = 'https://cdn-icons-png.flaticon.com/512/869/869869.png';
    else if (rain > 10) url = 'https://cdn-icons-png.flaticon.com/512/1163/1163624.png';
    else if (wind > 10) url = 'https://cdn-icons-png.flaticon.com/512/4834/4834556.png';

    return L.divIcon({
      html: `
        <div style="text-align: center;">
          <img src="${url}" style="width: 32px; height: 32px;" />
          <div style="color: #273F4F; font-size: 12px; font-weight: bold; margin-top: -4px; background-color: white;">
            ${Math.round(temp)}°C
          </div>
        </div>
      `,
      className: 'custom-div-icon',
      iconSize: [32, 42],
      iconAnchor: [16, 42],
      popupAnchor: [0, -42]
    });
  };

  const filterConditions = (data) => {
    const temp = data.main?.temp ?? 0;
    const rain = data.rain?.['1h'] || 0;
    const wind = data.wind?.speed ?? 0;
    const gust = data.wind?.gust ?? 0;
    const humidity = data.main?.humidity ?? 0;
    const pressure = data.main?.pressure ?? 1013;
    const visibility = data.visibility ?? 10000;

    if (filter === 'all') return true;
    if (filter === 'heat' && temp > 35) return true;
    if (filter === 'rain' && rain > 10) return true;
    if (filter === 'wind' && wind > 10) return true;
    if (filter === 'cold' && temp < 5) return true;
    if (filter === 'gust' && gust > 15) return true;
    if (filter === 'dry' && humidity < 30) return true;
    if (filter === 'lowPressure' && pressure < 1000) return true;
    if (filter === 'fog' && visibility < 1000) return true;
    return false;
  };

  return (
    <div style={{ height: '100vh', position: 'relative' }}>
      <div className="filter-buttons">
        {/* Todos */}
        <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>
          <FontAwesomeIcon icon={faSun} style={{ marginRight: 8 }} /> Todos
        </button>

        {/* Calor */}
        <button className={filter === 'heat' ? 'active' : ''} onClick={() => setFilter('heat')}>
          <FontAwesomeIcon icon={faSun} style={{ marginRight: 8, color: 'orange' }} /> Calor
        </button>

        {/* Chuva */}
        <button className={filter === 'rain' ? 'active' : ''} onClick={() => setFilter('rain')}>
          <FontAwesomeIcon icon={faCloudShowersHeavy} style={{ marginRight: 8, color: 'blue' }} /> Chuva
        </button>

        {/* Vento */}
        <button className={filter === 'wind' ? 'active' : ''} onClick={() => setFilter('wind')}>
          <FontAwesomeIcon icon={faWind} style={{ marginRight: 8, color: '#C5D3E8' }} /> Vento
        </button>

        {/* Frio */}
        <button className={filter === 'cold' ? 'active' : ''} onClick={() => setFilter('cold')}>
          <FontAwesomeIcon icon={faSnowflake} style={{ marginRight: 8, color: 'lightblue' }} /> Frio
        </button>

        {/* Rajadas */}
        <button className={filter === 'gust' ? 'active' : ''} onClick={() => setFilter('gust')}>
          <FontAwesomeIcon icon={faTornado} style={{ marginRight: 8, color: 'darkgray' }} /> Rajadas
        </button>

        {/* Ar seco */}
        <button className={filter === 'dry' ? 'active' : ''} onClick={() => setFilter('dry')}>
          <FontAwesomeIcon icon={faTint} style={{ marginRight: 8, color: '#60B5FF' }} /> Ar seco
        </button>

        {/* Baixa Pressão */}
        <button className={filter === 'lowPressure' ? 'active' : ''} onClick={() => setFilter('lowPressure')}>
          <FontAwesomeIcon icon={faTachometerAlt} style={{ marginRight: 8, color: 'green' }} /> Baixa Pressão
        </button>

        {/* Neblina */}
        <button className={filter === 'fog' ? 'active' : ''} onClick={() => setFilter('fog')}>
          <FontAwesomeIcon icon={faSmog} style={{ marginRight: 8, color: 'gray' }} /> Neblina
        </button>
      </div>

      {/* Legendas */}
      <div className="map-legend">
        <strong>Legenda:</strong>
        <ul style={{ listStyle: 'none', padding: 0, marginTop: '6px', display: 'flex', flexDirection: 'column', gap: '7px', marginBottom: '3px' }}>
          {/* Temperatura (Calor intenso) */}
          <li>
            <FontAwesomeIcon
              icon={faSun}
              style={{ width: 20, verticalAlign: 'middle', marginRight: 8, color: 'orange' }}
            />
            Calor intenso (<span>&gt; 35°C</span>)
          </li>

          {/* Chuva (Chuva intensa) */}
          <li>
            <FontAwesomeIcon
              icon={faCloudShowersHeavy}
              style={{ width: 20, verticalAlign: 'middle', marginRight: 8, color: 'blue' }}
            />
            Chuva intensa (<span>&gt; 10 mm/h</span>)
          </li>

          {/* Vento (Ventos fortes) */}
          <li>
            <FontAwesomeIcon
              icon={faWind}
              style={{ width: 20, verticalAlign: 'middle', marginRight: 8, color: 'gray' }}
            />
            Ventos fortes (<span>&gt; 10 m/s</span>)
          </li>

          {/* Umidade (Umidade alta) */}
          <li>
            <FontAwesomeIcon
              icon={faTint}
              style={{ width: 20, verticalAlign: 'middle', marginRight: 8, color: 'blue' }}
            />
            Umidade alta (<span>&gt; 80%</span>)
          </li>

          {/* Pressão atmosférica (Pressão baixa) */}
          <li>
            <FontAwesomeIcon
              icon={faTachometerAlt}
              style={{ width: 20, verticalAlign: 'middle', marginRight: 8, color: 'green' }}
            />
            Pressão atmosférica baixa (<span>&lt; 1013 hPa</span>)
          </li>
        </ul>
      </div>
      <MapContainer className='custom-shadow p-3 mb-5 bg-white rounded' center={[-23.5, -46.3]} zoom={9.3} style={{ height: '80%', width: '100%' }}>
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
  );
};

export default DashboardPage3;
