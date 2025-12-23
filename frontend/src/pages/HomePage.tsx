
import { ChatContainer, NoChatSelected, Sidebar } from '../components'
import { useChatStore } from '../store/useChatStore'

export default function HomePage() {
  const { selectedUser } = useChatStore()

  return (
    <div className='min-h-screen bg-base-200'>
      <div className='flex items-center justify-center pt-20 px-4'>
        <div className='bg-base-100 rounded-lg shadow-xl w-full max-w-4xl h-[calc(100vh-7rem)]'>
          <div className='flex h-full rounded-lg overflow-hidden'>
            <Sidebar />

            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  )
} 