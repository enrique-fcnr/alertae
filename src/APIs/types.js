//Essa parte do código serve para descrever como estão descritos os valores dentro da API.
// Assim conseguimos saber que tipo de dado está sendo passado dentro do código.

/**
 * @typedef {Object} Coordinates
 * @property {number} lat
 * @property {number} lon
 */

/**
 * @typedef {Object} GeocodingResponse
 * @property {string} name
 * @property {Object.<string, string>} [local_names]
 * @property {number} lat
 * @property {number} lon
 * @property {string} country
 * @property {string} [state]
 */

/**
 * @typedef {Object} WeatherCondition
 * @property {number} id
 * @property {string} main
 * @property {string} description
 * @property {string} icon
 */

/**
 * @typedef {Object} WeatherData
 * @property {Coordinates} coord
 * @property {WeatherCondition[]} weather
 * @property {{ temp: number, feels_like: number, temp_min: number, temp_max: number, pressure: number, humidity: number }} main
 * @property {{ speed: number, deg: number }} wind
 * @property {{ sunrise: number, sunset: number, country: string }} sys
 * @property {string} name
 * @property {number} dt
 */

/**
 * @typedef {Object} ForecastData
 * @property {{ dt: number, main: WeatherData["main"], weather: WeatherData["weather"], wind: WeatherData["wind"], dt_txt: string }[]} list
 * @property {{ name: string, country: string, sunrise: number, sunset: number }} city
 */

// Alert:
/**
 * @typedef {Object} WeatherAlert
 * @property {string} sender_name - Nome do órgão emissor do alerta (ex: INMET, NOAA)
 * @property {string} event - Tipo de alerta climático (ex: "Chuva Intensa")
 * @property {number} start - Timestamp do início do alerta (em segundos desde Epoch)
 * @property {number} end - Timestamp do fim do alerta (em segundos desde Epoch)
 * @property {string} description - Descrição detalhada do alerta meteorológico
 * @property {string[]} tags - Tags categorizando o alerta (ex: ["Rain", "Wind"])
 */

/**
 * @typedef {Object} WeatherCondition
 * @property {number} id - ID do tipo de clima (ex: 803 para "nuvens dispersas")
 * @property {string} main - Descrição geral (ex: "Clouds", "Rain")
 * @property {string} description - Descrição detalhada em texto (ex: "nuvens dispersas")
 * @property {string} icon - Código do ícone (ex: "04d")
 */

/**
 * @typedef {Object} WeatherCurrent
 * @property {number} dt - Timestamp da observação atual
 * @property {number} sunrise - Timestamp do nascer do sol
 * @property {number} sunset - Timestamp do pôr do sol
 * @property {number} temp - Temperatura atual (°C)
 * @property {number} feels_like - Sensação térmica (°C)
 * @property {number} pressure - Pressão atmosférica (hPa)
 * @property {number} humidity - Umidade relativa (%)
 * @property {number} dew_point - Ponto de orvalho (°C)
 * @property {number} uvi - Índice UV
 * @property {number} clouds - Cobertura de nuvens (%)
 * @property {number} visibility - Visibilidade (metros)
 * @property {number} wind_speed - Velocidade do vento (m/s)
 * @property {number} wind_deg - Direção do vento (graus)
 * @property {WeatherCondition[]} weather - Lista de condições climáticas
 */

/**
 * @typedef {Object} WeatherOneCallData
 * @property {number} lat - Latitude consultada
 * @property {number} lon - Longitude consultada
 * @property {string} timezone - Nome do timezone (ex: "America/Sao_Paulo")
 * @property {number} timezone_offset - Offset em segundos do UTC
 * @property {WeatherCurrent} current - Dados do clima atual
 * @property {WeatherAlert[]} [alerts] - Lista de alertas meteorológicos ativos
 */

