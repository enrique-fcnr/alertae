import React from 'react'
import { Card, Text } from "@chakra-ui/react"
import { format } from 'date-fns'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";



function HourlyTemperature({ data }) {

  const chartData = data.list
    .slice(0, 8) // Get next 24 hours (3-hour intervals)
    .map((item) => ({
      time: format(new Date(item.dt * 1000), "ha"),
      temp: Math.round(item.main.temp),
      feels_like: Math.round(item.main.feels_like),
    }));

  return (
    <Card.Root className='text-light bg-light border-0 p-5 shadow-sm' overflow="hidden">

      <Card.Title className='fs-4' color="gray.600">Temperaturas do Dia</Card.Title>
      <Card.Body>

        <div className='p-0'>
          <div className="w-100 " style={{ height: "270px" }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} >
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
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded border bg-white p-2 shadow-sm">
                          <div className="row g-2">
                            <div className="col d-flex flex-column">
                              <span className="text-uppercase text-muted small">
                                Temperatura
                              </span>
                              <span className="fw-bold">
                                {payload[0].value}°
                              </span>
                            </div>
                            <div className="col d-flex flex-column">
                              <span className="text-uppercase text-muted small">
                                Sensação Térmica
                              </span>
                              <span className="fw-bold">
                                {payload[1].value}°
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />

                <Legend />
                <Line
                  type="monotone"
                  dataKey="temp"
                  stroke="#2563eb"
                  strokeWidth={2}
                  dot={true}
                  name='Temperatura'

                />
                <Line
                  type="monotone"
                  dataKey="feels_like"
                  stroke="#64748b"
                  strokeWidth={2}
                  dot={false}
                  strokeDasharray="5 5"
                  name='Sensação térmica'
                />
              </LineChart>

            </ResponsiveContainer>
          </div>

        </div>

      </Card.Body>

    </Card.Root >
  )
}

export default HourlyTemperature