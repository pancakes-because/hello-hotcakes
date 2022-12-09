import { useEffect, useState } from "react"

export const Menu = () => {

    // we have an initial state variable to render the menu form, which has radio buttons to let users to make their choices
    // we're fetching the menu items to display for the user when they see the form
    // then when the user starts clicking the radio buttons, the state is changing
    // so using the onChange event listener, we're copying the initial state and modifying it 

    const [menuItems, setMenuItems] = useState([]) 

    useEffect(
        () => {
            fetch(`http://localhost:8088/secretMenuItems`)
                .then(response => response.json())
                .then((menuItemsArray) => {
                    setMenuItems(menuItemsArray)
                })
        },
        []
    ) 

    const [menuItemChoices, setMenuItemChoices] = useState({
        name: ""
    }) 

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

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
            Add to cart
        </button>
    </form>
    </>
}

