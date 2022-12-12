
import { useEffect, useState } from "react"

export const SecretMenu = () => {

    // this is where the user's choices live 

    const [secretMenuItemChoices, setSecretMenuItemChoices] = useState([]) 

    useEffect(
        () => {
            fetch(`http://localhost:8088/secretMenuItems`)
                .then(response => response.json())
                .then((secretMenuItemsArray) => {
                    setSecretMenuItemChoices(secretMenuItemsArray)
                })
        },
        []
    )

    // const handleSaveButtonClick = (event) => {
    //     event.preventDefault()


    return <>

        <form className="secret__menu">
            <h2 className="secret__title">Secret Menu</h2>
            <fieldset>
                <div className="form-group">

                    {secretMenuItemChoices.map(secretMenuItemChoice => {

                return <> <label htmlFor="secret menu">{secretMenuItemChoice.name}, ${secretMenuItemChoice.price.toFixed(2)}</label>
                    <input
                        required autoFocus
                        className="form-control"
                        key={secretMenuItemChoice.id}
                        type="radio"
                        name="secret_menu_item"
                        value={secretMenuItemChoice.name}
                        // onChange={
                        //     (evt) => {
                        //         // TODO: Update name and price properties with what user typed in
                        //            const copy = {...secretMenuItemChoices}
                        //            copy.name = evt.target.value
                        //            setSecretMenuItemChoice(copy)
                        // }} 
                        />  
                        </> })  
                    } </div>
        </fieldset>
        <button
            // onClick={}
            className="btn btn-primary">
            Add to cart
        </button>
    </form>
    </>
}


