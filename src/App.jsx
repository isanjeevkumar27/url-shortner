import React from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import AppLayout from './layouts/app-layout'
import LandingPage from './pages/landing'
import Auth from './pages/auth'
import Link from './pages/link'
import Dashboard from './pages/dashboard'
import RedirectLink from './pages/redirect-link'
import UrlProvider from './context.jsx'
import RequireAuth from './components/ui/require-auth.jsx'
const router=createBrowserRouter([
  {
    element:<AppLayout/>,
    children:[
      {
        path:'/',
        element:<LandingPage/>
      },
      { 
        path:'/dashboard',
        element:(
          <RequireAuth>
        <Dashboard/>
        </RequireAuth>
        )
      },
      {
        path:'/auth',
        element:<Auth/>
      },
      { 
        path:'/link/:id',
        element:(
          <RequireAuth>
            <Link/>
          </RequireAuth>
        )
      },
      {
        path:'/:id',
        element:<RedirectLink/>
      },
      {
        path:'',
        element:<div>404</div>
      }
    
    ]
  }
])
function App() {
  return (
    <UrlProvider>
    <RouterProvider router={router}/>
    </UrlProvider>
  )
}

export default App