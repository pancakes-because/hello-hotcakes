import { useEffect, useState } from "react"
import "./Home.css"

export const Home = () => {

    return <>

        <div className="home_title_and_tagline_container">
            <h1 className="home__title">Hello, Hotcakes!</h1>
            <p className="tagline">The taste of delicious pancakes awaits you.</p>
        </div>

        <ul className="footer_container">

            <li className="footer_item">
                222 Bavarian Way, Gatlinburg, TN, 37738
            </li>
            <li className="footer_item">
                hellohotcakes@gmail.com
            </li>
            <li className="footer_item">
                (823) 773-0888
            </li>

        </ul>

    </>

}