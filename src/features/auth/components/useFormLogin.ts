import { LoginSchema, type LoginFormData } from '@/features/auth/schemas/login.schema'
import { setAcessToken } from '@/features/auth/storage/auth.storage'
import { ApiError } from '@/infra/http/api-error'
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
    setLoginError(null)

    try {
      const responseData = await http.post<{ token: string; user: any }>('auth/login', data)

      setAcessToken(responseData.token)
      navigate('/feed')
    } catch (error) {
      if (error instanceof ApiError) {
        setLoginError(error.message)
        return
      }
   
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
