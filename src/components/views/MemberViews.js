import { Outlet, Route, Routes } from "react-router-dom"
import { Home } from "../home/Home"
import { Menu } from "../menu/Menu"
import { CustomMenu } from "../custom/CustomMenu"
import { SecretMenu } from "../secret/SecretMenu" 
import { Cart } from "../cart/Cart" 
import { MenuEdit } from "../menu/MenuEdit"
import { CustomMenuEdit } from "../custom/CustomMenuEdit"
import { SecretMenuEdit } from "../secret/SecretMenuEdit"
import { Checkout } from "../checkout/Checkout" 

// see ApplicationViews.js for more context 
// there are the views that users can see if they are "members" ("member" = "true")
// only members have access to the secret menu and secret menu edit page views 

export const MemberViews = () => {
    return (
        <Routes>
            <Route path="/" element={
                <>

                    <Outlet />
                </>
            }>

                <Route path="home" element={ <Home /> } /> 
                
                <Route path="menu" element={ <Menu /> } />  
                <Route path="menu/:menuOrderId/edit" element={ < MenuEdit /> } />

                <Route path="custom" element={ <CustomMenu /> } /> 
                <Route path="custom/:customMenuOrderId/edit" element={ < CustomMenuEdit /> } />

                <Route path="secret" element={ <SecretMenu /> } />
                <Route path="secret/:secretMenuOrderId/edit" element={ <SecretMenuEdit /> } />

                <Route path="cart" element={ <Cart /> } />

                <Route path="checkout" element={ <Checkout /> } />
                
            </Route>
        </Routes>
    )
}