import logo from './logo.svg';
import {HashRouter, Route} from "react-router-dom";
import './App.css';
import Navigation from "./components/Navigation";
import Header from "./components/Header";
import Home from "./routes/Home";
import Search from "./routes/Search";


function App() {
  return (
    <HashRouter>
      <Header/>
      <Navigation/>    
      <Route path = "/manage" exact = {true} component = {Search}/>
    </HashRouter>
  );
}

export default App;
