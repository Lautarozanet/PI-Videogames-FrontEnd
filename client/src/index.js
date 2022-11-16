import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux'
import {store} from "./store"
import axios from "axios"


// axios.defaults.baseURL= "http://localhost:3001"
axios.defaults.baseURL= "https://pivideoameback-production.up.railway.app/"

ReactDOM.render(
  //el index siempre envolverlo en el Provider para que redux responda
  <Provider store={store}> 
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();