import { useNavigate } from 'react-router-dom'
import { LoginForm } from '../components/auth/LoginForm'

export function LoginPage() {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <LoginForm onSuccess={() => navigate('/books', { replace: true })} />
    </div>
  )
}
