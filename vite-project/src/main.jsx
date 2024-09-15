import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Homepage from './components/Homepage.jsx'
import Addbooks from './components/Addbook.jsx'
import Browsebooks from './components/Browsebooks.jsx'
import Error from './components/Error.jsx'
import CategoryBooks from './components/Categorybooks.jsx'
import Bookdetails from './components/Bookdetails.jsx'


const appRouter = createBrowserRouter([
  {path:'/',
    element:<App/>,
    errorElement:<Error/>,
    children:[
      {
        path:'/',
        element:<Homepage/>,
        errorElement:<Error/>,
      },
      {
        path:'/books',
        element:<Browsebooks/>,
        errorElement:<Error/>,
      },
      {
        path:'/addbooks',
        element:<Addbooks/>,
        errorElement:<Error/>,
      },
      {
        path:'/books/:category',
        element:<CategoryBooks/>,
        errorElement:<Error/>,
      },
      {
        path:'/books/v1/volumes/:bookId',
        element:<Bookdetails/>,
        errorElement:<Error/>,
      },
    ]
  },
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={appRouter}/>
  </StrictMode>,
)
