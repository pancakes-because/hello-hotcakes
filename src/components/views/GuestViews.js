import { Outlet, Route, Routes } from "react-router-dom"
import { Home } from "../home/Home"
import { Menu } from "../menu/Menu"
import { CustomMenu } from "../custom/CustomMenu"

export const GuestViews = () => {
    return (
        <Routes>
            <Route path="/" element={
                <>
                    {/* <h1>Hello Hotcakes</h1>
                    <div>The taste of delicious pancakes awaits. Savor our sweet stacks!</div> */}

                    <Outlet />
                </>
            }>

                <Route path="home" element={ <Home /> } /> 
                <Route path="menu" element={ <Menu /> } /> 
                <Route path="custom" element={ <CustomMenu /> } /> 
            </Route>
        </Routes>
    )
}