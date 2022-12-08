
// batter, filling, stack size can be radio button or drop-down since you can only select one 
// topping piece, since you can choose more than one, store all of the ids of the toppings you have selected
// then whenever i'm about to post all the individual toppings, iterate over the array
// for every iteration, post wit the custom order Id and each individual order Id from the table 
// i'll have an array with the toppings in it for each topping
// topping.array.map --> 


import { useEffect, useState } from "react"

export const CustomMenu = () => {

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

    const [customMenuItemsBatters, setCustomMenuItemsBatters] = useState([])

    const [customMenuItemsFillings, setCustomMenuItemsFillings] = useState([])

    const [customMenuItemsToppings, setCustomMenuItemsToppings] = useState([])

    const [customMenuItemsStackSizes, setCustomMenuItemsStackSizes] = useState([])

    // we have a place to store our choices here with state below 

    const [choices, setChoices] = useState({

        batterId: 0,
        fillingId: 0,
        toppingOrderId: 0,
        stackSizeId: 0

    })

    useEffect(
        () => {
            fetch(`http://localhost:8088/batters`)
                .then(response => response.json())
                .then((customMenuItemsArray) => {
                    setCustomMenuItemsBatters(customMenuItemsArray)
                })

            fetch(`http://localhost:8088/fillings`)
                .then(response => response.json())
                .then((customMenuItemsArray) => {
                    setCustomMenuItemsFillings(customMenuItemsArray)
                })

            fetch(`http://localhost:8088/toppings`)
                .then(response => response.json())
                .then((customMenuItemsArray) => {
                    setCustomMenuItemsToppings(customMenuItemsArray)
                })

            fetch(`http://localhost:8088/stackSizes`)
                .then(response => response.json())
                .then((customMenuItemsArray) => {
                    setCustomMenuItemsStackSizes(customMenuItemsArray)
                })
        },
        []
    )

    // const handleSaveButtonClick = (event) => {
    //     event.preventDefault()

    /*
        TODO: Perform the PUT or POST fetch() call here to add to cart? 

    */


    // created state 
    // fetched the data to store in state 
    // created the input field, iterated the data we got back in state

    // we are now tracking the choice of the batter we have selected
    // do the same exact thing for filling and stack size 

    return <>

        <form className="classic_menu">
            <h2 className="classic__title">Custom Menu</h2>
            <fieldset>
                <div className="form-group">

                    <select name="cars" id="cars"
                        onChange={
                            (evt) => {
                                const copy = { ...choices }
                                copy.batterId = parseInt(evt.target.value)
                                setChoices(copy)
                            }} >
                        <option value={0}>Please select batter...</option>
                        {customMenuItemsBatters.map(customMenuItemsBatter => {
                            return <option value={customMenuItemsBatter.id}>{customMenuItemsBatter.name} {customMenuItemsBatter.price}</option>
                        })}
                    </select>

                    {/* {menuItemChoices.map(menuItemChoice => {

                return <> <label htmlFor="classic menu">{menuItemChoice.name}{menuItemChoice.price}</label>
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
                    }  */}
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