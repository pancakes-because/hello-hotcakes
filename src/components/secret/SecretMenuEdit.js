import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "./SecretMenu.css"

// *** This component is to EDIT the user's selections later in the cart ***  
// on the cart page, the user should be able to cilck the "edit order" button 
// after they do, they should be taken to a page that looks like the menu form 
// the options the user chose when filling out the form originally should be clearly marked

export const SecretMenuEdit = () => {

    // we have an initial state variable to render the secret menu form from SecretMenu.js,
    // we're fetching the objects from "secretMenuItems" to display for the user when they see the form
    // then when the user starts clicking the radio buttons, the state is changing
    // so using the onChange event listener, see below in form, we're copying the initial state and modifying it 

    const [secretMenuItems, setSecretMenuItems] = useState([])

    // this state variable is recording the user's choices

    const [secretMenuItemChoices, setSecretMenuItemChoices] = useState({
        id: 0,
        secretMenuItemId: 0,
        cartId: 0
    })

    // see GuestViews.js and MemberViews.js for more context on useParams()
    // makes it so that the edit URL is dynamic and changes as the values change 
    // the useNavigate() makes it so that the user is navigated back to the cart page after clicking the "save edits" button

    const { secretMenuOrderId } = useParams()
    const navigate = useNavigate()

    // we're fetching the secret menu items and the what the user chose before when they originally filled out the form 

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

    // here, we're editing the choices that the user submitted through the form before 
    // reaching out to the API, looking for a specific order, and letting the user edit that 
    // with the json.stringify piece, telling the one element what it should look like 

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

    // to get the user's chioces to autopopulate the form when editing, used a checked ternary statement 
    // if the id of what the user chose matches the id of the secret menu item, it highlights/fills in that radio input field 
    // it goes through each option and does this "check" to see what should be marked 

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
                className="btn btn-primary" id="secret-menu-save-button">
                Save Edit
            </button>
        </form>
    </>
}
