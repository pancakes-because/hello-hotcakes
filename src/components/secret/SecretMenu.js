import { useEffect, useState } from "react"

// creating the secret menu forms with options to choose from 
// the "secretMenuItems" array holds my dishes, or objects 
// fetch this information from API to show it to the user first, so they can see what is available and choose

export const SecretMenu = () => {
    // TODO: Provide initial state for secretMenuItems 

    const [secretMenuItems, setSecretMenuItems] = useState([])


    // TODO: Get employee profile info from API and update state

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

    // const handleSaveButtonClick = () => {
    //     event.preventDefault()

        /*
            TODO: Perform the PUT fetch() call here to update the profile.
            Navigate user to home page when done.
        */

    return <>

        <form className="secret__menu">
            <h2 className="secret__title">Secret Menu</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="Please ">Specialty:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        // value={profile.specialty}
                        onChange={
                            (evt) => {
                                // TODO: Update specialty property
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

// could do .map and do radio button or drop down
// then button at the bottom for add to cart 

// finish secret form and regular form 
// then set up custom menu form module 
// then make custom menu form; then have the words show up (choose batter, topping, etc.)
// try to break down the logic; what id am i grabbing and where am i sending it 
// then hit up dakota or sydney and just tell them i need some guidance 
