
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Login.css"

export const Register = (props) => {
    const [customer, setCustomer] = useState({
        email: "",
        fullName: "",
        isMember: false
    })
    let navigate = useNavigate()

    const registerNewUser = () => {
        return fetch("http://localhost:8088/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(customer)
        })
            .then(res => res.json())
            .then(createdUser => {
                if (createdUser.hasOwnProperty("id")) {
                    localStorage.setItem("hotcakes_user", JSON.stringify({
                        id: createdUser.id,
                        member: createdUser.isMember
                    }))

                    const newCartForUser = {
                        id: 0,
                        userId: createdUser.id,
                        pickUpId: 0,
                        totalPrice: "",
                        phoneNumber: ""
                    }

                    createNewCartForUser(newCartForUser)

                    navigate("/home")
                }
            })
    }

    const handleRegister = (e) => {
        e.preventDefault()
        return fetch(`http://localhost:8088/users?email=${customer.email}`)
            .then(res => res.json())
            .then(response => {
                if (response.length > 0) {
                    // Duplicate email. No good.
                    window.alert("Account with that email address already exists")
                }
                else {
                    // Good email, create user.
                    registerNewUser()
                }
            })
    }

    const updateCustomer = (evt) => {
        const copy = { ...customer }
        copy[evt.target.id] = evt.target.value
        setCustomer(copy)
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
                localStorage.setItem("cart", JSON.stringify({ cartId: res.id }))
            })
    }

    return (
        <main style={{ textAlign: "center" }}>
            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal"> 🥞 Please register...</h1>
                <fieldset>
                    <label htmlFor="fullName"> Full Name </label>
                    <input onChange={updateCustomer}
                        type="text" id="fullName" className="form-control"
                        placeholder="Enter your name" required autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="email"> Email address </label>
                    <input onChange={updateCustomer}
                        type="email" id="email" className="form-control"
                        placeholder="Email address" required />
                </fieldset>
                <fieldset>
                    <input onChange={(evt) => {
                        const copy = { ...customer }
                        copy.isMember = true
                        setCustomer(copy)
                    }}
                        type="checkbox" id="isMember" />
                    <label htmlFor="email"> Yes, I want to be a member! </label>
                </fieldset>
                <fieldset>
                    <button type="submit" className="user-button">Register</button>
                </fieldset>
            </form>
        </main>
    )
}