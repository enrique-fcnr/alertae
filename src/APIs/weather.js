import { API_CONFIG } from "./config";

class WeatherAPI {
  // Esse método é responsável por montar uma URL completa com os parâmetros certos de forma automática.
  createUrl(endpoint, params) {
    const searchParams = new URLSearchParams({
      appid: API_CONFIG.API_KEY,
      ...params,
    });
    return `${endpoint}?${searchParams.toString()}`;
  }


  // Esse método é uma função assíncrona que faz a requisição HTTP para um URL fornecido como parâmetro. Ela também processa a resposta e retorna os dados no formato .JSON.
  async fetchData(url) {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Weather API Error: ${response.statusText}`);
    }

    return response.json();
  }

  async getCurrentWeather({ lat, lon }) {
    const url = this.createUrl(`${API_CONFIG.BASE_URL}/weather`, {
      lat: lat.toString(),
      lon: lon.toString(),
      units: "metric",
    });
    return this.fetchData(url);
  }

  // É uma função assíncrona que tem como objetivo fazer uma requisição para obter o clima atual de uma localização específica usando coordenadas latitude e longitude.
  async getForecast({ lat, lon }) {
    const url = this.createUrl(`${API_CONFIG.BASE_URL}/forecast`, {
      lat: lat.toString(),
      lon: lon.toString(),
      units: "metric",
    });
    return this.fetchData(url);
  }

  // É uma função assíncrona que tem como objetivo de fazer uma requisição para obter o nome de local(como uma cidade ou região) a partir das coordenadas de latitude e logitude. Este processo é chamado de geocodificação reversa, e é o oposto da geocodificação (que converte um endereço ou nome de local em coordenadas).
  async reverseGeocode({ lat, lon }) {
    const url = this.createUrl(`${API_CONFIG.GEO}/reverse`, {
      lat: lat.toString(),
      lon: lon.toString(),
      limit: "1",
    });
    return this.fetchData(url);
  }

  async searchLocations(query) {
    const url = this.createUrl(`${API_CONFIG.GEO}/direct`, {
      q: query,
      limit: "5",
    });
    return this.fetchData(url);
  }
}

// É importante exportar uma instância da classe WeatherAPI (no caso, export const weatherAPI = new WeatherAPI();) é para garantir que a classe seja utilizada como um único ponto de acesso durante a execução do código. 
export const weatherAPI = new WeatherAPI();
