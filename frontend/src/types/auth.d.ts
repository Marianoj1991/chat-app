declare module 'daisyui'

interface ThemeState {
  theme: string
  setTheme: (theme: string) => void
}

interface AuthState {
  authUser: authUser | null
  isSigningUp: boolean
  isLoggingIn: boolean
  isUpdatingProfile: boolean
  isCheckingAuth: boolean
  onlineUsers: string[]
  checkAuth: () => Promise<void>
  signUp: (data: IFormState) => Promise<void>
  logout: () => Promise<void>
  login: (data: IFormState) => Promise<void>
  updateProfile: (data: FormData) => Promise<void>
}

interface IUseChatStore {
  messages: IMessage[]
  users: []
  selectedUser: AuthUser | null
  isUsersLoading: boolean
  isMessagesLoading: boolean
  isSendingMessage: boolean
  getUsers: () => Promise<void>
  getMessages: (userId: string) => Promise<void>
  setSelectedUser: (selectedUser: AuthUser | null) => void
  sendMessage: (data: FormData) => void 
}


interface UpdateProfileData {
  username?: string
  email?: string
  profilePic?: ArrayBuffer | string | null
}


interface IFormState {
  fullName?: string
  email: string
  password: string
}

interface ApiError {
  status: string
  data: {
    error: string
  }
}

interface AuthUser {
  _id: string,
  email: string
  fullName: string
  profilePic?: string
  createdAt?: string
  updatedAt?: string
}

interface ApiResponse<T> {
  status: 'success' | 'fail',
  data: T
} 

type CheckAuthResponse = ApiResponse<AuthUser>

// interface CheckAuthData {
//   user: AuthUser
// }

type IMessage = {
  _id: string
  senderId: string
  receiverId: string
  text: string
  image?: string
  createdAt: Date
  updatedAt?: Date
}