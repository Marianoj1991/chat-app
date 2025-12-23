import { Users } from 'lucide-react'
import { useChatStore } from '../store/useChatStore'
import { useEffect } from 'react'
import { useAuthStore } from '../store/useAuthStore'

export default function Sidebar() {
  const { users, getUsers, selectedUser, setSelectedUser } = useChatStore()
  const { onlineUsers } = useAuthStore()

  useEffect(() => {
    getUsers()
  }, [getUsers])

  return (
    <aside className='h-full w-20 md:w-60 border-r border-base-300 transition-all duration-200 p-4 flex flex-col'>
      {/* Top */}
      <div className='border-b border-base-300 w-full px-3 py-5'>
        <div className='flex items-center gap-2'>
          <Users className='size-6' />
          <span className='font-medium hidden md:block'>Contacts</span>
        </div>
        {/* <div className="flex items-center gap-1">
          <input type="checkbox" checked={showOnline} onChange={(e) => setShowOnline(e.target.checked)} />
          <span>Show online only {'('}0 online{')'}</span>
        </div> */}
      </div>

      {/* Bottom */}

      <section className='overflow-y-auto w-full py-3'>
        {users.map((user: AuthUser) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`w-full p-3 flex items-center gap-3 hover:bg-base-200 transition-colors ${
              selectedUser?._id === user._id
                ? 'bg-base-300 ring-1 ring-base-300'
                : ''
            }`}
          >
            <div className='relative'>
              <img
                src={user.profilePic || '/avatar.png'}
                alt={user.fullName}
                className='size-12 object-cover rounded-full'
                onError={(e) => {
                  e.currentTarget.src = '/avatar.png'
                }}
              />
              {onlineUsers.includes(user._id) && (
                <span className='absolute top-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900'></span>
              )}
            </div>

            <div className='hidden md:block text-left min-w-0'>
              <div className='font-medium truncate'>{user.fullName}</div>
              <div className='text-sm text-zinc-400'>
                {onlineUsers.includes(user._id) ? 'Online' : 'Offline'}
              </div>
            </div>
          </button>
        ))}
      </section>
    </aside>
  )
}
