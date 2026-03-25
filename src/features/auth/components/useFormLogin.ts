import { useAuth } from '@/features/auth/contexts/AuthContext'
import {
  LoginSchema,
  type LoginFormData,
} from '@/features/auth/schemas/login.schema'
import { login } from '@/features/auth/services/login.service'
import { ApiError } from '@/infra/http/api-error'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'

export function useFormLogin() {
  const [showPass, setShowPass] = useState<boolean>(false)
  const [loginError, setLoginError] = useState<string | null>(null)

  const navigate = useNavigate()
  const { setAuthUser } = useAuth()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
    mode: 'onBlur',
  })

  const onSubmit = async (data: LoginFormData) => {
    setLoginError(null)

    try {
      const responseData = await login(data.email, data.password)
      setAuthUser(responseData.user)
      navigate('/feed')
    } catch (error) {
      if (error instanceof ApiError) {
        setLoginError(error.message)
        return
      }
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
