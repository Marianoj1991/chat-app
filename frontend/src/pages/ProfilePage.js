import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Camera, Mail, User } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import { useState } from 'react';
export default function ProfilePage() {
    const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
    const [selectedImg, setSelectedImg] = useState(null);
    const handleImageUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file)
            return;
        const formData = new FormData();
        formData.append('profilePic', file);
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async () => {
            const base64Image = reader.result;
            setSelectedImg(base64Image);
            await updateProfile(formData);
        };
    };
    return (_jsx("div", { className: 'min-h-screen pt-20', children: _jsx("div", { className: 'max-w-2xl mx-auto p-4 py-8', children: _jsxs("div", { className: 'bg-base-300 rounded-xl p-6 space-y-8', children: [_jsxs("div", { className: 'text-center', children: [_jsx("h1", { className: 'text-2xl font-semibold ', children: "Profile" }), _jsx("p", { className: 'mt-2', children: "Your profile information" })] }), _jsxs("div", { className: 'flex flex-col items-center gap-4', children: [_jsxs("div", { className: 'relative', children: [_jsx("img", { src: selectedImg || authUser?.profilePic || '/avatar.png', alt: 'Profile', className: 'size-36 rounded-full object-cover border-4 p-1', onError: (e) => {
                                            e.currentTarget.src = '/avatar.png';
                                        } }), _jsxs("label", { htmlFor: 'avatar-upload', className: `
                  absolute bottom-0 right-0 
                  bg-base-content hover:scale-115
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${isUpdatingProfile ? 'animate-pulse pointer-events-none' : ''}
                `, children: [_jsx(Camera, { className: 'w-5 h-5 text-base-200' }), _jsx("input", { type: 'file', id: 'avatar-upload', className: 'hidden', accept: 'image/*', onChange: handleImageUpload, disabled: isUpdatingProfile })] })] }), _jsx("p", { className: 'text-sm text-zinc-400', children: isUpdatingProfile
                                    ? 'Uploading...'
                                    : 'Click the camera icon to update your photo' })] }), _jsxs("div", { className: 'space-y-6', children: [_jsxs("div", { className: 'space-y-1.5', children: [_jsxs("div", { className: 'text-sm text-zinc-400 flex items-center gap-2', children: [_jsx(User, { className: 'w-4 h-4' }), "Full Name"] }), _jsx("p", { className: 'px-4 py-2.5 bg-base-200 rounded-lg border', children: authUser?.fullName })] }), _jsxs("div", { className: 'space-y-1.5', children: [_jsxs("div", { className: 'text-sm text-zinc-400 flex items-center gap-2', children: [_jsx(Mail, { className: 'w-4 h-4' }), "Email Address"] }), _jsx("p", { className: 'px-4 py-2.5 bg-base-200 rounded-lg border', children: authUser?.email })] })] }), _jsxs("div", { className: 'mt-6 bg-base-300 rounded-xl p-6', children: [_jsx("h2", { className: 'text-lg font-medium  mb-4', children: "Account Information" }), _jsxs("div", { className: 'space-y-3 text-sm', children: [_jsxs("div", { className: 'flex items-center justify-between py-2 border-b border-zinc-700', children: [_jsx("span", { children: "Member Since" }), _jsx("span", { children: authUser?.createdAt.split('T')[0] })] }), _jsxs("div", { className: 'flex items-center justify-between py-2', children: [_jsx("span", { children: "Account Status" }), _jsx("span", { className: 'text-green-500', children: "Active" })] })] })] })] }) }) }));
}
