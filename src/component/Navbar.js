
import React from "react";


function Navbar(props ){
    
    return (
        <div>
            <h3 style={{display: "flex", justifyContent: "center"}}>{props.title}</h3>
        </div>
    )
}



export default Navbar;