import React from 'react';
import axios from 'axios';
import "./MassKey.css";

class MassKey extends React.Component {
  state = {
    isLoading: true,
    movies: [],
    value: "",
    name: ""
  };

}

export default MassKey;