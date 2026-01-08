import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { MessageSquare } from "lucide-react";
export default function NoChatSelected() {
    return (_jsx("div", { className: 'w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-100/50', children: _jsxs("div", { className: 'max-w-md text-center space-y-6', children: [_jsx("div", { className: 'flex justify-center gap-4 mb-4', children: _jsx("div", { className: 'relative', children: _jsx("div", { className: 'w-16 h-16 rounded-2xl bg-primary/10 flex items-center\r\n             justify-center animate-bounce', children: _jsx(MessageSquare, { className: 'w-8 h-8 text-primary ' }) }) }) }), _jsx("h2", { className: 'text-2xl font-bold', children: "Welcome to Chatty!" }), _jsx("p", { className: 'text-base-content/60', children: "Select a conversation from the sidebar to start chatting" })] }) }));
}
