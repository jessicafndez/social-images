import React, { Component } from 'react';
import ReactDOM from 'react-dom';


import '../css/social.css';

class Instagram extends Component{
  constructor(props) {
    super(props);

    this.instagramSizes = {
      instagramProfile:  [
        {widthDefault: 180, widthWeb: 110, heightDefault: 180, heightWeb: 110}
      ],
      instagramSquare: [
        {widthDefault: 1080, widthWeb: 640, heightDefault: 1080, heightWeb: 640}
      ],
      instagramHorizontal: [
        {widthDefault: 1080, widthWeb: 640, heightDefault: 566, heightWeb: 400},
      ],
      instagramVertical: [
        {widthDefault: 1080, widthWeb: 600, heightDefault: 1350, heightWeb: 749},
      ]
    }

    this.state = {
      boardWidth: 180,
      boardHeight: 180
    }

    this.coords = { x: 0, y: 0};
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

  handleMouseDown(e) {
    this.setState({ dragging: true });

    console.log("down: " + this.state.dragging);
  }

  handleMouseUp(e) {
  //   this.dragging = false;
      console.log("mouse its Up");
      this.setState({ dragging: false });

      //saving current?
      /*
      if(!this.state.dragging) {
          this.oldCoord = this.currentCoords;
      }
      */
  } 

  handleMouseMove(e) {
    if(this.state.dragging) {
        let newCoord = {
            x: e.pageX,
            y: e.pageY
        }
        this.coords = newCoord;
    }
    this.render();
  }

  handleMouseOut(e) {
    console.log("eee");
    console.log(e);
    if(this.state.dragging) {
        this.setState({socialName: 'Facebook', socialId: 1});
    }
  }

  changeInstagramOptions(e) {
    e.preventDefault();
    let option = parseInt(e.target.value, 10);
    
    if(option === 1) {
      let newWidth = this.instagramSizes.instagramProfile[0].widthDefault;
      let newHeight = this.instagramSizes.instagramProfile[0].heightDefault;
      this.setState({ 
        boardWidth: newWidth,
        boardHeight: newHeight
      });
    }
    else if(option=== 2) {
      let newWidth = this.instagramSizes.instagramSquare[0].widthWeb;
      let newHeight = this.instagramSizes.instagramSquare[0].heightWeb;
      this.setState({ 
        boardWidth: newWidth,
        boardHeight: newHeight
      });
    }
    else if(option === 3) {
      let newWidth = this.instagramSizes.instagramHorizontal[0].widthWeb;
      let newHeight = this.instagramSizes.instagramHorizontal[0].heightWeb;
      this.setState({ 
        boardWidth: newWidth,
        boardHeight: newHeight
      });
    }
    else if(option === 4) {
      let newWidth = this.instagramSizes.instagramVertical[0].widthWeb;
      let newHeight = this.instagramSizes.instagramVertical[0].heightWeb;
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
      <div className="instagramContainer">
        <label>Selecciona el tipo de imagen a crear para Instagram:</label>
        <select name=""  onClick={(e)=>this.changeInstagramOptions(e)}>
          <option value="1">Perfil</option>
          <option value="2">Cuadrada</option>
          <option value="3">Horizontal</option>
          <option value="4">Vertical</option>
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

ReactDOM.render(
  <Instagram />, document.getElementById("root")
);


export default Instagram;