import React from 'react';
import { format } from 'date-fns';

const HottestDaysList = ({ data }) => {
  if (!data || !data.list) return null;

  // Processar os dados da API para encontrar os dias mais quentes
  const dailyTemps = {};
  data.list.forEach(item => {
    const date = format(new Date(item.dt * 1000), 'yyyy-MM-dd');
    const temp = item.main.temp;

    if (!dailyTemps[date] || dailyTemps[date] < temp) {
      dailyTemps[date] = temp;
    }
  });

  // Ordenar os dias por temperatura e pegar os 3 mais quentes
  const hottestDays = Object.entries(dailyTemps)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  return (
    <div className="p-5 bg-light text-start" style={{ width: '100%', height: '400px' }}>
      <h5 className='m-0 mb-4' style={{ color: '#737373', fontFamily: 'Arial, sans-serif', fontWeight: '700', fontSize: '17px' }}>Top 3 dias mais quentes da semana</h5>
      <ul className="list-group w-fill h-100 d-flex  align-items-center ">
        {hottestDays.map(([date, temp], idx) => (
          <li style={{ color: '#737373' }} key={idx} className="list-group-item d-flex justify-content-between align-items-center w-100 p-4 ">
            {format(new Date(date), 'dd/MM/yyyy')}
            <span className="badge bg-danger rounded-pill py-2 px-4">{Math.round(temp)}°C</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HottestDaysList;
