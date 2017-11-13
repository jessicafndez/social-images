import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Facebook from './social/facebook.js';
import Instagram from './social/instagram.js';

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = { file: '', imagePreviewUrl: ''};
    this.canvasWidth = 500;
    this.canvasHeight = 300;
    this.canvasWidthProportion = 0.5;
    this.canvasHeightProportion = 0.5;

    this.stateSocial = { state: 1 };
    //this.socialBoardOptions = 

    this._setDefaultSocial(this.stateSocial.state);
  }

  _setDefaultSocial(option) {
    console.log()
    if(option === 1) {
      return <Facebook />
    }
    else if (option === 2) {
      return <Instagram />
    }
  }

  _changeSocialPlatform(e) {
    e.preventDefault();

    let option = parseInt(e.target.value);
    console.log("Social selected is: ");
    console.log(option);

    if(option === 1) {
      this.stateSocial.state = 1;
    }
    else if (option === 2) {
      this.stateSocial.state = 2;
    }
  }
  
  facebookOptions() {
    console.log("Index facebook options");

  }

  instagramOptions() {
    console.log("Instagram options");
    
  }

  twitterOptions() {
    console.log("Twitter options");
  }

  render() {
    if(this.stateSocial.state) {
      
    }
    return (
      <div className="previewComponent">
        <label className="lblTitle">Editor de targetas para Alberto-Invermercado!</label>
        <div className="">
          <label>Selecciona la red social para que quieres la imagen</label>
          <select name="socialPlatform" onChange={(e)=>this._changeSocialPlatform(e)}>
            <option value="1">Facebook</option>
            <option value="2">Instagram</option>
            <option value="3">Twitter</option>
          </select>
        </div>
        {socialBoardOptions}
      </div>
    )
  }
}

class App extends Component {
    render() {
        return(
            <Board/>
        );
    }
}

ReactDOM.render(
    <App />, document.getElementById("root")
);
