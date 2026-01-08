import { jsx as _jsx } from "react/jsx-runtime";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
export default function RequireAuth() {
    const { authUser } = useAuthStore();
    return (authUser ? _jsx(Outlet, {}) : _jsx(Navigate, { to: '/login' }));
}
