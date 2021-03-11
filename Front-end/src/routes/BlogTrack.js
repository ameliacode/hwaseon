import React from 'react';
import axios from 'axios';
import "./BlogTrack.css";

class BlogTrack extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      value: "",
      isBlogPosted: false,
      isKwdGen: false,
      posts:[],
      keylist: []
    };
  }

  callBlogPostApi = async() => {
    const search = this.state.value;
    try{
      if(search == ""){
        this.setState({posts:[], isBlogPosted: false, isKwdGen: false})
      } else {
          this.setState({posts:[]});
          axios.post("https://2oe7jwfo04.execute-api.us-east-1.amazonaws.com/v1/blogPost",{
              "id": search
          },{
            headers: {
              'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Access-Control-Allow-Origin,  Access-Control-Allow-Methods, Access-Control-Allow-Credentials, Access-Control-Request-Headers',
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Credentials':true}
          }).then(function (response) {
            this.setState({posts: JSON.parse(response["data"]["body"]), isBlogPosted: true, isKwdGen: false});
          }.bind(this));          
        }
      }
      catch(error){
          console.log(error);
      }
    };


  callBlogKwdApi = async() => {
    try{
      if (!this.state.isBlogPosted){
        console.log("No Posts");
      } else {
        if(this.state.isKwdGen){
          console.log("Keyword Already Generated");
        } else {
            axios.post("https://2oe7jwfo04.execute-api.us-east-1.amazonaws.com/v1/blogKwdAuto",{
              "body": JSON.stringify(this.state.posts)
          },{
            headers: {
              'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Access-Control-Allow-Origin,  Access-Control-Allow-Methods, Access-Control-Allow-Credentials, Access-Control-Request-Headers',
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Credentials':true}
          }).then(function (response) {
            this.setState({posts: JSON.parse(response["data"]["body"]), isBlogPosted: true, isKwdGen: true});
            for(var i=0; i<this.state.posts.length; i++) {
              this.state.keylist[i] = this.state.posts[i]["keyword"];
            }
          }.bind(this));  
        } 
      }
    }
    catch(error){
        console.log(error);
    }
  }

  callBlogViewApi = async() => {
    try{
      if(!this.state.isKwdGen){
        console.log("No Keyword generated");
      } else {
        console.log(this.state.keylist);
        for(var i=0; i<this.state.posts.length; i++) {
          this.state.posts[i]["keyword"] = this.state.keylist[i];
        }
        axios.post("https://2oe7jwfo04.execute-api.us-east-1.amazonaws.com/v1/blogView",{
              "keyword": this.state.keylist,
              "body": JSON.stringify(this.state.posts)
          },{
            headers: {
              'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Access-Control-Allow-Origin, Access-Control-Allow-Methods, Access-Control-Allow-Credentials, Access-Control-Request-Headers',
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Credentials':true}
          }).then(function (response) {
            this.setState({posts: JSON.parse(response["data"]["body"]), isBlogPosted: true, isKwdGen: true});
          }.bind(this));  
      }
    }
    catch(error){
        console.log(error); 
    }
  }

  handleChange = (e) => { 
    this.setState({value: e.target.value}); 
  };
    
  handleSubmit = (e) => { 
    e.preventDefault(); 
    this.callBlogPostApi(); 
  };

  handleKwdSubmit = (e) => {
    e.preventDefault();
    this.callBlogKwdApi();
  }

  handleViewSubmit = (e) => {
    e.preventDefault();
    this.callBlogViewApi();
  }

  onKwdChange = (index, e) => {
    const items = {...this.state.keylist}
    items[index] = e.target.value;
    this.setState(
      {
          keylist: Object.values(items)
      }
    );
  }

  render() 
  { 
    const {posts, isLoading} = this.state;
    const columns = [{  
      Header: '글 제목 ▲',  
      accessor: 'title',
      },{  
      Header: '키워드 ▲',  
      accessor: 'keyword' ,
      },{  
      Header: 'View 순위 ▲',  
      accessor: 'rank' ,
      },{  
      Header: '통합View 노출수 ▲',  
      accessor: 'no_adview',
      },{  
      Header: 'Total 검색량 ▲',  
      accessor: 'monthly_search',
      },{  
      Header: '컨텐츠 발행량 ▲',  
      accessor: 'monthly_content',
      }
    ]
    return (
      <section className = "blog-container">
          <div className = "blog-content">
            <div className = "blog-functions">
              <div className = "blog-search">
                <form className = "blog-searchBox " onSubmit = {this.handleSubmit}> 
                  <div className = "blog-classify">블로그 ID</div> 
                  <input className = "blog-input"
                  type = "text"
                  placeholder = "ex. dotoree0103"
                  value={this.state.value} onChange={this.handleChange}/>
                  <button type = "submit" className = "blog-submit" onChange={this.handleChange}>
                    <i className = "fa fa-search"></i>
                  </button>
                </form>
                <div className="blog-buttons">
                  <button type = "submit" className = "blog-keyauto" onClick={this.handleKwdSubmit} onChange={this.handleKwdSubmit}>
                    키워드 자동 생성 Click
                  </button>
                  <button type = "submit" className = "blog-viewcheck" onClick={this.handleViewSubmit}>
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
        <div className = "blog-result">
        { 
          <table className="blog-table"> 
            <tr className = "blog-table-title">
              <th style = {{width:"27%", paddingLeft: "55px",textAlign: "left"}}>글 제목 ▲</th>
              <th style = {{width:"9%"}}>키워드 ▲</th>
              <th style = {{width:"8%"}}>View 순위 ▲</th>
              <th style = {{width:"9%"}}>통합 View 노출수 ▲</th>
              <th style = {{width:"8%"}}>Total 검색량 ▲</th>
              <th style = {{width:"11%", paddingRight:"50px"}}>컨텐츠 발행량 ▲</th>
            </tr>
            { 
                this.state.posts.map((datum, index) =>
                <tr className="trow"> 
                <td style = {{width:"27%", paddingLeft: "35px",textAlign: "left"}}>{datum.title}</td>
                <td>
                  <textarea className = "blog-keyInput" defaultValue={datum.keyword}  onChange={(e) => this.onKwdChange(index, e)}/>
                </td>
                <td style = {{width:"8%"}}>{datum.rank > 30 ? "30위 밖":datum.rank}</td>
                <td style = {{width:"9%"}}>{datum.no_adview}</td>
                <td style = {{width:"8%"}}>{datum.monthly_search}</td>
                <td style = {{width:"11%", paddingRight:"50px"}}>{datum.monthly_content}</td>
                </tr>) 
            }
          </table>        
        }
        </div>
      </section>
    );
  }
}

export default BlogTrack;