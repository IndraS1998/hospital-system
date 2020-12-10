import React from 'react';
import ReactDOM from 'react-dom';
import {HospitalContextProvider} from "./store/useStore";
import './index.css';
import App from './App';
import {BrowserRouter as Router} from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
      <HospitalContextProvider>
          <Router>
              <App />
          </Router>
      </HospitalContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
