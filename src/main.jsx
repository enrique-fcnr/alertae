import './styles/global.css';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import ErrorPage from './pages/ErrorPage/ErrorPage.jsx';
import Dashboard from './pages/Dashboard/Dashboard.jsx';
import Teste from './components/Teste/Teste.jsx';
import Teste2 from './components/Teste2/Teste2.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "dashboard",
    element: <Dashboard />,
    children: [
      {
        index: true,
        element: <Navigate to="teste" replace />, // redireciona /dashboard → /dashboard/profile
      },
      {
        path: "teste",
        element: <Teste />,
      },
      {
        path: "teste2",
        element: <Teste2 />,
      },
    ],
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
