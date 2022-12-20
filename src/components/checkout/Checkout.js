
import React from "react"
import PayPal from "/Users/theladytropical/workspace/hello-hotcakes/src/components/checkout/checkout_imgs/PayPal.png"
import "./Checkout.css"

export const Checkout = () => {

    return <>

        <div className="checkout_page">

            <h1 className="checkout__title">Checkout</h1>
            <p className="instructions">You're close to pancake paradise! </p>
            <p className="instructions">Please click the button below to complete payment, and then we'll start making your stack of heavenly hotcakes.</p>

            <div className="paypal_image">
                <img src={PayPal} alt="PayPal button" />
            </div>

        </div>

    </>

}

