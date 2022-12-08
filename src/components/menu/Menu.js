import { useEffect, useState } from "react"

export const Menu = () => {

    // const [secretMenuItems, setSecretMenuItems] = useState({
    //     name: "",
    //     price: 0,
    //     id: 0
    // })

    // useEffect(
    //     () => {
    //         fetch(`http://localhost:8088/secretMenuItems`)
    //             .then(response => response.json())
    //             .then((secretMenuItemsArray) => {
    //                 setSecretMenuItems(secretMenuItemsArray)
    //             })
    //     },
    //     []
    // )

    // both useEffects do the same thing right now, 

    // this is where the user's choices live 

    const [menuItemChoices, setMenuItemChoices] = useState([]) 

    useEffect(
        () => {
            fetch(`http://localhost:8088/menuItems`)
                .then(response => response.json())
                .then((menuItemsArray) => {
                    setMenuItemChoices(menuItemsArray)
                })
        },
        []
    )

    // const handleSaveButtonClick = (event) => {
    //     event.preventDefault()

    /*
        TODO: Perform the PUT or POST fetch() call here to add to cart? 

    */


    return <>

        <form className="classic_menu">
            <h2 className="classic__title">Secret Menu</h2>
            <fieldset>
                <div className="form-group">

                    {menuItemChoices.map(menuItemChoice => {

                return <> <label htmlFor="classic menu">{menuItemChoice.name}, ${menuItemChoice.price.toFixed(2)}</label>
                    <input
                        required autoFocus
                        className="form-control"
                        type="radio"
                        key={`choice--${menuItemChoice.id}`}
                        name="pancakes"
                        value={menuItemChoice.name}
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

