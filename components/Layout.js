import Navbar from "./Navbar";
import Notify from '../components/Notify'

export default function Layout({ children }) {
    return (
        <div className="container">
            <Navbar />
            <Notify />
            {children}
        </div>
    )
}