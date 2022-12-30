
import { useEffect, useState } from "react"
import "./SecretMenu.css"

/* note: this component, which creates the "secret menu" form, works exactly like the " (classic) menu" component */
/* the component has it's own style sheet, "SecretMenu.css", although there are also some global styles that it inherits from Hotcakes.css */

export const SecretMenu = () => {

    // we made a cart object for local storage, so each user gets a "cart" as soon as they login
    // ultimately, the cart is what will hold and display the user's choies from the menu 
    // see Login.js for more context if needed 

    const localCart = localStorage.getItem("cart")
    const hotcakesCartObject = JSON.parse(localCart)

    // got a initial state variable to render the menu form, which has radio buttons to let users to make their choices
    // we have an array of objects called "secretMenuItems". each object is an menu item that a user can choose. 
    // we're fetching the objects from the "secretMenuItems" array in the API/database and displaying them for the user on the page 
    // we're looping through each secretMenuItem object using .map and displaying each one's name and price as a radio button option

    // when the user clicks the radio buttons, the state is changing
    // so using the onChange event listener, see below in form, we're copying the initial state and modifying it 

    const [secretMenuItems, setSecretMenuItems] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/secretMenuItems`)
                .then(response => response.json())
                .then((secretMenuItemsArray) => {
                    setSecretMenuItems(secretMenuItemsArray)
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
    // do this by using a POST request to store the user's choices to the API
    // *** reminder, goal is to have the order or what the user submitted appear on the cart page 
    // i have a join table in our ERD to make this work 

    // "secretMenuItemChoices" holds the user's choices
    // must send to "secretMenuOrders" table (id, secretMenuItemId, and cartId)  
    // so to make sure the secretMenuItem info is carried over, we need to FETCH on this and EXPAND into secretMenuOrders
    // *** lets you add more than once item from the same menu to the cart; click cart button each time after making a choice 

    // the user selects an item from the secret menu by cliking and filling in a radio button
    // when they click the "add to cart" button, their choices are POSTED to the API/database for later reference 
    // the hanleSaveButtonClick function and POST method are handling this piece 

    const [secretMenuItemChoices, setSecretMenuItemChoices] = useState({})

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const secretMenuChoicesToSendToAPI = {
            id: secretMenuItemChoices.id,
            secretMenuItemId: secretMenuItemChoices.secretMenuItemId,
            cartId: hotcakesCartObject.cartId,
        }

        return fetch(`http://localhost:8088/secretMenuOrders?_expand=secretMenuItem=${secretMenuItemChoices.id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(secretMenuChoicesToSendToAPI)
        })
            .then(response => response.json())
            .then(() => { })
            .then(() => {
                setFeedback(" ✨ Your order has been added to your cart! ")
            })
    }

    return <>

        <div className={`${feedback.includes("Error") ? "error" : "feedback"} ${feedback === "" ? "invisible" : "visible"}`}>
            {feedback}
        </div>

        <form className="secret_menu">
            <h1 className="secret__title">Secret Menu</h1>
            <fieldset>
                <div className="secret-menu-form-group">

                    {secretMenuItems.map(secretMenuItem => {

                        return <>
                            <div className="secret_menu_label_and_input_container">
                                <input
                                    required autoFocus
                                    className="form-control"
                                    id="secret-menu-form-control"
                                    key={`secret_menu_choice--${secretMenuItem.id}`}
                                    type="radio"
                                    name="secret_menu_item"
                                    value={secretMenuItem.id}
                                    onChange={
                                        (evt) => {
                                            const copy = { ...setSecretMenuItemChoices }
                                            copy.secretMenuItemId = parseInt(evt.target.value)
                                            setSecretMenuItemChoices(copy)
                                        }}
                                />
                                <label htmlFor="secret menu">{secretMenuItem.name}, ${secretMenuItem.price.toFixed(2)}</label>
                            </div>
                        </>
                    })}
                </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary" id="secret-menu-cart-button">
                Add To Cart
            </button>
        </form>
    </>
}




