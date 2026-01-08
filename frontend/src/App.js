import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Outlet } from 'react-router-dom';
import { Navbar } from './components';
import { useAuthStore } from './store/useAuthStore';
import { useEffect } from 'react';
import { Loader } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import { useThemeStore } from './store/useThemeStore';
export default function App() {
    const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
    const { theme } = useThemeStore();
    useEffect(() => {
        checkAuth();
    }, [checkAuth]);
    if (isCheckingAuth && !authUser) {
        return (_jsx("div", { className: 'flex items-center justify-center h-screen', children: _jsx(Loader, { className: 'size-10 animate-spin' }) }));
    }
    return (_jsxs("div", { "data-theme": theme, className: 'min-h-screen', children: [_jsx(Navbar, {}), _jsx("main", { children: _jsx(Outlet, {}) }), _jsx(Toaster, { position: 'top-center', reverseOrder: false })] }));
}
