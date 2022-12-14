import { GuestNav } from "./GuestNav"
import { MemberNav } from "./MemberNav"

export const NavBar = () => {

    const localHotcakesUser = localStorage.getItem("hotcakes_user")
    const hotcakesUserObject  = JSON.parse(localHotcakesUser)

    if (hotcakesUserObject.member) {

        return <MemberNav /> 

    } else {

        return <GuestNav /> 
    }
}


