
import React from "react"
import PayPal from "/Users/theladytropical/workspace/hello-hotcakes/src/components/checkout/checkout_imgs/PayPal.png" 

export const Checkout = () => {

    return <>

    <h1>Checkout</h1>

    <p>You're close to pancake paradise! </p> 
    <p>Please click the button below to complete payment, and then we'll start making your stack of heavenly hotcakes.</p>

    <div>
        <img src={PayPal} alt="PayPal button" />
    </div> 
    
    </>
    
}

