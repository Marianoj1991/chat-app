import { jsx as _jsx } from "react/jsx-runtime";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
export default function UnrequireAuth() {
    const { authUser } = useAuthStore();
    return (authUser ? _jsx(Navigate, { to: '/' }) : _jsx(Outlet, {}));
}
