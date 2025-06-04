import React from 'react';
import { Line } from 'react-chartjs-2';
import { format } from 'date-fns';

const PrecipitationChart = ({ data }) => {
  if (!data || !data.list) return null;

  // Processar os dados da API para o gráfico de precipitação
  const chartData = {
    labels: data.list.map(item => format(new Date(item.dt * 1000), 'dd/MM')),
    datasets: [
      {
        label: 'Precipitação (mm)',
        data: data.list.map(item => item.rain ? item.rain['3h'] || 0 : 0),
        fill: true,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
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
        text: 'Precipitação por Dia'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Volume (mm)'
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

export default PrecipitationChart; 