import React from 'react';
import axios from 'axios';
import SearchBox from '../components/Header/SearchBox';
import "./Home.css";
import {naverMoviesApi} from '../api';

class Home extends React.Component{
    state = {
        isLoading: true,
        movies: [],
        value: "",
        name: ""
      };
      
      getSearch = async () => {
        console.log('Search content');
        const search = this.state.value;
    
        try {
          if (search === "") {
            this.setState({movies: [], isLoading: false})
          } else {
            const {data: {
                items
              }} = await naverMoviesApi.search(search);
            this.setState({movies: items, isLoading: false})
          }
        } catch (error) {
          console.log(error);
        }
      };
    
      componentDidMount() {
        this.getSearch();
      };
    
      handleChange = (e) => {
        this.setState({value: e.target.value});
      };
    
      handleSubmit = (e) => {
        e.preventDefault();
        this.getSearch();
      };
    
      render() {
        const {movies, isLoading, name} = this.state;
    
        return (<section className="container">
          {
            isLoading
              ? (<div className="loader">
                <span className="loader__text">Loading..{this.state.name}</span>
              </div>)
              : (<form onSubmit={this.handleSubmit}>
                <div>
                  <div className="input_div">
                    <input className="input_search" type="text" value={this.state.value} onChange={this.handleChange} placeholder="제품명을 입력해주세요."/>
                  </div>
                  <div className="movies">
                    {movies.map(movie => (<SearchBox key={movie.link} id={movie.link} year={movie.pubDate} title={movie.title} poster={movie.image} rating={movie.userRating} director={movie.director} actor={movie.actor}/>))}
                  </div>
                </div>
              </form>)
          }
        </section>);
      }
}

export default Home;