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
        <main style={{ position: "relative" }}>
          <div className='dashboard-container'>
            <Sidebar style={{ position: 'absolute' }} />
            <div className='container-fluid p-3'>
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
        </main>
      </div>
    </>
  );
}

export default Dashboard;
