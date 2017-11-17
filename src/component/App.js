import React, { Component } from 'react';
import Board from './Board';

//import { Header } from 'react-native-elements';

import '../index.css';

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

    {/* <Header
  leftComponent={{ icon: 'menu', color: '#fff' }}
  centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
  rightComponent={{ icon: 'home', color: '#fff' }}
/> */}
            <label className="appTittle">Crea tus imágenes para las redes sociales</label>
            <Board/>
          </div>
        );
    }
}

export default App;