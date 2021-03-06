import Link from 'next/link'
import { useState, useContext } from 'react'
import ACTIONS from '../store/Actions'
import { DataContext } from '../store/GlobalState'
import { postMethod } from '../utils/fetch'
import Cookie from 'js-cookie'
import Router from 'next/router'

const SignIn = () => {

  const initialState = { email: '', password: '' }
  const [form, setForm] = useState(initialState)
  const [state, dispatch] = useContext(DataContext)

  const handleChangeInput = e => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
    dispatch({ type: ACTIONS.NOTIFY, payload: {} })
  }

  const handleSubmit = async e => {
    e.preventDefault()

    dispatch({ type: ACTIONS.NOTIFY, payload: { loading: true } })

    const res = await postMethod('auth/login', form)

    if (res.err) return dispatch({ type: ACTIONS.NOTIFY, payload: { error: res.err } })

    dispatch({ type: ACTIONS.NOTIFY, payload: { success: 'Bem vindo!' } })

    dispatch({
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
    Router.push('/')
  }

  const { email, password } = form

  return (
    <div>

      <form className="mx-auto my-4" onSubmit={e => {handleSubmit(e)}} style={{ maxWidth: '500px' }}>

      <h4>Realize seu login</h4>

      <p> <small>
          Preencha todas as informações necessárias abaixo para acessar sua conta
        </small> </p>

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