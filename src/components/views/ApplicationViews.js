import { GuestViews } from "./GuestViews"
import { MemberViews } from "./MemberViews"

export const ApplicationViews = () => {

    const localHotcakesUser = localStorage.getItem("hotcakes_user")
    const hotcakesUserObject  = JSON.parse(localHotcakesUser)

    if (hotcakesUserObject.member) { 
        // return the component view for members
        return <MemberViews />   

    } else {
        // return the component view for guests 
        return <GuestViews /> 
    }
}


