import React, { useEffect, useRef } from 'react';
import { Chart as ChartJS, Title, Tooltip, Legend, CategoryScale, LinearScale, LineElement } from 'chart.js';

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

  // Usamos o useEffect para recriar o gráfico sempre que os dados mudarem
  useEffect(() => {
    if (chartInstance.current) {
      // Se houver uma instância anterior do gráfico, destruímos ela
      chartInstance.current.destroy();
    }

    // Criar uma nova instância do gráfico
    chartInstance.current = new ChartJS(chartRef.current, {
      type: 'line',
      data: {
        labels: data.windSpeedTrend.map((item) => item.day),
        datasets: [
          {
            label: 'Velocidade do Vento (m/s)',
            data: data.windSpeedTrend.map((item) => item.speed),
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

    // Limpeza: destrói a instância do gráfico quando o componente for desmontado
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div className="p-5 bg-light text-center" style={{ height: '400px' }}>
      <h5 style={{ color: 'gray' }}>Variação da Velocidade do Vento</h5>
      <canvas ref={chartRef} style={{ height: '100%' }} />
    </div>
  );
};

export default WindTrendLine;
