import React, { Component } from 'react';

import Board from '../board/Board.js';
import OptionsComponent from '../options/optionsComponent.js';

class MainComponent extends Component  {

    constructor(props) {
        super(props);

        this.state = {
            canvasWidth: 450,
            canvasHeight: 450
        }
    }

    changeCanvasSocialSize(e) {
        e.preventDefault();
    }

    render() {
        return(
            <div className="container">
                <Board canvasWidth={this.state.canvasWidth}
                    canvasHeight={this.state.canvasHeight}/>
            </div>
        );
    }
}

export default MainComponent;