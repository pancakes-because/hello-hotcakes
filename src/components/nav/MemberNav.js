import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

// added some logic here for the "cart", so each user has a unique cart 
// without, users would log in and add choices to the SAME cart -- avoid 

// seeing an issue where a double click is needed to log out 
// i think it has something to do with the fetch call 
// know this bc i don't see this issue with guest nav logout
// the fetch call is only in member nav, and this is what has issues 

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

