import React, { Component } from 'react';
import TextComponent from '../component/textComponent';
import '../css/social.css';

import Facebook from '../social/facebookSizes.js';
import Instagram from '../social/instagramSizes.js';
import Twitter from '../social/twitterSizes.js';

class SocialGeneral extends Component {

    constructor(props) {
        super(props);

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
            childTextStyle: 'Arial',
            childTextTop: 0,
            downloadImage: '',
            haveTextContent: false,
            socialName: 'Facebook',
            socialId: 1,
            childSocialPosition: 0,
            stickerContentVisible: false,
          }

        this.textContainer = [];
        this.imageDownloadUrl = '';

        this.fb = new Facebook();
        this.instagram = new Instagram();
        this.twitter = new Twitter();

        console.log("Recreate child");

        this.socialObj= this.fb;
    }

    changeSocial() {
      this.render();
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

        //then show stickers options
        this.setState({btnStickertVisible: true});
    }

    _handleStickerChanged(e) {
      e.preventDefault();
      let reader = new FileReader();
      let file = e.target.files[0];
      reader.onloadend = () => {
        this.setState({
          fileSticker: file,
          imagePreviewStickerUrl: reader.result
        });
      }
      reader.readAsDataURL(file);
    }

    handleMouseDown(e) {
        this.setState({ isDragging: true });
        this.setState( {coordX: 0, coordY: 0 });
      }

    handleMouseUp(e) {
        this.setState({ isDragging: false });
        this.setState( {coordX: 0, coordY: 0 });
    }

    handleMouseMove(e) {
        if(this.state.isDragging === true) {
          let moveX = this.state.moveAmountX;
          let moveY = this.state.moveAmountY;

          if(this.state.isLoaded === false) {
            this.setState({isLoaded: true});
          }
          if(this.state.coordX>0 || this.state.coordY>0) {
            moveX += e.pageX - this.state.coordX;
            moveY += e.pageY - this.state.coordY;
            this.setState({moveAmountX: moveX, moveAmountY: moveY});
            this.render();
          }
          this.setState({coordX: e.pageX, coordY: e.pageY});
        }
    }

    handleMouseLeave(e) {
      console.log("mouse leaving");
      if(this.state.isDragging === true) {
         this.state.isDragging = false;
        this.setState({coordX: e.pageX, coordY: e.pageY});
      }
    }

    changeSocialOptions(e) {
        e.preventDefault();
        let option = parseInt(e.target.value, 10);

        if(option === 1) {
          let newWidth = this.socialSize.socialProfile[0].widthDefault;
          let newHeight = this.socialSize.socialProfile[0].heightDefault;

          this.setState({
            boardWidth: newWidth,
            boardHeight: newHeight
          });

        }
        else if(option === 2) {
          let newWidth = this.socialSize.socialSquare[0].widthWeb;
          let newHeight = this.socialSize.socialSquare[0].heightWeb;

          this.setState({
            boardWidth: newWidth,
            boardHeight: newHeight
          });
        }
        else if(option === 3) {
          let newWidth = this.socialSize.socialCover[0].widthWeb;
          let newHeight = this.socialSize.socialCover[0].heightWeb;

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
        this.href=dataURL;

        const w = window.open('about:blank', 'image from canvas');
        w.document.write("<img src='"+dataURL+"' alt='from canvas'/>");
        this.setState({downloadImage: dataURL});
    }

    changeCanvasSocialSize(e) {
      e.preventDefault();
      let option = parseInt(e.target.value, 10);
      console.log("Change to size: " + option);

      console.log(this.socialObj.socialSizes[option]);
      this.setState({
        boardWidth: this.socialObj.socialSizes[option][0].widthWeb,
        boardHeight: this.socialObj.socialSizes[option][0].heightWeb,
        childSocialPosition: option
      });
    }

    restartCanvasSocialSize() {
      console.log("Restarting sizes");
      this.setState({
        boardWidth: this.socialObj.socialSizes[1][0].widthWeb,
        boardHeight: this.socialObj.socialSizes[1][0].heightWeb,
        childSocialPosition: 1
      });
    }

    /* TEXT COMPONENT FUNCTIONS */
    addText(e) {
      if(this.state.numTextContainers == 0) {
        let numText = this.state.numTextContainers + 1;
        this.setState({numTextContainers: numText});

        this.textContainer.push(<TextComponent key={this.state.numTextContainers+1} number={this.state.numTextContainers+1}
          addCanvasText={this.addCanvasText.bind(this)}
          addCanvasTextColor={this.addCanvasTextColor.bind(this)}
          addCanvasTextSize={this.addCanvasTextSize.bind(this)}
          closeTextContainer={this.closeTextContainer.bind(this)}
          state={this.state}/>
        );
        this.setState( {textBoxes: this.textContainer});
      }
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

    closeTextContainer() {
      this.textContainer = [];

      let childText = this.state.childText;
      let childTextColor = this.state.childTextColor;
      let childTextSize = this.state.childTextSize;

      this.setState({
        numTextContainers:0,
        childText: '',
        childTextColor: '#000000',
        childTextSize: 16,
        childTextStyle: 'Arial',
        childTextTop: 0
      });
      this.render();
    }

    addSticker() {
      console.log("Add stickers");
      if(this.state.isLoaded) {
        alert("image loader is needed");
      }
      else {
        console.log("stickers is loader");
      }
    }

    fixBackground(e) {

    }

    render() {
      console.log("Render children: ");
      console.log(this.props.socialId);
        let socialId = parseInt(this.props.socialId);
        let socialName = "";
        if(socialId === 1) {
          this.socialObj = this.fb;
          socialName = "Facebook";
        }
        else if(socialId === 2) {
          this.socialObj = this.instagram;
          socialName = "Instagram";
        }
        else {
          this.socialObj = this.twitter;
          socialName = "Twitter";
        }

        if (this.props.socialId !== this.state.socialId) {
          this.state.socialId = this.props.socialId;

          //restar canvas size
          this.state.boardWidth = 180;
          this.state.boardHeight = 180;

          //restart selector too
          this.state.childSocialPosition = 0;
        }

        var socialSizesArray = [];
        let index = 0;
        for (var key in this.socialObj.socialSizes) {
          let keyValue = this.socialObj.socialSizes[index][0].key;
          socialSizesArray.push(<option value={index} key={index}>{keyValue}</option>);
          index++;
        }

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

          let moveX = this.state.moveAmountX;
          let moveY = this.state.moveAmountY;

          if(!this.state.isLoaded) {
            img.onload = function() {
              ctx.clearRect(0, 0, canvas.width, canvas.height);
              ctx.drawImage(img, (canvas.width/2 - img.width/2) + moveX, (canvas.height/2 - img.height/2) + moveY);

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
              ctx.drawImage(img, -canvas.width/2 + moveX, -canvas.height/2 + moveY);

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
        let btnStickertVisible = this.state.stickerContentVisible;

        let {imagePreviewStickerUrl} = this.state;
        let imgages = new Image();

        if (imagePreviewStickerUrl) {
          console.log("we have sticker");
        }
        else {
          console.log("No sticker yet");
        }

        return(
          <div className="socialContainer">
            <div className="componentBox">
                <label className="imageType">Add image to {socialName}:</label>
                <select name="socialSize" onChange={(e)=>this.changeCanvasSocialSize(e)}
                value={this.state.childSocialPosition}>
                  {socialSizesArray}
                </select>
            </div>
            <div className="componentBox">
              <div className="fileContainer">
                <span>Add image</span>
                <input className="fileInput pointer" type="file"
                  onChange={(e)=>this._handleImageChange(e)}/>
              </div>
            </div>
            <div className="canvasContent componentBox">
              <div className="canvasContainer">
                <canvas ref="canvas" className="canvasCanvas" id="canvasCanvas"
                  width={this.state.boardWidth}
                  height={this.state.boardHeight}
                    resize="true"
                    onMouseUp = {(e)=>this.handleMouseUp(e)}
                    onMouseDown = {(e)=>this.handleMouseDown(e)}
                    onMouseMove = {(e)=>this.handleMouseMove(e)}
                    onMouseLeave = {(e)=>this.handleMouseLeave(e)}
                />
              </div>
              <div className="">
                <button className="appBtn"
                onClick={(e)=>this.fixBackground(e)}>Fix Image</button>
              </div>
            </div>
            <div className="extraOption">
              <div className="componentBox"
              style={{display: (this.state.btnStickertVisible ? 'block' : 'none')}}>
                <div className="fileContainer">
                  <span>Add sticker</span>
                    <input className="fileInput pointer" type="file"
                      onChange={(e)=>this._handleStickerChanged(e)}/>
                </div>
              </div>
              <div className="componentBox">
                <div className="pointer" onClick={(e)=>this.addText(e)}
                  style={{ display: (btnVisible ? 'none' : 'block')}}>
                  <button className="appBtn">Add text container</button>
                </div>
                <div id="children-text-pane">
                  {this.textContainer}
                </div>
              </div>
            </div>
            <div className="componentBox">
              <div className="saveBtnContainer pointer">
                <a href={this.state.downloadImage} onClick={(e)=>this.saveCanvas(e)}
                  className="appBtn saveBtn"
                  download>Save image
                </a>
              </div>
            </div>
          </div>
        );
      }
}

export default SocialGeneral;
