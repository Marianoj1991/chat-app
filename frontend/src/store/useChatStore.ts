import { create } from 'zustand'
import toast from 'react-hot-toast'
import { axiosInstance } from '../lib/axios'
import { AxiosError } from 'axios'
import { AuthUser, IMessage, IUseChatStore } from '../types/auth'
import { useAuthStore } from './useAuthStore'

export const useChatStore = create<IUseChatStore>((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  isSendingMessage: false,

  getUsers: async () => {
    set({ isUsersLoading: true })
    try {
      const resp = await axiosInstance.get('/messages/users')
      set({ users: resp.data.data })
    } catch (error: unknown) {
      console.log('ERROR en useChatStore[getUsers]: ', error)
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message ?? 'Error desconocido')
      } else {
        toast.error('Error inesperado')
      }
    } finally {
      set({ isUsersLoading: false })
    }
  },

  getMessages: async (userId: string) => {
    set({ isMessagesLoading: true })
    try {
      const resp = await axiosInstance.get(`/messages/${userId}`)
      set({
        messages: resp.data.data.map((m: IMessage) => ({
          ...m,
          createdAt: new Date(m.createdAt)
        }))
      })
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message ?? 'Error desconocido')
      } else {
        toast.error('Error inesperado')
      }
    } finally {
      set({ isMessagesLoading: false })
    }
  },

  setSelectedUser: (selectedUser: AuthUser | null) => {
    if(selectedUser?._id === get().selectedUser?._id) return
    set({ selectedUser })
  },

  sendMessage: async (data) => {
    const { messages, selectedUser } = get()

    try {
      const resp = await axiosInstance.post(
        `/messages/send/${selectedUser?._id}`,
        data
      )
      const message = resp?.data?.data
      set({ messages: [...messages, message] })
      toast.success('Message send')
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data?.message ?? 'Error desconocido')
      } else {
        toast.error('Error inesperado')
      }
    }
  },

  subscribeToNewMessages: () => {
    const { selectedUser } = get()

    if(!selectedUser) return

    const socket = useAuthStore.getState().socket

    socket?.on('newMessage', (message: IMessage) => {
      if(message.senderId !== selectedUser._id) return
      set({ messages: [...get().messages, {
        ...message,
        createdAt: new Date(message.createdAt)
      }] })
    })
  },
  

  unsubscribeFromNewMessages: () => {
    const socket = useAuthStore.getState().socket
    socket?.off('newMessage')
  }

}))
