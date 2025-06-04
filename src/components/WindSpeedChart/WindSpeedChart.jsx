import React from 'react';
import { Line } from 'react-chartjs-2';
import { format } from 'date-fns';

const WindSpeedChart = ({ data }) => {
  if (!data || !data.list) return null;

  // Processar os dados da API para o gráfico de velocidade do vento
  const chartData = {
    labels: data.list.map(item => format(new Date(item.dt * 1000), 'dd/MM')),
    datasets: [
      {
        label: 'Velocidade do Vento (m/s)',
        data: data.list.map(item => item.wind.speed),
        fill: true,
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
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
        text: 'Velocidade do Vento por Dia'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Velocidade (m/s)'
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

export default WindSpeedChart; 