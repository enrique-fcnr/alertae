import React from 'react';
import { Line } from 'react-chartjs-2';
import { format } from 'date-fns';

const UVIndexChart = ({ data }) => {
  if (!data || !data.list) return null;

  // Processar os dados da API para o gráfico de índice UV
  const chartData = {
    labels: data.list.map(item => format(new Date(item.dt * 1000), 'dd/MM')),
    datasets: [
      {
        label: 'Índice UV',
        data: data.list.map(item => item.uvi),
        fill: true,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
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
        text: 'Índice UV por Dia'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Índice UV'
        },
        ticks: {
          callback: function(value) {
            if (value === 0) return 'Baixo';
            if (value === 3) return 'Moderado';
            if (value === 6) return 'Alto';
            if (value === 8) return 'Muito Alto';
            if (value === 11) return 'Extremo';
            return '';
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

export default UVIndexChart; 