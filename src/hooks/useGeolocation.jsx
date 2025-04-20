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
        error: "Geolocation is not supported by your browser",
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
            errorMessage = "Permissão de localização negada.";
            break;
          case 2:
            errorMessage = "A posição não está disponível.";
            break;
          case 3:
            errorMessage = "Tempo esgotado ao tentar obter a localização.";
            break;
          default:
            errorMessage = "Ocorreu um erro desconhecido.";
        }


        setLocationData({
          coordinates: null,
          error: errorMessage,
          isLoading: false,
        });


      },
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
  }, []); // O array vazio indica que será chamado apenas uma vez após o primeiro render


  return {
    ...locationData, // Retorna o estado completo da localização
    getLocation, // Retorna o método para que a localização possa ser feita manualmente
  };
}
