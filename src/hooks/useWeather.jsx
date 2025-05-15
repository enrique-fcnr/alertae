import { useQuery } from "@tanstack/react-query";
import { weatherAPI } from "../APIs/weather";

export const WEATHER_KEYS = {
  weather: (coords) => ["weather", coords],
  forecast: (coords) => ["forecast", coords],
  location: (coords) => ["location", coords],
  search: (query) => ["location-search", query],
  alert: (coords) => ['alert', coords]
};

export function useWeatherQuery(coordinates) {
  return useQuery({
    queryKey: WEATHER_KEYS.weather(coordinates || { lat: 0, lon: 0 }),
    queryFn: () => (coordinates ? weatherAPI.getCurrentWeather(coordinates) : null),
    enabled: !!coordinates,
  });
}

export function useForecastQuery(coordinates) {
  return useQuery({
    queryKey: WEATHER_KEYS.forecast(coordinates || { lat: 0, lon: 0 }),
    queryFn: () => (coordinates ? weatherAPI.getForecast(coordinates) : null),
    enabled: !!coordinates,
  });
}


export function useReverseGeocodeQuery(coordinates) {
  return useQuery({
    queryKey: WEATHER_KEYS.location(coordinates || { lat: 0, lon: 0 }),
    queryFn: () => (coordinates ? weatherAPI.reverseGeocode(coordinates) : null),
    enabled: !!coordinates,
  });
}

export function useLocationSearch(query) {
  return useQuery({
    queryKey: WEATHER_KEYS.search(query),
    queryFn: () => weatherAPI.searchLocations(query),
    enabled: query.length >= 3,
  });

}

export function useAlert(coordinates) {
  return useQuery({
    queryKey: WEATHER_KEYS.alert(coordinates || { lat: 0, lon: 0 }),
    queryFn: () => (coordinates ? weatherAPI.getAlertsWeather(coordinates) : null),
    enabled: !!coordinates,
  });
}
