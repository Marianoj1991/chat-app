import { Image, Send, X } from 'lucide-react'
import { useRef, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useChatStore } from '../store/useChatStore'

export default function MessageInput() {
  const [text, setText] = useState<string>('')
  const [fileToSend, setFileToSend] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<ArrayBuffer | string | null>(
    null
  )
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const { sendMessage } = useChatStore()

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let file: File | null

    if (e.target.files && e.target.files[0]) {
      file = e.target.files[0]
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file')
        e.target.value = ''
        return
      }
      setFileToSend(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
    e.target.value = ''
  }

  const removeImage = () => {
    setImagePreview(null)
    setFileToSend(null)
    if (fileInputRef.current) {
      ;(fileInputRef.current as HTMLInputElement).value = ''
    }
  }

  const handleSendMessages = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!text && !fileToSend) return

    try {
      const data = new FormData()
      data.append('text', text)

      if (fileToSend) data.append('image', fileToSend)

      sendMessage(data)
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error('Unknown error')
      }
    } finally {
      removeImage()
      setText('')
    }
  }

  return (
    <div className='p-4 w-full'>
      {imagePreview && (
        <div className='mb-3 flex items-center gap-2'>
          <div className='relative'>
            <img
              src={typeof imagePreview === 'string' ? imagePreview : ''}
              alt='Preview'
              className='w-20 h-20 object-cover rounded-lg border border-zinc-100'
            />
            <button
              onClick={removeImage}
              className='absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
      flex items-center justify-center cursor-pointer'
              type='button'
            >
              <X className='size-3' />
            </button>
          </div>
        </div>
      )}

      {/* FORM */}
      <form
        onSubmit={handleSendMessages}
        className='flex items-center gap-3'
      >
        <div className='flex-1 flex gap-2'>
          <input
            type='text'
            className='w-full input input-bordered rounded-lg input-sm sm:input-md'
            placeholder='Type a message...'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type='file'
            accept='image/*'
            className='hidden'
            ref={fileInputRef}
            onChange={handleImageChange}
          />

          <button
            type='button'
            className={`hidden sm:flex btn btn-circle
                     ${imagePreview ? 'text-emerald-500' : 'text-zinc-400'}`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Image size={20} />
          </button>
        </div>
        <button
          type='submit'
          className='flex btn btn-md btn-circle'
          disabled={!text.trim() && !imagePreview}
        >
          <Send size={22} />
        </button>
      </form>
    </div>
  )
}
