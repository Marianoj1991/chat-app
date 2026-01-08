import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { X } from 'lucide-react';
import { useChatStore } from '../store/useChatStore';
import { useAuthStore } from '../store/useAuthStore';
export default function ChatHeader() {
    const { selectedUser, setSelectedUser } = useChatStore();
    const { onlineUsers } = useAuthStore();
    return (_jsxs("div", { className: 'border-b border-base-300 flex justify-between items-center p-4 bg-base-100', children: [_jsxs("div", { className: 'relative flex gap-2 items-center', children: [_jsx("div", { className: 'size-10 rounded-full', children: _jsx("img", { src: selectedUser?.profilePic || 'avatar.png', alt: selectedUser?.fullName, onError: (e) => {
                                e.currentTarget.src = '/avatar.png';
                            } }) }), _jsxs("div", { className: 'text- flex flex-col', children: [_jsx("p", { className: 'font-semibold', children: selectedUser?.fullName }), _jsx("span", { className: 'text-gray-600', children: selectedUser?._id && onlineUsers.includes(selectedUser?._id)
                                    ? 'Online'
                                    : 'Offline' })] })] }), _jsx("button", { className: 'cursor-pointer', onClick: () => setSelectedUser(null), children: _jsx(X, { className: 'size-6' }) })] }));
}
