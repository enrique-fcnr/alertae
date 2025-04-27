
import L from 'leaflet';
import { faGlobe, faSun, faCloudShowersHeavy, faWind, faTint, faTachometerAlt, faSnowflake, faSmog, faTornado } from '@fortawesome/free-solid-svg-icons';


const cities = [
  { name: 'São Paulo', lat: -23.5505, lon: -46.6333 },
  { name: 'Guarulhos', lat: -23.4538, lon: -46.5333 },
  { name: 'Campinas', lat: -22.9099, lon: -47.0626 },
  { name: 'São Bernardo do Campo', lat: -23.6914, lon: -46.5646 },
  { name: 'Santo André', lat: -23.6639, lon: -46.5383 },
  { name: 'Osasco', lat: -23.5320, lon: -46.7916 },
  { name: 'São José dos Campos', lat: -23.1896, lon: -45.8841 },
  { name: 'Ribeirão Preto', lat: -21.1775, lon: -47.8103 },
  { name: 'Santos', lat: -23.9608, lon: -46.3336 },
  { name: 'Mauá', lat: -23.6677, lon: -46.4613 },
  { name: 'Carapicuíba', lat: -23.5235, lon: -46.8352 },
  { name: 'Diadema', lat: -23.6816, lon: -46.6200 },
  { name: 'Jundiaí', lat: -23.1857, lon: -46.8978 },
  { name: 'Piracicaba', lat: -22.7333, lon: -47.6483 },
  { name: 'Bauru', lat: -22.3145, lon: -49.0587 },
  { name: 'Itaquaquecetuba', lat: -23.4852, lon: -46.3451 },
  { name: 'São José do Rio Preto', lat: -20.8113, lon: -49.3758 },
  { name: 'Mogi das Cruzes', lat: -23.5226, lon: -46.1884 },
  { name: 'Suzano', lat: -23.5428, lon: -46.3119 },
  { name: 'Taboão da Serra', lat: -23.6261, lon: -46.7910 }


];

const filterConditions = (data, filter) => {
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

const legendaMeteorologica = [
  {
    titulo: "Calor intenso",
    value: "Temperatura acima de 35°C, indicando risco de insolação, desidratação e desconforto extremo. (temp > 35°C)",
    icone: faSun,
    color: 'orange'
  },
  {
    titulo: "Chuva intensa",
    value: "Chuva superior a 10 mm/h, indicando risco de alagamentos, enchentes e baixa visibilidade. (chuva > 10 mm/h)",
    icone: faCloudShowersHeavy,
    color: 'blue'
  },
  {
    titulo: "Ventos fortes",
    value: "Velocidade do vento acima de 10 m/s (~36 km/h), representando risco para navegação, estruturas e atividades externas. (vento > 10 m/s)",
    icone: faWind,
    color: '#C5D3E8'
  },
  {
    titulo: "Frio intenso",
    value: "Temperatura inferior a 5°C, trazendo risco de hipotermia e formação de geadas. (temp < 5°C)",
    icone: faSnowflake,
    color: 'lightblue'
  },
  {
    titulo: "Rajadas de vento",
    value: "Rajadas acima de 15 m/s (~54 km/h), podendo causar quedas de árvores, postes e danos em estruturas. (rajada > 15 m/s)",
    icone: faTornado,
    color: 'darkgray'
  },
  {
    titulo: "Ar seco",
    value: "Umidade relativa do ar abaixo de 30%, aumentando risco de incêndios, alergias e problemas respiratórios. (umidade < 30%)",
    icone: faTint,
    color: '#60B5FF'
  },
  {
    titulo: "Pressão atmosférica baixa",
    value: "Pressão abaixo de 1000 hPa, podendo indicar frentes frias, tempestades ou ciclones. (pressão < 1000 hPa)",
    icone: faGlobe,
    color: 'green'
  },
  {
    titulo: "Neblina",
    value: "Visibilidade abaixo de 1000 metros, trazendo perigo para motoristas, portos e aeroportos. (visibilidade < 1000 m)",
    icone: faSmog,
    color: 'gray'
  },
];

const fetchAllWeather = async (cities, setWeatherData) => {
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

export { filterConditions, cities, getIconWithTemp, legendaMeteorologica, fetchAllWeather }