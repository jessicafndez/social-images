import React, { Component } from 'react';
import TextComponent from '../component/textComponent';
import '../css/social.css';

class Facebook extends Component {

  constructor(props) {
    super(props);

    this.facebookSizes = {
      facebookProfile:  [
        {widthDefault: 180, widthWeb: 160, heightDefault: 180, heightWeb: 160}
      ],
      facebookSquare: [
        {widthDefault: 1200, widthWeb: 470, heightDefault: 1200, heightWeb: 470}
      ],
      facebookCover: [
        {widthDefault: 815, widthWeb: 815, heightDefault: 315, heightWeb: 315},
      ]
    }

    this.state = {
      boardWidth: 180,
      boardHeight: 180,
      isDragging: false,
      coordX: 0,
      coordY: 0,
      moveAmountX: 0,
      moveAmountY: 0,
      isLoaded: false,
      numTextContainers: 0,
      textBoxes: []
    }
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

  handleMouseOutFbk(e) {
      console.log("eee");
      console.log(e);
  }
  
  changeFacebookOptions(e) {
    e.preventDefault();
    let option = parseInt(e.target.value, 10);

    if(option === 1) {
      let newWidth = this.facebookSizes.facebookProfile[0].widthDefault;
      let newHeight = this.facebookSizes.facebookProfile[0].heightDefault;

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

  addText(e) {
    console.log("Adding text");
    let numText = this.state.numTextContainers + 1;
    this.setState({numTextContainers: numText});
  }

  changeText(e) {
    console.log("text has change in child");
    console.log(e);
  }
  
  addCanvasText(e) {
    console.log("Adding text in parents: ");
    console.log(e.target.value);
  }

  sendValues(e) {
    console.log("Text values: " );
    console.log(e);
  
  }

  render() {
    let {imagePreviewUrl} = this.state;
    let img = new Image();

   const textContainer = [];
    for (var i = 0; i < this.state.numTextContainers; i += 1) {
      textContainer.push(<TextComponent key={i} number={i} 
        onChange={(e)=>this.changeText(e)}
        addCanvasText={this.addCanvasText}
        sendValues={this.sendValues}/>
      );
    };

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

      if(this.state.numTextContainers>0) {
        console.log("We have some text");
        console.log(textContainer);
      }
      else {
        console.log("No text here");
      }
    }

    //this.setState({textBoxes: textContainer});  
    console.log(this.state.textBoxes);

    return(
      <div className="facebookContainer">
        <label>Selecciona el tipo de imagen a crear para Facebook:</label>
        <select name="facebookOptions" onClick={(e)=>this.changeFacebookOptions(e)}>
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
              onMouseUp = {(e)=>this.handleMouseUpFbk(e)}
              onMouseDown = {(e)=>this.handleMouseDownFbk(e)}
              onMouseMove = {(e)=>this.handleMouseMoveFbk(e)}
          />
        </div> 
        <div className="" onClick={(e)=>this.addText(e)}>
          <button>Add text container</button>
        </div>

        <div id="children-text-pane">
          {textContainer}
        </div>
      </div>
    );
  }
}

export default Facebook;