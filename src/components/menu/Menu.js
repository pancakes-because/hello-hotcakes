import { useEffect, useState } from "react"
import "./Menu.css"

export const Menu = () => {

    // we made a cart object for local storage, so each user gets a cart as soon as they login
    // see Login.js for more context if needed 

    const localCart = localStorage.getItem("cart")
    const hotcakesCartObject = JSON.parse(localCart)

    // got a initial state variable to render the menu form, which has radio buttons to let users to make their choices
    // we're fetching the menu items to display for the user when they see the form

    // then when the user starts clicking the radio buttons, the state is changing
    // so using the onChange event listener, see below in form, we're copying the initial state and modifying it 

    const [menuItems, setMenuItems] = useState([])

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

    // next, save the user's choices to permanent state though... 
    // do this by using a POST request to store the user's choices to the API
    // *** reminder, goal is to have the order or what the user submitted appear on the cart page 
    // we have a join table in our ERD to make this work 
    // "menuItemChoices" holds the user's choices
    // must send to "menuOrders" table (id, menuItemId, and cartId)  
    // so to make sure the menuItem info is carried over, we need to fetch on this and expand into menuOrders
    // *** lets you add more than once item from the same menu to the cart; click cart button each time after making a choice 

    const [menuItemChoices, setMenuItemChoices] = useState({})

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const menuChoicesToSendToAPI = {
            id: menuItemChoices.id,
            menuItemId: menuItemChoices.menuItemId,
            cartId: hotcakesCartObject.cartId,
        }

        return fetch(`http://localhost:8088/menuOrders?_expand=menuItem=${menuItemChoices.id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(menuChoicesToSendToAPI)
        })
            .then(response => response.json())
            .then(() => { })
    }

    return <>

        <form className="classic_menu">
            <h1 className="classic__title">Classic Menu</h1>
            <fieldset>
                <div className="classic-menu-form-group">

                    {menuItems.map(menuItem => {

                        return <>
                            <div className="classic_menu_label_and_input_container">
                                <input
                                    required autoFocus
                                    className="form-control"
                                    id="menu-form-control"
                                    key={`menu_choice--${menuItem.id}`}
                                    type="radio"
                                    name="classic_menu_item"
                                    value={menuItem.id}
                                    onChange={
                                        (evt) => {
                                            const copy = { ...setMenuItemChoices }
                                            copy.menuItemId = parseInt(evt.target.value)
                                            setMenuItemChoices(copy)
                                        }}
                                />
                                <label htmlFor="classic menu">{menuItem.name}, ${menuItem.price.toFixed(2)}</label>
                            </div>
                        </>
                    })}
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary" id="classic-menu-cart-button">
                Add to cart
            </button>
        </form>
    </>
}

