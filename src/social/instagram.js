import React, { Component } from 'react';
import TextComponent from '../component/textComponent';
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
      boardHeight: 180,
      isDragging: false,
      coordX: 0,
      coordY: 0,
      moveAmountX: 0,
      moveAmountY: 0,
      isLoaded: false,
      numTextContainers: 0,
      textBoxes: [],
      childText: '',
      childTextColor: '#000000',
      childTextSize: 16,
      childTextTop: 0,
      downloadImage: '',
      haveTextContent: false
    }

    this.textContainer = [];
    this.sendValues = this.sendValues.bind(this);
    this.imageDownloadUrl = '';
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
      this.render();
    }
    else {
      console.log("move bt not draggin");
    }
  }

  handleMouseOutFbk(e) {
    console.log("eee");
    console.log(e);
    if(this.state.dragging) {
        this.setState({socialName: 'Facebook', socialId: 1});
    }
  }

  changeInstagramOptions(e) {
    e.preventDefault();
    let option = parseInt(e.target.value, 10);
    
    if(option == 1) {
      let newWidth = this.instagramSizes.instagramProfile[0].widthDefault;
      let newHeight = this.instagramSizes.instagramProfile[0].heightDefault;
      this.setState({ 
        boardWidth: newWidth,
        boardHeight: newHeight
      });
    }
    else if(option == 2) {
      let newWidth = this.instagramSizes.instagramSquare[0].widthWeb;
      let newHeight = this.instagramSizes.instagramSquare[0].heightWeb;
      this.setState({ 
        boardWidth: newWidth,
        boardHeight: newHeight
      });
    }
    else if(option == 3) {
      let newWidth = this.instagramSizes.instagramHorizontal[0].widthWeb;
      let newHeight = this.instagramSizes.instagramHorizontal[0].heightWeb;
      this.setState({ 
        boardWidth: newWidth,
        boardHeight: newHeight
      });
    }
    else if(option == 4) {
      let newWidth = this.instagramSizes.instagramVertical[0].widthWeb;
      let newHeight = this.instagramSizes.instagramVertical[0].heightWeb;
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
    if(this.state.numTextContainers>1) {

    }
    else {
      let numText = this.state.numTextContainers + 1;
      this.setState({numTextContainers: numText});
  
      this.textContainer.push(<TextComponent key={this.state.numTextContainers+1} number={this.state.numTextContainers+1} 
        addCanvasText={this.addCanvasText.bind(this)}
        addCanvasTextColor={this.addCanvasTextColor.bind(this)}
        addCanvasTextSize={this.addCanvasTextSize.bind(this)}
        addCanvasTextStyle={this.addCanvasTextStyle.bind(this)}
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

      console.log("----C----");
      console.log(childTextSize);

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
          <label className="imageType">Tipo imágen Instagram:</label>
          <select name="twitterOptions" onClick={(e)=>this.changeInstagramOptions(e)}>
            <option value="1">Perfil</option>
            <option value="2">Cuadrada</option>
            <option value="3">Horizontal</option>
            <option value="4">Vertical</option>
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
              download>Guardar imágen
            </a>
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

export default Instagram;