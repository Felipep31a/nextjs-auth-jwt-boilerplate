import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { DataContext } from '../store/GlobalState'

export default function Navbar() {
    const router = useRouter()
    const [state, dispatch] = useContext(DataContext)

    const { auth } = state

    const isActive = (r) => {
        if (r === router.pathname)
            return " active"
        return ""
    }

    const isAuthenticated = () => (auth == null) ?
        (
            <li className="nav-item">
                <Link href="/sign-in" className="nav-item">
                    <a className={"nav-link" + isActive("/sign-in")} aria-current="page">
                        <i className="fas fa-cart-arrow-down"></i>Entrar
                            </a>
                </Link>
            </li>
        )
        : (
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {auth.user.name}
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <li><a className="dropdown-item" href="#">Perfil</a></li>
                    <li><a className="dropdown-item" href="#">Sair</a></li>
                </ul>
            </li>
        )

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" href="/">Ecommerce</Link>

            <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link href="/cart" className="nav-item">
                            <a className={"nav-link" + isActive("/cart")} aria-current="page" >
                                <i className="fas fa-shopping-cart"></i>Cart
                            </a>
                        </Link>
                    </li>
                    {isAuthenticated()}

                </ul>
            </div>
        </nav>
    )
}