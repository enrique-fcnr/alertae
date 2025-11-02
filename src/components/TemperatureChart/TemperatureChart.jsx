import React from 'react';
import { Line } from 'react-chartjs-2';
import { format } from 'date-fns';

const TemperatureChart = ({ data }) => {
  if (!data || !data.list) return null;

  // Processar os dados da API para o gráfico de temperatura
  const chartData = {
    labels: data.list.map(item => format(new Date(item.dt * 1000), 'dd/MM')),
    datasets: [
      {
        label: 'Temperatura (°C)',
        data: data.list.map(item => item.main.temp),
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
        labels: {
          font: {
            size: 15 // tamanho da fonte da legenda
          }
        }
      },
      title: {
        display: true,
        text: 'Temperatura por Dia',
        font: {
          size: 20 // tamanho do título do gráfico
        },

      },
      tooltip: {
        titleFont: { size: 15 },
        bodyFont: { size: 15 },
        callbacks: {
          title: function (tooltipItems) {
            // tooltipItems é um array, geralmente com um item
            const label = tooltipItems[0].label; // "02/11"
            return `Dia ${label}`; // adiciona "Dia " antes da data
          }
        }
      }
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 15 // tamanho das labels do eixo X
          }
        },
        title: {
          display: true,
          text: 'Dia',
          font: {
            size: 15 // título do eixo X
          }
        }
      },
      y: {
        ticks: {
          font: {
            size: 15 // tamanho das labels do eixo Y
          }
        },
        title: {
          display: true,
          text: 'Temperatura (°C)',
          font: {
            size: 15 // título do eixo Y
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

export default TemperatureChart;
