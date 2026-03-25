import { z } from 'zod'

export const registerSchema = z.object({
  firstName: z.string().trim().min(2, 'o nome deve ter no mínimo 2 caracteres'),
  lastName: z.string().trim().min(2, ' sobrenome muito curto').optional(),
  handle: z
    .string()
    .trim()
    .min(3, 'o nome de usuário deve ter no mínimo 3 caracteres').regex(/^[a-zA-Z0-9_]+$/ ,'o nome de usuário só pode conter letras, números e underscores'),
  email: z
    .email('E-mail inválido'),
  role: z.enum(['STUDENT', 'PROFESSOR', 'TECHNICIAN']),
  campus: z.string().nonempty(),
  course: z
    .string()
    .trim()
    .min(3, 'o curso deve ter no mínimo 3 caracteres')
    .optional(),
  password: z
    .string()
    .min(8, 'A senha deve conter no mínimo 8 caracteres')
    .regex(/[A-Za-z]/, 'a senha precisa ter letras')
    .regex(/[0-9]/, 'a senha precisa ter números'),
})

export type RegisterFormData = z.infer<typeof registerSchema>
