import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom'

const Layout = () => {
  return (
    <div>
      <Outlet />
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
  element: <Layout />,
  children: [
    { path: '/', element: <App /> },
  ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
