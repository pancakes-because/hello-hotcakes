import { useEffect, useState } from "react"
import "./Menu.css"

/* this component creates the classic menu form */
/* the component has it's own style sheet, "Menu.css", although there are some global styles that it inherits from Hotcakes.css */

export const Menu = () => {

    // we made a cart object for local storage, so each user gets a "cart" as soon as they login
    // ultimately, the cart is what will hold and display the user's choies from the menu 
    // see Login.js for more context if needed 

    const localCart = localStorage.getItem("cart")
    const hotcakesCartObject = JSON.parse(localCart)

    // got a initial state variable to render the menu form, which has radio buttons to let users to make their choices
    // we have an array of objects called "menuItems". each object is an menu item that a user can choose. 
    // we're fetching the objects from the "menuItems" array in the API/database and displaying them for the user on the page 
    // we're looping through each menuItem object using .map and displaying each one's name and price as a radio button option

    // when the user clicks the radio buttons, the state is changing
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

     // when the user has clicked the "add to cart" button, a feedback message appears to confirm this was successful 

    const [feedback, setFeedback] = useState("")

    useEffect(() => {
        if (feedback !== "") {
            // Clear feedback to make entire element disappear after 3 seconds
            setTimeout(() => setFeedback(""), 3000);
        }
    }, [feedback])

    // next, save the user's choices to permanent state though... 
    // do this by using a POST request to store the user's choices in the API/database 
    // *** reminder, goal is to have the order or what the user submitted appear on the cart page 
    // i have a join table in my ERD to make this work 

    // "menuItemChoices" holds the data for which radio buttons the user clicked 
    // send to "menuOrders" table (id, menuItemId, and cartId), which will be fetched from later to display on the cart page
    // for now, to make sure the menuItem info is carried over, we need to FETCH on this and EXPAND into menuOrders
    // *** lets you add more than once item from the same menu to the cart; click cart button each time after making a choice 

    // the user selects an item from the menu by cliking and filling in a radio button
    // when they click the "add to cart" button, their choices are POSTED to the API/database for later reference 
    // the hanleSaveButtonClick function and POST method are handling this piece 

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
            .then(() => {
                setFeedback("Your order has been added to your cart!")
            })
    }

    // the jsx renders the menu form for the user on the page
    // once the user has clicked the "add to cart" button, a feedback message appears and confirms this. 

    return <>

        <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
            {feedback}
        </div>

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
                Add To Cart
            </button>
        </form>
    </>
}

