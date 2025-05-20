// components/TemperatureHeatmap.jsx
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
  ScatterController,
  BubbleController,
} from 'chart.js';

// ✅ Registro obrigatório dos elementos usados
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  ScatterController,
  BubbleController
);

const TemperatureHeatmap = ({ data }) => {
  if (!data) return null;

  // 🔵 Dados de Temperatura
  const tempData = data.temperatureHeatmap.map((item) => ({
    x: parseInt(item.hour, 10),
    y: item.temp,
    r: (item.temp + 30) / 1.5,
  }));

  // 🔴 Dados de Sensação Térmica
  const feelsLikeData = data.temperatureHeatmap.map((item) => ({
    x: parseInt(item.hour, 10),
    y: item.feelsLike,
    r: (item.feelsLike + 30) / 1,
  }));

  const chartData = {
    datasets: [
      {
        label: 'Temperatura Real',
        data: tempData,
        backgroundColor: 'rgba(255,99,132,0.7)',
        borderColor: '#fff',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,1)',
      },
      {
        label: 'Sensação Térmica',
        data: feelsLikeData,
        backgroundColor: 'rgba(54, 162, 235, 0.7)',
        borderColor: '#fff',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(54, 162, 235, 1)',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1500,
      easing: 'easeInOutCubic',
      delay: (ctx) => ctx.dataIndex * 100,
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#4B5563',
          font: { size: 14, weight: 'bold' },
        },
      },
      tooltip: {
        backgroundColor: '#6366f1',
        borderColor: '#6366f1',
        borderWidth: 1,
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
        type: 'linear',
        title: {
          display: true,
          text: 'Hora do Dia',
          font: { size: 14 },
          color: '#6B7280',
        },
        min: 0,
        max: 23,
        ticks: { stepSize: 3, color: '#4B5563' },
        grid: { color: 'rgba(200,200,200,0.2)' },
      },
      y: {
        title: {
          display: true,
          text: 'Temperatura (°C)',
          font: { size: 14 },
          color: '#6B7280',
        },
        min: 10,
        max: 45,
        ticks: {
          stepSize: 5,
          callback: (value) => value % 5 === 0 ? value : '',
          color: '#4B5563',
        },
        grid: { color: 'rgba(200,200,200,0.2)' },
      },
    },
  };

  return (
    <div className="p-5 bg-light" style={{ width: '100%', height: '400px' }}>
      <h5 className="text-lg mb-4 text-center text-indigo-600 font-semibold">
        Mapa de Calor - Temperatura vs Sensação Térmica
      </h5>
      <div style={{ width: '100%', height: '90%' }}>
        <Scatter data={chartData} options={options} />
      </div>
    </div>
  );
};

export default TemperatureHeatmap;
