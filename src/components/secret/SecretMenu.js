// GENERAL PLAN 

// do .map and do radio button or drop down
// then button at the bottom for add to cart 
// finish secret form and regular form 
// then set up custom menu form module 
// then make custom menu form; then have the words show up (choose batter, topping, etc.)
// try to break down the logic; what id am i grabbing and where am i sending it 
// then hit up dakota or sydney and just tell them i need some guidance 
// for total price calculation, make it a stretch goal, but should be doable 
// it will function a lot like kneel-diamonds  

// CODE PLAN FOR SECRET MENU 

// creating the secret menu forms with options to choose from 
// the "secretMenuItems" array holds the menu options, or objects 
// fetch the names of the menu items from the API 
// set this as initial state 
// use .map to create a radio button component for each item with their name and price shown

// ** note, PUT requests are for updating stuff that already exists while POST is for creating something new 
// the user will choose their pancake plates by clicking the radio buttons 
// ** don't worry about it now, but will have to edit this later -- create new useEffect and PUT request for this? 
// user will click the submit button, and that should POST 
// once the submit button has been clicked, 

// after the user has 
// need a post request here, because it should go back to the API to be recorded and reflected on the cart page. 
// maybe also need a if...else statement here to make the secretMenuItem.id === secretMenuItemOrder.secretMenuItemId
// maybe also need a way to utilize the cartID somewhere, so it can be added 

import { useEffect, useState } from "react"

export const SecretMenu = () => {

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

    /*
        TODO: Perform the PUT or POST fetch() call here to add to cart? 

    */


    return <>

        <form className="secret__menu">
            <h2 className="secret__title">Secret Menu</h2>
            <fieldset>
                <div className="form-group">

                    {secretMenuItemChoices.map(secretMenuItemChoice => {

                return <> <label htmlFor="secret menu">{secretMenuItemChoice.name}{secretMenuItemChoice.price}</label>
                    <input
                        required autoFocus
                        className="form-control"
                        type="radio"
                        key={`choice--${secretMenuItemChoice.id}`}
                        name="pancakes"
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


    // return <>

    //     <form className="secret__menu">
    //         <h2 className="secret__title">Secret Menu</h2>
    //         <fieldset>
    //             <div className="form-group">
    //                 <label htmlFor="secret menu">Please choose what you want to order:</label>
    //                 <input
    //                     required autoFocus
    //                     type="radio"
    //                     className="form-control"
    //                     // value={secretMenuItem.id}
    //                     onChange={
    //                         (evt) => {
    //                             // TODO: Update with user's choices
    //                         }
    //                     } />
    //             </div>
    //         </fieldset>
    //         <button
    //             // onClick={(clickEvent)} => handleSaveButtonClick{clickEvent}
    //             className="btn btn-primary">
    //             Add to cart
    //         </button>
    //     </form>
    // </> 

