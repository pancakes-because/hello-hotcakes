import { GuestViews } from "./GuestViews"
import { MemberViews } from "./MemberViews"

// this component controls what views/pages a user sees based on their "member" status
// related to GuestViews.js and MemberViews.js 

// the "hotcakesUserObject" object has a property of "member" on it
// the property is a boolean, so the values can be "true" or "false"
// if true, where the user is a member, they see views for members
// if false, where the user is not a member, they see views for guests 

export const ApplicationViews = () => {

    const localHotcakesUser = localStorage.getItem("hotcakes_user")
    const hotcakesUserObject = JSON.parse(localHotcakesUser)

    if (hotcakesUserObject.member) {
        // return the component view for members
        return <MemberViews />

    } else {
        // return the component view for guests 
        return <GuestViews />
    }
}


