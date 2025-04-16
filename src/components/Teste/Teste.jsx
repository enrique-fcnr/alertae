import React from 'react'
import { useGeolocation } from '../../hooks/useGeolocation'


function Teste() {
  const { coordinates, error: locationError, geoLocation, isLoading: locationLoading } = useGeolocation();

  console.log(coordinates)

  return (
    <div>Teste 1 - Conteudo referente ao primeiro link sidebar</div>
  )
}

export default Teste