import { useAuth } from '@/features/auth/contexts/AuthContext'
import {
  registerSchema,
  type RegisterFormData,
} from '@/features/auth/schemas/register.schema'
import { registerUser } from '@/features/auth/services/register.service'
import type { UserRequestDTO } from '@/features/auth/types/dto/auth-dto'
import { ApiError } from '@/infra/http/api-error'
import { http } from '@/infra/http/http-client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'

export function useFormRegister() {
  const [showPass, setShowPass] = useState<boolean>(false)
  const [registerError, setRegisterError] = useState<string | null>(null)
  const [campuses, setCampuses] = useState<Array<{ id: string; name: string }>>(
    [],
  )

  const navigate = useNavigate()
  const { setAuthUser} = useAuth()

  useEffect(() => {
    async function fetchCampuses() {
      try {
        const campuses =
          await http.get<Array<{ id: string; name: string }>>('campuses')
        setCampuses(campuses)
      } catch (error) {
        console.error(error)
      }
    }

    fetchCampuses()
  }, [])

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isValid },
    watch,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: 'onBlur',
  })

  const onSubmit = async (data: RegisterFormData) => {
    setRegisterError(null)
    const { course, ...rest } = data
    const payload = data.role === 'STUDENT' ? data : rest

    try {
      // 1. Capturamos a resposta do registro na variável responseData
      const responseData = await registerUser(payload as UserRequestDTO)

      // 2. Salvamos o novo usuário no nosso Contexto de Autenticação
      setAuthUser(responseData.user)

      // 3. Mandamos ele direto pro feed!
      navigate('/feed')
    } catch (error) {
      if (error instanceof ApiError) {
        setRegisterError(error.message)
        return
      }
      console.error(error)
      setRegisterError('Erro ao realizar o cadastro. Tente novamente.')
    }
  }

  return {
    state: {
      showPass,
      setShowPass,
      campuses,
      registerError,
    },
    onSubmit,
    useForm: {
      register,
      handleSubmit,
      control,
      isSubmitting,
      isValid,
      errors,
      watch,
    },
  }
}
