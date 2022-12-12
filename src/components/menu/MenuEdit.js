// on the cart page, the user should be able to cilck the "edit order" button 
// after they do, they should be taken to a page that looks like the menu form 
// the options the user chose when filling out the form originally should be clearly marked

// *** This component is to EDIT the user's selections later in the cart *** 
// *** remember to change the URL in the PUT fetch request to target a specific thing 
// have this target an id like http://localhost:8088/menuOrders/${menuOrder.id}

import { useEffect, useState } from "react"
import "./Menu.css" 

export const MenuEdit = () => {

// we have an initial state variable to render the menu form, which has radio buttons to let users to make their choices
// we're fetching the objects from "menuItems" to display for the user when they see the form
// then when the user starts clicking the radio buttons, the state is changing
// so using the onChange event listener, see below in form, we're copying the initial state and modifying it 

    const [menuItems, setMenuItems] = useState({
        id: 0,
        name: "",
        price: 0 
}) 

    useEffect(
        () => {
            fetch(`http://localhost:8088/menuItems`)
                .then(response => response.json())
                .then((menuItemsArray) => {
                    setMenuItems(menuItemsArray)
                })
        },
        []
    ) 

// this is to edit the user's selections later in the cart 
// *** remember to change the URL in the PUT fetch request to target a specific thing 
// have this target an id like http://localhost:8088/menuOrders/${menuOrder.id}

    const [menuItemChoices, setMenuItemChoices] = useState({
        id: 0, 
        menuItemId: 0, 
        cartId: 0 
    }) 

    const handleSaveButtonClick = (event) => {
        event.preventDefault() 

        return fetch(`http://localhost:8088/menuOrders/${menuOrder.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify
        })
                .then(response => response.json())
                .then((menuOrdersArray) => {
                    setMenuItems(menuOrdersArray)
                })

    } 


    return <>

        <form className="classic_menu">
            <h2 className="classic__title">Classic Menu</h2>
            <fieldset>
                <div className="form-group">

                    {menuItems.map(menuItem => {

                return <> <label htmlFor="classic menu">{menuItem.name}, ${menuItem.price.toFixed(2)}</label>
                    <input
                        required autoFocus
                        className="form-control"
                        key={`menu_choice--${menuItem.id}`}
                        type="radio"
                        name="classic_menu_item"
                        value={menuItem.name}
                        onChange={
                            (evt) => {
                                const copy = { ...setMenuItemChoices }
                                copy.name = evt.target.value
                                setMenuItemChoices(copy)
                            }} 
                        />  
                        </> })  
                    } </div>
        </fieldset>
        <button
            onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
            className="btn btn-primary">
            Save Edits
        </button>
    </form>
    </>
}
