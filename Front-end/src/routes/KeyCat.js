import React from 'react';
import axios from 'axios';
import SearchBox from '../components/SearchBox';
import "./KeyCat.css";
import {naverMoviesApi} from '../api';

class KeyCat extends React.Component{
    state = {
      isLoading: true,
    };
    
    render() {
  
      return (
          <div className = "cat-container">
            <div className = "cat-functions">
                <div className = "cat-searchBox "> 
                  <input className = "cat-input"
                  type = "searchbox"s
                  placeholder = "검색할 키워드를 입력하세요"
                  onChange = {this.props.handleChange}/>
                  <button type = "submit" className = "cat-submit">
                    <i className = "fa fa-search"></i>
                  </button>
                </div>
                <div className = "monthly-search">
                </div>
            </div>    
          </div>
            
      );
    }
}

export default KeyCat;