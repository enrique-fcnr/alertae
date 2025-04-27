import { format } from 'date-fns'

// Get next 24 hours (3-hour intervals)

const dataChart24 = (data, valueMax) => {
  const chartData = data.list
    .slice(0, valueMax)
    .map((item) => ({
      time: format(new Date(item.dt * 1000), "ha"),
      temp: Math.round(item.main.temp),
      feels_like: Math.round(item.main.feels_like),
    }));
  return chartData
}

function dataChart5Days(data) {
  if (!data || !data.list) return [];

  const chartData = data.list.map((item) => ({
    time: format(new Date(item.dt * 1000), "dd/MM HH'h'"), // Ex: 27/04 12h
    temp: Number(item.main.temp.toFixed(1)),
    feels_like: Number(item.main.feels_like.toFixed(1)),
  }));

  return chartData;
}

export { dataChart24, dataChart5Days }