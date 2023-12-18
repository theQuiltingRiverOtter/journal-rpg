import React from 'react'
import ReactDOM from 'react-dom/client'
import { Route, RouterProvider } from "react-router-dom"
import router from "./router"
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';


ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
