
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "./Menu.css" 

// *** This component is to EDIT the user's selections later in the cart ***  
// on the cart page, the user should be able to cilck the "edit order" button 
// after they do, they should be taken to a page that looks like the menu form 
// the options the user chose when filling out the form originally should be clearly marked

export const MenuEdit = () => {

    // we have an initial state variable to render the menu form, which has radio buttons to let users to make their choices
    // we're fetching the objects from "menuItems" to display for the user when they see the form
    // then when the user starts clicking the radio buttons, the state is changing
    // so using the onChange event listener, see below in form, we're copying the initial state and modifying it 

    const [menuItems, setMenuItems] = useState([])

    // this state variable is recording the user's choices
  
    const [menuItemChoices, setMenuItemChoices] = useState({
        id: 0,
        menuItemId: 0,
        cartId: 0
    })

    // see GuestViews.js and MemberViews.js for more context on useParams()
    // makes it so that the edit URL is dynamic and changes as the values change 
    // the useNavigate() makes it so that the user is navigated back to the cart page after clicking the "save edits" button

    const { menuOrderId } = useParams()
    const navigate = useNavigate()

    // we're fetching the menu items and the what the user chose before when they originally filled out the form 

    useEffect(
        () => {
            fetch(`http://localhost:8088/menuOrders?id=${menuOrderId}`)
                .then(response => response.json())
                .then((data) => {
                    setMenuItemChoices(data[0])
                })
        },
        []
    )

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

    // here, we're editing the choices that the user submitted through the form before 
    // reaching out to the API, looking for a specific order, and letting the user edit that 
    // with the json.stringify piece, telling the one element what it should look like 

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        return fetch(`http://localhost:8088/menuOrders/${menuItemChoices.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(menuItemChoices)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/cart")
            })

    }

    // to get the user's chioces to autopopulate the form when editing, used a checked ternary statement 
    // if the id of what the user chose matches the id of the menu item, it highlights/fills in that radio input field 
    // it goes through each option and does this "check" to see what should be marked 

    return <>

        <form className="classic_menu">
            <h2 className="classic__title">Classic Menu</h2>
            <fieldset>
                <div className="classic-menu-form-group">

                    {menuItems.map(menuItem => {

                        return <>
                            <div className="classic_menu_label_and_input_container">
                                <input
                                    checked={menuItemChoices.menuItemId === menuItem.id ? true : false}
                                    required autoFocus
                                    className="form-control"
                                    id="menu-form-control"
                                    key={`menu_choice--${menuItem.id}`}
                                    type="radio"
                                    name="classic_menu_item"
                                    value={menuItem.id}
                                    onChange={
                                        (evt) => {
                                            const copy = { ...menuItemChoices }
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
                className="btn btn-primary" id="classic-menu-save-button">
                Save Edit
            </button>
        </form>
    </>
}

