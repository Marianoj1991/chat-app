import { Navigate, Outlet } from "react-router-dom"
import { useAuthStore } from "../../store/useAuthStore"

export default function UnrequireAuth() {

  const { authUser } = useAuthStore()


  return (
    authUser ? <Navigate to='/' /> : <Outlet />
  )
}