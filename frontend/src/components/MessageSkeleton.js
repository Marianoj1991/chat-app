import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const MessageSkeleton = () => {
    const skeletonMessages = Array(6).fill(null);
    return (_jsx("div", { className: 'flex-1 overflow-y-auto p-4 space-y-4', children: skeletonMessages.map((_, idx) => (_jsxs("div", { className: `chat ${idx % 2 === 0 ? 'chat-start' : 'chat-end'}`, children: [_jsx("div", { className: 'chat-image avatar', children: _jsx("div", { className: 'size-10 rounded-full', children: _jsx("div", { className: 'skeleton w-full h-full rounded-full' }) }) }), _jsx("div", { className: 'chat-header mb-1', children: _jsx("div", { className: 'skeleton h-4 w-16' }) }), _jsx("div", { className: 'chat-bubble bg-transparent p-0', children: _jsx("div", { className: 'skeleton h-16 w-[200px]' }) })] }, idx))) }));
};
export default MessageSkeleton;
