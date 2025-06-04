import './styles/global.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';


import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Provider } from "@/components/ui/provider";

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  ScatterController, // 👈 necessário
  BubbleController,
  LineElement,
  LineController,  // 👈 necessário para r (radius) nos dados
} from 'chart.js';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  LineElement,        // NECESSÁRIO para gráficos de linha
  LineController,
  ScatterController,
  BubbleController
);




// Páginas
import Home from './pages/Home/Home.jsx';
import ErrorPage from './pages/ErrorPage/ErrorPage.jsx';
import LoginPage from './pages/LoginPage/LoginPage.jsx';
import PrivateRoute from './components/PrivateRoute/PrivateRoute.jsx';
import DashboardLayout from './pages/DashboardLayout/DashboardLayout.jsx';
import DashboardPage1 from './components/DashboardPage1/DashboardPage1';
import DashboardPage2 from './components/DashboardPage2/DashboardPage2';
import DashboardPage3 from './components/DashboardPage3/DashboardPage3';
import DashboardPage4 from './components/DashboardPage4/DashboardPage4';
import QuemSomosLayout from './pages/QuemSomosLayout/QuemSomosLayout';
import Propósito from './components/Proposito/Proposito';
import Historia from './components/Historia/Historia';

// **Alertas** Layout e Páginas
import AlertasLayout from './pages/AlertasLayout/AlertasLayout'
import SobreAlertas from './components/SobreAlertas/SobreAlertas'

// **Previsões** Layout e Páginas

// **Emergências** Layout e Páginas
import ContatosEmergencia from './components/ContatosEmergencia/ContatosEmergencia';
import EmergenciasLayout from './pages/EmergenciasLayout/EmergenciasLayout';


// **Contatos** Layout e Páginas

// Configuração do React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutos
      gcTime: 10 * 60 * 1000,  // 10 minutos
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

// Definindo as rotas
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },

  // Rotas de Quem Somos (layout com children)
  {
    path: '/sobre',
    element: <QuemSomosLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="quem-somos" replace />,
      },
      {
        path: 'quem-somos',
        element: <Historia />,
      },
      {
        path: 'proposito',
        element: <Propósito />,
      },

    ],
  },

  // Rotas Emergencias
  {
  path: '/emergencias',
  element: <EmergenciasLayout />,
  children: [
    {
      path: 'contatos',
      element: <ContatosEmergencia />
    }
  ]
},


  // Rotas de Alertas (layout com children)
  {
    path: '/alertas/sobre',
    element: <AlertasLayout />,
    children: [
      {
        index: true,
        element: <SobreAlertas />,
      },
      // {
      //   path: 'recomendacoes',
      //   element: <Recomendacoes />,
      // }
    ]
  },

  // Rotas de Previsões (layout com children)
  // {
  //   path: '/previsoes',
  //   element: <PrevisoesLayout />,
  //   children: [
  //     {
  //       index: true,
  //       element: <Navigate to="24h" replace />,
  //     },
  //     {
  //       path: '24h',
  //       element: <Previsao24h />,
  //     },
  //     {
  //       path: '4-dias',
  //       element: <Previsao4Dias />,
  //     },
  //     {
  //       path: 'termos',
  //       element: <TermosMeteorologicos />,
  //     }
  //   ]
  // },

  // Rotas de Contatos (layout com children)
  // {
  //   path: '/contatos',
  //   element: <ContatosLayout />,
  //   children: [
  //     {
  //       index: true,
  //       element: <QuandoContactar />,
  //     },
  //     {
  //       path: 'emergencia',
  //       element: <ContatosEmergencia />,
  //     }
  //   ]
  // },

  // Dashboard (rota protegida com children)
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="tempo-dia" replace />,
      },
      {
        path: "tempo-dia",
        element: <DashboardPage1 />,
      },
      {
        path: "previsoes",
        element: <DashboardPage2 />,
      },
      {
        path: "mapa-tempo",
        element: <DashboardPage3 />,
      },
      {
        path: "estatisticas",
        element: <DashboardPage4 />,
      },
    ],
  },

  // Outras rotas se tiver!

], {
  future: {
    v7_relativeSplatPath: true,
  }
})

// Renderizando a aplicação
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </Provider>
    </QueryClientProvider>
  </StrictMode>
);
