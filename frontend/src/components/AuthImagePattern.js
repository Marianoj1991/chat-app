import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function AuthImagePattern({ title, subtitle }) {
    return (_jsx("div", { className: 'hidden lg:flex items-center justify-center bg-base-200 p-12', children: _jsxs("div", { className: 'max-w-md text-center', children: [_jsx("div", { className: 'grid grid-cols-3 gap-3 mb-8', children: [...Array(9)].map((_, i) => (_jsx("div", { className: `aspect-square rounded-2xl bg-primary/10 ${i % 2 === 0 ? 'animate-pulse' : ''}` }, i))) }), _jsx("h2", { className: 'text-2xl font-bold mb-4', children: title }), _jsx("p", { className: 'text-base-content/60', children: subtitle })] }) }));
}
