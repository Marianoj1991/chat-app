import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Image, Send, X } from 'lucide-react';
import { useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useChatStore } from '../store/useChatStore';
export default function MessageInput() {
    const [text, setText] = useState('');
    const [fileToSend, setFileToSend] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);
    const { sendMessage } = useChatStore();
    const handleImageChange = (e) => {
        let file;
        if (e.target.files && e.target.files[0]) {
            file = e.target.files[0];
            if (!file.type.startsWith('image/')) {
                toast.error('Please select an image file');
                e.target.value = '';
                return;
            }
            setFileToSend(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
        e.target.value = '';
    };
    const removeImage = () => {
        setImagePreview(null);
        setFileToSend(null);
        if (fileInputRef.current) {
            ;
            fileInputRef.current.value = '';
        }
    };
    const handleSendMessages = async (e) => {
        e.preventDefault();
        if (!text && !fileToSend)
            return;
        try {
            const data = new FormData();
            data.append('text', text);
            if (fileToSend)
                data.append('image', fileToSend);
            sendMessage(data);
        }
        catch (error) {
            if (error instanceof Error) {
                toast.error(error.message);
            }
            else {
                toast.error('Unknown error');
            }
        }
        finally {
            removeImage();
            setText('');
        }
    };
    return (_jsxs("div", { className: 'p-4 w-full', children: [imagePreview && (_jsx("div", { className: 'mb-3 flex items-center gap-2', children: _jsxs("div", { className: 'relative', children: [_jsx("img", { src: typeof imagePreview === 'string' ? imagePreview : '', alt: 'Preview', className: 'w-20 h-20 object-cover rounded-lg border border-zinc-100' }), _jsx("button", { onClick: removeImage, className: 'absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300\r\n      flex items-center justify-center cursor-pointer', type: 'button', children: _jsx(X, { className: 'size-3' }) })] }) })), _jsxs("form", { onSubmit: handleSendMessages, className: 'flex items-center gap-3', children: [_jsxs("div", { className: 'flex-1 flex gap-2', children: [_jsx("input", { type: 'text', className: 'w-full input input-bordered rounded-lg input-sm sm:input-md', placeholder: 'Type a message...', value: text, onChange: (e) => setText(e.target.value) }), _jsx("input", { type: 'file', accept: 'image/*', className: 'hidden', ref: fileInputRef, onChange: handleImageChange }), _jsx("button", { type: 'button', className: `hidden sm:flex btn btn-circle
                     ${imagePreview ? 'text-emerald-500' : 'text-zinc-400'}`, onClick: () => fileInputRef.current?.click(), children: _jsx(Image, { size: 20 }) })] }), _jsx("button", { type: 'submit', className: 'flex btn btn-md btn-circle', disabled: !text.trim() && !imagePreview, children: _jsx(Send, { size: 22 }) })] })] }));
}
