import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

// this component holds the links that show for users who are "guests" 

// added some logic here for the "cart", so each user has a unique cart 
// without this logic, users would sign in and add choices to the SAME cart 
// when the user signs out, the cart is deleted 

export const GuestNav = () => {
    const navigate = useNavigate()

    // if using lines 49-68, comment out lines 16-17 and lines 35-49 
    // only need lines 16-17 uncommented if lines 35-49 are uncommented

    // const localHotcakesUser = localStorage.getItem("cart")
    // const hotcakesUserObject = JSON.parse(localHotcakesUser)

    return (
        <ul className="navbar">

            <li className="navbar__item active">
                <Link className="navbar__link" to="/home">Home</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/menu">Classic Menu</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/custom">Custom Menu</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/cart">Cart</Link>
            </li> 
            {
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
                //         }}>Sign Out</Link>
                //     </li>
                //     : ""

                localStorage.getItem("hotcakes_user")
                    ? <li className="navbar__item navbar__logout">
                        <Link className="navbar__link" to="" onClick={(e) => {
                            e.preventDefault()
                            const localHotcakesUser = localStorage.getItem("cart") 
                            const hotcakesUserObject = JSON.parse(localHotcakesUser)
                            fetch(`http://localhost:8088/carts/${hotcakesUserObject.cartId}`, {
                                method: "DELETE"
                            }).then((res) => res.json())
                                .then(() => {
                                    localStorage.removeItem("hotcakes_user")
                                    localStorage.removeItem("cart")
                                })
                                .then(() => {
                                    navigate("/login", { replace: true })
                                })
                        }}>Sign Out</Link>
                    </li>
                    : ""
            }
        </ul>
    )
}
