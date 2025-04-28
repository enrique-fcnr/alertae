import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Temperature5Days = ({ data }) => {
  if (!data) {
    return <div>Carregando...</div>;
  }

  const chartData = data.list.map((item) => ({
    name: item.dt_txt.split(" ")[0].split("-")[2], // Pegando apenas o dia (ex: "28", "29" etc)
    max: item.main.temp_max,
    feels: item.main.feels_like
  }));


  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const diaFormatado = `Dia ${label}`;

      return (
        <div className="custom-tooltip" style={{ background: "#fff", border: "2px solid #1d7cf8", borderRadius: '7px', padding: "0.4rem", margin: "0", }}>
          <p style={{ color: "#1d7cf8", fontWeight: "bold", marginBottom: "8px" }}>{diaFormatado}</p>

          {payload.map((entry, index) => (
            <p key={`item-${index}`} style={{ color: entry.color, margin: 0 }}>
              {entry.name}: {entry.value}°C
            </p>
          ))}
        </div>
      );
    }

    return null;
  };


  return (
    <div style={{ width: "100%", height: '400px' }}>

      <ResponsiveContainer>
        <AreaChart
          data={chartData}
          width={730}
          height={250}
          margin={{ top: 30, right: 20, left: 0, bottom: 10 }}

        >
          <defs>
            <linearGradient id="colorMax" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ff7300" stopOpacity={1} />
              <stop offset="95%" stopColor="#ff7300" stopOpacity={0.3} />
            </linearGradient>
            <linearGradient id="colorFeels" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#1d7cf8" stopOpacity={1} />
              <stop offset="95%" stopColor="#1a73e8" stopOpacity={0.2} />
            </linearGradient>
          </defs>

          <XAxis dataKey='name' />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip content={CustomTooltip} />

          <Area
            type="monotone"
            dataKey="max"
            stroke="#ff7300"
            fillOpacity={1}
            fill="url(#colorMax)"
            name="Temperatura Máxima"
          />
          <Area
            type="monotone"
            dataKey="feels"
            stroke="#1d7cf8"
            fillOpacity={1}
            fill="url(#colorFeels)"
            name="Sensação Térmica"
          />

        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Temperature5Days;
