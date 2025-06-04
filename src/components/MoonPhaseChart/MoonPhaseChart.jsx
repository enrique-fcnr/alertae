import React from 'react';
import { Line } from 'react-chartjs-2';
import { format } from 'date-fns';

const MoonPhaseChart = ({ data }) => {
  if (!data || !data.list) return null;

  // Processar os dados da API para o gráfico de fase da lua
  const chartData = {
    labels: data.list.map(item => format(new Date(item.dt * 1000), 'dd/MM')),
    datasets: [
      {
        label: 'Fase da Lua',
        data: data.list.map(item => item.moon_phase * 100),
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
        text: 'Fase da Lua por Dia'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'Fase (%)'
        },
        ticks: {
          callback: function(value) {
            if (value === 0) return 'Lua Nova';
            if (value === 25) return 'Quarto Crescente';
            if (value === 50) return 'Lua Cheia';
            if (value === 75) return 'Quarto Minguante';
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

export default MoonPhaseChart; 