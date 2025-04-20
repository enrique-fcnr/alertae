import { format } from "date-fns";
import { Sunrise, Sunset, Compass, Gauge } from "lucide-react";



function WeatherDetails({ data }) {
  const { wind, main, sys } = data;

  console.log(data)

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
      icon: <Sunrise size={30} className="text-warning me-2" />,
    },
    {
      title: "Pôr do Sol",
      value: formatTime(sys.sunset),
      icon: <Sunset size={30} className="text-primary me-2" />,
    },
    {
      title: "Direção dos Ventos",
      value: `${getWindDirection(wind.deg)} (${wind.deg}°)`,
      icon: <Compass size={30} className="text-success me-2" />,
    },
    {
      title: "Pressão Atmosférica",
      value: `${main.pressure} hPa`,
      icon: <Gauge size={30} className="text-purple me-2" />,
    },
  ];

  return (
    <div className="card shadow-sm mb-4 p-3 h-100">
      <div className="card-header">
        <h5 className="card-title mb-0">Detalhes do Tempo</h5>
      </div>
      <div className="card-body">
        <div className="row h-100">
          {details.map((detail) => (
            <div key={detail.title} className="col-sm-6 mb-3 ">
              <div className="d-flex align-items-center border rounded p-3 h-100">
                {detail.icon}
                <div className="w-100">
                  <p className="mb-1 fw-medium">{detail.title}</p>
                  <p className="mb-0 text-muted small">{detail.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WeatherDetails