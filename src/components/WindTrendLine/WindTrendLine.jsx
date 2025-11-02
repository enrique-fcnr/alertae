import React, { useEffect, useRef } from 'react';
import { Chart as ChartJS, Title, Tooltip, Legend, CategoryScale, LinearScale, LineElement, PointElement } from 'chart.js';
import { format } from 'date-fns';

// Registrando os componentes do Chart.js
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement
);

const WindTrendLine = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  // Processar dados da API para tendência diária de vento
  let windSpeedTrend = [];
  if (data && data.list) {
    const daily = {};
    data.list.forEach(item => {
      const day = format(new Date(item.dt * 1000), 'dd/MM');
      if (!daily[day]) daily[day] = [];
      daily[day].push(item.wind.speed);
    });
    windSpeedTrend = Object.entries(daily).map(([day, speeds]) => ({
      day,
      speed: speeds.reduce((a, b) => a + b, 0) / speeds.length
    }));
  }

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    if (!windSpeedTrend.length) return;

    chartInstance.current = new ChartJS(chartRef.current, {
      type: 'line',
      data: {
        labels: windSpeedTrend.map(item => item.day),
        datasets: [
          {
            label: 'Velocidade do Vento (m/s)',
            data: windSpeedTrend.map(item => item.speed),
            fill: false,
            backgroundColor: '#FFD54F',
            borderColor: '#FFA000',
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: { font: { size: 14 } }
          },
          title: {
            display: true,
            text: 'Variação da Velocidade do Vento',
            font: { size: 17 }
          },
          tooltip: {
            titleFont: { size: 16 },
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
            title: { display: true, text: 'Dia', font: { size: 16 } },
            ticks: { font: { size: 14 } }
          },
          y: {
            title: { display: true, text: 'Velocidade do Vento (m/s)', font: { size: 16 } },
            ticks: { font: { size: 14 } }
          }
        }
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

  return (
    <div className="p-5 bg-light text-center" style={{ height: '400px' }}>
      <canvas ref={chartRef} style={{ height: '100%' }} />
    </div>
  );
};

export default WindTrendLine;
