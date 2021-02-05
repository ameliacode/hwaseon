import React from 'react';
import axios from 'axios';
import "./Home.css";
import "./Search.css";
import {naverMoviesApi} from '../api';

class Search extends React.Component {
  state = {
    isLoading: true,
    movies: [],
    value: "",
    name: ""
  };

}

export default Search;