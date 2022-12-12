
import { useEffect, useState } from "react"

// need to fetch the user's orders 

export const Cart = () => {

    // const [menuItems, setMenuItems] = useState([]) 

    // const [customMenuItems, setCustomMenuItems] = useState([]) 

    // const [secretMenuItems, setSecretMenuItems] = useState([]) 

    //     useEffect(
    //     () => {

    //         fetch(`http://localhost:8088/menuOrders?_expand=menuItem&_expand=cart`)
    //             .then(response => response.json())
    //             .then((menuOrdersArray) => {
    //                 setCustomMenuItemsBatters(customMenuItemsArray)
    //             })

    //         fetch(`http://localhost:8088/customMenuOrders?_expand=customMenuItem&_expand=cart`)
    //             .then(response => response.json())
    //             .then((customMenuOrdersArray) => {
    //                 setCustomMenuItemsFillings(customMenuItemsArray)
    //             })

    //         fetch(`http://localhost:8088/secretMenuOrders?_expand=secretMenuItem&_expand=cart`)
    //             .then(response => response.json())
    //             .then((secretMenuOrdersArray) => {
    //                 setCustomMenuItemsToppings(customMenuItemsArray)
    //             })

    //     },
    //     []
    // )
    
    return <>
    
        <h2>Orders</h2>

    </>

}