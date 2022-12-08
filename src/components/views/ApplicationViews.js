import { GuestViews } from "./GuestViews"
import { MemberViews } from "./MemberViews"

export const ApplicationViews = () => {

    const localHotcakesUser = localStorage.getItem("hotcakes_user")
    const hotcakesUserObject  = JSON.parse(localHotcakesUser)

    if (hotcakesUserObject.member) { 
        // return the component view for members
        return <MemberViews />   

    } else {
        // return the component view for guests 
        return <GuestViews /> 
    }
}

// original code 
// guestviews and memberviews components were empty 

// import { Outlet, Route, Routes } from "react-router-dom"
// import { Home } from "../home/Home"
// import { SecretMenu } from "../secret/SecretMenu"
// import { Menu } from "../menu/Menu"

// export const ApplicationViews = () => {
//     return (
//         <Routes>
//             <Route path="/" element={
//                 <>
//                     {/* <h1>Hello Hotcakes</h1>
//                     <div>The taste of delicious pancakes awaits. Savor our sweet stacks!</div> */}

//                     <Outlet />
//                 </>
//             }>

//                 <Route path="home" element={ <Home /> } /> 
//                 <Route path="secret" element={ <SecretMenu /> } />
//                 <Route path="menu" element={ <Menu /> } /> 
//             </Route>
//         </Routes>
//     )
// }
