
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Cart.css"

export const Cart = () => {

    const localHotcakesUser = localStorage.getItem("hotcakes_user")
    const hotcakesUserObject = JSON.parse(localHotcakesUser)

    const localCart = localStorage.getItem("cart")
    const hotcakesCartObject = JSON.parse(localCart)

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

    }

    const navigate = useNavigate()

    // there are three "menus" or forms: menu, custom menu, and secret menu 
    // when the user fills out any of the forms and clicks the "add to cart" button, a new "order" is created 
    // every order created should display on the cart page 
    // to get the orders to display, we have to FETCH each of the orders 
    // need to EXPAND to get all the properties to display 

    const [menuOrders, setMenuOrders] = useState([])

    const [secretMenuOrders, setSecretMenuOrders] = useState([])

    const [customMenuOrders, setCustomMenuOrders] = useState([])

    useEffect(
        () => {

            fetch(`http://localhost:8088/menuOrders?cartId=${hotcakesCartObject.cartId}&_expand=menuItem`)
                .then(response => response.json())
                .then((menuOrdersArray) => {
                    setMenuOrders(menuOrdersArray)
                })

            fetch(`http://localhost:8088/secretMenuOrders?cartId=${hotcakesCartObject.cartId}&_expand=secretMenuItem`)
                .then(response => response.json())
                .then((secretMenuOrdersArray) => {
                    setSecretMenuOrders(secretMenuOrdersArray)
                })

            fetch(`http://localhost:8088/customMenuItems?_expand=batter&_expand=filling&_expand=topping&_expand=stackSize&_embed=customMenuOrders`)
                .then(response => response.json())
                .then((customMenuOrdersArray) => {
                    const filteredArray = customMenuOrdersArray.filter((customMenuOrder) => {
                        return customMenuOrder.customMenuOrders[0].cartId === hotcakesCartObject.cartId
                    })
                    return filteredArray
                    // console.log(customMenuOrdersArray[0].customMenuOrders[0].cartId)
                })
                .then(filteredArray => {
                    console.log(filteredArray)
                    setCustomMenuOrders(filteredArray)
                })
        },
        []
    )

    // for every "order" created, there should be an "EDIT order" button 
    // the "edit" function for each form is kept in a separate module (i.e. "MenuEdit" is the PUT request)
    // for every "order" created, there should be a "DELETE order" button 
    // the "delete" function for each form is kept in a separate module (i.e. "MenuEdit" is the PUT request)
    // use .map to filter through each order and return/create an edit and delete button 

    // *** note, some users will have orders from the secret menu and some will not 
    // write an if...else statement to determine if this needs to be fetched or not? or use optional chaining? 


    return <>

        <div className="cart_page">
            <h1>Cart</h1>

            <h2>Classic Menu Orders</h2>

            {
                menuOrders.length ?
                    menuOrders.map(menuOrder => {
                        return (
                            <div>
                                <h3>Order {menuOrder.id}</h3>
                                <p>{menuOrder.menuItem?.name}</p>
                                <button
                                    onClick={(clickEvent) => navigate(`/menu/${menuOrder.id}/edit`)}
                                    className="btn btn-primary">
                                    Edit Order
                                </button>

                                <button
                                    onClick={(clickEvent) => {
                                        fetch(`http://localhost:8088/menuOrders/${menuOrder.id}`, {
                                            method: "DELETE"

                                        }).then(response => response.json())
                                            .then(() => {
                                                fetch(`http://localhost:8088/menuOrders?cartId=${hotcakesCartObject.cartId}&_expand=menuItem`)
                                                    .then(response => response.json())
                                                    .then((menuOrdersArray) => {
                                                        setMenuOrders(menuOrdersArray)
                                                    })
                                            })
                                    }}
                                    className="btn btn-primary">
                                    Delete Order
                                </button>
                            </div>
                        )
                    })
                    : ""
            }


            {hotcakesUserObject.member ? <h2>Secret Menu Orders</h2> : ""}

            {
                secretMenuOrders.length ?
                    secretMenuOrders.map(secretMenuOrder => {
                        return (
                            <div>
                                <h3>Order {secretMenuOrder.id}</h3>
                                <p>{secretMenuOrder.secretMenuItem?.name}</p>
                                <button
                                    onClick={(clickEvent) => navigate(`/secret/${secretMenuOrder.id}/edit`)}
                                    className="btn btn-primary">
                                    Edit Order
                                </button>
                                <button
                                    onClick={(clickEvent) => {
                                        fetch(`http://localhost:8088/secretMenuOrders/${secretMenuOrder.id}`, {
                                            method: "DELETE"

                                        }).then(response => response.json())
                                            .then(() => {
                                                fetch(`http://localhost:8088/secretMenuOrders?cartId=${hotcakesCartObject.cartId}&_expand=secretMenuItem`)
                                                    .then(response => response.json())
                                                    .then((secretMenuOrdersArray) => {
                                                        setSecretMenuOrders(secretMenuOrdersArray)
                                                    })
                                            })
                                    }}
                                    className="btn btn-primary">
                                    Delete Order
                                </button>
                            </div>
                        )
                    })
                    : ""
            }

            <h2>Custom Menu Orders</h2>

            {
                customMenuOrders.length ?
                    customMenuOrders.map(customMenuOrder => {
                        return (
                            <div>
                                <h3>Order {customMenuOrder.id}</h3>
                                <p>{customMenuOrder.batter?.name}</p>
                                <p>{customMenuOrder.filling?.name}</p>
                                <p>{customMenuOrder.topping?.name}</p>
                                <p>{customMenuOrder.stackSize?.stackSize}</p>
                                <button
                                    onClick={(clickEvent) => navigate(`/custom/${customMenuOrder.id}/edit`)}
                                    className="btn btn-primary">
                                    Edit Order
                                </button>
                                <button
                                    onClick={(clickEvent) => {
                                        fetch(`http://localhost:8088/customMenuOrders/${customMenuOrder.id}`, {
                                            method: "DELETE"

                                        }).then(response => response.json())
                                            .then(() => {
                                                fetch(`http://localhost:8088/customMenuItems/${customMenuOrder.id}`, {
                                                    method: "DELETE"
                                                })
                                            })
                                            .then(() => {
                                                fetch(`http://localhost:8088/customMenuItems?_expand=batter&_expand=filling&_expand=topping&_expand=stackSize&_embed=customMenuOrders`)
                                                    .then(response => response.json())
                                                    // .then((customMenuOrdersArray) => {
                                                    //     const filteredArray = customMenuOrdersArray.filter((customMenuOrder) => {
                                                    //         return customMenuOrder.customMenuOrders[0].cartId === hotcakesCartObject.cartId
                                                    //     })
                                                    //     return filteredArray
                                                    //     console.log(customMenuOrdersArray[0].customMenuOrders[0].cartId)
                                                    // })
                                                    .then(filteredArray => {
                                                        console.log(filteredArray)
                                                        // setCustomMenuOrders(filteredArray)
                                                        setCustomMenuOrders([])
                                                    })
                                            })
                                    }}
                                    className="btn btn-primary">
                                    Delete Order
                                </button>
                            </div>)
                    })
                    : ""
            }

            <div>
                <button
                    onClick={(clickEvent) => navigate(`/checkout`)}
                    className="btn btn-primary">
                    Go to Checkout
                </button>
            </div>
        </div>
    </>
}
