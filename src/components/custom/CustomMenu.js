
import { useEffect, useState } from "react"
import "./CustomMenu.css"

/* this component creates the custom menu form */
/* the component has it's own style sheet, "CustomMenu.css", although there are some global styles that it inherits from Hotcakes.css */

export const CustomMenu = () => {

    // we made a cart object for local storage, so each user gets a "cart" as soon as they login
    // ultimately, the cart is what will hold and display the user's choies from the menu 
    // see Login.js for more context if needed 

    const localCart = localStorage.getItem("cart")
    const hotcakesCartObject = JSON.parse(localCart)

    // got initial state variables to render the custom menu form and display batter, filling, stack size, and topping items 
    // these items are what the user can choose from on the form 
    // when the user starts clicking the radio buttons, the state is changing
    // so using the onChange event listeners, see below in form, we're copying the initial state and modifying it 

    const [customMenuItemBatters, setCustomMenuItemBatters] = useState([])

    const [customMenuItemFillings, setCustomMenuItemFillings] = useState([])

    const [customMenuItemStackSizes, setCustomMenuItemStackSizes] = useState([])

    const [customMenuItemToppings, setCustomMenuItemToppings] = useState([])

    // this state variable is recording the user's choices for each batter, filling, topping, and stack size choice they made
    // toppingOrderId is not being utilized right now. will be needed if we want users to add multiple toppings per one order. 

    const [customMenuItemChoices, setCustomMenuItemChoices] = useState({

        batterId: 0,
        fillingId: 0,
        // toppingOrderId: 0,
        toppingId: 0,
        stackSizeId: 0

    })

    // we are using 4 separate arrays containing various objects to render each select input field for the user to interact with
    // have a separate fetch request for batters, fillings, toppings, and stack sizes 
    // these will fetch all of custom item information for batters, toppings, fillings, and stack sizes
    // this will help render that information for the user to see immediately and pick from 

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

    // when the user has clicked the "add to cart" button, a feedback message appears to confirm this was successful 
    // this will be after everything has been posted to the API 

    const [customFeedback, setCustomFeedback] = useState("")

    useEffect(() => {
        if (customFeedback !== "") {
            // Clear feedback to make entire element disappear after 4 seconds
            setTimeout(() => setCustomFeedback(""), 4000);
        }
    }, [customFeedback])


    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const customMenuChoicesToSendToAPI = {
            id: customMenuItemChoices.id,
            customMenuItemId: customMenuItemChoices.customMenuItemId,
            cartId: hotcakesCartObject.cartId
        }

        // based on how the data is organized, we have to post to customMenuItems first 
        // then, we post the information in customMenuItems to customMenuOrders next 
        // basically, once everything has loaded and there is an id, we move everyting held in customMenuItems to customMenuOrders
        // this lets us get this data in the cart later (using fetch requests and the _expand method in the cart component)
        // reminder, the feedback message displays once the "add to cart" button has been clicked and data has been sent to the API


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
            .then(() => {
                setCustomFeedback("order added to cart!")
            })
    }

    // we rendering the custom menu form in the jsx below 
    // we're looping through the objects in the arrays for batters, fillings, toppings, and stack sizes 
    // a select drop-down menu is created for each category, and the names and prices of each object are shown as options

    /* RECAP */ 
    // we created initial state 
    // we fetched the data to store in state 
    // we created the input fields, and iterated the data we got back in state
    // we are now tracking the choice of the batter, filling, topping, and stack size the user has selected
    // we have a feedback message to let the user know they successfully added what they chose to the cart 

    return <>

        <div className={`${customFeedback.includes("customError") ? "customError" : "customFeedback"} ${customFeedback === "" ? "customInvisible" : "customVisible"}`}>
            {customFeedback}
        </div>

        <form className="custom_menu">
            <div className="custom_title_and_tagline_container">
                <h1 className="custom__title">Custom Menu</h1>
                <p className="custom_instructions">Build your own stack of pancakes!</p>
            </div>

            <div className="form_fields_container">
                <div className="custom_label_and_input_container">
                    <h3 className="custom_label_batters">Batters:</h3>
                    <fieldset id="custom-menu-input">
                        <div className="custom-menu-form-group">
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

                <div className="custom_label_and_input_container">
                    <h3 className="custom_label_fillings">Fillings:</h3>
                    <fieldset>
                        <div className="custom-menu-form-group">
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

                <div className="custom_label_and_input_container">
                    <h3 className="custom_label_toppings">Toppings:</h3>
                    <fieldset>
                        <div className="custom-menu-form-group">
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

                <div className="custom_label_and_input_container">
                    <h3 className="custom_label_stack_sizes">Stack Sizes:</h3>
                    <fieldset>
                        <div className="custom-menu-form-group">
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
            </div>

            <button
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary" id="custom-menu-cart-button">
                Add To Cart
            </button>
        </form>
    </>
}
