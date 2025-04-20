import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import Sidebar from '../../components/Sidebar/Sidebar'
import "./Dashboard.css"

function Dashboard() {
  return (
    <>
      <Navbar />
      <div className="dashboard-layout" >
        <div className='dashboard-container'>
          <Sidebar />
          <div className='container p-3'>
            <Outlet />
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
      </div>
    </>
  );
}

export default Dashboard;
