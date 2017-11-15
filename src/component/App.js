import React, { Component } from 'react';

import Board from './Board';

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

            <Board/>
          </div>
        );
    }
}

export default App;