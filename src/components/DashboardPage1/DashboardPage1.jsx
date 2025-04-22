
import { useForecastQuery, useReverseGeocodeQuery, useWeatherQuery } from '@/hooks/useWeather';
import { useGeolocation } from '../../hooks/useGeolocation'
import LoadingSkeleton from '../LoadingSkeleton/LoadingSkeleton';
import { Alert, Button } from "@chakra-ui/react"
import CurrentWeather from '../CurrentWeather/CurrentWeather'
import HourlyTemperature from '../HourlyTemperature/HourlyTemperature';
import WeatherDetails from '../WeatherDetails/WeatherDetails';


function DashboardPage1() {
  const { coordinates, error, getLocation, isLoading } = useGeolocation();
  const locationQuery = useReverseGeocodeQuery(coordinates)
  const weatherQuery = useWeatherQuery(coordinates)
  const forecastQuery = useForecastQuery(coordinates)


  console.log(locationQuery.data)


  // Button for refetch
  const handleRefresh = () => {
    getLocation()
    if (coordinates) {
      weatherQuery.refetch()
      forecastQuery.refetch()
      locationQuery.refetch()
    }
  }

  const locationName = locationQuery.data?.[0];
  //console.log(locationQuery.data[0].name)

  if (weatherQuery.error || forecastQuery.error) {
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

  if (!weatherQuery.data || !forecastQuery.data) {
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
    )
  }

  return (
    <>
      <div className='d-flex flex-column gap-3'>
        <div className='d-flex justify-content-end mb-0'>
          <button onClick={handleRefresh} className='bg-light py-1 px-2 rounded-2'>
            <i className="bi bi-arrow-clockwise"></i>
          </button>
        </div>

        <CurrentWeather
          data={weatherQuery.data}
          locationName={locationName}
        />
        <div className="row d-flex gap-3 gap-md-0">
          <div className="col-12 col-md-6">
            <WeatherDetails data={weatherQuery.data} />
          </div>
          <div className="col-12 col-md-6">
            <HourlyTemperature data={forecastQuery.data} />
          </div>
        </div>


      </div>



    </>
  )
}

export default DashboardPage1



