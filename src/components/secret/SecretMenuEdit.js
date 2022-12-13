import { useEffect, useState } from "react"
// import "./SecretMenu.css" 

export const SecretMenuEdit = () => {

    // we have an initial state variable to render the menu form, which has radio buttons to let users to make their choices
    // we're fetching the objects from "menuItems" to display for the user when they see the form
    // then when the user starts clicking the radio buttons, the state is changing
    // so using the onChange event listener, see below in form, we're copying the initial state and modifying it 

    const [menuSecretItems, setSecretMenuItems] = useState({
        id: 0,
        name: "",
        price: 0
    })

    useEffect(
        () => {
            fetch(`http://localhost:8088/menuItems`)
                .then(response => response.json())
                .then((menuSecretItemsArray) => {
                    setMenuItems(menuSecretItemsArray)
                })
        },
        []
    )

    // this is to edit the user's selections later in the cart 
    // *** remember to change the URL in the PUT fetch request to target a specific thing 
    // have this target an id like http://localhost:8088/menuOrders/${menuOrder.id}

    const [secretMenuItemChoices, setSecretMenuItemChoices] = useState({
        id: 0,
        menuItemId: 0,
        cartId: 0
    })

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        return fetch(`http://localhost:8088/secretMenuOrders/${secretMenuOrder.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify
        })
            .then(response => response.json())
            .then((secretMenuOrdersArray) => {
                setMenuItems(secretMenuOrdersArray)
            })

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
                                        copy.secretMenuItemId = parseInt(evt.target.value)
                                        setSecretMenuItemChoices(copy)
                                    }}
                            />
                        </>
                    })
                    } </div>
            </fieldset>
            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Save
            </button>
        </form>
    </>
}
