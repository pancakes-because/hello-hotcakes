import { useEffect, useState } from "react"

// creating the secret menu forms with options to choose from 
// the "secretMenuItems" array holds the menu options, or objects 
// fetch the names of the menu items from the API 
// set this as initial state 
// use .map to create a radio button component for each item with their name and price shown

export const SecretMenu = ( {}) => {

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

    // const handleSaveButtonClick = (event) => {
    //     event.preventDefault()

        /*
            TODO: Perform the PUT fetch() call here to update the profile.
            Navigate user to home page when done.
        */

    // const options = 

    // return <> 

    //     <form className="secret__menu">
    //         <h2 className="secret__title">Secret Menu</h2>
    //         <fieldset>
    //             <div className="form-group"> 

    //             secretMenuItems.map(secretMenuItem => ( 
                    
    //                 <label htmlFor="secret menu">{secretMenuItem.name}{secretMenuItem.price}</label>
    //                 <input
    //                     required autoFocus
    //                     className="form-control"
    //                     type="radio"
    //                     key={`choice--${secretMenuItem.id}`}
    //                     name={secretMenuItem.name}
    //                     price={secretMenuItem.price}
    //                     onChange={
    //                         (evt) => {
    //                             // TODO: Update specialty property
    //                         }
    //                     } />
    //             </div>
    //             ))
    //         </fieldset>
    //         <button
    //             // onClick={}
    //             className="btn btn-primary">
    //             Add to cart 
    //         </button>
    //     </form>
    // </> 

    return <> 

        <form className="secret__menu">
            <h2 className="secret__title">Secret Menu</h2>
            <fieldset>
                <div className="form-group"> 
                    <label htmlFor="secret menu">Please choose what you want to order:</label>
                    <input
                        required autoFocus
                        type="radio"
                        className="form-control"
                        // value={secretMenuItem.id}
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


// do .map and do radio button or drop down
// then button at the bottom for add to cart 
// finish secret form and regular form 
// then set up custom menu form module 
// then make custom menu form; then have the words show up (choose batter, topping, etc.)
// try to break down the logic; what id am i grabbing and where am i sending it 
// then hit up dakota or sydney and just tell them i need some guidance 
// for total price calculation, make it a stretch goal, but should be doable 
// it will function a lot like kneel-diamonds  