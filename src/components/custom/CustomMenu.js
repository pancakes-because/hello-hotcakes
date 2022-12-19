
// RECAP
// created state 
// fetched the data to store in state 
// created the input field, iterated the data we got back in state
// we are now tracking the choice of the batter we have selected

import { useEffect, useState } from "react"
import "./CustomMenu.css"

export const CustomMenu = () => {

    // we made a cart object for local storage, so each user gets a cart as soon as they login
    // see Login.js for more context if needed 

    const localCart = localStorage.getItem("cart")
    const hotcakesCartObject = JSON.parse(localCart)

    // got initial state variables to render the secret menu form, which is comprised of 4 fields/data tables 
    // got a separate fetch request for  batters, fillings, toppings, and stack sizes - so 4 fetch requests
    // this will fetch all of that information, so the user sees it immediately 

    // when the user starts clicking the radio buttons, the state is changing
    // so using the onChange event listeners, see below in form, we're copying the initial state and modifying it 

    const [customMenuItemBatters, setCustomMenuItemBatters] = useState([])

    const [customMenuItemFillings, setCustomMenuItemFillings] = useState([])

    const [customMenuItemStackSizes, setCustomMenuItemStackSizes] = useState([])

    const [customMenuItemToppings, setCustomMenuItemToppings] = useState([])

    // this state variable is recording the user's choices for each batter, filling, topping, and stack size choice they made

    const [customMenuItemChoices, setCustomMenuItemChoices] = useState({

        batterId: 0,
        fillingId: 0,
        // toppingOrderId: 0,
        toppingId: 0,
        stackSizeId: 0

    })

    useEffect(
        () => {
            fetch(`http://localhost:8088/batters`)
                .then(response => response.json())
                .then((customMenuItemArray) => {
                    setCustomMenuItemBatters(customMenuItemArray)
                })

            fetch(`http://localhost:8088/fillings`)
                .then(response => response.json())
                .then((customMenuItemArray) => {
                    setCustomMenuItemFillings(customMenuItemArray)
                })

            fetch(`http://localhost:8088/toppings`)
                .then(response => response.json())
                .then((customMenuItemArray) => {
                    setCustomMenuItemToppings(customMenuItemArray)
                })

            fetch(`http://localhost:8088/stackSizes`)
                .then(response => response.json())
                .then((customMenuItemArray) => {
                    setCustomMenuItemStackSizes(customMenuItemArray)
                })
        },
        []
    )

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const customMenuChoicesToSendToAPI = {
            id: customMenuItemChoices.id,
            customMenuItemId: customMenuItemChoices.customMenuItemId,
            cartId: hotcakesCartObject.cartId
        }

        // based on the data, we have to post to customMenuItems first 
        // then, we post the information in customMenuItems to customMenuOrders next 
        // this sets us up to get this data on in the cart by expanding on both data tables 

        return fetch(`http://localhost:8088/customMenuItems`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(customMenuItemChoices)
        })
            .then(response => response.json())
            .then((res) => {

                if (res.hasOwnProperty("id")) {

                    fetch(`http://localhost:8088/customMenuOrders`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            customMenuItemId: res.id,
                            cartId: hotcakesCartObject.cartId
                        })
                    })
                }
            })
    }

    return <>

        <form className="custom_menu">

            <div className="custom_title_and_tagline_container">
                <h1 className="custom__title">Custom Menu</h1>
                <p>Build your own stack of pancakes!</p>
            </div>

            <div className="label_and_input_container">
                <h3 className="custom_batters_label">Batters</h3>
                <fieldset>
                    <div className="form-group">
                        <select name="batters" id="batters"
                            onChange={
                                (evt) => {
                                    const copy = { ...customMenuItemChoices }
                                    copy.batterId = parseInt(evt.target.value)
                                    setCustomMenuItemChoices(copy)
                                }} >
                            <option key={0} value={0}>Choose pancake batter...</option>
                            {customMenuItemBatters.map(customMenuItemBatter => {
                                return <option key={customMenuItemBatter.id} value={customMenuItemBatter.id}>{customMenuItemBatter.name}, ${customMenuItemBatter.price.toFixed(2)}</option>
                            })}
                        </select>
                    </div>
                </fieldset>
            </div>

            <div className="label_and_input_container">
                <h3 className="custom_fillings_label">Fillings</h3>
                <fieldset>
                    <div className="form-group">
                        <select name="fillings" id="fillings"
                            onChange={
                                (evt) => {
                                    const copy = { ...customMenuItemChoices }
                                    copy.fillingId = parseInt(evt.target.value)
                                    setCustomMenuItemChoices(copy)
                                }} >
                            <option key={0} value={0}>Choose pancake filling...</option>
                            {customMenuItemFillings.map(customMenuItemFilling => {
                                return <option key={customMenuItemFilling.id} value={customMenuItemFilling.id}>{customMenuItemFilling.name}, ${customMenuItemFilling.price.toFixed(2)}</option>
                            })}
                        </select>
                    </div>
                </fieldset>
            </div>

            {/* note, we're just letting users choose one topping per pancake order to help meet MVP fast */}
            {/* new stretch goal: make it so that more than one topping can be added to a pancake order  */}
            {/* use promise.all to make it so that you can have more than one topping for a custom pancake order  */}

            <div className="label_and_input_container">
                <h3 className="custom_toppings_label">Toppings</h3>
                <fieldset>
                    <div className="form-group">
                        <select name="toppings" id="toppings"
                            onChange={
                                (evt) => {
                                    const copy = { ...customMenuItemChoices }
                                    copy.toppingId = parseInt(evt.target.value)
                                    setCustomMenuItemChoices(copy)
                                }} >
                            <option key={0} value={0}>Choose pancake topping...</option>
                            {customMenuItemToppings.map(customMenuItemTopping => {
                                return <option key={customMenuItemTopping.id} value={customMenuItemTopping.id}>{customMenuItemTopping.name}, ${customMenuItemTopping.price.toFixed(2)}</option>
                            })}
                        </select>
                    </div>
                </fieldset>
            </div>

            <div className="label_and_input_container">
                <h3 className="custom_stack_sizes_label">Stack Sizes</h3>
                <fieldset>
                    <div className="form-group">
                        <select name="stack_sizes" id="stack_sizes"
                            onChange={
                                (evt) => {
                                    const copy = { ...customMenuItemChoices }
                                    copy.stackSizeId = parseInt(evt.target.value)
                                    setCustomMenuItemChoices(copy)
                                }} >
                            <option key={0} value={0}>Choose number of pancakes...</option>
                            {customMenuItemStackSizes.map(customMenuItemStackSize => {
                                return <option key={customMenuItemStackSize.id} value={customMenuItemStackSize.id}>{customMenuItemStackSize.stackSize}, ${customMenuItemStackSize.price.toFixed(2)}</option>
                            })}
                        </select>
                    </div>
                </fieldset>
            </div>

            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Add to cart
            </button>

        </form>
    </>
}
