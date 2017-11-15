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
    this.socialName = "";
    this.socialState = { stateSocialTag: '<Facebook/>'}

    this._setDefaultSocial(1);
  }

  _setDefaultSocial(e) {
    if(e === 1) {
      this.stateSocial.state = 1;
      this.socialState.stateSocialTag = <Facebook/>
      this.stateSocialTag = <Facebook/>
      this.socialName = "Facebook";
    }
    else if (e === 2) {
      this.stateSocial.state = 2;
      this.socialState.stateSocialTag = <Instagram/>
      this.stateSocialTag = <Instagram/>
      this.socialName = "Instagram";
    }
  //  this.render();
  }

  _changeSocialPlatform(e) {
    e.preventDefault();
    let option = parseInt(e.target.value);
    if(option === 1) {
      this.stateSocial.state = 1;
      this.socialState.stateSocialTag = <Facebook/>
      console.log("1- so: " + this.socialState.stateSocialTag);
      this.socialName = "Facebook";
    }
    else if (option === 2) {
      this.stateSocial.state = 2;
      this.socialState.stateSocialTag = <Instagram/>
      console.log("2- so: " + this.socialState.stateSocialTag);
      this.socialName = "Instagram";
    }
    console.log("Social: " + this.socialState.stateSocialTag);
    this.render();
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

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onload = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }
  }

  render() {
    let $socialProperties = this.socialName;

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
        <div className="socialProperties">
          <label>{$socialProperties}</label>
        </div>
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
