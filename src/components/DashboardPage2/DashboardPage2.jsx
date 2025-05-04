import React, { useEffect, useState } from 'react';
import { useForecastQuery } from '@/hooks/useWeather';
import { useGeolocation } from '../../hooks/useGeolocation';
import LoadingSkeletonPrevisoes from '../LoadingSkeletonPrevisoes/LoadingSkeletonPrevisoes';
import { format } from 'date-fns';
import { pt } from 'date-fns/locale';
import Temperature5Days from '../Temperature5Days/Temperature5Days'
import { dataChart5Days } from '../../../data-hourly-temp-page';



const DashboardPage2 = () => {
  const { coordinates, error, getLocation, isLoading } = useGeolocation();
  const forecastQuery = useForecastQuery(coordinates);

  // Button for refetch
  const handleRefresh = () => {
    getLocation();
    if (coordinates) {
      forecastQuery.refetch();
    }
  };

  // Busca a localização ou se ainda não tem os dados da previsão:
  if (!forecastQuery.data || isLoading) {
    return <LoadingSkeletonPrevisoes />;
  }


  //Se a API de previsão de tempo deu erro
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

  // Se a API de previsão de tempo deu erro:
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

  // Verifica se não existem coordenadas (latitude e longitude).
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
    <div className="container py-2 py-md-0">
      {/* Botão de Atualizar */}
      <div className='d-flex justify-content-end mb-0'>
        <button onClick={handleRefresh} className='bg-light py-1 px-2 rounded-2'>
          <i className="bi bi-arrow-clockwise"></i>
        </button>
      </div>
      {/* Caixa com a previsão do tempo */}
      <div className="card shadow-sm my-3 p-3 h-100">
        <div className="card-header">
          <h5 className="card-title mb-0">Próximos 5 dias</h5>
        </div>

        <div className="d-flex p-4 justify-content-between align-items-center">
          {dailyTemperatures.map((day, index) => (
            <div key={index} className="text-center" style={{ minWidth: '60px' }}>
              {/* Dia da Semana */}
              <div className="font-size-small">
                <strong>{format(new Date(day.date), 'EEEE', { locale: pt })}</strong>
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
            <h5 className="card-title mb-0">Variações dos Próximos 5 dias</h5>
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
