import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom'
import Sessions from './components/Sessions/Sessions.jsx'

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
    { path: '/', element: <Sessions /> },
  ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
