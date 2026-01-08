import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Users } from 'lucide-react';
import { useChatStore } from '../store/useChatStore';
import { useEffect, useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
export default function Sidebar() {
    const { users, getUsers, selectedUser, setSelectedUser } = useChatStore();
    const { onlineUsers } = useAuthStore();
    const [showOnline, setShowOnline] = useState(false);
    const [filteredUsers, setFilteredUsers] = useState([]);
    useEffect(() => {
        if (showOnline) {
            const filteredUsers = users.filter((user) => onlineUsers.includes(user._id));
            setFilteredUsers(filteredUsers);
        }
        else {
            setFilteredUsers(users);
        }
    }, [showOnline, users, onlineUsers]);
    useEffect(() => {
        getUsers();
    }, [getUsers]);
    return (_jsxs("aside", { className: 'h-full w-20 md:w-60 border-r border-base-300 transition-all duration-200 p-4 flex flex-col', children: [_jsxs("div", { className: 'flex flex-col gap-3 border-b border-base-300 w-full px-3 py-5', children: [_jsxs("div", { className: 'flex items-center gap-2', children: [_jsx(Users, { className: 'size-6' }), _jsx("span", { className: 'font-medium hidden md:block', children: "Contacts" })] }), _jsx("div", { children: _jsxs("label", { htmlFor: 'onlineOnly', className: 'flex items-center gap-2 cursor-pointer', children: [_jsx("input", { id: 'onlineOnly', type: 'checkbox', checked: showOnline, onChange: (e) => setShowOnline(e.target.checked), className: 'checkbox checkbox-sm' }), _jsxs("span", { className: 'text-[12px]', children: ["Show online only ", '(', onlineUsers.length - 1, " online", ')'] })] }) })] }), _jsx("section", { className: 'overflow-y-auto w-full py-3', children: filteredUsers.map((user) => (_jsxs("button", { onClick: () => setSelectedUser(user), className: `w-full p-3 flex items-center gap-3 hover:bg-base-200 transition-colors ${selectedUser?._id === user._id
                        ? 'bg-base-300 ring-1 ring-base-300'
                        : ''}`, children: [_jsxs("div", { className: 'relative', children: [_jsx("img", { src: user.profilePic || '/avatar.png', alt: user.fullName, className: 'size-12 object-cover rounded-full', onError: (e) => {
                                        e.currentTarget.src = '/avatar.png';
                                    } }), onlineUsers.includes(user._id) && (_jsx("span", { className: 'absolute top-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900' }))] }), _jsxs("div", { className: 'hidden md:block text-left min-w-0', children: [_jsx("div", { className: 'font-medium truncate', children: user.fullName }), _jsx("div", { className: 'text-sm text-zinc-400', children: onlineUsers.includes(user._id) ? 'Online' : 'Offline' })] })] }, user._id))) })] }));
}
