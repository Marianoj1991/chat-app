import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef } from 'react';
import { useChatStore } from '../store/useChatStore';
import { MessageInput, MessageSkeleton, ChatHeader } from './';
import { useAuthStore } from '../store/useAuthStore';
import { formatMessageTime } from '../lib/utils';
export default function ChatContainer() {
    const { messages, getMessages, selectedUser, isMessagesLoading, subscribeToNewMessages, unsubscribeFromNewMessages } = useChatStore();
    const { authUser } = useAuthStore();
    const bottomRef = useRef(null);
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);
    useEffect(() => {
        if (selectedUser)
            getMessages(selectedUser._id);
        subscribeToNewMessages();
        return () => {
            unsubscribeFromNewMessages();
        };
    }, [
        getMessages,
        selectedUser,
        subscribeToNewMessages,
        unsubscribeFromNewMessages
    ]);
    if (isMessagesLoading) {
        return (_jsxs("div", { className: 'flex-1 flex flex-col overflow-auto ', children: [_jsx(ChatHeader, {}), _jsx(MessageSkeleton, {}), _jsx(MessageInput, {})] }));
    }
    return (_jsxs("div", { className: 'flex-1 flex justify-between flex-col overflow-auto', children: [_jsx("div", { className: 'sticky top-0 z-50', children: _jsx(ChatHeader, {}) }), _jsx("div", { className: 'flex-1 flex flex-col justify-end p-4 mt-20', children: messages.map((m) => (_jsxs("div", { className: `chat overflow-hidden ${m.senderId === authUser._id ? 'chat-end' : 'chat-start'}`, children: [_jsx("div", { className: 'chat-image avatar', children: _jsx("div", { className: 'size-10 rounded-full border', children: _jsx("img", { src: `${m.senderId === authUser._id
                                        ? authUser?.profilePic || '/avatar.png'
                                        : selectedUser?.profilePic || '/avatar.png'}`, onError: (e) => {
                                        e.currentTarget.src = '/avatar.png';
                                    }, alt: m._id }) }) }), _jsxs("div", { className: 'chat-bubble', children: [m.image && (_jsx("img", { className: 'min-w-[150px] max-w-[150px] rounded-sm md:min-w-[300px] md:max-h-[300px] mb-2', src: m.image, alt: m._id })), m.text && _jsx("p", { children: m.text })] }), _jsx("div", { className: 'chat-footer mt-1', children: _jsx("time", { className: 'text-xs opacity-50 ml-1', children: formatMessageTime(m.createdAt) }) })] }, m._id))) }), _jsx("div", { ref: bottomRef }), _jsx(MessageInput, {})] }));
}
