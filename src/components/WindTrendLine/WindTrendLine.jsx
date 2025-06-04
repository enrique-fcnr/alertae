import React, { useEffect, useRef } from 'react';
import { Chart as ChartJS, Title, Tooltip, Legend, CategoryScale, LinearScale, LineElement } from 'chart.js';
import { format } from 'date-fns';

// Registrando os componentes do Chart.js
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  LineElement
);

const WindTrendLine = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  // Processar dados da API para tendência diária de vento
  let windSpeedTrend = [];
  if (data && data.list) {
    // Agrupar por dia e calcular média
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
        labels: windSpeedTrend.map((item) => item.day),
        datasets: [
          {
            label: 'Velocidade do Vento (m/s)',
            data: windSpeedTrend.map((item) => item.speed),
            fill: false,
            backgroundColor: '#FFD54F',
            borderColor: '#FFA000',
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            title: { display: true, text: 'Dia' },
          },
          y: {
            title: { display: true, text: 'Velocidade do Vento (m/s)' },
          },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

  return (
    <div className="p-5 bg-light text-center" style={{ height: '400px' }}>
      <h5 style={{ color: 'gray' }}>Variação da Velocidade do Vento</h5>
      <canvas ref={chartRef} style={{ height: '100%' }} />
    </div>
  );
};

export default WindTrendLine;
