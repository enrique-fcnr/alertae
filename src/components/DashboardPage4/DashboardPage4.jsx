import React, { useEffect, useState } from 'react';
import { useForecastQuery, useReverseGeocodeQuery, useWeatherQuery } from '@/hooks/useWeather';
import { useGeolocation } from '../../hooks/useGeolocation';
import TemperatureChart from '../TemperatureChart/TemperatureChart';
import RainVolumeChart from '../RainVolumeChart/RainVolumeChart';
import HumidityChart from '../HumidityChart/HumidityChart';
import HottestDaysList from '../HottestDaysList/HottestDaysList';
import WindTrendLine from '../WindTrendLine/WindTrendLine';
import TemperatureHeatmap from '../TemperatureHeatmap/TemperatureHeatmap';
import { Alert, Button } from "@chakra-ui/react";
import './DashboardPage4.css';
import { useOutletContext } from 'react-router-dom';

const DashboardPage4 = () => {
  const { selectedCoordinates } = useOutletContext();
  const locationQuery = useReverseGeocodeQuery(selectedCoordinates);
  const weatherQuery = useWeatherQuery(selectedCoordinates);
  const forecastQuery = useForecastQuery(selectedCoordinates);

  // Button for refetch
  const handleRefresh = () => {
    if (selectedCoordinates) {
      weatherQuery.refetch();
      forecastQuery.refetch();
      locationQuery.refetch();
    }
  };

  const locationName = Array.isArray(locationQuery.data) ? locationQuery.data[0] : null;

  // Se houver erro na API de previsão de tempo:
  if (forecastQuery.error || locationQuery.error || weatherQuery.error) {
    return (
      <Alert.Root status="error">
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Title>Erro</Alert.Title>
          <Alert.Description>
            <p>Falha ao coletar informações sobre o tempo. Por favor, tente novamente!</p>
            {/* Consider if a refresh button is still appropriate here or if location selection in sidebar is the primary method */}
          </Alert.Description>
        </Alert.Content>
      </Alert.Root>
    );
  }

  // Verifica se não existem coordenadas (latitude e longitude).
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

  return (
    <div className="py-5 py-md-0 min-h-screen bg-gray-100 p-8">
      <div className='d-flex justify-content-between align-items-center mb-4'>
        <div className="current-location">
          <h2 className="h3 mb-0 text-primary">
            {locationName?.name}
            {locationName?.state && (
              <span className="text-muted">, {locationName.state}</span>
            )}
            {locationName?.country && (
              <span className="text-muted">, {locationName.country}</span>
            )}
          </h2>
        </div>
        <div className="d-flex gap-2">
          <button onClick={handleRefresh} className='dashboard-refresh-btn'>
            <i className="bi bi-arrow-clockwise"></i>
          </button>
        </div>
      </div>

      <div className="">
        <div className="row row-cols-1 row-cols-md-2 g-3">
          <div className="col-12 col-md-12">
            <div className="dashboard-card">
              <TemperatureChart key="temp-chart" data={forecastQuery.data} />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="dashboard-card">
              <RainVolumeChart key="rain-chart" data={forecastQuery.data} />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="dashboard-card">
              <HumidityChart key="humidity-chart" data={forecastQuery.data} />
            </div>
          </div>

          <div className="col-12 col-md-12">
            <div className="dashboard-card">
              <WindTrendLine key="wind-chart" data={forecastQuery.data} />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="dashboard-card">
              <HottestDaysList key="HottestDays-chart" data={forecastQuery.data} />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="dashboard-card">
              <TemperatureHeatmap key="TemperatureHeatmap-chart" data={forecastQuery.data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage4;