import L from 'leaflet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSun, faCloudShowersHeavy, faSnowflake, faTornado, faWind, faTint
} from '@fortawesome/free-solid-svg-icons';
import ReactDOMServer from 'react-dom/server';

export function getIconWithTemp({ temp, rain, wind, humidity }) {
  const icons = [];

  // Temperatura
  if (temp < 5) {
    icons.push({ icon: faSnowflake, color: 'lightblue' });
  } else if (temp > 35) {
    icons.push({ icon: faSun, color: 'orange' });
  }

  // Chuva
  if (rain > 10) {
    icons.push({ icon: faCloudShowersHeavy, color: 'blue' });
  }

  // Vento forte
  if (wind > 10) {
    icons.push({ icon: faWind, color: '#C5D3E8' });
  }

  // Rajadas
  if (wind > 15) {
    icons.push({ icon: faTornado, color: 'darkgray' });
  }

  // Ar seco
  if (humidity !== undefined && humidity < 30) {
    icons.push({ icon: faTint, color: '#60B5FF' });
  }

  // Monta os ícones em linha
  const iconHtml = ReactDOMServer.renderToString(
    <div style={{ textAlign: 'center', fontSize: '1.2rem' }}>
      <div>
        {icons.map(({ icon, color }, idx) => (
          <FontAwesomeIcon
            key={idx}
            icon={icon}
            style={{ color, margin: '0 2px' }}
          />
        ))}
      </div>
      <div style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>{Math.round(temp)}°C</div>
    </div>
  );

  return L.divIcon({
    html: iconHtml,
    className: '',
    iconSize: [50, 50],
    iconAnchor: [25, 25],
    popupAnchor: [0, -20],
  });
}
