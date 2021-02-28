import React from 'react';
import SearchBox from '../components/SearchBox';
import "./Home.css";
import logoIMG from "../components/images/Logo.gif";
import {Menuitems} from "../components/Navibar/Menuitems";
import {Link} from "react-router-dom";

class Home extends React.Component
{
  state = {
      isLoading: true,
      clicked: false
    };

    handleClick = () => {
      this.setState({clicked: !this.state.clicked});
    }

    render() 
    {  
      const {handleInput} = this;
      return (
        <div className = "group">
          <div className = "logo">
              <img 
              src = { logoIMG } 
              alt = "HWASEON"
              width = "330px"/>
          </div>
          <div className = "search-window">
            <SearchBox handleChange = {handleInput } /> 
            <button type = "submit" className = "submit-button">
              <i className = "fa fa-search"></i>
            </button>
          </div>
          
          <div className = "menu">
              <ul className = {this.state.clicked ? "item-clicked" : "item-unclicked" }>
                {Menuitems.map((item, index) => {
                      return (
                          <Link to = {item.path} key = {index} className = {item.cName}>
                              {item.title}
                          </Link>
                      )
                  })}
              </ul>
          </div>
        </div>  
      );
    }
  }

  export default Home;



