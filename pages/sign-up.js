import Link from 'next/link'
import { useState, useContext } from 'react'
import ACTIONS from '../store/Actions'
import { DataContext } from '../store/GlobalState'
import { postMethod } from '../utils/fetch'
import { validateRegister } from '../utils/valid'
import Router from 'next/router'

const SignUp = () => {

  const initialState = { name: '', email: '', password: '', cpassword: '' }
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

    const errs = validateRegister(name, email, password, cpassword)
    if (errs) return dispatch({ type: ACTIONS.NOTIFY, payload: { error: errs } })

    const res = await postMethod('auth/register', form)
    if (res.err) return dispatch({ type: ACTIONS.NOTIFY, payload: { error: res.err } })

    dispatch({ type: ACTIONS.NOTIFY, payload: { success: 'Conta criada com sucesso!' } })
    Router.push('/')

  }

  const { name, email, password, cpassword } = form

  return (
    <div>
      <form className="mx-auto my-4" onSubmit={handleSubmit} style={{ maxWidth: '500px' }}>

        <h4>Realize seu Cadastro</h4>

        <p> <small>
            Preencha todas as informações necessárias abaixo para criar sua conta
          </small> </p>

        <div className="form-group">
          <label htmlFor="name">Digite seu nome</label>
          <input type="text" className="form-control"
            id="name" name="name" placeholderaria-describedby="emailHelp"
            onChange={handleChangeInput} value={name} required />
        </div>

        <div className="form-group">
          <label htmlFor="email">Digite seu Email</label>
          <input type="email" className="form-control"
            id="email" name="email" placeholderaria-describedby="emailHelp"
            onChange={handleChangeInput} value={email} required />
        </div>

        <div className="form-group">
          <label htmlFor="password">Digite sua senha</label>
          <input type="password" className="form-control"
            name="password" id="password"
            onChange={handleChangeInput} value={password} required />
        </div>

        <div className="form-group">
          <label htmlFor="password">Confirme sua senha</label>
          <input type="password" className="form-control"
            name="cpassword" id="cpassword"
            onChange={handleChangeInput} value={cpassword} required />
        </div>

        <button type="submit" className="btn btn-dark w-100" disabled={state && state.loading}>Cadastrar</button>

        <p className="my-2">Já possui conta?
          <Link href="/sign-in"><a style={{ color: "crimson" }}> Logar agora</a></Link>
        </p>
      </form>

    </div>
  )
}

export default SignUp