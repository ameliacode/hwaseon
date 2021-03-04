import React from 'react';
import axios from 'axios';
import "./BlogTrack.css";


class BlogTrack extends React.Component {
  state = {
    isLoading: true,
  };

  render() 
  {  
    return (
      <div className = "blog-container">
        <div className = "blog-functions">
          <div className = "blog-search">
            <div className = "blog-searchBox "> 
              <div className = "blog-classify">블로그 ID</div> 
              <input className = "blog-input"
              type = "searchbox"s
              placeholder = "ex. dotoree0103"
              onChange = {this.props.handleChange}/>
              <button type = "submit" className = "blog-submit">
                <i className = "fa fa-search"></i>
              </button>
            </div>
            <div className="blog-buttons">
              <button type = "submit" className = "blog-keyauto">
                키워드 자동 생성 Click
              </button>
              <button type = "submit" className = "blog-viewcheck">
                View 순위 확인 Click
              </button>
            </div>
          </div>
         
          <div className = "blog-descript">
            <ul className = "descript">
              <li>
              1. 블로그ID에 'blog.naver.com/아이디' 해당값 입력 → 최신글 15개 가져와짐
              </li>
              <li>
              2. 키워드 자동 생성 or 직접 입력 후, 'View 순위 확인'을 Click → View 순위 노출 됨
              </li>
              <li>
              3. PC와 Mobile의 View 순위는 약간 상이합니다. Mobile 기준 작성했습니다.
              </li>
            </ul>
          </div>
        </div>
      </div>
      // <div>
        
      // </div>
    );
  }

}

export default BlogTrack;