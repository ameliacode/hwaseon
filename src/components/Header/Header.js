import React from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import "./Header.css";
import logoIMG from "./Logo.gif";
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

    getResult = async () => {
        const ID_KEY = 'id_key'; 
        const SECRET_KEY = 'secret_key'; 
        const search = this.state.value; 
        
        try { 
            if (search === "") { 
                this.setState({movies: [], isLoading: false}) 
            } else { 
                const {data: { 
                    items 
                }} = await axios.get('https://openapi.naver.com/v1/search/movie.json',{ 
                    params:{ 
                        query: search, 
                        display: 20 
                    }, headers: { 
                        'X-Naver-Client-Id': ID_KEY, 
                        'X-Naver-Client-Secret': SECRET_KEY
                     }
                    }); 
                    
                    this.setState({movies: items, isLoading: false}); 
                } } catch (error) { console.log(error); } };

    
    componentDidMount = () => {
        this.getResult();  
    }

    handleInput = (e) => {
        this.setState({
            value: e.target.value,
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
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
                <div className = "search-window">
                    <SearchBox handleChange = {handleInput } /> 
                </div>
                <button type = "submit" className = "submit-button">
                    <i className = "fa fa-search"></i>
                </button>
                
            </nav>
        );
    }
}



export default Navigation;