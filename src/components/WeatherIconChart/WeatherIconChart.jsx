import React from 'react';
import { Line } from 'react-chartjs-2';
import { format } from 'date-fns';

const WeatherIconChart = ({ data }) => {
  if (!data || !data.list) return null;

  // Processar os dados da API para o gráfico de ícones climáticos
  const chartData = {
    labels: data.list.map(item => format(new Date(item.dt * 1000), 'dd/MM')),
    datasets: [
      {
        label: 'Ícone Climático',
        data: data.list.map(item => {
          const icon = item.weather[0].icon;
          switch (icon) {
            case '01d':
            case '01n':
              return 0;
            case '02d':
            case '02n':
              return 1;
            case '03d':
            case '03n':
              return 2;
            case '04d':
            case '04n':
              return 3;
            case '09d':
            case '09n':
              return 4;
            case '10d':
            case '10n':
              return 5;
            case '11d':
            case '11n':
              return 6;
            case '13d':
            case '13n':
              return 7;
            case '50d':
            case '50n':
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
        text: 'Ícones Climáticos por Dia'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 9,
        title: {
          display: true,
          text: 'Ícone'
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

export default WeatherIconChart; 