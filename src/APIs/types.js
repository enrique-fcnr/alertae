//Essa parte do código serve para descrever como estyão descritos os valores dentro da API.
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
