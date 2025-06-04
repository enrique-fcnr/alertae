import React from 'react';
import { Line } from 'react-chartjs-2';
import { format } from 'date-fns';

const WindDirectionChart = ({ data }) => {
  if (!data || !data.list) return null;

  // Processar os dados da API para o gráfico de direção do vento
  const chartData = {
    labels: data.list.map(item => format(new Date(item.dt * 1000), 'dd/MM')),
    datasets: [
      {
        label: 'Direção do Vento (graus)',
        data: data.list.map(item => item.wind.deg),
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
        text: 'Direção do Vento por Dia'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 360,
        title: {
          display: true,
          text: 'Direção (graus)'
        },
        ticks: {
          callback: function(value) {
            if (value === 0 || value === 360) return 'Norte';
            if (value === 90) return 'Leste';
            if (value === 180) return 'Sul';
            if (value === 270) return 'Oeste';
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

export default WindDirectionChart; 