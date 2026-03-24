import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'
import { EyeIcon, EyeOffIcon, Loader2Icon } from 'lucide-react'
import { useFormLogin } from './useFormLogin'

export function FormLogin() {
  const { state, onSubmit, useForm } = useFormLogin()

  return (
    <form className="flex flex-col gap-4" onSubmit={useForm.handleSubmit(onSubmit)}>

      {state.loginError && (
        <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md text-center">
          {state.loginError}
        </div>
      )}

      {/* --- EMAIL --- */}
      <div className="flex flex-col gap-2 relative pb-5">
        <Label htmlFor="email" className="text-foreground">
          E-mail Institucional
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="seu.nome@ifce.edu.br"
          required
          className="h-11 bg-background"
          {...useForm.register('email')}
        />
        {useForm.errors.email && (
          <p className="absolute bottom-0 text-[11px] leading-tight text-destructive h-4">
            {useForm.errors.email.message}
          </p>
        )}
      </div>

      {/* --- SENHA --- */}
      <div className="flex flex-col gap-2 relative pb-5">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Senha</Label>
          <a href="/recover" className="text-primary text-sm">
            Esqueceu a senha?
          </a>
        </div>

        <div className="relative">
          <Input
            id="password"
            type={state.showPass ? 'text' : 'password'}
            placeholder="Digite sua senha"
            required
            className="h-11 bg-background"
            {...useForm.register('password')}
          />
          <button
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary"
            type="button"
            onClick={() => state.setShowPass((prev) => !prev)}
          >
            {state.showPass ? (
              <EyeOffIcon className="size-4" />
            ) : (
              <EyeIcon className="size-4" />
            )}
          </button>
        </div>
        {useForm.errors.password && (
          <p className="absolute bottom-0 text-[11px] leading-tight text-destructive h-4">
            {useForm.errors.password.message}
          </p>
        )}
      </div>

      {/* Texto de dica adicionado para refletir o seu Schema! */}
      <p className="text-xs text-muted-foreground -mt-3 mb-2">
        Minimo de 8 caracteres com letras e números
      </p>

      {/* --- BOTÃO DE SUBMIT --- */}
      <Button
        type="submit"
        className="mt-2 h-11"
        disabled={useForm.isSubmitting || !useForm.isValid}
      >
        {useForm.isSubmitting ? (
          <span className="flex items-center gap-4">
            <Loader2Icon className="size-4 animate-spin" />
            <span>Entrando...</span>
          </span>
        ) : (
          'Entrar'
        )}
      </Button>
    </form>
  )
}
