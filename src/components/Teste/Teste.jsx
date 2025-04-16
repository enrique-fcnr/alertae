import React from 'react'
import { useGeolocation } from '../../hooks/useGeolocation'
import { HStack, Skeleton, SkeletonCircle, Stack } from "@chakra-ui/react"

function Teste() {
  const { coordinates, error: locationError, geoLocation, isLoading: locationLoading } = useGeolocation();

  console.log(coordinates)

  return (
    <>
      <div>Teste 1 - Conteudo referente ao primeiro link sidebar</div>

      <HStack gap="5">
        <SkeletonCircle size="12" />
        <Stack flex="1">
          <Skeleton height="5" />
          <Skeleton height="5" width="80%" />
        </Stack>
      </HStack>
    </>

  )
}

export default Teste


