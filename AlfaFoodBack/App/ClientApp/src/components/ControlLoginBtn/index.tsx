import React from 'react'
import { connect } from "react-redux"


import { logout } from "../../redux/reducers/authReducer"

import "./index.scss"




const ControlBtn = (props: any) => {
    return (
        <button
            onClick={() => {
                props.logout()
            }
            }
            className="controlLoginBtn__wrap">
                <span className="text" >
                    ВЫЙТИ
                </span>
        </button>
    );
}




export default connect(null, { logout })(ControlBtn)

