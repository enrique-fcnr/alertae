import React from 'react';
import { Scatter } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
} from 'chart.js';

// Registrando os componentes do Chart.js
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement
);

const TemperatureHeatmap = ({ data }) => {
  if (!data) return null;

  // Dados de Temperatura Real
  const tempData = data.temperatureHeatmap.map((item) => ({
    x: parseInt(item.hour),
    y: item.temp,
    r: (item.temp + 30) / 1.5,
    type: 'Temperatura',
  }));

  // Dados de Sensação Térmica
  const feelsLikeData = data.temperatureHeatmap.map((item) => ({
    x: parseInt(item.hour),
    y: item.feelsLike,
    r: (item.feelsLike + 30) / 1,
    type: 'Sensação Térmica',
  }));

  // Dados para o gráfico
  const chartData = {
    datasets: [
      {
        label: 'Temperatura Real',
        data: tempData,
        backgroundColor: 'rgba(255,99,132,0.7)', // Vermelho claro
        borderColor: 'rgba(255,255,255,0.8)',
        borderWidth: 1,
        hoverBorderWidth: 3,
        hoverBackgroundColor: 'rgba(255,99,132,1)',
      },
      {
        label: 'Sensação Térmica',
        data: feelsLikeData,
        backgroundColor: 'rgba(54, 162, 235, 0.7)', // Azul claro
        borderColor: 'rgba(255,255,255,0.8)',
        borderWidth: 1,
        hoverBorderWidth: 3,
        hoverBackgroundColor: 'rgba(54, 162, 235, 1)',
      },
    ],
  };

  // Opções para o gráfico
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 2000,
      easing: 'easeInOutElastic',
      delay: (context) => context.dataIndex * 150,
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: '#6a6b6b',
          font: {
            size: 14,
            weight: 'bold',
          },
        },
      },
      tooltip: {
        enabled: true,
        backgroundColor: '#6366f1',
        borderColor: '#6366f1',
        borderWidth: 1,
        titleFont: { size: 16 },
        bodyFont: { size: 14 },
        callbacks: {
          label: (tooltipItem) => {
            const { x, y } = tooltipItem.raw;
            return `Hora: ${x}h | Temperatura: ${y}°C`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Hora do Dia',
          font: { size: 16 },
          color: '#6B7280',
        },
        min: 0,
        max: 23,
        type: 'linear',
        ticks: { stepSize: 3 },
        grid: {
          color: 'rgba(200,200,200,0.2)',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Temperatura (°C)',
          font: { size: 16 },
          color: '#6B7280',
        },
        min: 10,
        max: 45,
        ticks: {
          stepSize: 5,
          callback: function (value) {
            return value % 5 === 0 ? value : null;
          },
          color: '#374151',
          font: { size: 12 },
        },
        grid: {
          color: 'rgba(200,200,200,0.2)',
        },
      },
    },
  };

  return (
    <div className="p-5 bg-light " style={{ width: '100%', height: '400px' }}>
      <h5 style={{ color: 'gray' }} className="text-lg mb-4 text-center text-indigo-600">
        Mapa de Calor - Temperatura vs Sensação Térmica
      </h5>
      <div style={{ width: '100%', height: '90%' }}>
        <Scatter data={chartData} options={options} />
      </div>
    </div>
  );
};

export default TemperatureHeatmap;
