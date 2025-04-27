import React from 'react';
import { format } from 'date-fns';


const HottestDaysList = ({ data }) => {
  if (!data) return null;

  const dailyTemps = {};

  data.hottestDays
    .forEach(item => {
      const date = format(new Date(item.date), 'yyyy-MM-dd');
      if (!dailyTemps[date] || dailyTemps[date] < item.temp) {
        dailyTemps[date] = item.temp;
      }
    });

  const hottestDays = Object.entries(dailyTemps)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <div className="p-5 bg-light text-center" style={{ height: '100%', width: '100%' }}>
      <h5 style={{ color: 'gray' }}>3 Dias Mais Quentes da Semana</h5>
      <ul className="list-group w-fill h-100  d-flex justify-content-center align-items-center">
        {hottestDays.map(([date, temp], idx) => (
          <li key={idx} className="list-group-item d-flex justify-content-between align-items-center w-100 p-4">
            {format(new Date(date), 'dd/MM/yyyy')}
            <span className="badge bg-danger rounded-pill p-2">{Math.round(temp)}°C</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HottestDaysList;
