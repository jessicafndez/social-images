import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = { file: '', imagePreviewUrl: ''};
    this.canvasWidth = 500;
    this.canvasHeight = 300;
    this.canvasWidthProportion = 0.5;
    this.canvasHeightProportion = 0.5;
  }
  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file)
  }

  _handleSocialPlatform(e) {
    e.preventDefault();
    console.log("Social selected is: ");
    console.log(e);
  }

  changeCanvasWidthPlus(e) {
    e.preventDefault();
    let currentWidth = this.refs.canvas.width;
    if(currentWidth>=500 && this.canvasWidthProportion) {
      this.canvasWidthProportion += 0.1;
      //this.refs.canvas.width += this.canvasWidthProportion + 0.1;
    }
    else {
      this.refs.canvas.width = 500;
    }
   this.render();
  }
  changeCanvasWidthLess(e) {
    e.preventDefault();
    let currentWidth = this.refs.canvas.width;
    if(currentWidth>=550) {
      this.canvasWidthProportion = this.canvasWidthProportion - 0.1;
    }
    else {
      this.refs.canvas.width = 500;
    }
    this.render();
  }

  changeCanvasHeightPlus(e) {
    e.preventDefault();
    let currentHeight = this.refs.canvas.height;
    if(currentHeight>=300) {
      this.refs.canvas.height += 50;
    }
    else {
      this.refs.canvas.height = 300;
    }
   this.render();
  }
  changeCanvasHeightLess(e) {
    e.preventDefault();
    let currentHeight = this.refs.canvas.height;
    if(currentHeight>=350) {
      this.refs.canvas.height -= 50;
    }
    else {
      this.refs.canvas.height = 300;
    }
    this.render();
  }


  //if horizontal or vertical
  getImageOrientation(image) {
    console.log("W: " + image.width);
  }
   
  render() {
    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    let img = new Image();

    if (imagePreviewUrl) {
      const ctx = this.refs.canvas.getContext('2d');
      const canvas = this.refs.canvas;

      const canvasWidthP = this.canvasHeightProportion;
      const canvasHeightP = this.canvasHeightProportion;

      img.onload = function() {
        canvas.width = canvas.height * (img.width / img.height);
        console.log("CW: " + canvasWidthP);
        /*
        canvas.width = img.width * this.canvasHeightProportion;
        canvas.height = img.height * this.canvasHeightProportion;
        */
        canvas.width = img.width * canvasWidthP;
        canvas.height = img.height * canvasHeightP;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
     //   ctx.drawImage(canvas, 0, 0, canvas.width * this.canvasHeightProportion, canvas.height * this.canvasHeightProportion);
        ctx.drawImage(canvas, 0, 0, canvas.width * canvasWidthP, canvas.height * canvasHeightP,
        0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.stroke();
      };
      img.src = imagePreviewUrl;
    } else {
      $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
    }

    // canvas.height = canvas.width * (img.height / img.width);
 //   this.refs.canvas.width = this.refs.canvasHeight * (img.width/img.height);

    return (
      <div className="previewComponent">
        <label className="lblTitle">Editor de targetas para Alberto-Invermercado!</label>
        <div className="">
          <label>Selecciona la red social para que quieres la imagen</label>
          <select name="socialPlatform" onChange={(e)=>this._handleSocialPlatform(e)}>
            <option value="1">Facebook</option>
            <option value="2">Instagram</option>
            <option value="3">Twitter</option>
          </select>
        </div>

        {/*}
        <div className="editorBox">
          <label>1. Escoje una imagen de tu ordenador:</label><br/>
        </div>
        <form onSubmit={(e)=>this._handleSubmit(e)}>
          <input className="fileInput" 
            type="file" 
            onChange={(e)=>this._handleImageChange(e)} />
        </form>

        <form onSubmit={(e)=>this.changeCanvasSize(e)}>
          <div className="canvasSizeBox">
              <label htmlFor="canvasWidth">Ancho:</label>
              <button className="canvasBtn" onClick={(e)=>this.changeCanvasWidthPlus(e)}> + </button>
              <button className="canvasBtn" onClick={(e)=>this.changeCanvasWidthLess(e)}> - </button>
          </div>
          <div className="canvasSizeBox">
              <label htmlFor="canvasWidth">Largo:</label>
              <button className="canvasBtn" onClick={(e)=>this.changeCanvasHeightPlus(e)}> + </button>
              <button className="canvasBtn" onClick={(e)=>this.changeCanvasHeightLess(e)}> - </button>
          </div>
          {/*}
          <div className="canvasSizeBox">
            <label htmlFor="canvasHeight">Largo:</label>
            <input className="canvasHeight" onChange={(e)=>this.changeCanvasHeight(e)} name="canvasHeight"/>
          </div>
            }
        </form>
        <canvas ref="canvas"  width={this.canvasWidth} height={this.canvasHeight}
        resize="true"/>
        {/*
        <div className="imgPreview">
          {$imagePreview}
        </div>
        */}
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
  