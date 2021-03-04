import React from "react";
import "./Header.css";
import logoIMG from "./images/Logo.gif";
import {Link} from "react-router-dom";

const Header = () => {
    return (      
        <nav className = "header">
            <div className = "logo">
                <Link to ="/">
                    <img 
                    src = { logoIMG } 
                    alt = "HWASEON"
                    width = "200px"/>
                </Link>
            </div>
        </nav>
    );
}

export default Header;