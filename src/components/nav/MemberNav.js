import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const MemberNav = () => {
    const navigate = useNavigate()

    const localHotcakesUser = localStorage.getItem("cart")
    const hotcakesUserObject = JSON.parse(localHotcakesUser)

    return (
        <ul className="navbar">

            <li className="navbar__item active">
                <Link className="navbar__link" to="/home">Home</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/menu">Menu</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/secret">Secret Menu</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/custom">Custom Menu</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/cart">Cart</Link>
            </li>
            {
                localStorage.getItem("hotcakes_user")
                    ? <li className="navbar__item navbar__logout">
                        <Link className="navbar__link" to="" onClick={() => {
                            fetch(`http://localhost:8088/carts/${hotcakesUserObject.cartId}`, {
                                method: "DELETE"
                            }).then((res) => res.json())
                                .then(() => {
                                    localStorage.removeItem("hotcakes_user")
                                    localStorage.removeItem("cart")
                                    navigate("/", { replace: true })
                                })
                        }}>Logout</Link>
                    </li>
                    : ""
            }
        </ul>
    )
}

// added some logic here for the "cart", so each user has a unique cart 
// without this, users would log in and add their choices to the SAME cart -- do not want this 
