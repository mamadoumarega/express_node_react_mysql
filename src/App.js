import React, {Component} from 'react';
import './App.css';
import Nav from './Components/Nav/Nav';
import Main from './Components/GitHub/Main';
import Specific from "./Components/GitHub/Specific";
import Data from "./Components/GitHub/Data";
import Favorite from "./Components/Favorite/Favorite";
import LoginRegister from './Components/LoginRegister/MainPage';

import {BrowserRouter as Router, Route} from "react-router-dom";
import {Provider} from 'react-redux';

//Action
import { ReUserState } from './Store/Actions';


// Store
import {createStore} from 'redux';
import rootReducer from "./Store/Reducers";


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isAuthentication: false
        };

        // Create Store
        this.store = createStore(
            rootReducer,
            window.__REDUX_DEVTOOLS_EXTENSION__ &&
            window.__REDUX_DEVTOOLS_EXTENSION__()
        );
    }

    Logout(){
        localStorage.removeItem('Token');
        this.store.dispatch(ReUserState(false));
        this.setState({ isAuthentication: false });
    }

    render() {
        return (

            <Provider store={this.store}>
                <Router>
                    <Nav Logout={this.Logout} store={this.store}/>
                    <Route exact path='/' component={Main}/>
                    <Route exact path='/Data/:id' component={Data}/>
                    <Route exact path='/Specific/:login' component={Specific}/>
                    <Route exact path='/Favorite' component={ Favorite } />
                    <Route exact path='/LoginRegister' component={ LoginRegister }   />
                </Router>
            </Provider>

        );
    }

}

export default App;
