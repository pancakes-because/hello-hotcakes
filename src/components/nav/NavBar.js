import { GuestNav } from "./GuestNav"
import { MemberNav } from "./MemberNav"

export const NavBar = () => {

    const localHotcakesUser = localStorage.getItem("hotcakes_user")
    const hotcakesUserObject  = JSON.parse(localHotcakesUser)

    if (hotcakesUserObject.member) {

        return <MemberNav /> 

    } else {

        return <GuestNav /> 
    }
}

// original code 
// GuestNav and MemberNav were empty 

// import { Link, useNavigate } from "react-router-dom"
// import "./NavBar.css"

// export const NavBar = () => {
//     const navigate = useNavigate()

//     return (
//         <ul className="navbar">

//             <li className="navbar__item active">
//                 <Link className="navbar__link" to="/home">Home</Link>
//             </li>
//             <li className="navbar__item active">
//                 <Link className="navbar__link" to="/menu">Menu</Link>
//             </li>
//             <li className="navbar__item active">
//                 <Link className="navbar__link" to="/secret">Secret Menu</Link>
//             </li>
//             {
//                 localStorage.getItem("hotcakes_user")
//                     ? <li className="navbar__item navbar__logout">
//                         <Link className="navbar__link" to="" onClick={() => {
//                             localStorage.removeItem("hotcakes_user")
//                             navigate("/", {replace: true})
//                         }}>Logout</Link>
//                     </li>
//                     : ""
//             }
//         </ul>
//     )
// }
