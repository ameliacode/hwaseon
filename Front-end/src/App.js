import logo from './logo.svg';
import {HashRouter, Route, Switch, Redirect} from "react-router-dom";
import './App.css';
import Navigation from "./components/Navibar/Navigation";
import Header from "./components/Header";
import Footer from "./components/Footer"
import Home from "./routes/Home";
import KeyCat from "./routes/KeyCat";
import ItemTrack from "./routes/ItemTrack";
import MassKey from "./routes/MassKey";
import BlogTrack from "./routes/BlogTrack";


function App() {
  return (    
        <HashRouter>
          <Switch>
            <Route exact path = "/" exact = {true} component = {Home}/>
            <Route>
                <Header/>
                <Navigation/> 
                <Route path = "/keyncat" exact = {true} component = {KeyCat}/>
                <Route path = "/itemtrack" exact = {true} component = {ItemTrack}/>
                <Route path = "/masskeyword" exact = {true} component = {MassKey} />
                <Route path = "/blogtrack" exact = {true} component = {BlogTrack} />
            </Route>
          </Switch>         
          <Footer/>
        </HashRouter>
  );  
}

export default App;