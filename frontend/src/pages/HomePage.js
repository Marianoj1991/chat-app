import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ChatContainer, NoChatSelected, Sidebar } from '../components';
import { useChatStore } from '../store/useChatStore';
export default function HomePage() {
    const { selectedUser } = useChatStore();
    return (_jsx("div", { className: 'min-h-screen bg-base-200', children: _jsx("div", { className: 'flex items-center justify-center pt-20 px-4', children: _jsx("div", { className: 'bg-base-100 rounded-lg shadow-xl w-full max-w-4xl h-[calc(100vh-7rem)]', children: _jsxs("div", { className: 'flex h-full rounded-lg overflow-hidden', children: [_jsx(Sidebar, {}), !selectedUser ? _jsx(NoChatSelected, {}) : _jsx(ChatContainer, {})] }) }) }) }));
}
