import React, { useEffect, useState } from 'react';
import { useForecastQuery, useReverseGeocodeQuery } from '@/hooks/useWeather';
import { useGeolocation } from '../../hooks/useGeolocation';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';
import Temperature5Days from '../Temperature5Days/Temperature5Days';
import { Alert, Button } from "@chakra-ui/react";
import { dataChart5Days } from '../../../data-hourly-temp-page';
import './DashboardPage2.css';
import { useOutletContext } from 'react-router-dom';

const DashboardPage2 = () => {
  const { selectedCoordinates } = useOutletContext();
  const locationQuery = useReverseGeocodeQuery(selectedCoordinates);
  const forecastQuery = useForecastQuery(selectedCoordinates);

  // Button for refetch
  const handleRefresh = () => {
    if (selectedCoordinates) {
      forecastQuery.refetch();
      locationQuery.refetch();
    }
  };

  const locationName = Array.isArray(locationQuery.data) ? locationQuery.data[0] : null;


  //Se a API de previsão de tempo deu erro
  if (forecastQuery.error || locationQuery.error) {
    return (
      <Alert.Root status="error">
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Title>Erro</Alert.Title>
          <Alert.Description>
            <p>Falhor ao coletar informações sobre o tempo. Por favor, tente novamente!</p>
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
          <Alert.Description className='fs-4 mt-sm-3'>
            Por favor, utilize a barra de busca no sidebar para selecionar uma cidade.
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
  const dailyTemperatures = Object.keys(forecastByDay)
    .slice(1, 6) // pegar os 5 próximos dias (pular o dia atual se quiser)
    .map(date => {
      const temps = forecastByDay[date];

      // Pegar todas as temperaturas do dia:
      const tempMins = temps.map(t => t.main.temp_min);
      const tempMaxs = temps.map(t => t.main.temp_max);

      return {
        date,
        minTemp: Math.min(...tempMins),
        maxTemp: Math.max(...tempMaxs),
        icon: temps[0].weather[0].icon, // exemplo: pega o ícone da primeira previsão do dia
      };
    });

  return (
    <div className='py-2 d-flex flex-column gap-3'>
      <div className='d-flex justify-content-between align-items-center mb-0'>
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

      {/* Caixa com a previsão do tempo */}
      <div className="card shadow-sm my-0 p-3 h-100">
        <div className="card-header">
          <h5 style={{ color: '#4C585B' }} className="card-title mb-0">Próximos 5 dias</h5>
        </div>

        <div className="row d-flex justify-content-center align-items-center gap-3">
          {dailyTemperatures.map((day, index) => (
            <div
              key={index}
              className="col-12 col-sm-6 col-md-4 col-lg-2 d-flex flex-column justify-content-center align-items-center text-center p-3 gap-2 bg-light mt-2 rounded-3"
            >
              {/* Dia da Semana */}
              <div className="font-size-small">
                <strong style={{ color: '#1a73e8' }}>
                  {format(new Date(day.date), 'EEEE', { locale: pt })}
                </strong>
                <div className="text-muted" style={{ fontSize: '0.75rem' }}>
                  {format(new Date(day.date), 'dd/MM')}
                </div>
              </div>

              {/* Ícone do Clima */}
              <img
                src={`https://openweathermap.org/img/wn/${day.icon}@2x.png`}
                alt="Ícone do Clima"
                style={{ width: '50px', height: '50px', margin: '0 auto', marginBottom: '8px' }}
              />

              {/* Temperatura Máxima */}
              <div className="font-weight-bold text-danger mb-1">
                {Math.round(day.maxTemp)}°
              </div>

              {/* Temperatura Mínima */}
              <div className="text-primary" style={{ fontSize: '0.875rem' }}>
                {Math.round(day.minTemp)}°
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="col-12 col-md-12">
        <div className="card shadow-sm my-3 p-3 h-100">
          <div className="card-header">
            <h5 style={{ color: '#4C585B' }} className="card-title mb-0">Variações dos Próximos 5 dias</h5>
          </div>

          <Temperature5Days
            data={forecastQuery.data}
            title="Variação dos próximos 5 dias"
            dataBuilder={dataChart5Days}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage2;
