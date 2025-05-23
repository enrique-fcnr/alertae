import React from 'react'
import TemperatureChart from '../TemperatureChart/TemperatureChart';
import RainVolumeChart from '../RainVolumeChart/RainVolumeChart';
import HumidityChart from '../HumidityChart/HumidityChart';
import HottestDaysList from '../HottestDaysList/HottestDaysList';
import WindTrendLine from '../WindTrendLine/WindTrendLine';
import TemperatureHeatmap from '../TemperatureHeatmap/TemperatureHeatmap';
import { weatherData } from '../../../weatherData';
import './DashboardPage4.css';



const DashboardPage4 = () => {
  return (
    <div className="py-5 py-md-0 min-h-screen bg-gray-100 p-8">
      {/* <h1 className="text-3xl font-bold mb-8 text-center">Weather Statistics Dashboard</h1> */}
      <div className="">
        <div className="row row-cols-1 row-cols-md-2  g-3">
          <div className="col-12 col-md-12">
            <div className="dashboard-card">
              <TemperatureChart key="temp-chart" />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="dashboard-card">
              <RainVolumeChart key="rain-chart" data={weatherData} />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="dashboard-card">
              <HumidityChart key="humidity-chart" data={weatherData} />
            </div>
          </div>

          <div className="col-12 col-md-12">
            <div className="dashboard-card">
              <WindTrendLine key="wind-chart" data={weatherData} />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="dashboard-card">
              <HottestDaysList key="HottestDays-chart" data={weatherData} />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="dashboard-card">
              <TemperatureHeatmap key="TemperatureHeatmap-chart" data={weatherData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage4