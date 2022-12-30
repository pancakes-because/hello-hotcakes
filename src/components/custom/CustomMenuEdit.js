
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "./CustomMenu.css"

// *** This component is to EDIT the user's selections for custom menu form later in the cart *** 
// on the cart page, the user should be able to cilck the "edit order" button 
// after they do, they should be taken to a page that looks like the menu form 
// the options the user chose when filling out the form originally should be clearly marked

export const CustomMenuEdit = () => {

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

        id: 0,
        batterId: 0,
        fillingId: 0,
        // toppingOrderId: 0,
        toppingId: 0,
        stackSizeId: 0

    })

    // see GuestViews.js and MemberViews.js for more context on useParams()
    // makes it so that the edit URL is dynamic and changes as the values change 
    // the useNavigate() makes it so that the user is navigated back to the cart page after clicking the "save edits" button

    const { customMenuOrderId } = useParams()
    const navigate = useNavigate()

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

    useEffect(
        () => {
            fetch(`http://localhost:8088/customMenuItems?id=${customMenuOrderId}`)
                .then(response => response.json())
                .then(specificOrder => {
                    console.log(specificOrder)
                    setCustomMenuItemChoices(specificOrder[0])
                })
        },
        []
    )

    // here, we're editing the choices that the user submitted through the form before 
    // reaching out to the API, looking for a specific order, and letting the user edit that 
    // with the json.stringify piece, telling the one element what it should look like 
    // the "value" utilizes the state holding the user's choices, and lets us show the user what they selected previously 

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        return fetch(`http://localhost:8088/customMenuItems/${customMenuOrderId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(customMenuItemChoices)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/cart")
            })

    }

    {/* note, we're just letting users choose one topping per pancake order to help meet MVP fast */ }
    {/* new stretch goal: make it so that more than one topping can be added to a pancake order  */ }
    {/* use promise.all to make it so that you can have more than one topping for a custom pancake order */ }

    return <>

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
                            <select name="batters" id="batters" value={customMenuItemChoices.batterId}
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
                            <select name="fillings" id="fillings" value={customMenuItemChoices.fillingId}
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

                <div className="custom_label_and_input_container">
                    <h3 className="custom_label_toppings">Toppings:</h3>
                    <fieldset>
                        <div className="custom-menu-form-group">
                            <select name="toppings" id="toppings" value={customMenuItemChoices.toppingId}
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
                            <select name="stack_sizes" id="stack_sizes" value={customMenuItemChoices.stackSizeId}
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
                className="btn btn-primary" id="custom-menu-save-button">
                Save Edit
            </button>
        </form>
    </>
}