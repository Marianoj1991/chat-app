import { jsx as _jsx } from "react/jsx-runtime";
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../App';
import { ErrorPage, HomePage, LoginPage, ProfilePage, SettingsPage, SignUpPage } from '../pages';
import RequireAuth from '../pages/guards/RequireAuth';
import UnrequireAuth from '../pages/guards/UnrequireAuth';
const router = createBrowserRouter([
    {
        path: '/',
        element: _jsx(App, {}),
        errorElement: _jsx(ErrorPage, {}),
        children: [
            {
                element: _jsx(RequireAuth, {}),
                children: [
                    {
                        index: true,
                        element: _jsx(HomePage, {})
                    },
                    {
                        path: '/settings',
                        element: _jsx(SettingsPage, {})
                    },
                    {
                        path: '/profile',
                        element: _jsx(ProfilePage, {})
                    }
                ]
            },
            {
                element: _jsx(UnrequireAuth, {}),
                children: [
                    {
                        path: '/signup',
                        element: _jsx(SignUpPage, {})
                    },
                    {
                        path: '/login',
                        element: _jsx(LoginPage, {})
                    }
                ]
            }
        ]
    }
]);
export default function Router() {
    return _jsx(RouterProvider, { router: router });
}
