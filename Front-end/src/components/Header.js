import React from "react";
import "./Header.css";
import logoIMG from "./images/Logo.gif";

class Header extends React.Component{
    
    state = {
        clicked: false,
        isLoading: true,
        results: [],
        value: "",
        name: ""
      };
      
    render() {
        return (      
            <nav className = "header">
                <div className = "corp_name">
                    <img 
                    src = { logoIMG } 
                    alt = "HWASEON"
                    width = "200px"/>
                </div>
            </nav>
        );
    }
}

export default Header;