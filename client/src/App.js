import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import VideoGameCreate from "./components/VideoGameCreate";
import GameDetail from "./components/GameDetails"


function App() {
  return (
    <BrowserRouter>
    <div className="App"> 
      <Switch>
        <Route exact path="/" component={LandingPage}/>
        <Route path= "/home/:id" component={GameDetail}/>
        <Route exact path= "/home" component={Home}/>
        <Route path= "/videogame" component={VideoGameCreate}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
