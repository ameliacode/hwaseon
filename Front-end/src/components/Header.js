import React from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import "./Header.css";
import logoIMG from "./images/Logo.gif";
import SearchBox from "./SearchBox";
import "./SearchBox.css";

class Navigation extends React.Component{
    
    state = {
        clicked: false,
        isLoading: true,
        results: [],
        value: "",
        name: ""
      };
      
    render() {
        //const {handleInput} = this;
        return (      
            <nav className = "header">
                <div className = "corp_name">
                    <img 
                    src = { logoIMG } 
                    alt = "HWASEON"
                    width = "210px"/>
                </div>
                {/* <div className = "search-window">
                    <SearchBox handleChange = {handleInput } /> 
                </div>
                <button type = "submit" className = "submit-button">
                    <i className = "fa fa-search"></i>
                </button>
                 */}
            </nav>
        );
    }
}



export default Navigation;