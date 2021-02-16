import React from 'react';
import axios from 'axios';
import "./KeyCat.css";

class KeyCat extends React.Component {
  state = {
    isLoading: true,
    movies: [],
    value: "",
    name: ""
  };

}

export default KeyCat;