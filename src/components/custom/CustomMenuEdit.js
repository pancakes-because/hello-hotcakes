// on the cart page, the user should be able to cilck the "edit order" button 
// after they do, they should be taken to a page that looks like the menu form 
// the options the user chose when filling out the form originally should be clearly marked

// *** This component is to EDIT the user's selections later in the cart *** 
// *** remember to change the URL in the PUT fetch request to target a specific thing 
// have this target an id like http://localhost:8088/menuOrders/${menuOrder.id}

import { useEffect, useState } from "react"
// import "./CustomMenu.css" 

export const CustomMenuEdit = () => {

    // we have an initial state variable to render the menu form, which has radio buttons to let users to make their choices
    // we're fetching the objects from "menuItems" to display for the user when they see the form
    // then when the user starts clicking the radio buttons, the state is changing
    // so using the onChange event listener, see below in form, we're copying the initial state and modifying it 

    // const [menuCustomItems, setCustomMenuItems] = useState({
    //     id: 0,
    //     name: "",
    //     price: 0
    // })

    // useEffect(
    //     () => {
    //         fetch(`http://localhost:8088/customMenuOrders?_expand=customMenuItem=${customMenuItemChoices.id}`)
    //             .then(response => response.json())
    //             .then((data) => {
    //                 setcustomMenuChoices(data)
    //             })
    //     },
    //     []
    // )

    // this is to edit the user's selections later in the cart 
    // *** remember to change the URL in the PUT fetch request to target a specific thing 
    // have this target an id like http://localhost:8088/menuOrders/${menuOrder.id}

    // const { menuOrderId } = useParams()
    // const navigate = useNavigate()

    // const [customMenuItemChoices, setCustomMenuItemChoices] = useState({
    //     id: 0,
    //     customMenuItemId: 0,
    //     cartId: 0
    // })

    // const handleSaveButtonClick = (event) => {
    //     event.preventDefault()

    //     return fetch(`http://localhost:8088/customMenuOrders/${customMenuOrder.id}`, {
    //         method: "PUT",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify(customMenuItemChoices)
    //     })
    //         .then(response => response.json())
    //         .then((customMenuOrdersArray) => {
    //             navigate("/customMenu")
    //         })

    // }


    return <>

       
    </>
}

{/* <header>
            <Link to={`/menu/${customMenuOrders.id}/edit`}>Edit Order {customMenuOrders.id}</Link>
        </header>

        <form className="custom_menu">
            <h2 className="custom_title">Custom Menu</h2>

            <h3 className="custom_batters_field">Batters</h3>
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

            <h3 className="custom_fillings_field">Fillings</h3>
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

            {/* note, we're just letting users choose one topping per pancake order to help meet MVP fast */}
            {/* new stretch goal: make it so that more than one topping can be added to a pancake order  */}
            {/* use promise.all to make it so that you can have more than one topping for a custom pancake order  */}

            // <h3 className="custom_toppings_field">Toppings</h3>
            // <fieldset>
            //     <div className="form-group">
            //         <select name="toppings" id="toppings"
            //             onChange={
            //                 (evt) => {
            //                     const copy = { ...customMenuItemChoices }
            //                     copy.toppingId = parseInt(evt.target.value)
            //                     setCustomMenuItemChoices(copy)
            //                 }} >
            //             <option key={0} value={0}>Choose pancake topping...</option>
            //             {customMenuItemToppings.map(customMenuItemTopping => {
            //                 return <option key={customMenuItemTopping.id} value={customMenuItemTopping.id}>{customMenuItemTopping.name}, ${customMenuItemTopping.price.toFixed(2)}</option>
            //             })}
            //         </select>
            //     </div>
            // </fieldset>

            // <h3 className="custom_stack_sizes_field">Stack Sizes</h3>
            // <fieldset>
            //     <div className="form-group">
            //         <select name="stack_sizes" id="stack_sizes"
            //             onChange={
            //                 (evt) => {
            //                     const copy = { ...customMenuItemChoices }
            //                     copy.stackSizeId = parseInt(evt.target.value)
            //                     setCustomMenuItemChoices(copy)
            //                 }} >
            //             <option key={0} value={0}>Choose number of pancakes...</option>
            //             {customMenuItemStackSizes.map(customMenuItemStackSize => {
            //                 return <option key={customMenuItemStackSize.id} value={customMenuItemStackSize.id}>{customMenuItemStackSize.stackSize}, ${customMenuItemStackSize.price.toFixed(2)}</option>
            //             })}
            //         </select>
            //     </div>
            // </fieldset>

            // <button
            //     onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
            //     className="btn btn-primary">
            //     Save
            // </button> 