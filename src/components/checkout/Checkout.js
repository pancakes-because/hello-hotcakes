
import React from "react"
import PayPal from "/Users/theladytropical/workspace/hello-hotcakes/src/components/checkout/checkout_imgs/PayPal.png"
import "./Checkout.css" 

/* this component creates a checkout page for users to go to when they are ready to "pay" for their orders that are in the cart */ 
/* the component has it's own style sheet, "Checkout.css", although there are some global styles that it inherits from Hotcakes.css */

/* the image used here is kept in the checkout_imgs sub-directory of the checkout directory */ 

export const Checkout = () => {

    return <>

        <div className="checkout_page">

            <h1 className="checkout__title">Checkout</h1>
            <p className="checkout-instructions">Thank you for brunching with us. You're close to pancake paradise! </p>
            <p className="checkout-instructions">Please click the button below to complete payment, and then we'll start making your stack of heavenly hotcakes.</p>

            <div className="paypal_image">
                <img src={PayPal} alt="PayPal button" />
            </div>

        </div>

    </>

}

