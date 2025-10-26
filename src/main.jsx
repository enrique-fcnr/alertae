import './styles/global.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { Provider } from "@/components/ui/provider";
import { QuizProvider } from './context/quiz';

// ChartJS setup
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  ScatterController,
  BubbleController,
  LineElement,
  LineController,
} from 'chart.js';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  LineElement,
  LineController,
  ScatterController,
  BubbleController
);

// Páginas principais
import Home from './pages/Home/Home.jsx';
import ErrorPage from './pages/ErrorPage/ErrorPage.jsx';
import LoginPage from './pages/LoginPage/LoginPage.jsx';

// Dashboards
import DashboardLayout from './pages/DashboardLayout/DashboardLayout.jsx';
import DashboardPage1 from './components/DashboardPage1/DashboardPage1';
import DashboardPage2 from './components/DashboardPage2/DashboardPage2';
import DashboardPage3 from './components/DashboardPage3/DashboardPage3';
import DashboardPage4 from './components/DashboardPage4/DashboardPage4';

// Quem Somos
import QuemSomosLayout from './pages/QuemSomosLayout/QuemSomosLayout';
import Proposito from './components/Proposito/Proposito';
import Historia from './components/Historia/Historia';

// Alertas
import AlertasLayout from './pages/AlertasLayout/AlertasLayout';
import SobreAlertas from './components/SobreAlertas/SobreAlertas';

// Emergências
import ContatosEmergencia from './components/ContatosEmergencia/ContatosEmergencia';
import EmergenciasLayout from './pages/EmergenciasLayout/EmergenciasLayout';
import RotasSeguras from './components/RotasSeguras/RotasSeguras';

// Edukaê - Ranking
import RankingLayout from './pages/RankingLayout/RankingLayout';
import Ranking from './components/Ranking/Ranking';

// Edukaê - Quiz
import EdukaeQuizLayout from './pages/EdukaeQuizLayout/EdukaeQuizLayout';

// Edukaê - Recompensas
import Recompensas from './components/Recompensas/Recompensas';

// React Query config
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000, // Corrigido de gcTime para cacheTime
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

// Rotas
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Home />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/sobre",
      element: <QuemSomosLayout />,
      children: [
        { index: true, element: <Navigate to="quem-somos" replace /> },
        { path: "quem-somos", element: <Historia /> },
        { path: "proposito", element: <Proposito /> },
      ],
    },
    {
      path: "/alertas/sobre",
      element: <AlertasLayout />,
      children: [
        { index: true, element: <SobreAlertas /> },
      ],
    },
    {
      path: "/emergencias",
      element: <EmergenciasLayout />,
      children: [
        { path: "rotas-seguras", element: <RotasSeguras /> },
        { path: "contatos", element: <ContatosEmergencia /> },
      ],
    },
    {
      path: "/dashboard",
      element: <DashboardLayout />, // Removido <PrivateRoute>
      children: [
        { index: true, element: <Navigate to="tempo-dia" replace /> },
        { path: "tempo-dia", element: <DashboardPage1 /> },
        { path: "previsoes", element: <DashboardPage2 /> },
        { path: "mapa-tempo", element: <DashboardPage3 /> },
        { path: "estatisticas", element: <DashboardPage4 /> },
      ],
    },

    {
      path: "/edukae",
      element: <RankingLayout />,
      children: [
        { index: true, element: <Navigate to="ranking" replace /> },
        { path: "ranking", element: <Ranking /> },
        { path: "recompensas", element: <Recompensas /> }
      ],
    },
    {
      path: "/edukae/quiz",
      element: <EdukaeQuizLayout />,
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
    },
  },

);

// Renderização
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider>
        <QuizProvider>
          <RouterProvider router={router} />
        </QuizProvider>
      </Provider>
    </QueryClientProvider>
  </StrictMode>
);