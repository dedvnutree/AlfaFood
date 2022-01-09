import React from "react"
import useDocumentTitle from "../../../hooks/useDocumentTitle";


import RepresentationSection from "../sections/ Representation";
import GuestNavbar from "../sections/Navbar"
import Roadmap from "../sections/Roadmap";
import Consumers from "../sections/Consumers";
import Capabilities from "../sections/Capabilities";
import AboutMobile from "../sections/AboutMobile";
import Footer from "../sections/Footer"


import "./index.scss"



const GuestPage: React.FC = () => {

    useDocumentTitle("Гостевая страница")

    return (
        <div
            style={
                {
                    overflow: 'hidden'
                }
            }
        >
            <div
                style={
                    {
                        position: 'relative',
                        height: '100vh',
                        width: '100vw',
                    }
                }
            >
                <RepresentationSection />
                <GuestNavbar />
            </div>
            <Consumers />
            <Roadmap />
            <Capabilities />
            <AboutMobile />
            <Footer />
        </div>
    )
}


export default GuestPage;