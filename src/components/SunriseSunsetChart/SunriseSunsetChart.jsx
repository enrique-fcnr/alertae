import React from 'react';
import { Line } from 'react-chartjs-2';
import { format } from 'date-fns';

const SunriseSunsetChart = ({ data }) => {
  if (!data || !data.list) return null;

  // Processar os dados da API para o gráfico de nascer e pôr do sol
  const chartData = {
    labels: data.list.map(item => format(new Date(item.dt * 1000), 'dd/MM')),
    datasets: [
      {
        label: 'Nascer do Sol',
        data: data.list.map(item => {
          const sunrise = new Date(item.sys.sunrise * 1000);
          return sunrise.getHours() + sunrise.getMinutes() / 60;
        }),
        fill: true,
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        borderColor: 'rgba(255, 159, 64, 1)',
        tension: 0.4
      },
      {
        label: 'Pôr do Sol',
        data: data.list.map(item => {
          const sunset = new Date(item.sys.sunset * 1000);
          return sunset.getHours() + sunset.getMinutes() / 60;
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
        text: 'Horário do Nascer e Pôr do Sol por Dia'
      }
    },
    scales: {
      y: {
        title: {
          display: true,
          text: 'Hora do Dia'
        },
        ticks: {
          callback: function(value) {
            const hours = Math.floor(value);
            const minutes = Math.round((value - hours) * 60);
            return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
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

export default SunriseSunsetChart; 