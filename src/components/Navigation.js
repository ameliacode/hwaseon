import React from "react";
import "./Navigation.css";
import {Link, useLocation} from "react-router-dom";
import Menuitems from "./Menuitems";

function Navigation(){

    const pathName = useLocation().pathname;
    
    const menus = [
        { name: "키워드 관리", path: "/manage" },
        //{ name: "제품 키워드", path = "/product-key"},
        //{ name: "대량 키워드 검색", path = "/mass-search"}
    ];

    return (
        <nav className = "menubar">
            {menus.map((menu, index) => {
                return (
                    <Link to={menu.path} key = {index}>
                        <Menuitems 
                            menu = {menu}
                            isActive = {pathName === menu.path ? true : false}
                        />
                    </Link>
                );
            })}
        </nav>
    );
}

export default Navigation;
