import Brand from '@/shared/brand'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card'
import { FormLogin } from '@/features/auth/components/form-login' // Ajuste o caminho!

function LoginPage() {
  return (
    <section className="flex-1 flex items-center justify-center py-20 px-4">
      <Card className=" w-full max-w-md border-border">
        <CardHeader className="text-center">
          <div className="w-full flex justify-center mb-4">
            <Brand />
          </div>

          <CardTitle className="text-2xl font-bold text-foreground">
            Bem Vindo de Volta!
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Entre com seu e-mail institucional
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* O FormLogin agora mora aqui! */}
          <FormLogin />
        </CardContent>

        <CardFooter className="border-t border-border mt-4 pt-4">
          <p className="text-sm text-muted-foreground text-center w-full">
            Não tem conta?{' '}
            <a href="/register" className="text-primary hover:underline">
              Criar Conta
            </a>
          </p>
        </CardFooter>
      </Card>
    </section>
  )
}

export default LoginPage
