
import L from 'leaflet';
import { faGlobe, faSun, faCloudShowersHeavy, faWind, faTint, faTachometerAlt, faSnowflake, faSmog, faTornado } from '@fortawesome/free-solid-svg-icons';
import { weatherAPI } from './src/APIs/weather'


const cities = [
  { name: 'São Paulo', lat: -23.5505, lon: -46.6333 },
  { name: 'Guarulhos', lat: -23.4538, lon: -46.5333 },
  { name: 'Campinas', lat: -22.9099, lon: -47.0626 },
  { name: 'São Bernardo do Campo', lat: -23.6914, lon: -46.5646 },
  { name: 'Santo André', lat: -23.6639, lon: -46.5383 },
  { name: 'Osasco', lat: -23.5320, lon: -46.7916 },
  { name: 'Sorocaba', lat: -23.5015, lon: -47.4526 },
  { name: 'Ribeirão Preto', lat: -21.1775, lon: -47.8103 },
  { name: 'São José dos Campos', lat: -23.1896, lon: -45.8841 },
  { name: 'São José do Rio Preto', lat: -20.8113, lon: -49.3758 },
  { name: 'Mauá', lat: -23.6677, lon: -46.4613 },
  { name: 'Carapicuíba', lat: -23.5235, lon: -46.8352 },
  { name: 'Santos', lat: -23.9608, lon: -46.3336 },
  { name: 'Diadema', lat: -23.6816, lon: -46.6200 },
  { name: 'Jundiaí', lat: -23.1857, lon: -46.8978 },
  { name: 'Piracicaba', lat: -22.7333, lon: -47.6483 },
  { name: 'Bauru', lat: -22.3145, lon: -49.0587 },
  { name: 'Itaquaquecetuba', lat: -23.4852, lon: -46.3451 },
  { name: 'Mogi das Cruzes', lat: -23.5226, lon: -46.1884 },
  { name: 'Suzano', lat: -23.5428, lon: -46.3119 },
  { name: 'Taboão da Serra', lat: -23.6261, lon: -46.7910 },
  { name: 'Barueri', lat: -23.5057, lon: -46.8790 },
  { name: 'Embu das Artes', lat: -23.6490, lon: -46.8523 },
  { name: 'Marília', lat: -22.2176, lon: -49.9501 },
  { name: 'São Vicente', lat: -23.9631, lon: -46.3919 },
  { name: 'Itaquaquecetuba', lat: -23.4852, lon: -46.3451 },
  { name: 'Franca', lat: -20.5386, lon: -47.4009 },
  { name: 'Praia Grande', lat: -24.0058, lon: -46.4025 },
  { name: 'Taubaté', lat: -23.0264, lon: -45.5550 },
  { name: 'Limeira', lat: -22.5646, lon: -47.4017 },
  { name: 'Sumaré', lat: -22.8218, lon: -47.2669 },
  { name: 'Ferraz de Vasconcelos', lat: -23.5411, lon: -46.3711 },
  { name: 'Itapevi', lat: -23.5488, lon: -46.9320 },
  { name: 'Indaiatuba', lat: -23.0884, lon: -47.2122 },
  { name: 'Hortolândia', lat: -22.8529, lon: -47.2143 },
  { name: 'Americana', lat: -22.7371, lon: -47.3336 },
  { name: 'Araraquara', lat: -21.7940, lon: -48.1756 },
  { name: 'Jacareí', lat: -23.3053, lon: -45.9658 },
  { name: 'Presidente Prudente', lat: -22.1207, lon: -51.3926 },
  { name: 'Itu', lat: -23.2649, lon: -47.2992 },
  { name: 'Bragança Paulista', lat: -22.9527, lon: -46.5419 },
  { name: 'São Carlos', lat: -22.0056, lon: -47.8977 },
  { name: 'Franco da Rocha', lat: -23.3229, lon: -46.7290 },
  { name: 'Botucatu', lat: -22.8832, lon: -48.4430 },
  { name: 'Itapecerica da Serra', lat: -23.7161, lon: -46.8495 },
  { name: 'Mogi Guaçu', lat: -22.3675, lon: -46.9428 },
  { name: 'Pindamonhangaba', lat: -22.9231, lon: -45.4613 },
  { name: 'Santana de Parnaíba', lat: -23.4439, lon: -46.9179 },
  { name: 'Cotia', lat: -23.6031, lon: -46.9189 },
  { name: 'Itapetininga', lat: -23.5886, lon: -48.0483 },
  { name: 'Votorantim', lat: -23.5446, lon: -47.4386 },
  { name: 'Barretos', lat: -20.5531, lon: -48.5698 },
  { name: 'Itanhaém', lat: -24.1736, lon: -46.7883 },
  { name: 'Jandira', lat: -23.5275, lon: -46.9028 },
  { name: 'Cubatão', lat: -23.8911, lon: -46.4253 },
  { name: 'Várzea Paulista', lat: -23.2115, lon: -46.8287 },
  { name: 'Araras', lat: -22.3569, lon: -47.3842 },
  { name: 'São Caetano do Sul', lat: -23.6229, lon: -46.5548 },
  { name: 'Itatiba', lat: -23.0037, lon: -46.8461 },
  { name: 'Valinhos', lat: -22.9698, lon: -46.9974 },
  { name: 'Ourinhos', lat: -22.9797, lon: -49.8699 },
  { name: 'Tatuí', lat: -23.3487, lon: -47.8461 },
  { name: 'Atibaia', lat: -23.1171, lon: -46.5565 },
  { name: 'Ribeirão Pires', lat: -23.7078, lon: -46.4058 },
  { name: 'Itapeva', lat: -23.9783, lon: -48.8764 },
  { name: 'Campo Limpo Paulista', lat: -23.2072, lon: -46.7883 },
  { name: 'Salto', lat: -23.2008, lon: -47.2860 },
  { name: 'São Roque', lat: -23.5226, lon: -47.1357 },
  { name: 'Leme', lat: -22.1809, lon: -47.3850 },
  { name: 'Assis', lat: -22.6604, lon: -50.4183 },
  { name: 'Itapira', lat: -22.4356, lon: -46.8220 },
  { name: 'Avaré', lat: -23.1067, lon: -48.9254 },
  { name: 'Jaboticabal', lat: -21.2520, lon: -48.3252 },
  { name: 'São João da Boa Vista', lat: -21.9707, lon: -46.7981 },
  { name: 'Birigui', lat: -21.2910, lon: -50.3432 },
  { name: 'Penápolis', lat: -21.4197, lon: -50.0773 },
  { name: 'Votuporanga', lat: -20.4232, lon: -49.9786 },
  { name: 'Catanduva', lat: -21.1314, lon: -48.9770 },
  { name: 'Lins', lat: -21.6782, lon: -49.7426 },
  { name: 'Jaú', lat: -22.2936, lon: -48.5570 },
  { name: 'Ituverava', lat: -20.3356, lon: -47.7900 },
  { name: 'São Joaquim da Barra', lat: -20.5811, lon: -47.8572 },
  { name: 'Bebedouro', lat: -20.9491, lon: -48.4791 },
  { name: 'Monte Alto', lat: -21.2655, lon: -48.4975 },
  { name: 'Matão', lat: -21.6027, lon: -48.3649 },
  { name: 'Sertãozinho', lat: -21.1316, lon: -47.9881 },

]






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

const filterConditions = (filter) => {
  return (data) => {
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
};

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