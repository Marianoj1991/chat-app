import { X } from 'lucide-react'
import { useChatStore } from '../store/useChatStore'
import { useAuthStore } from '../store/useAuthStore'

export default function ChatHeader() {
  const { selectedUser, setSelectedUser } = useChatStore()
  const { onlineUsers } = useAuthStore()

  return (
    <div className='border-b border-base-300 flex justify-between items-center p-4 bg-base-100'>
      {/* LEFT */}
      <div className='relative flex gap-2 items-center'>
        <div className='size-10 rounded-full'>
          <img
            src={selectedUser?.profilePic || 'avatar.png'}
            alt={selectedUser?.fullName}
            onError={(e) => {
              e.currentTarget.src = '/avatar.png'
            }}
          />
        </div>
        <div className='text- flex flex-col'>
          <p className='font-semibold'>{selectedUser?.fullName}</p>
          <span className='text-gray-600'>
            {selectedUser?._id && onlineUsers.includes(selectedUser?._id)
              ? 'Online'
              : 'Offline'}
          </span>
        </div>
      </div>

      {/* RIGTH */}
      <button
        className='cursor-pointer'
        onClick={() => setSelectedUser(null)}
      >
        <X className='size-6' />
      </button>
    </div>
  )
}
