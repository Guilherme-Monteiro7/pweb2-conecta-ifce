import { LoginSchema, type LoginFormData } from '@/features/auth/schemas/login.schema'
import { setAcessToken } from '@/features/auth/storage/auth.storage'
import { http } from '@/infra/http/http-client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'

export function useFormLogin() {
  const [showPass, setShowPass] = useState<boolean>(false)
  const [loginError, setLoginError] = useState<string | null>(null)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
    mode: 'onBlur',
  })

  const onSubmit = async (data: LoginFormData) => {
    setLoginError(null) // Limpa erros anteriores antes de tentar de novo

    try {
      // Ajuste a rota 'auth/login' conforme a sua API
      const responseData = await http.post<{ token: string; user: any }>('auth/login', data)

      setAcessToken(responseData.token)
      navigate('/feed')
    } catch (error) {
      console.error(error)
      setLoginError('E-mail ou senha inválidos. Tente novamente.')
    }
  }

  return {
    state: {
      showPass,
      setShowPass,
      loginError,
    },
    onSubmit,
    useForm: {
      register,
      handleSubmit,
      isSubmitting,
      isValid,
      errors,
    },
  }
}
