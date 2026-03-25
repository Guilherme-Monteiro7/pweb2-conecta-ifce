import { registerSchema, type RegisterFormData } from '@/features/auth/schemas/register.schema'
import { registerUser, type UserRequestDTO } from '@/features/auth/services/register.service'
import { ApiError } from '@/infra/http/api-error'
import { http } from '@/infra/http/http-client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'

export function useFormRegister() {
  const [showPass, setShowPass] = useState<boolean>(false)
  const [registerError, setRegisterError] = useState<string | null>(null)
  const [campuses, setCampuses] = useState<Array<{ id: string; name: string }>>([])

  const navigate = useNavigate()

  useEffect(() => {
    async function fetchCampuses() {
      try {
        const campuses = await http.get<Array<{ id: string; name: string }>>('campuses')
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
    const payload = data.role === 'student' ? data : rest

    try {
      await registerUser(payload as UserRequestDTO)
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
