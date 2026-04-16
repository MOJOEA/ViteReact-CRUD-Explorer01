import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './Home'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={routes} />
  </StrictMode>,
)
