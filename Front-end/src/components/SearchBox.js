import React from "react";
import {Link} from 'react-router-dom';
import PropTypes from "prop-types";
import "./SearchBox.css";

 class SearchBox extends React.Component
 {
    render() {
        return (
            <input className = "searchbox"
            type = "searchbox"
            placeholder = "관련 키워드를 검색하세요"
            onChange = {this.props.handleChange}
          />     
      );
    }
  }

export default SearchBox;