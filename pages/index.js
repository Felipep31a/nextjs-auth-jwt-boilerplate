import Link from 'next/link'
import { useContext} from 'react'
import { DataContext } from '../store/GlobalState'

export default function Home() {

  const [state, dispath] = useContext(DataContext)

  const isLogged = () => {
    const { auth } = state

    if (auth && auth.user) {
      return (
        <div className="container mt-5">
          <div className="row align-items-center">
            <div className="col">
              <div className="text-center">

              <h3>NextJS + JWT + BOILERPLATE</h3>

                <h4>Bem vindo! {auth.user.name}</h4>

                <div className="card-body">
                  <h6 className="card-title">{auth.user.email}</h6>
                </div>

              </div>
            </div>

          </div>
        </div>
      )
    }

    return (
      <div className="container mt-5">
        <div className="row align-items-center">
          <div className="col">
            <div className="text-center">

              <h3>NextJS + JWT + BOILERPLATE</h3>

              <div className="card-body">
                <h4>Por favor faça o login!</h4>
                <Link href="/sign-in">
                  <a>Clique aqui!</a>
                </Link>
              </div>

            </div>
          </div>

        </div>
      </div>
    )

  }

  return (
    <div>
      {isLogged()}
    </div>
  )
}
