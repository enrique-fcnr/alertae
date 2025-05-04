import React from 'react';
import { Card } from "@chakra-ui/react";
import { dataChart24 } from '../../../data-hourly-temp-page'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid
} from "recharts";

function HourlyTemperature({ data, valueMax, dataBuilder }) {

  dataChart24(data, valueMax)


  // Se vier uma função `dataBuilder`, usa ela. Senão, usa `dataChart24` padrão.
  const chartData = dataBuilder ? dataBuilder(data) : dataChart24(data, valueMax);

  return (
    <Card.Root className='text-light bg-light border-0 p-5 shadow-sm' overflow="hidden">

      <Card.Body>
        <div className='p-0'>
          <div className="w-100" style={{ height: "270px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <XAxis
                  dataKey="time"
                  stroke="#888888"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  dy={15}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}°`}
                  dy={1}
                />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded border bg-white p-2 shadow-sm">
                          <div className="row g-1" >
                            <div className="col d-flex flex-column f-flex justify-content-center ">
                              <span className="text-uppercase  text-muted small" style={{ fontSize: '0.8rem' }}>Temperatura</span>
                              <span className="fw-bold" style={{ color: '#2563eb' }}>{payload[0].value}°C</span>
                            </div>
                            <div className="col d-flex flex-column justify-content-center ">
                              <span className="text-uppercase text-muted small " style={{ fontSize: '0.8rem', }} >Sensação Térmica</span>
                              <span className="fw-bold" style={{ color: '#ff7300' }}>{payload[1].value}°C</span>
                            </div>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend verticalAlign="top" height={36} />
                <Line
                  type="monotone"
                  dataKey="temp"
                  stroke="#2563eb"
                  strokeWidth={2}
                  dot={true}
                  name="Temperatura"
                />
                <Line
                  type="monotone"
                  dataKey="feels_like"
                  stroke="#ff7300"
                  strokeWidth={2}
                  dot={false}
                  strokeDasharray="5 5"
                  name="Sensação térmica"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Card.Body>
    </Card.Root >
  );
}

export default HourlyTemperature;
