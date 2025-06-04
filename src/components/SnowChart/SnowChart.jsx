import React from 'react';
import { Line } from 'react-chartjs-2';
import { format } from 'date-fns';

const SnowChart = ({ data }) => {
  if (!data || !data.list) return null;

  // Processar os dados da API para o gráfico de neve
  const chartData = {
    labels: data.list.map(item => format(new Date(item.dt * 1000), 'dd/MM')),
    datasets: [
      {
        label: 'Neve (mm)',
        data: data.list.map(item => item.snow ? item.snow['3h'] || 0 : 0),
        fill: true,
        backgroundColor: 'rgba(201, 203, 207, 0.2)',
        borderColor: 'rgba(201, 203, 207, 1)',
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
        text: 'Neve por Dia'
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

export default SnowChart; 