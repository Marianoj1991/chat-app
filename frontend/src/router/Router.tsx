import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from '../App'
import {
  ErrorPage,
  HomePage,
  LoginPage,
  ProfilePage,
  SettingsPage,
  SignUpPage
} from '../pages'
import RequireAuth from '../pages/guards/RequireAuth'
import UnrequireAuth from '../pages/guards/UnrequireAuth'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <RequireAuth />,
        children: [
          {
            index: true,
            element: <HomePage />
          },
          {
            path: '/settings',
            element: <SettingsPage />
          },
          {
            path: '/profile',
            element: <ProfilePage />
          }
        ]
      },
      {
        element: <UnrequireAuth />,
        children: [
          {
            path: '/signup',
            element: <SignUpPage />
          },
          {
            path: '/login',
            element: <LoginPage />
          }
        ]
      }
    ]
  }
])

export default function Router() {
  return <RouterProvider router={router} />
}
