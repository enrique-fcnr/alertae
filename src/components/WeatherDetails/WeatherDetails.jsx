import { format } from "date-fns";
import { Sunrise, Sunset, Compass, Gauge } from "lucide-react";
import CardDetails from '../CardDetails/CardDetails'
import './WeatherDetails.css'


function WeatherDetails({ data }) {
  const { wind, main, sys } = data;

  const formatTime = (timestamp) => {
    return format(new Date(timestamp * 1000), "h:mm a");
  };

  const getWindDirection = (degree) => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const index =
      Math.round(((degree %= 360) < 0 ? degree + 360 : degree) / 45) % 8;
    return directions[index];
  };

  const details = [
    {
      title: "Nascer do Sol",
      value: formatTime(sys.sunrise),
      icon: <Sunrise size={26} color="white"
        className="text-warning me-2" />,
    },
    {
      title: "Pôr do Sol",
      value: formatTime(sys.sunset),
      icon: <Sunset size={26} color="white"
        className="text-primary me-2" />,
    },
    {
      title: "Direção dos Ventos",
      value: `${getWindDirection(wind.deg)} (${wind.deg}°)`,
      icon: <Compass size={26} color="white"
        className="text-success me-2" />,
    },
    {
      title: "Pressão Atmosférica",
      value: `${main.pressure} hPa`,
      icon: <Gauge size={26} color="white"
        className="text-purple me-2" />,
    },
  ];

  return (
    <div className="card shadow-sm mb-4 p-3 h-100">
      <div className="card-header bg-primary">
        <h5 style={{ color: 'white' }} className="card-title mb-0 ">Detalhes do Dia</h5>
      </div>
      <div className="card-body">
        <div className="row h-100">
          {details.map((detail) => (
            <CardDetails key={detail.title} data={detail} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default WeatherDetails