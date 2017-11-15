import React, { Component } from 'react';
import '../css/social.css';

class Twitter extends Component {

  constructor(props) {
    super(props);

    this.twitterSizes = {
      twitterProfile:  [
        {widthDefault: 400, widthWeb: 200, heightDefault: 400, heightWeb: 200}
      ],
      twitterSquare: [
        {widthDefault: 1024, widthWeb: 512, heightDefault: 512, heightWeb: 256},
      ],
      twitterCover: [
        {widthDefault: 1500, widthWeb: 1024, heightDefault: 500, heightWeb: 280},
      ]
    }

    this.state = {
        boardWidth: 180,
        boardHeight: 180,
        isDragging: false,
        actualPage: [{x:0, y:0}],
        coordX: 0,
        coordY: 0,
        moveAmountX: 0,
        moveAmountY: 0,
        isLoaded: false
    }
    this.oldCoord = { x:0, y:0}
    this.currentCoords = {x:0, y:0}
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
    reader.readAsDataURL(file);
  }

  handleMouseDownFbk(e) {
    this.setState({ isDragging: true });
  }

  handleMouseUpFbk(e) {
    this.setState({ isDragging: false });
  } 
  handleMouseMoveFbk(e) {
    if(this.state.isDragging === true) {
      if(this.state.isLoaded === false) {
        this.setState({isLoaded: true});
      }
      if(this.state.coordX>0 || this.state.coordY>0) {
        let actualMoveX = this.state.moveAmountX + e.pageX - this.state.coordX;
        let actualMoveY = this.state.moveAmountY + e.pageY - this.state.coordY;
        this.setState({moveAmountX: actualMoveX, moveAmountY: actualMoveY});
      }
      this.setState({coordX: e.pageX, coordY:e.pageY});
    }
    else {
      console.log("move bt not draggin");
    }
    this.render();
  }

  
  changeTwitterOptions(e) {
    e.preventDefault();
    let option = parseInt(e.target.value, 10);
    
    if(option === 1) {
        let newWidth = this.facebookSizes.facebookProfile[0].widthWeb;
        let newHeight = this.facebookSizes.facebookProfile[0].heightWeb;

        this.setState({ 
            boardWidth: newWidth,
            boardHeight: newHeight
        });
    }
    else if(option=== 2) {
        let newWidth = this.facebookSizes.facebookSquare[0].widthWeb;
        let newHeight = this.facebookSizes.facebookSquare[0].heightWeb;

        this.setState({ 
            boardWidth: newWidth,
            boardHeight: newHeight
        });
    }
    else if(option === 3) {
        let newWidth = this.facebookSizes.facebookCover[0].widthWeb;
        let newHeight = this.facebookSizes.facebookCover[0].heightWeb;

        this.setState({ 
            boardWidth: newWidth,
            boardHeight: newHeight
        });
    }
  } 

  render() {
    let {imagePreviewUrl} = this.state;
    let img = new Image();

    if (imagePreviewUrl) {
        const ctx = this.refs.canvas.getContext('2d');
        const canvas = this.refs.canvas;

        let xPos = this.state.moveAmountX;
        let yPos = this.state.moveAmountY;
        if(!this.state.isLoaded) {
          img.onload = function() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, (canvas.width/2 - img.width/2) + xPos, (canvas.height/2 - img.height/2) + yPos);
            ctx.beginPath();
            ctx.stroke();
          };
        }
        else {
          img.onload = function() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, -canvas.width/2 + xPos, -canvas.height/2 + yPos);
            ctx.beginPath();
            ctx.stroke();
          };
        }
        img.src = imagePreviewUrl;
    }
    return(
        <div className="facebookContainer">
        <label>Selecciona el tipo de imagen a crear para Twitter:</label>
        <select name="facebookOptions" onClick={(e)=>this.changeTwitterOptions(e)}>
          <option value="1">Perfil</option>
          <option value="2">Cuadrada</option>
          <option value="3">Portada</option>
        </select>
        <form onSubmit={(e)=>this._handleSubmit(e)}>
            <input className="fileInput" 
                type="file" 
                onChange={(e)=>this._handleImageChange(e)} />
        </form>
        <div className="canvasContent">
            <canvas ref="canvas"  width={this.state.boardWidth} 
            height={this.state.boardHeight}
                resize="true" 
                onMouseUp = {(e)=>this.handleMouseUp(e)}
                onMouseDown = {(e)=>this.handleMouseDown(e)}
                onMouseMove = {(e)=>this.handleMouseMove(e)}
                onMouseOut = {(e)=>this.handleMouseOut(e)}  
            />
        </div>
      </div>
    );
  }
}

export default Twitter;