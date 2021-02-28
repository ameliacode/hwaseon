import React from "react";

 class SearchBox extends React.Component
 {
    render() {
        return (
            <input className = "searchbox"
            type = "searchbox"
            placeholder = "검색하고자 하는 키워드를 입력하세요"
            onChange = {this.props.handleChange}
          />     
      );
    }
  }

export default SearchBox;