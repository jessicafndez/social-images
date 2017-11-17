import React, { Component } from 'react';
import TextComponent from '../component/textComponent';
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
    
    if(option == 1) {
        let newWidth = this.twitterSizes.twitterProfile[0].widthWeb;
        let newHeight = this.twitterSizes.twitterProfile[0].heightWeb;
        this.setState({ 
            boardWidth: newWidth,
            boardHeight: newHeight
        });
    }
    else if(option == 2) {
        let newWidth = this.twitterSizes.twitterSquare[0].widthWeb;
        let newHeight = this.twitterSizes.twitterSquare[0].heightWeb;
        this.setState({ 
            boardWidth: newWidth,
            boardHeight: newHeight
        });
    }
    else if(option == 3) {
        let newWidth = this.twitterSizes.twitterCover[0].widthWeb;
        let newHeight = this.twitterSizes.twitterCover[0].heightWeb;
        this.setState({ 
            boardWidth: newWidth,
            boardHeight: newHeight
        });
    }
  } 

  saveCanvas(e) {
    e.preventDefault();
    let canvas = this.refs.canvas;

    var dataURL = canvas.toDataURL('image/png');
   // button.href = dataURL;
    this.href=dataURL;
  
    const w = window.open('about:blank', 'image from canvas');
    w.document.write("<img src='"+dataURL+"' alt='from canvas'/>");
    this.setState({downloadImage: dataURL});
  }

  addText(e) {
    if(this.state.numTextContainers == 0) {
      let numText = this.state.numTextContainers + 1;
      this.setState({numTextContainers: numText});
  
      this.textContainer.push(<TextComponent key={this.state.numTextContainers+1} number={this.state.numTextContainers+1} 
        addCanvasText={this.addCanvasText.bind(this)}
        addCanvasTextColor={this.addCanvasTextColor.bind(this)}
        addCanvasTextSize={this.addCanvasTextSize.bind(this)}
        sendValues={this.sendValues.bind(this)}
        delText={this.delText.bind(this)}
        state={this.state}/>
      );
      this.setState( {textBoxes: this.textContainer});
    }
  }

  delText() {
    this.setState({ numTextContainers:0 });
    this.textContainer = [];
    this.render();
  }
  
  addCanvasText(e) {
    this.setState({childText: e.target.value});
  }

  addCanvasTextColor(e) {
    this.setState({childTextColor: e.target.value});
  }

  addCanvasTextSize(e) {
    this.setState({childTextSize: e.target.value});
  }

  sendValues(e) {
    this.setState({childText: e});
    this.render();
  }

  render() {
    let {imagePreviewUrl} = this.state;
    let img = new Image();

    if (imagePreviewUrl) {
      let xPos = this.state.moveAmountX;
      let yPos = this.state.moveAmountY;

      const ctx = this.refs.canvas.getContext('2d');
      const canvas = this.refs.canvas;
  
      let childText = this.state.childText;
      let childTextColor = this.state.childTextColor;
      let childTextSize = this.state.childTextSize;

      if(!this.state.isLoaded) {
        img.onload = function() {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, (canvas.width/2 - img.width/2) + xPos, (canvas.height/2 - img.height/2) + yPos);

          ctx.font = childTextSize +"px Georgia";
          ctx.fillStyle = childTextColor;
          ctx.fillText(childText, 10,50);
          ctx.fill();

          ctx.beginPath();
          ctx.stroke();

        };
      }
      else {
        img.onload = function() {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, -canvas.width/2 + xPos, -canvas.height/2 + yPos);

          ctx.font = childTextSize +"px Georgia";
          ctx.fillStyle = childTextColor;
          ctx.fillText(childText, 10,50);
          ctx.fill();

          ctx.beginPath();
          ctx.stroke();
        };
      }
      img.src = imagePreviewUrl;
    }

    let btnVisible = this.state.numTextContainers;


    return(
      <div className="twitterContainer">
        <div className="componentBox">
          <label className="imageType">Tipo imágen Twitter:</label>
          <select name="twitterOptions" onClick={(e)=>this.changeTwitterOptions(e)}>
            <option value="1">Perfil</option>
            <option value="2">Cuadrada</option>
            <option value="3">Portada</option>
          </select>
        </div>
        <div className="componentBox">
          <div className="fileContainer">
            <span>Añadir imágen</span>
            <input className="fileInput" type="file" 
              onChange={(e)=>this._handleImageChange(e)}></input>
          </div>
        </div>
        <div className="canvasContent componentBox">
          <div className="saveBtnContainer">
            <a href={this.state.downloadImage} onClick={(e)=>this.saveCanvas(e)} 
            className="appBtn saveBtn"
            download>Guardar Imagen</a>
          </div>
          <div className="canvasContainer">
            <canvas ref="canvas" className="canvasCanvas" id="canvasCanvas"
              width={this.state.boardWidth} 
              height={this.state.boardHeight}
                resize="true" 
                onMouseUp = {(e)=>this.handleMouseUpFbk(e)}
                onMouseDown = {(e)=>this.handleMouseDownFbk(e)}
                onMouseMove = {(e)=>this.handleMouseMoveFbk(e)}
            />

            {/*
            <img src={this.state.downloadImage} id="canvasMirror"  className="canvasMirror"
            />
            */}
          </div>

        </div> 
        <div className="componentBox" onClick={(e)=>this.addText(e)}
        style={{ display: (btnVisible ? 'none' : 'block')}}>
          <button className="appBtn">Add text container</button>
        </div>

        <div id="children-text-pane">
          {this.textContainer}
        </div>
      </div>
    );
  }
}

export default Twitter;