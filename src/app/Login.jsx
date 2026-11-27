import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Card from '../components/Card.jsx'
import Field from '../components/Field.jsx'
import Button from '../components/Button.jsx'
import { loginDefaults, loginSchema } from '../schemas/loginSchema.js'

// Login screen: any non-empty username and password are accepted (simulated sign in)
export default function Login({ onLogin }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema), defaultValues: loginDefaults })

  const signIn = ({ username }) => onLogin(username)

  return (
    <Card title="Sign in">
      <form className="stack" onSubmit={handleSubmit(signIn)} noValidate>
        <Field id="username" label="Username" error={errors.username?.message}>
          <input id="username" placeholder="Username" autoComplete="username" aria-invalid={Boolean(errors.username)} {...register('username')} />
        </Field>

        <Field id="password" label="Password" error={errors.password?.message}>
          <input id="password" type="password" placeholder="Password" autoComplete="current-password" aria-invalid={Boolean(errors.password)} {...register('password')} />
        </Field>

        <Button type="submit">Sign in</Button>
      </form>
    </Card>
  )
}
