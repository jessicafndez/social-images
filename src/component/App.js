import React, { Component } from 'react';
import Board from './Board';

//import { Header } from 'react-native-elements';

import '../index.css';

//import logo from './react.svg';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            socialName: 'Facebook',
            socialId: 1
        }
    }

    render() {
        return (
          <div className="component-app">
            <div className="appHeader">
                <label className="appTitle">Social Media Image Creator</label>
            </div>
            <Board/>
            <div className="componentBoxFooter reactPowered">  
                <img src="/react.svg" className="App-logo" alt="logo" /> 
                <span>Powered by <a href="https://reactjs.org/" target="_blank">React.js</a></span>
            </div>
          </div>
        );
    }
}

export default App;