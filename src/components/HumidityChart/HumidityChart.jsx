import React from 'react';
import { Line } from 'react-chartjs-2';
import { format } from 'date-fns';

const HumidityChart = ({ data }) => {
  if (!data || !data.list) return null;

  // Processar os dados da API para o gráfico de umidade
  const chartData = {
    labels: data.list.map(item => format(new Date(item.dt * 1000), 'dd/MM')),
    datasets: [
      {
        label: 'Umidade (%)',
        data: data.list.map(item => item.main.humidity),
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
        labels: { font: { size: 14 } }
      },
      title: {
        display: true,
        text: 'Umidade por Dia',
        font: { size: 16 }
      },
      tooltip: {
        titleFont: { size: 15 },
        bodyFont: { size: 13 },
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
        ticks: { font: { size: 13 } },
        title: { display: true, text: 'Dia', font: { size: 15 } }
      },
      y: {
        beginAtZero: true,
        max: 100,
        ticks: { font: { size: 13 } },
        title: { display: true, text: 'Umidade (%)', font: { size: 15 } }
      }
    }
  };

  return (
    <div style={{ width: '100%', height: '400px' }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default HumidityChart;
