import { useEffect, useRef } from 'react'
import { useChatStore } from '../store/useChatStore'
import { MessageInput, MessageSkeleton, ChatHeader } from './'
import { useAuthStore } from '../store/useAuthStore'
import { formatMessageTime } from '../lib/utils'

export default function ChatContainer() {
  const { messages, getMessages, selectedUser, isMessagesLoading } =
    useChatStore()
  const { authUser } = useAuthStore()
  const bottomRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (selectedUser?._id) getMessages(selectedUser?._id)
  }, [getMessages, selectedUser])

  if (isMessagesLoading) {
    return (
      <div className='flex-1 flex flex-col overflow-auto'>
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    )
  }

  return (
    <div className='flex-1 flex justify-between flex-col overflow-auto'>
      {/* TOP */}

      <ChatHeader />

      {/* MIDDLE */}

      <div className='flex-1 flex flex-col justify-end p-4'>
        {messages.map((m) => (
          <div
            key={m._id}
            className={`chat overflow-hidden ${
              m.senderId === authUser._id ? 'chat-end' : 'chat-start'
            }`}
          >
            <div className='chat-image avatar'>
              <div className='size-10 rounded-full border'>
                <img
                  src={`${
                    m.senderId === authUser._id
                      ? authUser?.profilePic || '/avatar.png'
                      : selectedUser?.profilePic || '/avatar.png'
                  }`}
                  onError={(e) => {
                    e.currentTarget.src = '/avatar.png'
                  }}
                  alt={m._id}
                />
              </div>
            </div>
            <div className='chat-bubble'>
              {m.image && (
                <img
                  className='min-w-[150px] max-w-[150px] rounded-sm md:min-w-[300px] md:max-h-[300px] mb-2'
                  src={m.image}
                  alt={m._id}
                />
              )}
              {m.text && <p>{m.text}</p>}
            </div>
            <div className='chat-footer mt-1'>
              <time className='text-xs opacity-50 ml-1'>
                {formatMessageTime(m.createdAt)}
              </time>
            </div>
          </div>
        ))}
        <div ref={bottomRef}></div>
      </div>

      {/* BOTTOM */}
      <MessageInput />
    </div>
  )
}
