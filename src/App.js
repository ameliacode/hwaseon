import logo from './logo.svg';
import {HashRouter, Route} from "react-router-dom";
import './App.css';
import Home from "./routes/Home";

function App() {
  return (
    <HashRouter>
      <Route path = "/" exact = {true} component = {Home}/>
    </HashRouter>
  );
}

export default App;
