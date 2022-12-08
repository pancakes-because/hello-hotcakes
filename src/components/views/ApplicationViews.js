import { Outlet, Route, Routes } from "react-router-dom"
import { Home } from "../home/Home"
import { SecretMenu } from "../secret/SecretMenu"
import { Menu } from "../menu/Menu"

export const ApplicationViews = () => {
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
                <Route path="secret" element={ <SecretMenu /> } />
                <Route path="menu" element={ <Menu /> } /> 
            </Route>
        </Routes>
    )
}
