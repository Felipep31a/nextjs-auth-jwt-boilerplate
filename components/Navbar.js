import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { DataContext } from '../store/GlobalState'
import Cookie from 'js-cookie'
import ACTIONS from '../store/Actions'

export default function Navbar() {
    const router = useRouter()
    const [state, dispatch] = useContext(DataContext)

    const { auth } = state

    const isActive = (r) => {
        if (r === router.pathname)
            return " active"
        return ""
    }

    const logOut = () => {
        Cookie.remove('refreshToken', { path: 'api/auth/accessToken' })
        localStorage.removeItem('firstLogin')
        dispatch({ type: ACTIONS.AUTH, payload: {} })
        dispatch({ type: ACTIONS.NOTIFY, payload: { success: 'Sucesso' } })
    }

    const isAuthenticated = () => (auth && auth.user) ?
        (
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {(auth.user && auth.user.name) || ''}
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <li><a className="dropdown-item" href="#" onClick={() => logOut()}>Sair</a></li>
                </ul>
            </li>
        ) :
        (
            <li className="nav-item">
                <Link href="/sign-in" className="nav-item">
                    <a className={"nav-link" + isActive("/sign-in")} aria-current="page">
                        <i className="fas fa-cart-arrow-down"></i>Entrar
                            </a>
                </Link>
            </li>
        )

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" href="/">APP</Link>

            <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
                <ul className="navbar-nav">

                    {isAuthenticated()}

                </ul>
            </div>
        </nav>
    )
}