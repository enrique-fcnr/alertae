import { createContext, useContext, useState, useEffect } from 'react';
import { useGeolocation } from '../hooks/useGeolocation';
import { weatherAPI } from '../APIs/weather';

const LocationContext = createContext();

export function LocationProvider({ children }) {
  const [selectedCoordinates, setSelectedCoordinates] = useState(null);
  const [locationName, setLocationName] = useState(null);
  const { coordinates, error, getLocation, isLoading } = useGeolocation();

  // Efeito para atualizar as coordenadas e o nome da localização quando a localização do usuário for obtida
  useEffect(() => {
    if (coordinates) {
      setSelectedCoordinates(coordinates);
      // Busca o nome da localização usando as coordenadas
      weatherAPI.reverseGeocode(coordinates)
        .then(data => {
          if (data && data[0]) {
            setLocationName({
              name: data[0].name,
              state: data[0].state,
              country: data[0].country
            });
          }
        })
        .catch(err => {
          console.error('Erro ao obter nome da localização:', err);
        });
    }
  }, [coordinates]);

  const handleCitySelect = (coordinates, name) => {
    setSelectedCoordinates(coordinates);
    setLocationName(name);
  };

  const value = {
    selectedCoordinates,
    locationName,
    setLocationName,
    handleCitySelect,
    error,
    getLocation,
    isLoading
  };

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
} 