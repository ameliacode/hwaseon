import React from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import "./Header.css";
import logoIMG from "./Logo.gif";
import SearchBox from "./SearchBox";


class Navigation extends React.Component{
    
    state = {
        isLoading: true,
        results: [],
        value: "",
        name: ""
      };

    handleInput = (e) => {
        this.setState({
            value: e.target.value,
        })
    }

    getResult = async () => {

    }

    componentDidMount = () => {
        this.getResult();  
    }

    render() {
        const {handleInput} = this;
        return (      
            <nav className = "header">
                <div className = "corp_name">
                    <img 
                    src = { logoIMG } 
                    alt = "HWASEON"
                    width = "210px"/>
                </div>
                <SearchBox handleChange = {handleInput } />
            </nav>
        );
    }
}



export default Navigation;