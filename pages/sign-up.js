import Link from 'next/link'
import { useState, useContext } from 'react'
import ACTIONS from '../store/Actions'
import { DataContext } from '../store/GlobalState'
import { postMethod } from '../utils/fetch'
import { validateRegister } from '../utils/valid'

const SignUp = () => {

  const initialState = { name: '', email: '', password: '', cpassword: '' }
  const [form, setForm] = useState(initialState)
  const [state, dispath] = useContext(DataContext)

  const handleChangeInput = e => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
    dispath({ type: ACTIONS.NOTIFY, payload: {} })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const errs = validateRegister(name, email, password, cpassword)
    if (errs) return dispath({ type: ACTIONS.NOTIFY, payload: { error: errs } })

    const res = await postMethod('auth/register', form)
    if (res.err) return dispath({ type: ACTIONS.NOTIFY, payload: { error: res.err } })

    dispath({ type: ACTIONS.NOTIFY, payload: { success: '' } })

  }

  const { name, email, password, cpassword } = form

  return (
    <div>
      <form className="mx-auto my-4" onSubmit={handleSubmit} style={{ maxWidth: '500px' }}>

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

        <button type="submit" className="btn btn-dark w-100">Logar</button>

        <p className="my-2">Já possui conta?
          <Link href="/sign-in"><a style={{ color: "crimson" }}>Logar</a></Link>
        </p>
      </form>

    </div>
  )
}

export default SignUp