import React from "React";
import PropTypes from "prop-types";
import "./SearchRecent.css";
import {Link} from "react-router-dom";

class SearchRecent extends React.Component
{ 
    state = {
        isLoading: true,
        results: [],
        value: "",
        name: ""
      };

      render(){
          return (
            <div class = "recent-search">
                최근 30일간 검색량
            </div>
          );
      }
}

export default SearchRecent;
