
import { useEffect, useState } from "react"

export const SecretMenu = () => {

    // we made a cart object for local storage, so each user gets a cart as soon as they login
    // see Login.js for more context if needed 

    const localCart = localStorage.getItem("cart")
    const hotcakesCartObject  = JSON.parse(localCart)

    // got a initial state variable to render the secret menu form, which has radio buttons to let users to make their choices
    // we're fetching the sercret menu items to display for the user when they see the form

    // then when the user starts clicking the radio buttons, the state is changing
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

    // next, save the user's choices to permanent state though... 
    // do this by using a POST request to store the user's choices to the API
    // *** reminder, goal is to have the order or what the user submitted appear on the cart page 
    // we have a join table in our ERD to make this work 
    // "secretMenuItemChoices" holds the user's choices
    // must send to "secretMenuOrders" table (id, secretMenuItemId, and cartId)  
    // so to make sure the secretMenuItem info is carried over, we need to fetch on this and expand into menuOrders
    // *** lets you add more than once item from the same menu to the cart; click cart button each time after making a choice 

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
                .then(() => {})
    } 

    return <>

    <form className="secret_menu">
        <h2 className="secret__title">Secret Menu</h2>
        <fieldset>
            <div className="form-group">

                {secretMenuItems.map(secretMenuItem => {

            return <> <label htmlFor="secret menu">{secretMenuItem.name}, ${secretMenuItem.price.toFixed(2)}</label>
                <input
                    required autoFocus
                    className="form-control"
                    key={`secret_menu_choice--${secretMenuItem.id}`}
                    type="radio"
                    name="secret_menu_item"
                    value={secretMenuItem.id} 
                    onChange={
                        (evt) => {
                            const copy = { ...setSecretMenuItemChoices }
                            copy.secretMenuItemId= parseInt(evt.target.value) 
                            setSecretMenuItemChoices(copy)
                        }} 
                    />  
                    </> })  
                } </div>
    </fieldset>
    <button
        onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
        className="btn btn-primary">
        Add to cart
    </button>
</form>
</>
}




