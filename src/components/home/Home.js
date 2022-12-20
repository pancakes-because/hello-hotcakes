import { useEffect, useState } from "react"
import "./Home.css"

export const Home = () => {

    return <>

        <div className="home_title_and_tagline_container">
            <h1 className="home__title">Hello, Hotcakes!</h1>
            <p className="tagline">The taste of delicious pancakes awaits you.</p>
        </div>

        <footer className="footer_container">

            <div className="address">
                <p>624 Maude Lane, Conway, KS, 69958</p>
            </div>

            <div className="email">
                <p>hellohotcakes@gmail.com</p>
            </div>

            <div className="phone">
                <p>(823) 773-0888</p>
            </div>

        </footer>

    </>

}