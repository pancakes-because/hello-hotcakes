
// batter, filling, stack size can be radio button or drop-down since you can only select one 
// topping piece, since you can choose more than one, store all of the ids of the toppings you have selected 

// then whenever i'm about to post all the individual toppings, iterate over the array
// for every iteration, post wit the custom order Id and each individual order Id from the table 
// i'll have an array with the toppings in it for each topping
// topping.array.map --> just json.stringify it? 

// recap 
// created state 
// fetched the data to store in state 
// created the input field, iterated the data we got back in state

// we are now tracking the choice of the batter we have selected
// do the same exact thing for filling and stack size 


import { useEffect, useState } from "react"

export const CustomMenu = () => {

    const [customMenuItemsBatters, setCustomMenuItemsBatters] = useState([])

    const [customMenuItemsFillings, setCustomMenuItemsFillings] = useState([])

    const [customMenuItemsStackSizes, setCustomMenuItemsStackSizes] = useState([])

    const [customMenuItemsToppings, setCustomMenuItemsToppings] = useState([])

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


    return <>

        <form className="custom_menu">
            <h2 className="custom__title">Custom Menu</h2>

            <fieldset>
                <div className="form-group">
                    <select name="batters" id="batters"
                        onChange={
                            (evt) => {
                                const copy = { ...choices }
                                copy.batterId = parseInt(evt.target.value)
                                setChoices(copy)
                            }} >
                        <option value={0}>Choose pancake batter...</option>
                        {customMenuItemsBatters.map(customMenuItemsBatter => {
                            return <option value={customMenuItemsBatter.id}>{customMenuItemsBatter.name}, ${customMenuItemsBatter.price.toFixed(2)}</option>
                        })}
                    </select> 
                </div>
            </fieldset> 

            <fieldset>
                <div className="form-group">
                    <select name="fillings" id="fillings"
                        onChange={
                            (evt) => {
                                const copy = { ...choices }
                                copy.batterId = parseInt(evt.target.value)
                                setChoices(copy)
                            }} >
                        <option value={0}>Choose pancake filling...</option>
                        {customMenuItemsFillings.map(customMenuItemsFilling => {
                            return <option value={customMenuItemsFilling.id}>{customMenuItemsFilling.name}, ${customMenuItemsFilling.price.toFixed(2)}</option>
                        })}
                    </select> 
                </div>
            </fieldset> 

            <fieldset>
                <div className="form-group">
                    <select name="stack_sizes" id="stack_sizes"
                        onChange={
                            (evt) => {
                                const copy = { ...choices }
                                copy.batterId = parseInt(evt.target.value)
                                setChoices(copy)
                            }} >
                        <option value={0}>Choose number of pancakes...</option>
                        {customMenuItemsStackSizes.map(customMenuItemsStackSize => {
                            return <option value={customMenuItemsStackSize.id}>{customMenuItemsStackSize.stackSize}, ${customMenuItemsStackSize.price.toFixed(2)}</option>
                        })}
                    </select> 
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