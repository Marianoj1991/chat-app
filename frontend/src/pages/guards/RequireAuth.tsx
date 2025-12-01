import { Navigate, Outlet } from "react-router-dom"
import { useAuthStore } from "../../store/useAuthStore"

export default function RequireAuth() {

  const { authUser } = useAuthStore()

  return (
    authUser ? <Outlet /> : <Navigate to='/login' />
   )
}