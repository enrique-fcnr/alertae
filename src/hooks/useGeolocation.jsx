import { useState, useEffect } from "react";

export function useGeolocation() {//declaração do hook

  // Estado inicial para armazenar os dados da localização.
  const [locationData, setLocationData] = useState({
    coordinates: null, //armazena as coordenadas do usuário
    error: null, //armazena a menssagem de erro, em caso de erro
    isLoading: true, //Indica carregamento, por isso começa como 'true'
  });

  const getLocation = () => { //é responsável por realizar a obtenção da localização do usuário
    setLocationData((prev) => ({ ...prev, isLoading: true, error: null }));

    if (!navigator.geolocation) { // Verifica se o navegador suporta a API de geolocalização (navigator.geolocation).
      setLocationData({
        coordinates: null,
        error: "Geolocation is not supported by your browser",
        isLoading: false,
      });
      return;
    }

    // Se a geolocalização for suportada, navigator.geolocation.getCurrentPosition é chamado. Ele recebe dois parâmetros:

    // A primeira função de sucesso, que é chamada quando a localização é obtida com sucesso. Essa função recebe o objeto position, do qual extraímos as coordenadas (latitude e longitude) e atualizamos o estado com essas informações.

    // A segunda função de erro, que é chamada quando ocorre algum erro ao tentar obter a localização.


    navigator.geolocation.getCurrentPosition(
      // Success function
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
      // Error function
      (error) => {
        let errorMessage;

        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage =
              "Location permission denied. Please enable location access.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable.";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out.";
            break;
          default:
            errorMessage = "An unknown error occurred.";
        }

        setLocationData({
          coordinates: null,
          error: errorMessage,
          isLoading: false,
        });
      },
      // 1. enableHighAccuracy: true: Solicita uma localização mais precisa, embora isso possa aumentar o tempo necessário para obter a localização.

      //2. timeout: 5000: Define um tempo máximo de 5 segundos para obter a localização.

      //3. maximumAge: 0: Define que a posição obtida não deve ser reutilizada se já tiver sido obtida anteriormente.
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  };

  // Chama a função assim que o componente é carregado
  useEffect(() => {
    getLocation();
  }, []);

  return {
    ...locationData,// Retorna um objeto contendo o estado da localização.
    getLocation, // retorna o método para que a localização também possa ser feita manualmente.
  };
}
