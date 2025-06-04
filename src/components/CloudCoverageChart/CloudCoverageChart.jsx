import React from 'react';
import { Line } from 'react-chartjs-2';
import { format } from 'date-fns';

const CloudCoverageChart = ({ data }) => {
  if (!data || !data.list) return null;

  // Processar os dados da API para o gráfico de cobertura de nuvens
  const chartData = {
    labels: data.list.map(item => format(new Date(item.dt * 1000), 'dd/MM')),
    datasets: [
      {
        label: 'Cobertura de Nuvens (%)',
        data: data.list.map(item => item.clouds.all),
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
        text: 'Cobertura de Nuvens por Dia'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'Cobertura (%)'
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

export default CloudCoverageChart; 