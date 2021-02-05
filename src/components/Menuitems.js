import React from "react";
import "./Menuitems.css";

function Menuitems({menu}){
    return (
        <div className = "menu-item">
            <p>{menu.name}</p>
        </div>
    );
}

export default Menuitems;