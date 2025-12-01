import { Outlet } from 'react-router-dom'
import { Navbar } from './components'
import { useAuthStore } from './store/useAuthStore'
import { useEffect } from 'react'
import { Loader } from 'lucide-react'
import { Toaster } from 'react-hot-toast'
import { useThemeStore } from './store/useThemeStore'

export default function App() {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore()

  const { theme } = useThemeStore()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])
  
  if (isCheckingAuth && !authUser) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader className='size-10 animate-spin' />
      </div>
    )
  }

  return (
    <div data-theme={theme} className='min-h-screen'>
      <Navbar />
      <main>
        <Outlet />  
      </main>
      <Toaster
        position='top-center'
        reverseOrder={false}
      />
    </div>
  )
}
