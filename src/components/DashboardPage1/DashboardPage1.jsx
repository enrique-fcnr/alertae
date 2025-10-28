import { useForecastQuery, useReverseGeocodeQuery, useWeatherQuery } from '@/hooks/useWeather';
import { useGeolocation } from '../../hooks/useGeolocation'
import { Alert, Button } from "@chakra-ui/react"
import CurrentWeather from '../CurrentWeather/CurrentWeather'
import HourlyTemperature from '../HourlyTemperature/HourlyTemperature';
import WeatherDetails from '../WeatherDetails/WeatherDetails';
import './DashboardPage1.css';
import { cities } from '../../../data-dashboard-page3'
import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

function DashboardPage1() {
  const { selectedCoordinates } = useOutletContext();

  useEffect(() => {
    console.log("DashboardPage1 received coordinates:", selectedCoordinates);
  }, [selectedCoordinates]);

  const locationQuery = useReverseGeocodeQuery(selectedCoordinates)
  const weatherQuery = useWeatherQuery(selectedCoordinates)
  const forecastQuery = useForecastQuery(selectedCoordinates)
  const geolocation = useGeolocation(selectedCoordinates)

  console.log(locationQuery.data)

  // Button for refetch
  const handleRefresh = () => {
    if (selectedCoordinates) {
      weatherQuery.refetch()
      forecastQuery.refetch()
      locationQuery.refetch()
    }
  }

  const locationName = Array.isArray(locationQuery.data) ? locationQuery.data[0] : null;


  if (locationQuery.error || weatherQuery.error || forecastQuery.error) {
    return (
      <Alert.Root className='p-5 bg-danger text-light d-flex align-items-start ' status="error">
        <Alert.Indicator className='fs-1 ' />
        <Alert.Content className=''>
          <Alert.Title className='fs-4 mt-2'>Falha ao coletar informações sobre o tempo. Por favor, tente novamente!</Alert.Title>
          <Alert.Description className='fs-4 mt-sm-3'>
            Erro ao carregar dados do tempo.
          </Alert.Description>
        </Alert.Content>
      </Alert.Root>
    );
  }

  if (!selectedCoordinates) {
    return (
      <Alert.Root status="info" className='p-5 bg-primary text-light d-flex align-items-start'>
        <Alert.Indicator className='fs-1 ' />
        <Alert.Content className=''>
          <Alert.Title className='fs-2 mt-2'>Selecione uma localização.</Alert.Title>
          <Alert.Description className='fs-4 mt-sm-3'>
            Por favor, utilize a barra de busca na sidebar para selecionar uma cidade.
          </Alert.Description>
        </Alert.Content >
      </Alert.Root >
    )
  }

  return (
    <>
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

        <CurrentWeather
          data={weatherQuery.data}
          locationName={locationName}
        />
        <div className="row d-flex gap-3 gap-md-0">
          <div className="col-12  col-lg-6">
            <WeatherDetails data={weatherQuery.data} />
          </div>

          <div className="col-12 col-lg-6">
            <div className="card shadow-sm p-3 h-100">
              <div className="card-header">
                <h5 style={{ color: '#4C585B' }} className="card-title mb-0">Variações do Dia</h5>
              </div>

              <HourlyTemperature
                data={forecastQuery.data}
                valueMax={8}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default DashboardPage1



