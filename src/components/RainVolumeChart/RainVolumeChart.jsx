import React, { useRef, useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Registra os componentes necessários do Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const RainVolumeChart = ({ data }) => {
  const [chartData, setChartData] = useState(null); // Estado para armazenar os dados do gráfico

  useEffect(() => {
    // Verifica se a data é válida
    if (data && Array.isArray(data.weeklyRainVolume)) {
      // Processa os dados da chuva semanal
      const rainData = data.weeklyRainVolume.map(item => ({
        week: item.week,
        volume: item.rain,
      }));

      // Cria os dados para o gráfico
      setChartData({
        labels: rainData.map(item => item.week),
        datasets: [
          {
            label: 'Volume de Chuva (mm)',
            data: rainData.map(item => item.volume),
            backgroundColor: '#4FC3F7',
          },
        ],
      });
    }
  }, [data]); // Recria os dados sempre que os dados de entrada mudam

  if (!chartData) {
    return <div>Loading...</div>; // Exibe mensagem enquanto os dados estão sendo processados
  }

  return (
    <div className="p-5 bg-light text-center" style={{ height: '400px' }}>
      <h5 style={{ color: 'gray' }}>Volume de Chuva Semanal</h5>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          maintainAspectRatio: false,  // Garante que o gráfico se redimensione corretamente
          plugins: {
            title: {
              display: true,
              text: 'Volume de Chuva por Semana',
              color: 'gray',


            },
            tooltip: {
              callbacks: {
                label: function (tooltipItem) {
                  return `${tooltipItem.raw} mm`; // Adiciona "mm" nos valores do tooltip
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
                text: 'Volume de Chuva (mm)',
              },
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
};

export default RainVolumeChart;
