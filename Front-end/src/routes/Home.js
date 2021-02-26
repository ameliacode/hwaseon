import React from 'react';
import axios from 'axios';
import SearchBox from '../components/SearchBox';
import "./Home.css";
import logoIMG from "../components/images/Logo.gif";
import {Menuitems} from "../components/Navibar/Menuitems";

class Home extends React.Component
{
  state = {
      isLoading: true,
      movies: [],
      value: "",
      name: ""
    };

    render() 
    {  
      return (
        <div className = "group">
          <div className = "corp_name">
              <img 
              src = { logoIMG } 
              alt = "HWASEON"
              width = "400px"/>
          </div>
          <div className = "hyper_menu">
              <ul className = "li">
                <li>

                </li>
              </ul>
          </div>
        </div>  

      );
    }
  }

  export default Home;



