import React from 'react';
import { Line } from 'react-chartjs-2';
import { format } from 'date-fns';

const RainVolumeChart = ({ data }) => {
  if (!data || !data.list) return null;

  // Processar os dados da API para o gráfico de volume de chuva
  const chartData = {
    labels: data.list.map(item => format(new Date(item.dt * 1000), 'dd/MM')),
    datasets: [
      {
        label: 'Volume de Chuva (mm)',
        data: data.list.map(item => (item.rain ? item.rain['3h'] || 0 : 0)),
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
        labels: { font: { size: 13 } }
      },
      title: {
        display: true,
        text: 'Volume de Chuva por Dia',
        font: { size: 16 }
      },
      tooltip: {
        titleFont: { size: 15 },
        bodyFont: { size: 14 },
        callbacks: {
          title: function (tooltipItems) {
            const label = tooltipItems[0].label;
            return `Dia ${label}`;
          }
        }
      }
    },
    scales: {
      x: {
        ticks: { font: { size: 14 } },
        title: { display: true, text: 'Dia', font: { size: 15 } }
      },
      y: {
        beginAtZero: true,
        ticks: { font: { size: 14 } },
        title: { display: true, text: 'Volume (mm)', font: { size: 15 } }
      }
    }
  };

  return (
    <div style={{ width: '100%', height: '400px' }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default RainVolumeChart;
