import { Outlet, Route, Routes } from "react-router-dom"
import { Home } from "../home/Home"
import { Menu } from "../menu/Menu"
import { CustomMenu } from "../custom/CustomMenu"
import { Cart } from "../cart/Cart"
import { MenuEdit } from "../menu/MenuEdit"
import { CustomMenuEdit } from "../custom/CustomMenuEdit"
import { Checkout } from "../checkout/Checkout" 

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
                <Route path="menu/:menuOrderId/edit" element={ < MenuEdit /> } />

                <Route path="custom" element={ <CustomMenu /> } /> 
                <Route path="custom/:customMenuOrderId/edit" element={ < CustomMenuEdit /> } /> 

                <Route path="cart" element={ <Cart /> } />

                <Route path="checkout" element={ <Checkout /> } />
                
            </Route>
        </Routes>
    )
}