import React, { useEffect, useState } from 'react';
import { useGeolocation } from '../../hooks/useGeolocation';
import LoadingSkeleton from '../LoadingSkeleton/LoadingSkeleton';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';

import { useForecastQuery, useReverseGeocodeQuery, useWeatherQuery } from '@/hooks/useWeather';

const DashboardPage2 = () => {
  const { coordinates, error, getLocation, isLoading } = useGeolocation();
  const locationQuery = useReverseGeocodeQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);

  console.log(forecastQuery.data);

  // Função de formatação de temperatura
  const formatTemp = (temp) => `${Math.round(temp)}°C`;

  // Button for refetch
  const handleRefresh = () => {
    getLocation();
    if (coordinates) {
      forecastQuery.refetch();
    }
  };

  const locationName = locationQuery.data?.[0];
  //console.log(locationQuery.data[0].name)

  // Se houver erro:
  if (forecastQuery.error) {
    return (
      <Alert.Root status="error">
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Title>Erro</Alert.Title>
          <Alert.Description>
            <p>Falhor ao coletar informações sobre o tempo. Por favor, tente novamente!</p>
            <Button variant="outline" onClick={getLocation}>
              Tente novamente
            </Button>
          </Alert.Description>
        </Alert.Content>
      </Alert.Root>
    );
  }

  if (!forecastQuery.data) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return (
      <Alert.Root className='p-5 bg-danger text-light d-flex align-items-start ' status="error">
        <Alert.Indicator className='fs-1 ' />
        <Alert.Content className=''>
          <Alert.Title className='fs-2 mt-2'>Localização Errada</Alert.Title>
          <Alert.Description className='fs-4 mt-sm-3'>
            {error}
          </Alert.Description>
          <Button className="m-0 bg-light fs-4 p-4 text-danger rounded-3 mt-sm-3 "
            onClick={getLocation}>
            Permitir Localização
          </Button>
        </Alert.Content>
      </Alert.Root>
    );
  }

  if (!coordinates) {
    return (
      <Alert.Root status="error">
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Title>Localização é necessária.</Alert.Title>
          <Alert.Description>
            <p>Por favor! Permita acesso para ver as funcionalidades do tempo.</p>
            <Button variant="outline" onClick={getLocation}>
              Permitir Localização
            </Button>
          </Alert.Description>
        </Alert.Content>
      </Alert.Root>
    );
  }

  // Agrupar os dados de previsão por data
  const forecastByDay = {};

  forecastQuery.data.list.forEach((item) => {
    const date = format(new Date(item.dt_txt), 'yyyy-MM-dd');
    if (!forecastByDay[date]) {
      forecastByDay[date] = [];
    }
    forecastByDay[date].push(item);
  });

  // Pegar as datas dos 5 primeiros dias
  const forecastDates = Object.keys(forecastByDay).slice(0, 5);

  return (
    <div className="container py-4">
      {/* Botão de Atualizar */}
      <div className='d-flex justify-content-end mb-0'>
        <button onClick={handleRefresh} className='bg-light py-1 px-2 rounded-2'>
          <i className="bi bi-arrow-clockwise"></i>
        </button>
      </div>

      {/* Caixa com a previsão do tempo */}
      <div className="card shadow-sm my-3 p-3 h-100">
        <div className="card-header">
          <h5 className="card-title mb-0">Detalhes do Tempo</h5>
        </div>

        <div className="d-flex p-4 justify-content-between align-items-center">
          {forecastDates.map((date, index) => {
            const dayForecast = forecastByDay[date][0]; // Pega o primeiro item do dia
            return (
              <div key={index} className="text-center" style={{ minWidth: '60px' }}>
                {/* Dia da Semana */}
                <div className="font-size-small">
                  <strong>{format(new Date(date), 'EEE', { locale: pt })}</strong> {/* Agora em português */}
                  <div className="text-muted" style={{ fontSize: '0.75rem' }}>
                    {format(new Date(date), 'dd/MM')}
                  </div>
                </div>


                {/* Ícone do Clima */}
                <img
                  src={`https://openweathermap.org/img/wn/${dayForecast.weather[0].icon}@2x.png`}
                  alt="Ícone do Clima"
                  style={{ width: '50px', height: '50px', margin: '0 auto', marginBottom: '8px' }}
                />

                {/* Temperatura Máxima */}
                <div className="font-weight-bold text-danger mb-1">
                  {formatTemp(dayForecast.main.temp_max)}
                </div>

                {/* Temperatura Mínima */}
                <div className="text-primary" style={{ fontSize: '0.875rem' }}>
                  {formatTemp(dayForecast.main.temp_min)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>

  );
};

export default DashboardPage2;
