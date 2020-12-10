import React  from 'react';
import {Switch,Route} from 'react-router-dom';

import Help from "./components/home/Help";
import Home from "./components/home/Home";
import Login from "./components/auth/Login";
import Navigation from "./components/navigation/Navigation";
import Info from "./components/home/Info";
import SignUp from "./components/auth/SignUp";
import Footer from "./components/navigation/Footer";
import ErrorModal from "./components/utils/ErrorModal";
import MakeAdmin from "./components/auth/admin-ops/admin-transactions/MakeAdmin";
import LoadingSpinner from "./components/utils/LoadingSpinner";
import './App.css';

function App() {
  return (
      <React.Fragment>
              <Navigation />
              <Switch>
                  <Route exact path="/" component={Home}/>
                  <Route path='/info' exact component={Info}/>
                  <Route path='/help' exact component={Help}/>
                  <Route path='/login' exact component={Login}/>
                  <Route path='/signUp' exact component={SignUp}/>
                  <Route path='/dLvS' exact component={MakeAdmin}/>
              </Switch>
              <Footer />
              <ErrorModal />
              <LoadingSpinner />
      </React.Fragment>
    )
}

export default App;
