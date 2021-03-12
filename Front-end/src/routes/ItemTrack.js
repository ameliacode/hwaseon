import React from 'react';
import axios from 'axios';
import Dropdown from "react-dropdown";
import "./ItemTrack.css";

const options = [
  "스토어팜", "쿠팡"
];

class ItemTrack extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      uriValue: '', 
      isLoading: true,
      selected: ''
    };
    this._onSelect = this._onSelect.bind(this)
  }

  _onSelect (option) {
    // console.log('You selected ', option.label)
    this.setState({selected: option})
  }

  
  render(){
    const defaultOption = options[0];
    return(
    <section className = "item-container">
      <div className = "item-content">
        <div className = "item-functions">
            <div className = "item-search">
              <div className = "item-searchBox "> 
                <div className = "item-classify">마켓 선택</div> 
                <Dropdown 
                className = "Dropdown-root"
                placeholderClassName = "item-dropplace"
                menuClassName = "Dropdown-menu"
                controlClassName = "Dropdown-control"
                arrowClassName='Dropdown-arrow'
                options = {options} 
                onChange={this._onSelect}  
                value={defaultOption} 
                placeholder={defaultOption}  
                />
              </div>
              <div className = "item-searchBox "> 
                <div className = "item-classify">URL 입력</div> 
                <input className = "item-input"
                type = "searchbox"
                placeholder = "ex. Mid=12243746744&catId=500123546"
                onChange = {this.props.handleChange}/>
              </div>
              <div className="item-descript">
                <ul className = "descript">
                  <li>
                  네이버 URL 확인방법 - 유튜브 링크
                  </li>
                  <li>
                 쿠팡 URL 확인방법 - 유튜브 링크
                  </li>
                </ul>
                <button type = "submit" className = "item-searchButton">
                      검색하기
                </button>
              </div>
            </div>
            <div className = "item-massSearch "> 
                <div className = "item-classify">
                    키워드 입력<br/>
                    콤마 (구분)
                    <button type = "submit" className = "item-keyauto">
                      태그 자동 입력 click
                    </button>
                </div> 
                {
                  (this.state.selected["value"] == "스토어팜" || this.state.selected["value"]==undefined) 
                  ? (<textarea className = "item-massInput"
                     type = "searchbox"
                     placeholder = "ex) 1회 Max 10개까지 가능합니다.&#13;&#10;샴푸, 탈모샴푸, 탈모에좋은샴푸, 향기좋은샴푸, 샴푸특가"
                     onChange = {this.props.handleChange}/>)
                     :(
                       <textarea className = "item-massInput"
                       type = "searchbox"
                       placeholder = "ex)&#13;&#10;샴푸, 탈모샴푸, 탈모에좋은샴푸, 향기좋은샴푸, 샴푸특가, 탈모샴푸1위, 두피샴푸, 두피에좋은샴푸,&#13;&#10;쿨한, 시원한샴푸, 쿨링감, 비듬케어, 상쾌한샴푸, 20대여성, 40대여성, 볼륨샴푸, 모발에좋은샴푸, 푸석, &#13;&#10;한모발, 무실리콘샴푸"
                       onChange = {this.props.handleChange}/>
                     )
                }          
              </div> 
          </div>
      </div>
      <div className = "item-result">
      {
        (this.state.selected["value"] == "스토어팜" || this.state.selected["value"]==undefined) 
        ? (
            <div className = "item-naver-result">
              <table className="item-naver-table"> 
                <tr className = "item-naver-title">
                  <th style = {{ width:"400px", paddingLeft: "15px", textAlign: "left"}}>키워드 ▲</th>
                  <th style = {{ width:"350px", textAlign: "right"}}>순위 ▲</th>
                  <th style = {{width:"350px", textAlign: "right"}}>검색량 ▲</th>
                  <th style = {{width:"350px", textAlign: "right"}}>상품수 ▲</th>
                  <th style = {{width:"450px", textAlign: "right"}}>상품경쟁률 ▲</th>
                  <th style = {{width:"450px", textAlign: "right"}}>PC 월검색량 ▲</th>
                  <th style = {{width:"450px", textAlign: "right"}}>MO 월검색량 ▲</th>
                  <th style = {{width:"450px", textAlign: "right"}}>MO 광고클릭 ▲</th>
                  <th style = {{width:"450px", textAlign: "right", paddingRight:"15px"}}>PC 광고클릭 ▲</th>
                </tr>
                { 
                    // this.state.posts.map((datum, index) =>
                    // <tr className="trow"> 
                    // <td style = {{width:"27%", paddingLeft: "35px",textAlign: "left"}}>{datum.title}</td>
                    // <td>
                    //   <textarea className = "blog-keyInput" defaultValue={datum.keyword}  onChange={(e) => this.onKwdChange(index, e)}/>
                    // </td>
                    // <td style = {{width:"8%"}}>{datum.rank > 30 ? "30위 밖":datum.rank}</td>
                    // <td style = {{width:"9%"}}>{datum.no_adview}</td>
                    // <td style = {{width:"8%"}}>{datum.monthly_search}</td>
                    // <td style = {{width:"11%", paddingRight:"50px"}}>{datum.monthly_content}</td>
                    // </tr>) 
                }
              </table>   
              
              
              <div className = "item-search-inside">
                <div className = "item-searchBox-inside"> 
                  <div className = "item-classify-inside">스토어명</div> 
                  <input className = "item-input"
                  type = "searchbox"
                  placeholder = "스토어명을 입력하세요."
                  onChange = {this.props.handleChange}/>
                </div>
                <div className = "item-searchBox-inside"> 
                  <div className = "item-classify-inside">키워드</div> 
                  <input className = "item-input"
                  type = "searchbox"
                  placeholder = "키워드를 입력하세요."
                  onChange = {this.props.handleChange}/>
                </div>
                <button type = "submit" className = "item-searchButton-inside">검색하기</button>
              </div> 
              <table className="item-naver-table"> 
                <tr className = "item-naver-title">
                    <th style = {{ width:"400px", paddingLeft: "15px", textAlign: "left"}}>키워드 ▲</th>
                    <th style = {{ width:"350px", textAlign: "right"}}>순위 ▲</th>
                    <th style = {{width:"350px", textAlign: "right"}}>검색량 ▲</th>
                    <th style = {{width:"350px", textAlign: "right"}}>상품수 ▲</th>
                    <th style = {{width:"450px", textAlign: "right"}}>상품경쟁률 ▲</th>
                    <th style = {{width:"450px", textAlign: "right"}}>PC 월검색량 ▲</th>
                    <th style = {{width:"450px", textAlign: "right"}}>MO 월검색량 ▲</th>
                    <th style = {{width:"450px", textAlign: "right"}}>MO 광고클릭 ▲</th>
                    <th style = {{width:"450px", textAlign: "right", paddingRight:"15px"}}>PC 광고클릭 ▲</th>
                  </tr>
              </table> 


              <div className = "item-search-inside-2">
                <div className = "item-descript-inside-2">키워드별 예상 판매 (Npay 기준 | 최근 7일간)</div>
                <form className = "item-searchBox-inside-2" onSubmit = {this.handleSubmit}> 
                  <div className = "item-classify-inside-2">키워드 입력</div> 
                  <input className = "item-input"
                  type = "text"
                  placeholder = "ex) 샴푸"
                  value={this.state.value} onChange={this.handleChange}/>
                  <button type = "submit" className = "item-submit" onChange={this.handleChange}>
                    <i className = "fa fa-search"></i>
                  </button>
                </form>
              </div> 
              <table className="item-naver-table"> 
                <tr className = "item-naver-title">
                    <th style = {{ width:"400px", paddingLeft: "15px", textAlign: "left"}}>키워드 ▲</th>
                    <th style = {{ width:"350px", textAlign: "right"}}>순위 ▲</th>
                    <th style = {{width:"350px", textAlign: "right"}}>검색량 ▲</th>
                    <th style = {{width:"350px", textAlign: "right"}}>상품수 ▲</th>
                    <th style = {{width:"450px", textAlign: "right"}}>상품경쟁률 ▲</th>
                    <th style = {{width:"450px", textAlign: "right"}}>PC 월검색량 ▲</th>
                    <th style = {{width:"450px", textAlign: "right"}}>MO 월검색량 ▲</th>
                    <th style = {{width:"450px", textAlign: "right"}}>MO 광고클릭 ▲</th>
                    <th style = {{width:"450px", textAlign: "right", paddingRight:"15px"}}>PC 광고클릭 ▲</th>
                  </tr>
              </table>                   
          </div>

        ) 
          : (<div className = "item-coupang-result">
              <table className="item-coupang-table"> 
                <tr className = "item-coupang-title">
                  <th style = {{ width:"400px", paddingLeft: "15px", textAlign: "left"}}>키워드 ▲</th>
                  <th style = {{ width:"350px", textAlign: "right"}}>순위 ▲</th>
                  <th style = {{width:"350px", textAlign: "right"}}>검색량 ▲</th>
                  <th style = {{width:"350px", textAlign: "right"}}>상품수 ▲</th>
                  <th style = {{width:"450px", textAlign: "right"}}>상품경쟁률 ▲</th>
                  <th style = {{width:"450px", textAlign: "right"}}>PC 월검색량 ▲</th>
                  <th style = {{width:"450px", textAlign: "right"}}>MO 월검색량 ▲</th>
                  <th style = {{width:"450px", textAlign: "right"}}>MO 광고클릭 ▲</th>
                  <th style = {{width:"450px", textAlign: "right", paddingRight:"15px"}}>PC 광고클릭 ▲</th>
                </tr>
                { 
                    // this.state.posts.map((datum, index) =>
                    // <tr className="trow"> 
                    // <td style = {{width:"27%", paddingLeft: "35px",textAlign: "left"}}>{datum.title}</td>
                    // <td>
                    //   <textarea className = "blog-keyInput" defaultValue={datum.keyword}  onChange={(e) => this.onKwdChange(index, e)}/>
                    // </td>
                    // <td style = {{width:"8%"}}>{datum.rank > 30 ? "30위 밖":datum.rank}</td>
                    // <td style = {{width:"9%"}}>{datum.no_adview}</td>
                    // <td style = {{width:"8%"}}>{datum.monthly_search}</td>
                    // <td style = {{width:"11%", paddingRight:"50px"}}>{datum.monthly_content}</td>
                    // </tr>) 
                }
          </table>   

          </div>)
      }
      </div>
      
  </section>);}

}

export default ItemTrack;