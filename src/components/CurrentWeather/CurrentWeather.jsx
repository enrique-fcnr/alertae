import React from 'react';
import { ArrowDown, ArrowUp, Droplets, Wind } from 'lucide-react';

function CurrentWeather({ data, locationName }) {
  const {
    weather: [currentWeather],
    main: { temp, feels_like, temp_min, temp_max, humidity },
    wind: { speed },
  } = data;

  const formatTemp = (t) => `${Math.round(t)}°`;
  console.log(locationName)

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
              <p style={{ color: '#1a73e8' }} className="display-1 fw-bold mb-0">{formatTemp(temp)}C</p>
              <div className=" d-flex flex-column justify-content-center">
                <div className='d-flex align-items-center mb-1 justify-content-center'>
                  <p className="small m-0  w-100">
                    Sensação térmica
                  </p>
                  <span style={{ color: '#dc5405' }} className='m-0 p-3  bg-light '> {formatTemp(feels_like)}C</span>
                </div>
                <div className="d-flex small  fw-medium justify-content-center ">
                  <span className="d-flex align-items-center text-primary me-3">
                    <ArrowDown size={13} /> {formatTemp(temp_min)}C
                  </span>
                  <span className="d-flex align-items-center text-danger">
                    <ArrowUp size={13} /> {formatTemp(temp_max)}C
                  </span>
                </div>
              </div>
            </div>

            {/* Humidity & Wind */}
            <div className="row g-0">
              <div className="col-6 d-flex align-items-center justify-content-center">
                <Droplets size={25} className="text-primary " />
                <div>
                  <p className="small mb-0 fw-medium">Umidade</p>
                  <p className="small text-muted mb-0">{humidity}%</p>
                </div>
              </div>
              <div className="col-6 d-flex align-items-center">
                <Wind size={35} className="text-primary " />
                <div>
                  <p className="small mb-0 fw-medium">Velocidade dos Ventos</p>
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

