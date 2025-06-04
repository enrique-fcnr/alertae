import React from 'react';
import { format } from 'date-fns';

const ColdestDaysList = ({ data }) => {
  if (!data || !data.list) return null;

  // Processar os dados da API para encontrar os dias mais frios
  const dailyTemps = {};
  data.list.forEach(item => {
    const date = format(new Date(item.dt * 1000), 'yyyy-MM-dd');
    const temp = item.main.temp;
    
    if (!dailyTemps[date] || dailyTemps[date] > temp) {
      dailyTemps[date] = temp;
    }
  });

  // Ordenar os dias por temperatura e pegar os 3 mais frios
  const coldestDays = Object.entries(dailyTemps)
    .sort((a, b) => a[1] - b[1])
    .slice(0, 3);

  return (
    <div className="p-5 bg-light" style={{ width: '100%', height: '400px' }}>
      <h5 style={{ color: 'gray' }}>3 Dias Mais Frios da Semana</h5>
      <ul className="list-group w-fill h-100 d-flex justify-content-center align-items-center">
        {coldestDays.map(([date, temp], idx) => (
          <li key={idx} className="list-group-item d-flex justify-content-between align-items-center w-100 p-4">
            {format(new Date(date), 'dd/MM/yyyy')}
            <span className="badge bg-primary rounded-pill p-2">{Math.round(temp)}°C</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ColdestDaysList; 