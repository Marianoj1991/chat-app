import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { AuthImagePattern } from "../components";
export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const { login, isLoggingIn } = useAuthStore();
    const handleSubmit = (e) => {
        e.preventDefault();
        login(formData);
    };
    return (_jsxs("div", { className: 'min-h-screen grid lg:grid-cols-2', children: [_jsx("div", { className: 'flex flex-col justify-center items-center p-6 sm:p-12', children: _jsxs("div", { className: 'w-full max-w-md space-y-8', children: [_jsx("div", { className: 'text-center mb-8', children: _jsxs("div", { className: 'flex flex-col items-center gap-2 group', children: [_jsx("div", { className: 'size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors', children: _jsx(MessageSquare, { className: 'size-6 text-primary' }) }), _jsx("h1", { className: 'text-2xl font-bold mt-2', children: "Create Account" }), _jsx("p", { className: 'text-base-content/60', children: "Get started with your free account" })] }) }), _jsxs("form", { onSubmit: handleSubmit, className: 'space-y-6', children: [_jsxs("div", { className: 'form-control', children: [_jsx("label", { className: 'label', children: _jsx("span", { className: 'label-text font-medium', children: "Email" }) }), _jsxs("div", { className: 'relative', children: [_jsx("div", { className: 'absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10', children: _jsx(Mail, { className: 'size-5 text-base-content/40' }) }), _jsx("input", { type: 'email', className: `input input-bordered w-full pl-10`, placeholder: 'you@example.com', value: formData.email, onChange: (e) => setFormData({ ...formData, email: e.target.value }) })] })] }), _jsxs("div", { className: 'form-control', children: [_jsx("label", { className: 'label', children: _jsx("span", { className: 'label-text font-medium', children: "Password" }) }), _jsxs("div", { className: 'relative', children: [_jsx("div", { className: 'absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10', children: _jsx(Lock, { className: 'size-5 text-base-content/40' }) }), _jsx("input", { type: showPassword ? 'text' : 'password', className: `input input-bordered w-full pl-10`, placeholder: '\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022', value: formData.password, onChange: (e) => setFormData({ ...formData, password: e.target.value }) }), _jsx("button", { type: 'button', className: 'absolute inset-y-0 right-0 pr-3 flex items-center z-10', onClick: () => setShowPassword(!showPassword), children: !showPassword ? (_jsx(EyeOff, { className: 'size-5 text-base-content/40' })) : (_jsx(Eye, { className: 'size-5 text-base-content/40' })) })] })] }), _jsx("button", { type: 'submit', className: 'btn btn-primary w-full', disabled: isLoggingIn, children: isLoggingIn ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: 'size-5 animate-spin' }), "Loading..."] })) : ('Log In') })] }), _jsx("div", { className: 'text-center', children: _jsxs("p", { className: 'text-base-content/60', children: ["Don't you have an account?", ' ', _jsx(Link, { to: '/signup', className: 'link link-primary', children: "Sign in" })] }) })] }) }), _jsx(AuthImagePattern, { title: 'Join our community', subtitle: 'Connect with friends, share moments and stay in touch with your loved ones.' })] }));
}
