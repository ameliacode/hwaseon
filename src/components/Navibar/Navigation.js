import React from "react";
import "./Navigation.css";
import {Link, useLocation} from "react-router-dom";
import {Menuitems} from "./Menuitems";

class Navigation extends React.Component{

   state = {
       clicked : false
   }

   handleClick = () => {
       this.setState({clicked: !this.state.clicked});
   }

   render(){
        return (
            <nav className = "nav-bar">
                <ul className = {this.state.clicked ? "item-clicked" : "item-unclicked" }>
                    {Menuitems.map((item, index) => {
                        return (
                            <Link to = {item.path} key = {index} className = {item.cName}>
                                {item.title}
                            </Link>
                        )
                    })}
                    <span className = "nav-indicator"></span>
                </ul>
            </nav>
        );
   }   
}

export default Navigation;
