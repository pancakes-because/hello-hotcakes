import { GuestNav } from "./GuestNav"
import { MemberNav } from "./MemberNav"

// this component controls which nav bar a user sees based on their "member" status
// related to GuestNav.js and MemberNav.js 

// the "hotcakesUserObject" object has a property of "member" on it
// the property is a boolean, so the values can be "true" or "false"
// if true, where the user is a member, they see the nav links accessible to members
// if false, where the user is not a member, they see the nav links accessible to guests

export const NavBar = () => {

    const localHotcakesUser = localStorage.getItem("hotcakes_user")
    const hotcakesUserObject  = JSON.parse(localHotcakesUser)

    if (hotcakesUserObject.member) {

        return <MemberNav /> 

    } else {

        return <GuestNav /> 
    }
}


