import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import TelaTarefas from './componentes/TelaTarefas';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import TelaTarefaDetalhes from './componentes/TelaTarefaDetalhes';
import TelaLogin from './componentes/TelaLogin';
import RotaPrivada from './rotas/RotaPrivada';
import TelaCadUsuario from './componentes/TelaCadUsuario';
import AppLayout from './componentes/AppLayout';

import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <AppLayout/>,
      children:[
        {
          index: true,
          element: <TelaLogin />
        },
        {
          path: "/cadUsuario",
          element: <TelaCadUsuario />
        },
        {
          path: "/tarefas",
          element: (
            <RotaPrivada>
              <TelaTarefas/>
            </RotaPrivada>
          )
        },
        {
          path: "/tarefaDetalhes",
          element: <TelaTarefaDetalhes/>
        }
      ]
    }
  ]
)


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
        <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
