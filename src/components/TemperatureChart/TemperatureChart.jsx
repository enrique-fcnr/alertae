import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';
import { weatherData } from '../../../weatherData';

function TemperatureChart() {
  return (
    <div className="bg-light p-3 ">
      <header>
        <h2 style={{ color: '#606566' }} className="text-lg font-semibold mb-2 text-center text-indigo-600">Temperatura Média Mensal e Sensação Térmica</h2>
        <h5 style={{ color: 'gray' }} className="text-lg font-semibold mb-4 text-center text-indigo-600 ">Ano: 2024</h5>
      </header>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={weatherData.monthlyTemperature}
          margin={{ top: 10, right: 30, left: 0, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="5 5" stroke="#a3a3a3" />

          <XAxis
            dataKey="month"
            tick={{ fontSize: 10 }}
            axisLine={{ stroke: '#ccc' }}
            tickLine={false}
          />

          <YAxis
            domain={[10, 40]}
            unit="°C"
            tick={{ fontSize: 10 }}
            axisLine={{ stroke: '#ccc' }}
            tickLine={false}
          />

          <Tooltip
            contentStyle={{ backgroundColor: '#ffffff', borderRadius: '10px', color: '#6366f1' }}
            labelStyle={{ color: 'gray' }}
            formatter={(value) => `${value}°C`}
          />

          <Legend verticalAlign="top" height={36} />

          {/* Linha da Temperatura */}
          <Line
            type="monotone"
            dataKey="temp"
            name="Temperatura"
            stroke="#6366f1"
            strokeWidth={3}
            dot={{ r: 6, stroke: '#6366f1', strokeWidth: 2, fill: '#fff' }}
            activeDot={{ r: 10 }}
            animationDuration={2000}
            animationEasing="ease-out"
          />

          {/* Linha da Sensação Térmica */}
          <Line
            type="monotone"
            dataKey="feelsLike"
            name="Sensação Térmica"
            stroke="#f97316"
            strokeWidth={3}
            dot={{ r: 6, stroke: '#f97316', strokeWidth: 2, fill: '#fff' }}
            activeDot={{ r: 10 }}
            strokeDasharray="5 5" // Linha tracejada para diferenciar
            animationDuration={2500}
            animationEasing="ease-out"
          />

        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default TemperatureChart;
