import React from 'react';
import { Line } from 'react-chartjs-2';
import { format } from 'date-fns';

const WeatherMainChart = ({ data }) => {
  if (!data || !data.list) return null;

  // Processar os dados da API para o gráfico de condições climáticas principais
  const chartData = {
    labels: data.list.map(item => format(new Date(item.dt * 1000), 'dd/MM')),
    datasets: [
      {
        label: 'Condição Climática Principal',
        data: data.list.map(item => {
          const main = item.weather[0].main;
          switch (main) {
            case 'Clear':
              return 0;
            case 'Clouds':
              return 1;
            case 'Rain':
              return 2;
            case 'Snow':
              return 3;
            case 'Thunderstorm':
              return 4;
            case 'Drizzle':
              return 5;
            case 'Mist':
              return 6;
            default:
              return 7;
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
        text: 'Condições Climáticas Principais por Dia'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 7,
        title: {
          display: true,
          text: 'Condição'
        },
        ticks: {
          callback: function(value) {
            switch (value) {
              case 0:
                return 'Limpo';
              case 1:
                return 'Nublado';
              case 2:
                return 'Chuva';
              case 3:
                return 'Neve';
              case 4:
                return 'Tempestade';
              case 5:
                return 'Garoa';
              case 6:
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

export default WeatherMainChart; 