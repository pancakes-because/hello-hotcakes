import React, { useState } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import "./Login.css"

// IMPORTANT NOTE 
// ideally, each user that logins will have their own unique cart to fill with orders 
// that cart should also be empty 
// so we created a function called "createNewCartForUser" that creates an object with properties called "newCartForUser"

export const Login = () => {
    const [email, set] = useState("rosered@me.com")
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()

        return fetch(`http://localhost:8088/users?email=${email}`)
            .then(res => res.json())
            .then(foundUsers => {
                if (foundUsers.length === 1) {
                    const user = foundUsers[0]
                    localStorage.setItem("hotcakes_user", JSON.stringify({
                        id: user.id,
                        member: user.isMember
                    }))

                const newCartForUser = {
                    id: 0, 
                    userId: user.id,
                    pickUpId: 0,
                    totalPrice: "",
                    phoneNumber: ""
                }

                createNewCartForUser(newCartForUser)

                    navigate("/home")
                }
                else {
                    window.alert("Invalid login")
                }
            })
    }

    const createNewCartForUser = (cartObject) => {

        return fetch(`http://localhost:8088/carts`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(cartObject)
    })
            .then(response => response.json())
            .then((res) => {
                localStorage.setItem("cart", JSON.stringify({cartId: res.id})) 
            })
    } 
    
    
    return (
        <main className="container--login">
            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    <h1>Please sign in...</h1>
                    <fieldset>
                        <label htmlFor="inputEmail">Email address</label>
                        <input type="email"
                            value={email}
                            onChange={evt => set(evt.target.value)}
                            className="form-control"
                            placeholder="Email address"
                            required autoFocus />
                    </fieldset>
                    <fieldset>
                        <button type="submit" className="user-button">
                            Sign In
                        </button>
                    </fieldset>
                </form>
            </section>
            <section className="link--register">
                <Link to="/register">Not a member yet?</Link>
            </section>
        </main>
    )
}
