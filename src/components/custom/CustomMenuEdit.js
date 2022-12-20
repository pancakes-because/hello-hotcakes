// on the cart page, the user should be able to cilck the "edit order" button 
// after they do, they should be taken to a page that looks like the menu form 
// the options the user chose when filling out the form originally should be clearly marked

// *** This component is to EDIT the user's selections later in the cart *** 
// *** remember to change the URL in the PUT fetch request to target a specific thing 
// have this target an id like http://localhost:8088/menuOrders/${menuOrder.id}

import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import "./CustomMenu.css"

export const CustomMenuEdit = () => {

    const localCart = localStorage.getItem("cart")
    const hotcakesCartObject = JSON.parse(localCart)

    // we have initial state variablesto render the menu form, which has radio buttons to let users to make their choices
    // we're fetching the objects from "menuItems" to display for the user when they see the form
    // then when the user starts clicking the radio buttons, the state is changing
    // so using the onChange event listener, see below in form, we're copying the initial state and modifying it 

    const [customMenuItemBatters, setCustomMenuItemBatters] = useState([])

    const [customMenuItemFillings, setCustomMenuItemFillings] = useState([])

    const [customMenuItemStackSizes, setCustomMenuItemStackSizes] = useState([])

    const [customMenuItemToppings, setCustomMenuItemToppings] = useState([])

    // this is to edit the user's selections later in the cart 
    // *** remember to change the URL in the PUT fetch request to target a specific thing 
    // have this target an id like http://localhost:8088/menuOrders/${menuOrder.id}

    const [customMenuItemChoices, setCustomMenuItemChoices] = useState({

        id: 0,
        batterId: 0,
        fillingId: 0,
        // toppingOrderId: 0,
        toppingId: 0,
        stackSizeId: 0

    })

    const { customMenuOrderId } = useParams()
    const navigate = useNavigate()

    // sets the choices that the user has to pick from initially 

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

    // editing what the user submitted before 
    // reaching out to the API  
    // looking for a specific order and letting us edit that 
    // with the json.stringify, telling the one element what it should look like 

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
                <div className="label_and_input_container">
                    <h3 className="custom_label">Batters</h3>
                    <fieldset>
                        <div className="form-group">
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

                <div className="label_and_input_container">
                    <h3 className="custom_label">Fillings</h3>
                    <fieldset>
                        <div className="form-group">
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

                <div className="label_and_input_container">
                    <h3 className="custom_label">Toppings</h3>
                    <fieldset>
                        <div className="form-group">
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

                <div className="label_and_input_container">
                    <h3 className="custom_label">Stack Sizes</h3>
                    <fieldset>
                        <div className="form-group">
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
                className="btn btn-primary">
                Save Edit
            </button>
        </form>
    </>
}