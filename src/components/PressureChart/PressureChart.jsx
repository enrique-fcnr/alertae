import React from 'react';
import { Line } from 'react-chartjs-2';
import { format } from 'date-fns';

const PressureChart = ({ data }) => {
  if (!data || !data.list) return null;

  // Processar os dados da API para o gráfico de pressão
  const chartData = {
    labels: data.list.map(item => format(new Date(item.dt * 1000), 'dd/MM')),
    datasets: [
      {
        label: 'Pressão (hPa)',
        data: data.list.map(item => item.main.pressure),
        fill: true,
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        borderColor: 'rgba(255, 159, 64, 1)',
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
        text: 'Pressão por Dia'
      }
    },
    scales: {
      y: {
        title: {
          display: true,
          text: 'Pressão (hPa)'
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

export default PressureChart; 