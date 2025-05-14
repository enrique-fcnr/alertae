
import { useForecastQuery, useReverseGeocodeQuery, useWeatherQuery } from '@/hooks/useWeather';
import { useGeolocation } from '../../hooks/useGeolocation'
import LoadingSkeleton from '../LoadingSkeleton/LoadingSkeleton';
import { Alert, Button } from "@chakra-ui/react"
import CurrentWeather from '../CurrentWeather/CurrentWeather'
import HourlyTemperature from '../HourlyTemperature/HourlyTemperature';
import WeatherDetails from '../WeatherDetails/WeatherDetails';
import './DashboardPage1.css';
import { cities } from '../../../data-dashboard-page3'

function DashboardPage1() {
  const coordinates1 = { lon: cities[0].lon, lat: cities[0].lat };
  const { error, getLocation, isLoading } = useGeolocation();
  const locationQuery = useReverseGeocodeQuery(coordinates1)
  const weatherQuery = useWeatherQuery(coordinates1)
  const forecastQuery = useForecastQuery(coordinates1)

  // Button for refetch
  const handleRefresh = () => {
    getLocation()
    if (coordinates1) {
      weatherQuery.refetch()
      forecastQuery.refetch()
      locationQuery.refetch()
    }
  }

  const locationName = Array.isArray(locationQuery.data) ? locationQuery.data[0] : null;


  // Se houver error:
  if (weatherQuery.error || forecastQuery.error) {
    return (

      <Alert.Root className='p-5 bg-danger text-light d-flex align-items-start ' status="error">
        <Alert.Indicator className='fs-1 ' />
        <Alert.Content className=''>
          <Alert.Title className='fs-4 mt-2'>Falhor ao coletar informações sobre o tempo. Por favor, tente novamente!</Alert.Title>
          <Alert.Description className='fs-4 mt-sm-3'>
            {error}

          </Alert.Description>
          <Button className="m-0 bg-light fs-5 p-4 text-danger rounded-3 mt-sm-3 "

            onClick={getLocation}>
            Tente novamente
          </Button>

        </Alert.Content>
      </Alert.Root>
    );
  }

  if (!weatherQuery.data || !forecastQuery.data || !locationName || isLoading) {
    return <LoadingSkeleton />
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
    )
  }

  if (!coordinates1) {
    return (
      <Alert.Root status="error" className='p-5 bg-danger text-light d-flex align-items-start'>
        <Alert.Indicator className='fs-1 ' />
        <Alert.Content className=''>
          <Alert.Title className='fs-2 mt-2'>Localização é necessária.</Alert.Title>
          <Alert.Description className='fs-4 mt-sm-3'>
            {error}

          </Alert.Description>
          <Button className="m-0 bg-light fs-4 p-4 text-danger rounded-3 mt-sm-3 "

            onClick={getLocation}>
            Permitir Localização
          </Button>

        </Alert.Content >
      </Alert.Root >
    )
  }

  return (
    <>

      <div className='py-2 d-flex flex-column gap-3'>
        <div className='d-flex justify-content-end mb-0'>
          <button onClick={handleRefresh} className='dashboard-refresh-btn'>
            <i className="bi bi-arrow-clockwise"></i>
          </button>

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



