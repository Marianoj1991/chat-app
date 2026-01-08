import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Send } from 'lucide-react';
import { THEMES } from '../constants';
import { useThemeStore } from '../store/useThemeStore';
const PREVIEW_MESSAGES = [
    { id: 1, content: "Hey! How's it going?", isSent: false },
    {
        id: 2,
        content: "I'm doing great! Just working on same new features",
        isSent: true
    },
];
export default function SettingsPage() {
    const { theme, setTheme } = useThemeStore();
    return (_jsx("div", { className: 'min-h-screen container mx-auto px-4 pt-20 max-w-5xl pb-10', children: _jsxs("div", { className: 'space-y-6', children: [_jsxs("div", { className: 'flex flex-col gap-1', children: [_jsx("h2", { className: 'text-lg font-semibold', children: "Theme" }), _jsx("p", { className: 'text-sm text-base-content/70', children: "Choose a theme for your chat interface" })] }), _jsx("div", { className: 'grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2', children: THEMES.map((t) => (_jsxs("button", { className: `group flex flex-col items-center gap-1-5 p-2 rounded-lg transition-colors ${theme === t ? 'bg-base-300' : 'hover:bg-base-200'}`, onClick: () => setTheme(t), children: [_jsx("div", { className: 'relative h-8 w-full rounded-md overflow-hidden', "data-theme": t, children: _jsxs("div", { className: 'absolute inset-0 grid grid-cols-4 gap-px p-1', children: [_jsx("div", { className: 'rounded bg-primary' }), _jsx("div", { className: 'rounded bg-secondary' }), _jsx("div", { className: 'rounded bg-accent' }), _jsx("div", { className: 'rounded bg-neutral' })] }) }), _jsx("span", { className: 'text-[11px] font-medium truncate w-full text-center', children: t.charAt(0).toUpperCase() + t.slice(1) })] }, t))) }), _jsx("h3", { className: 'text-lg font-semibold mb-3', children: "Preview" }), _jsx("div", { className: 'rounded-xl border border-base-300 overflow-hidden bg-base-100 shadow-lg', children: _jsx("div", { className: 'p-4 bg-base-200', children: _jsx("div", { className: 'max-w-lg mx-auto', children: _jsxs("div", { className: 'bg-base-100 rounded-xl shadow-sm overflow-hidden', children: [_jsx("div", { className: 'px-4 py-3 border-b border-base-300 bg-base-100', children: _jsxs("div", { className: 'flex items-center gap-3', children: [_jsx("div", { className: 'w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-content font-medium', children: "J" }), _jsxs("div", { children: [_jsx("h3", { className: 'font-medium text-sm', children: "John Doe" }), _jsx("p", { className: 'text-xs text-base-content/70', children: "Online" })] })] }) }), _jsx("div", { className: 'p-4 space-y-4 min-h-[200px] max-h-[200px] overflow-y-auto bg-base-100', children: PREVIEW_MESSAGES.map((message) => (_jsx("div", { className: `flex ${message.isSent ? 'justify-end' : 'justify-start'}`, children: _jsxs("div", { className: `
                          max-w-[80%] rounded-xl p-3 shadow-sm
                          ${message.isSent
                                                    ? 'bg-primary text-primary-content'
                                                    : 'bg-base-200'}
                        `, children: [_jsx("p", { className: 'text-sm', children: message.content }), _jsx("p", { className: `
                            text-[10px] mt-1.5
                            ${message.isSent
                                                            ? 'text-primary-content/70'
                                                            : 'text-base-content/70'}
                          `, children: "12:00 PM" })] }) }, message.id))) }), _jsx("div", { className: 'p-4 border-t border-base-300 bg-base-100', children: _jsxs("div", { className: 'flex gap-2', children: [_jsx("input", { type: 'text', className: 'input input-bordered flex-1 text-sm h-10', placeholder: 'Type a message...', value: 'This is a preview', readOnly: true }), _jsx("button", { className: 'btn btn-primary h-10 min-h-0', children: _jsx(Send, { size: 18 }) })] }) })] }) }) }) })] }) }));
}
