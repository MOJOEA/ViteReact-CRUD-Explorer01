import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './Home.jsx'
import Edit from './Edit.jsx'
import Receipt from './Receipt.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { element } from 'prop-types'

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/Edit/:id",
    element: <Edit />
  },
  {
    path: "/Receipt",
    element: <Receipt />
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={routes} />
  </StrictMode>,
)
