import { create } from 'zustand'
import { axiosInstance } from '../lib/axios'
import toast from 'react-hot-toast'
import axios from 'axios'

export const useAuthStore = create<AuthState>((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  checkAuth: async () => {
    try {
      const res = await axiosInstance.get<CheckAuthResponse>('/auth/check')
      set({ authUser: res.data.data })
    } catch (err) {
      console.log('Error in checkAuth: ', err)
      set({ authUser: null })
    } finally {
      set({ isCheckingAuth: false })
    }
  },
  signUp: async (data: IFormState) => {
    set({ isSigningUp: true })
    try {
      const resp = await axiosInstance.post<CheckAuthResponse>(
        '/auth/signup',
        data
      )
      set({ authUser: resp.data.data })
      toast.success('Account created successfully')
    } catch (err: unknown) {
      if (axios.isAxiosError<ApiError>(err)) {
        const message =
          err.response?.data?.data?.error ||
          'Something went wrong, please try again'
        toast.error(message)
      } else {
        toast.error('Unexpected error')
      }
    } finally {
      set({ isSigningUp: false })
    }
  },
  logout: async () => {
    try {
      await axiosInstance.post('/auth/logout')
      set({ authUser: null })
      toast.success('Logged out successfully')
    } catch (err: unknown) {
      if (axios.isAxiosError<ApiError>(err)) {
        const message =
          err.response?.data?.data?.error ||
          'Something went wrong, please try again'
        toast.error(message)
      } else {
        toast.error('Unexpected error')
      }
    }
  },

  login: async (formData: IFormState) => {
    set({ isLoggingIn: true })
    try {
      const resp = await axiosInstance.post<CheckAuthResponse>(
        '/auth/login',
        formData
      )

      set({ authUser: resp.data.data })
      toast.success('User logged in successfully')
    } catch (err: unknown) {
      if (axios.isAxiosError<ApiError>(err)) {
        const message =
          err.response?.data?.data?.error ||
          'Something went wrong, please try again'
        toast.error(message)
      } else {
        toast.error('Unexpected error')
      }
    } finally {
      set({ isLoggingIn: false })
    }
  },

  updateProfile: async (data: UpdateProfileData) => {
    set({ isUpdatingProfile: true })

    try {
      const resp = await axiosInstance.put('/auth/update-profile', data)
      set({ authUser: resp.data.data })
       toast.success('User updated successfully')
    } catch (error) {
      if (axios.isAxiosError<ApiError>(error)) {
        const message =
          error.response?.data?.data?.error ||
          'Something went wrong, please try again'
        toast.error(message)
      }
    } finally {
      set({ isUpdatingProfile: false })
    }
  }
}))
