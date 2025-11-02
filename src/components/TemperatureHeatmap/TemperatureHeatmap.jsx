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
  if (!data || !data.list) return null;

  const processedData = data.list.map(item => {
    const date = new Date(item.dt * 1000);
    return {
      hour: date.getHours(),
      temp: item.main.temp,
      feelsLike: item.main.feels_like
    };
  });

  const tempData = processedData.map(item => ({
    x: item.hour,
    y: item.temp,
    r: (item.temp + 30) / 1.5,
  }));

  const feelsLikeData = processedData.map(item => ({
    x: item.hour,
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
      delay: ctx => ctx.dataIndex * 100,
    },
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: { size: 15 }, // mesma do HumidityChart
          color: 'gray', // cor padrão preta
        },
      },
      title: {
        display: true,
        text: 'Mapa de Calor - Temperatura vs Sensação Térmica',
        font: { size: 18 },
        color: '#737373',
      },
      tooltip: {
        titleFont: { size: 15 },
        bodyFont: { size: 14 },
        backgroundColor: '#fff',
        titleColor: '#737373',
        bodyColor: '#737373',
        borderColor: '#ccc',
        borderWidth: 1,
        callbacks: {
          label: tooltipItem => {
            const { x, y } = tooltipItem.raw;
            return `Hora: ${x}h | Temperatura: ${y.toFixed(1)}°C`;
          },
        },
      },
    },
    scales: {
      x: {
        type: 'linear',
        title: { display: true, text: 'Hora do Dia', font: { size: 15 }, color: 'gray' },
        min: 0,
        max: 23,
        ticks: { stepSize: 3, font: { size: 14 }, color: 'gray' },
        grid: { color: 'rgba(200, 200, 200, 0.707)' },
      },
      y: {
        title: { display: true, text: 'Temperatura (°C)', font: { size: 15 }, color: 'gray' },
        min: 10,
        max: 45,
        ticks: { stepSize: 5, font: { size: 14 }, color: 'gray' },
        grid: { color: 'rgba(200,200,200,0.2)' },
      },
    },
  };

  return (
    <div className="p-4 bg-light" style={{ width: '100%', height: '400px' }}>
      <div style={{ width: '100%', height: '100%' }}> <Scatter data={chartData} options={options} /> </div> </div>
  );
};

export default TemperatureHeatmap;
