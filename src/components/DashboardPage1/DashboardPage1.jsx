import React, { useEffect } from 'react';
import { useForecastQuery, useReverseGeocodeQuery, useWeatherQuery } from '@/hooks/useWeather';
import { Alert } from "@chakra-ui/react";
import CurrentWeather from '../CurrentWeather/CurrentWeather';
import HourlyTemperature from '../HourlyTemperature/HourlyTemperature';
import WeatherDetails from '../WeatherDetails/WeatherDetails';
import './DashboardPage1.css';
import { useOutletContext } from 'react-router-dom';

function DashboardPage1() {
  const { selectedCoordinates } = useOutletContext();

  // queries
  const locationQuery = useReverseGeocodeQuery(selectedCoordinates);
  const weatherQuery = useWeatherQuery(selectedCoordinates);
  const forecastQuery = useForecastQuery(selectedCoordinates);

  useEffect(() => {
    console.log('DashboardPage1 received coordinates:', selectedCoordinates);
  }, [selectedCoordinates]);

  const locationName = Array.isArray(locationQuery.data) ? locationQuery.data[0] : null;



  // Sem coordenadas
  if (!selectedCoordinates) {
    return (
      <Alert.Root status="info" className='p-5 bg-primary text-light d-flex align-items-start'>
        <Alert.Indicator className='fs-1 ' />
        <Alert.Content className=''>
          <Alert.Title className='fs-2 mt-2'>Selecione uma localização.</Alert.Title>
          <Alert.Description style={{ lineHeight: "30px" }} className='fs-5 mt-sm-3'>
            Por favor, utilize a barra de busca na sidebar para selecionar uma cidade.
          </Alert.Description>
        </Alert.Content >
      </Alert.Root >
    );
  }
  // Loading
  if (locationQuery.isLoading || weatherQuery.isLoading || forecastQuery.isLoading) {
    return (
      <div className="p-5">
        <p>Carregando dados do tempo…</p>
      </div>
    );
  }

  return (
    <div className="py-2 d-flex flex-column gap-3">
      <div className="d-flex justify-content-between align-items-center mb-0">
        <div className="current-location">
          <h2 className="h3 mb-0 text-primary">
            {locationName?.name}
            {locationName?.state && <span className="text-muted">, {locationName.state}</span>}
            {locationName?.country && <span className="text-muted">, {locationName.country}</span>}
          </h2>
        </div>
        <div className="d-flex gap-2">
          {/* você pode adicionar um botão de refresh aqui se quiser */}
        </div>
      </div>

      <CurrentWeather data={weatherQuery.data} locationName={locationName} />

      <div className="row d-flex gap-3 gap-md-0">
        <div className="col-12 col-lg-6">
          {weatherQuery.data && <WeatherDetails data={weatherQuery.data} />}
        </div>

        <div className="col-12 col-lg-6">
          <div className="card shadow-sm p-3 h-100 ">
            <div className="card-header bg-primary">
              <h5 style={{ color: 'white' }} className="card-title mb-0">Variações do Dia</h5>
            </div>

            {forecastQuery.data ? (
              <HourlyTemperature data={forecastQuery.data} valueMax={8} />
            ) : (
              <p>Carregando previsão...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage1;
