import { z } from 'zod'

export const registerSchema = z.object({
  firstName: z.string().trim().min(2, 'o nome deve ter no mínimo 2 caracteres'),
  lastName: z.string().trim().min(2, ' sobrenome muito curto').optional(),
  email: z
    .email('E-mail inválido')
    .endsWith('@ifce.edu.br', 'O e-mail deve ser institucional do IFCE').optional(),
  role: z.enum(['student', 'professor', 'technician']).optional(),
  campus: z.enum(['taua', 'boa_viagem', 'fortaleza']).optional(),
  password: z
    .string()
    .min(8, 'A senha deve conter no mínimo 8 caracteres')
    .regex(/[A-Za-z]/, 'a senha precisa ter letras')
    .regex(/[0-9]/, 'a senha precisa ter números'),
})

export type RegisterFormData = z.infer<typeof registerSchema>


