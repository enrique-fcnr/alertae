import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import Sidebar from '../../components/Sidebar/Sidebar'
import "./DashboardLayout.css"
import { useLocation } from 'react-router-dom';
import { useWeatherQuery, useReverseGeocodeQuery, useForecastQuery } from '@/hooks/useWeather';
import { useGeolocation } from '../../hooks/useGeolocation'
import { useEffect, useState } from 'react';

function Dashboard() {
  const [selectedCoordinates, setSelectedCoordinates] = useState(null);
  const { coordinates } = useGeolocation();


  useEffect(() => {
    if (coordinates) {
      setSelectedCoordinates(coordinates);
    }
  }, [coordinates]);

  const handleCitySelect = (coordinates) => {
    setSelectedCoordinates(coordinates);
  };

  return (
    <>
      <Navbar />
      <div className="dashboard-layout" >
        <main style={{ position: "relative" }}>
          <div className='dashboard-container'>
            <Sidebar style={{ position: 'absolute' }} onCitySelect={handleCitySelect} />
            <div className='container-fluid p-3'>
              <Outlet context={{ selectedCoordinates }} />
            </div>
          </div>
          <div className="app-container" >
            <footer className="footer-dashboard m-0 footer p-0 text-center ">
              <div className="container d-md-flex flex-md-column">
                <hr className="footer-bar mt-5" />
                <p className="footer-rights mb-4">
                  &copy; {new Date().getFullYear()} Alertaê - Todos os direitos reservados.
                </p>
              </div>
            </footer>
          </div>
        </main>
      </div>
    </>
  );
}

export default Dashboard;
