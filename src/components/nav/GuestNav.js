import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const GuestNav = () => {
    const navigate = useNavigate()

    // only need lines 10-11 uncommented if lines 39-52 are uncommented
    // if using lines 29-37, comment out lines 10-11 and lines 39-52

    // const localHotcakesUser = localStorage.getItem("cart")
    // const hotcakesUserObject = JSON.parse(localHotcakesUser)

    return (
        <ul className="navbar">

            <li className="navbar__item active">
                <Link className="navbar__link" to="/home">HOME</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/menu">CLASSIC MENU</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/custom">CUSTOM MENU</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/cart">CART</Link>
            </li> 
            {
                localStorage.getItem("hotcakes_user")
                    ? <li className="navbar__item navbar__logout">
                        <Link className="navbar__link" to="" onClick={() => {
                            localStorage.removeItem("hotcakes_user")
                            localStorage.removeItem("cart") 
                            navigate("/", {replace: true})
                        }}>LOGOUT</Link>
                    </li>
                    : ""

                // localStorage.getItem("hotcakes_user")
                //     ? <li className="navbar__item navbar__logout">
                //         <Link className="navbar__link" to="" onClick={() => {
                //             fetch(`http://localhost:8088/carts/${hotcakesUserObject.cartId}`, {
                //                 method: "DELETE"
                //             }).then((res) => res.json())
                //                 .then(() => {
                //                     localStorage.removeItem("hotcakes_user")
                //                     localStorage.removeItem("cart")
                //                     navigate("/", { replace: true })
                //                 })
                //         }}>SIGN OUT</Link>
                //     </li>
                //     : ""
            }
        </ul>
    )
}
