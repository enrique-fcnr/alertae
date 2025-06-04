import React from 'react';
import { Line } from 'react-chartjs-2';
import { format } from 'date-fns';

const WeatherDescriptionChart = ({ data }) => {
  if (!data || !data.list) return null;

  // Processar os dados da API para o gráfico de descrições climáticas
  const chartData = {
    labels: data.list.map(item => format(new Date(item.dt * 1000), 'dd/MM')),
    datasets: [
      {
        label: 'Descrição Climática',
        data: data.list.map(item => {
          const description = item.weather[0].description;
          switch (description) {
            case 'clear sky':
              return 0;
            case 'few clouds':
              return 1;
            case 'scattered clouds':
              return 2;
            case 'broken clouds':
              return 3;
            case 'shower rain':
              return 4;
            case 'rain':
              return 5;
            case 'thunderstorm':
              return 6;
            case 'snow':
              return 7;
            case 'mist':
              return 8;
            default:
              return 9;
          }
        }),
        fill: true,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.4
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Descrições Climáticas por Dia'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 9,
        title: {
          display: true,
          text: 'Descrição'
        },
        ticks: {
          callback: function(value) {
            switch (value) {
              case 0:
                return 'Céu Limpo';
              case 1:
                return 'Poucas Nuvens';
              case 2:
                return 'Nuvens Dispersas';
              case 3:
                return 'Nuvens Quebradas';
              case 4:
                return 'Chuva Rápida';
              case 5:
                return 'Chuva';
              case 6:
                return 'Tempestade';
              case 7:
                return 'Neve';
              case 8:
                return 'Névoa';
              default:
                return 'Outro';
            }
          }
        }
      }
    }
  };

  return (
    <div style={{ width: '100%', height: '400px' }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default WeatherDescriptionChart; 