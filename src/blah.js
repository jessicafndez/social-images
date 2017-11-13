import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Board extends Component {

}

class App extends Component {
    render() {
        return(
            <div>
                <div className="myBoard"></div>
                <form>
                    <input />   
                </form>
            </div>
        );
    }
}

ReactDOM.render(
    <App />, document.getElementById("root")
);
