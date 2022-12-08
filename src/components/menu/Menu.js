import { useEffect, useState } from "react"

export const Menu = ( {}) => {

    const [menu, setMenuItems] = useState([])

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

    return <> 

        <form className="menu">
            <h2 className="menu__title">Classic Menu</h2>
            <fieldset>
                <div className="form-group"> 
                    <label htmlFor="menu menu">Please choose what you want to order:</label>
                    <input
                        required autoFocus
                        type="radio"
                        className="form-control"
                        // value={menuItem.id}
                        onChange={
                            (evt) => {
                                // TODO: Update with user's choices 
                            }
                        } />
                </div>
            </fieldset>
            <button
                // onClick={}
                className="btn btn-primary">
                Add to cart 
            </button>
        </form>
    </> 
}
