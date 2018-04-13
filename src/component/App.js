import React, { Component } from 'react';
import MainComponent from './main/MainComponent';

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
            <div className="appHeader ">
                <div className="appHeaderContent container">
                    <img src="logo.png" />
                    <label className="appTitle">Crea tus imágenes para las redes sociales</label>
                </div>    
            </div>
            <MainComponent/>
          </div>
        );
    }
}

export default App;