import React from 'react';
import { ArrowDown, ArrowUp, Droplets, Wind } from 'lucide-react';

function CurrentWeather({ data, locationName }) {
  const {
    weather: [currentWeather],
    main: { temp, feels_like, temp_min, temp_max, humidity },
    wind: { speed },
  } = data;

  const formatTemp = (t) => `${Math.round(t)}°`;

  return (
    <div className="card overflow-hidden">
      <div className="card-body p-4">
        <div className="row g-4">
          {/* Coluna de dados */}
          <div className="col-md-6">
            {/* Localização */}
            <div className="mb-4 d-flex align-items-end gap-1">
              <h2 className="h2 fw-bold mb-0 ">
                {locationName?.name}
                {locationName?.state && (
                  <span className="text-muted">, {locationName.state}</span>
                )}
              </h2>
              {`, ${locationName?.country}`}
            </div>

            {/* Temperatura principal */}
            <div className="d-flex align-items-center mb-4">
              <p className="display-1 fw-bold mb-0">{formatTemp(temp)}</p>
              <div className="ms-3">
                <p className="small mb-1">
                  Feels like {formatTemp(feels_like)}
                </p>
                <div className="d-flex small fw-medium">
                  <span className="d-flex align-items-center text-primary me-3">
                    <ArrowDown size={12} /> {formatTemp(temp_min)}
                  </span>
                  <span className="d-flex align-items-center text-danger">
                    <ArrowUp size={12} /> {formatTemp(temp_max)}
                  </span>
                </div>
              </div>
            </div>

            {/* Humidity & Wind */}
            <div className="row g-4">
              <div className="col-6 d-flex align-items-center">
                <Droplets size={16} className="text-primary me-2" />
                <div>
                  <p className="small mb-0 fw-medium">Humidity</p>
                  <p className="small text-muted mb-0">{humidity}%</p>
                </div>
              </div>
              <div className="col-6 d-flex align-items-center">
                <Wind size={16} className="text-primary me-2" />
                <div>
                  <p className="small mb-0 fw-medium">Wind Speed</p>
                  <p className="small text-muted mb-0">{speed} m/s</p>
                </div>
              </div>
            </div>
          </div>

          {/* Coluna de ícone */}
          <div className="col-md-6 d-flex justify-content-center align-items-center">
            <div
              className="position-relative"
              style={{ width: '200px', height: '200px' }}
            >
              <img
                src={`https://openweathermap.org/img/wn/${currentWeather.icon}@4x.png`}
                alt={currentWeather.description}
                className="img-fluid"
              />
              <div className="position-absolute bottom-0 w-100 text-center">
                <p className="small text-capitalize mb-0">
                  {currentWeather.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CurrentWeather;

