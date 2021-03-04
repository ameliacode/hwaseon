import React from 'react';
import axios from 'axios';
import "./MassKey.css";

class MassKey extends React.Component {
  state = {
    isLoading: true,
  };

  render() 
  {  
    return (
      <div className = "key-container">
        <div className = "key-functions">
          <div className = "key-search">
            <div className = "key-searchBox "> 
              <div className = "key-classify">키워드 입력</div> 
              <input className = "key-input"
              type = "searchbox"
              placeholder = "ex. 폼클렌징(엔터시, 누적)"
              onChange = {this.props.handleChange}/>
              <button type = "submit" className = "key-submit">
                <i className = "fa fa-search"></i>
              </button>
            </div>
            <div className = "key-searchBox "> 
              <div className = "key-classify">엑셀 업로드</div> 
              <input className = "key-input"
              type = "searchbox"
              placeholder = "엑셀 파일 업로드"
              onChange = {this.props.handleChange}/>
              <button type = "submit" className = "key-submit">
                <i className = "fa fa-search"></i>
              </button>
            </div>
            <div className="key-descript">
              <ul className = "descript">
                <li>
                엑셀 양식 다운로드 - 구글드라이브
                </li>
                <li>
                세 가지 중 입력 중 하나 선택하셔서 사용하세요.
                </li>
              </ul>
            </div>
          </div>
          <div className = "key-massSearch "> 
              <div className = "key-classify">
                  키워드 대량 입력<br/>
                  콤마(,) 구분
              </div> 
              <input className = "key-massInput"
              type = "searchbox"
              placeholder = "ex)샴푸, 탈모샴푸, 탈모에좋은샴푸, 향기좋은샴푸, 샴푸특가, 탈모샴푸1위, &#13;&#10; 두피샴푸,두피에좋은샴푸..."
              onChange = {this.props.handleChange}/>
              <button type = "submit" className = "key-submit">
                <i className = "fa fa-search"></i>
              </button>
            </div> 
        </div>
      </div>
      // <div>
        
      // </div>
    );
  }

}

export default MassKey;