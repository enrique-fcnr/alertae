import { useState, useEffect } from "react";

export function useGeolocation() {
  // Estado inicial para armazenar os dados da localização.
  const [locationData, setLocationData] = useState({
    coordinates: null, // armazena as coordenadas do usuário
    error: null, // armazena a mensagem de erro, em caso de erro
    isLoading: true, // Indica carregamento, por isso começa como 'true'
  });

  const getLocation = () => {
    setLocationData((prev) => ({ ...prev, isLoading: true, error: null }));

    if (!navigator.geolocation) {
      setLocationData({
        coordinates: null,
        error: "A geolocalização não é suportada por esse browser.",
        isLoading: false,
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      // Função de sucesso
      (position) => {
        setLocationData({
          coordinates: {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          },
          error: null,
          isLoading: false,
        });
      },
      // Função de erro
      (error) => {
        let errorMessage;
        //console.log(error)

        switch (error.code) {
          case 1:
            errorMessage = "Permissão de localização negada. Por favor, permita o acesso à sua localização para ver as informações do tempo.";
            break;
          case 2:
            errorMessage = "A posição não está disponível. Por favor, verifique se o GPS está ativado.";
            break;
          case 3:
            errorMessage = "Tempo esgotado ao tentar obter a localização. Por favor, tente novamente.";
            break;
          default:
            errorMessage = "Ocorreu um erro ao obter sua localização. Por favor, tente novamente.";
        }


        setLocationData({
          coordinates: null,
          error: errorMessage,
          isLoading: false,
        });


      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };



  // Solicita a localização assim que o componente é montado
  useEffect(() => {
    getLocation();
  }, []);


  return {
    ...locationData, // Retorna o estado completo da localização
    getLocation, // Retorna o método para que a localização possa ser feita manualmente
  };
}
