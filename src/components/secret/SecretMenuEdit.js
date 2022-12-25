import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "./SecretMenu.css"  

export const SecretMenuEdit = () => {

    // we have an initial state variable to render the menu form, which has radio buttons to let users to make their choices
    // we're fetching the objects from "menuItems" to display for the user when they see the form
    // then when the user starts clicking the radio buttons, the state is changing
    // so using the onChange event listener, see below in form, we're copying the initial state and modifying it 

    const [secretMenuItems, setSecretMenuItems] = useState([])

    // this is to edit the user's selections later in the cart 
    // *** remember to change the URL in the PUT fetch request to target a specific thing 
    // have this target an id like http://localhost:8088/menuOrders/${menuOrder.id}

    const [secretMenuItemChoices, setSecretMenuItemChoices] = useState({
        id: 0,
        secretMenuItemId: 0,
        cartId: 0
    })

    const { secretMenuOrderId } = useParams()
    const navigate = useNavigate()

    useEffect(
        () => {
            fetch(`http://localhost:8088/secretMenuOrders?id=${secretMenuOrderId}`)
                .then(response => response.json())
                .then((data) => {
                    setSecretMenuItemChoices(data[0])
                })
        },
        []
    )

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

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        return fetch(`http://localhost:8088/secretMenuOrders/${secretMenuItemChoices.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(secretMenuItemChoices)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/cart")
            })
    }


    return <>

        <form className="secret_menu">
            <h2 className="secret__title">Secret Menu</h2>
            <fieldset>
                <div className="secret-menu-form-group">

                    {secretMenuItems.map(secretMenuItem => {

                        return <>
                            <div className="secret_menu_label_and_input_container">
                                <input
                                    checked={secretMenuItemChoices.secretMenuItemId === secretMenuItem.id ? true : false}
                                    required autoFocus
                                    className="form-control"
                                    id="secret-menu-form-control"
                                    key={`secret_menu_choice--${secretMenuItem.id}`}
                                    type="radio"
                                    name="secret_menu_item"
                                    value={secretMenuItem.id}
                                    onChange={
                                        (evt) => {
                                            const copy = { ...secretMenuItemChoices }
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
                Save Edit
            </button>
        </form>
    </>
}
