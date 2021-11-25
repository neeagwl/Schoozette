import React from 'react'
import {Container} from 'react-bootstrap';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import LandingScreen from './screens/LandingScreen';
import HomeScreen from './screens/HomeScreen';
import ErrorScreen from './screens/ErrorScreen';
import CreateClassScreen from './screens/CreateClassScreen';
import JoinClassScreen from './screens/JoinClassScreen';

const App=()=> {
  return (
    <Router>
        <Header/>
        <main className="py-3">
        <Switch>
            <Route path='/'               component={LandingScreen} exact={true}/>
            <Route path='/home'           component={HomeScreen} exact={true}/>
            <Route path='/createClass'    component ={CreateClassScreen} exact={true}/>
            <Route path='/joinClass'      component={JoinClassScreen} exact={true}/>
            <Route path='/register'       component={RegisterScreen} exact={true}/>
            <Route path='/login'          component={LoginScreen} exact={true}/>
            <Route path='*'               component={ErrorScreen} />
          </Switch>
        </main>
        <Footer/>
    </Router>
  );
}

export default App;
