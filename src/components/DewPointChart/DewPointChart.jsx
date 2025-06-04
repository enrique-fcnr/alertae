import React from 'react';
import { Line } from 'react-chartjs-2';
import { format } from 'date-fns';

const DewPointChart = ({ data }) => {
  if (!data || !data.list) return null;

  // Processar os dados da API para o gráfico de ponto de orvalho
  const chartData = {
    labels: data.list.map(item => format(new Date(item.dt * 1000), 'dd/MM')),
    datasets: [
      {
        label: 'Ponto de Orvalho (°C)',
        data: data.list.map(item => item.main.dew_point),
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
        text: 'Ponto de Orvalho por Dia'
      }
    },
    scales: {
      y: {
        title: {
          display: true,
          text: 'Temperatura (°C)'
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

export default DewPointChart; 