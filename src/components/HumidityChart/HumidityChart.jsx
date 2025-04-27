import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Registra os componentes necessários do Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const HumidityChart = ({ data }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {

    // Se os dados forem válidos, configure o gráfico
    if (data && Array.isArray(data.dailyHumidity
    )) {
      const humidityData = data.dailyHumidity
        .map(item => ({
          day: item.day,
          humidity: item.humidity,
        }));

      setChartData({
        labels: humidityData.map(item => item.day),
        datasets: [
          {
            label: 'Umidade (%)',
            data: humidityData.map(item => item.humidity),
            backgroundColor: '#FFCC00', // Cor do gráfico
          },
        ],
      });
    }
  }, [data]); // Atualiza os dados sempre que os dados mudam

  if (!chartData) {
    return <div>Carregando...</div>;
  }

  return (
    <div className='bg-light p-5 text-center' style={{ height: '400px' }}>
      <h5 style={{ color: 'gray' }}>Variação de Umidade Semanal</h5>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: 'Umidade por Semana',
              color: 'gray',
            },
            tooltip: {
              callbacks: {
                label: function (tooltipItem) {
                  return `${tooltipItem.raw} %`;
                },
              },
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Semana',
              },
            },
            y: {
              title: {
                display: true,
                text: 'Umidade (%)',
              },
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
};

export default HumidityChart;
