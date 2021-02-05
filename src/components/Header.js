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
        const ID_KEY = "id_key";
        const SECRET_KEY = "secret_key"
        const search = this.state.value;

        try{
            if(search == ""){
                this.setState({movies:[], isLoading: false})
            } else {
                const { data: {
                    items
                }} = await axios.get("https://openapi.anv")
            }
        }
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