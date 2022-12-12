
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


    return <>

        <form className="custom_menu">
            <h2 className="custom_title">Custom Menu</h2>


            <h3 className="custom_batters_field">Batters</h3>
            <fieldset>
                <div className="form-group">
                    <select name="batters" id="batters" 
                        onChange={
                            (evt) => {
                                const copy = { ...choices }
                                copy.batterId = parseInt(evt.target.value)
                                setChoices(copy)
                            }} >
                        <option key={0} value={0}>Choose pancake batter...</option> 
                        {customMenuItemsBatters.map(customMenuItemsBatter => { 
                            return <option key={customMenuItemsBatter.id} value={customMenuItemsBatter.id}>{customMenuItemsBatter.name}, ${customMenuItemsBatter.price.toFixed(2)}</option>
                        })}
                    </select> 
                </div>
            </fieldset> 

            <h3 className="custom_fillings_field">Fillings</h3>
            <fieldset>
                <div className="form-group">
                    <select name="fillings" id="fillings" 
                        onChange={
                            (evt) => {
                                const copy = { ...choices }
                                copy.fillingId = parseInt(evt.target.value)
                                setChoices(copy)
                            }} >
                        <option key={0} value={0}>Choose pancake filling...</option>
                        {customMenuItemsFillings.map(customMenuItemsFilling => {
                            return <option key={customMenuItemsFilling.id} value={customMenuItemsFilling.id}>{customMenuItemsFilling.name}, ${customMenuItemsFilling.price.toFixed(2)}</option>
                        })}
                    </select> 
                </div>
            </fieldset> 
            
            {/* note, we're just letting users choose one topping per pancake order to help meet MVP fast */}
            {/* new stretch goal: make it so that more than one topping can be added to a pancake order  */}
            {/* use promise.all to make it so that you can have more than one topping for a custom pancake order  */}
            
            <h3 className="custom_toppings_field">Toppings</h3>
            <fieldset>
                <div className="form-group">
                    <select name="toppings" id="toppings" 
                        onChange={
                            (evt) => {
                                const copy = { ...choices }
                                copy.toppingId = parseInt(evt.target.value)
                                setChoices(copy)
                            }} >
                        <option key={0} value={0}>Choose pancake topping...</option>
                        {customMenuItemsToppings.map(customMenuItemsTopping => {
                            return <option key={customMenuItemsTopping.id} value={customMenuItemsTopping.id}>{customMenuItemsTopping.name}, ${customMenuItemsTopping.price.toFixed(2)}</option>
                        })}
                    </select> 
                </div>
            </fieldset> 

            <h3 className="custom_stack_sizes_field">Stack Sizes</h3>
            <fieldset>
                <div className="form-group">
                    <select name="stack_sizes" id="stack_sizes" 
                        onChange={
                            (evt) => {
                                const copy = { ...choices }
                                copy.stackSizeId = parseInt(evt.target.value)
                                setChoices(copy)
                            }} >
                        <option key={0} value={0}>Choose number of pancakes...</option> 
                        {customMenuItemsStackSizes.map(customMenuItemsStackSize => { 
                            return <option key={customMenuItemsStackSize.id} value={customMenuItemsStackSize.id}>{customMenuItemsStackSize.stackSize}, ${customMenuItemsStackSize.price.toFixed(2)}</option>
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