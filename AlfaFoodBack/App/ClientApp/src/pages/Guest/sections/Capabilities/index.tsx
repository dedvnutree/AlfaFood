import React from "react"

import "./index.scss"


const capibilities = [
    {
        title: "Статистика",
        descr: "descr22",
        image: ""
    },
    {
        title: "База гостей",
        descr: "descr22",
        image: ""
    },
    {
        title: "СМС рассылка для гостей",
        descr: "descr22",
        image: ""
    },
]

const Capabilities = () => {
    return (
        <section className="capabilitiesSection__section">
            <div className="content">
                <div
                    className="capabilitiesSection__content"
                >
                    {
                        capibilities.map((cap, i) => (
                            <div key={i} className={`capabilitiesSection__subsection ${i % 2 == 1 ? "subsection--order" : ""}`}>
                                <div
                                    className={`capabilitiesSection__subsection-image ${i % 2 == 1 ? "subsection-image--order" : "" }`}
                                >
                                    <img src={cap.image} alt=""/>
                                </div>
                                <div
                                    className="capabilitiesSection__subsection-text"
                                >
                                    <h5
                                        className="capabilitiesSection__subsection-title"
                                    >{cap.title}</h5>
                                    <p
                                        className="capabilitiesSection__subsection-descr"
                                    >
                                        {cap.descr}
                                    </p>
                                </div>

                            </div>
                        ))
                    }
                </div>

            </div>

        </section>
    )
}



export default Capabilities