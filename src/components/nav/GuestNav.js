import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const GuestNav = () => {
    const navigate = useNavigate()

    return (
        <ul className="navbar">

            <li className="navbar__item active">
                <Link className="navbar__link" to="/home">Home</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/menu">Menu</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/custom">Custom Menu</Link>
            </li>
            {
                localStorage.getItem("hotcakes_user")
                    ? <li className="navbar__item navbar__logout">
                        <Link className="navbar__link" to="" onClick={() => {
                            localStorage.removeItem("hotcakes_user")
                            navigate("/", {replace: true})
                        }}>Logout</Link>
                    </li>
                    : ""
            }
        </ul>
    )
}
