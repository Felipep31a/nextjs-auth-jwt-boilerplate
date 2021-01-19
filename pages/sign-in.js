import Link from 'next/link'
import { useState, useContext } from 'react'
import ACTIONS from '../store/Actions'
import { DataContext } from '../store/GlobalState'
import { postMethod } from '../utils/fetch'
import Cookie from 'js-cookie'

const SignIn = () => {

  const initialState = { email: '', password: '' }
  const [form, setForm] = useState(initialState)
  const [state, dispath] = useContext(DataContext)

  const handleChangeInput = e => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
    dispath({ type: ACTIONS.NOTIFY, payload: {} })
  }

  const handleSubmit = async e => {
    e.preventDefault()

    dispath({ type: ACTIONS.NOTIFY, payload: { loading: true } })

    const res = await postMethod('auth/login', form)
    console.log(res)
    if (res.err) return dispath({ type: ACTIONS.NOTIFY, payload: { error: res.err } })

    dispath({ type: ACTIONS.NOTIFY, payload: { success: res.msg } })

    dispath({
      type: ACTIONS.AUTH, payload: {
        token: res.access_token,
        user: res.user
      }
    })

    Cookie.set('refreshToken', res.refresh_token, {
      path: 'api/auth/accessToken',
      expires: 7
    })

    localStorage.setItem('firstLogin', true)
  }

  const { email, password } = form

  return (
    <div>

      <form className="mx-auto my-4" onSubmit={handleSubmit} style={{ maxWidth: '500px' }}>

        <div className="form-group">
          <label htmlFor="email">Digite seu Email</label>
          <input type="email" className="form-control"
            name="email" id="email"
            onChange={handleChangeInput} value={email} required />
        </div>

        <div className="form-group">
          <label htmlFor="password">Digite sua senha</label>
          <input type="password" className="form-control"
            name="password" id="password"
            onChange={handleChangeInput} value={password} required />
        </div>

        <button type="submit" className="btn btn-dark w-100">Logar</button>

        <p className="my-2">Não possui uma conta?
          <Link href="/sign-up"><a style={{ color: "crimson" }}> Registrar</a></Link>
        </p>

      </form>

    </div>
  )
}

export default SignIn