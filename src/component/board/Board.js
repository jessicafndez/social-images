import React, { Component } from 'react';
import '../../index.css';
import './board.css';

//import SocialGeneral from '../social/socialGeneral.js';
import OptionsComponent from '../options/optionsComponent.js';
import StickersComponent from '../stickers/StickersComponent';

class Board extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            file: '', 
            imagePreviewUrl: '', 
            isImageDragging: false, 
            isImageFixed: false,
            socialName: 'Facebook',
            socialId: 1,
            socialPosition: 0,
            canvasWidth: 180,
            canvasHeight: 180,
            fixText: "Fijar imagen", 
            isImageLoaded: false,
            moveAmountX: 0,
            moveAmountY: 0,
            coordX: 0,
            coordY: 0,
            stickerX: 0,
            stickerY: 0
        };   
    }

    _handleImageChange(e) {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result,
                isImageLoaded: true
            });
        }
        reader.readAsDataURL(file);
        this.setState({isImageVisible: false});
    }

    handleMouseUp() {
        this.setState({
            isImageDragging: false,
            coordX: 0,
            coordY: 0
        });
    }
    handleMouseDown() {
        this.setState({isImageDragging: true})
    }
    handleMouseMove(e) {
        if((this.state.isImageDragging === true) && (this.state.isImageFixed === false)) {
            let moveX = this.state.moveAmountX;
            let moveY = this.state.moveAmountY;
  
            if(this.state.isImageLoaded === false) {
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
        this.setState({isImageDragging: false});
    }

    updateCanvasSize=(e)=> {
        this.setState({
            canvasWidth: e.width,
            canvasHeight: e.height
        });
    }

    updateStickerPosition=(e)=> {
        this.setState({
            stickerX: e.posX,
            stickerY: e.posY
        });

        console.log("y: " + e.posY);

        console.log("props: ");
        let canvas = this.refs.canvas;
        console.log(canvas);
        console.log("--------------");
        
        let c = document.getElementById("canvasCanvas");
        console.log(c.offsetTop);
        console.log("******************");
        let canvasTop = canvas.getBoundingClientRect().top;
        let canvasLeft = canvas.getBoundingClientRect().left;

        let actualStickerTop = canvasTop - e.posY;
        let actualStickerLeft = canvasLeft - e.posX;

        let sticker = this.refs.stickerComponent;
      //  let off = sticker.offset();
     //   console.log(off);
     //   console.log(off.top);

        console.log("t: " + canvasTop);
        console.log("l: " + canvasLeft);
    }

    render() {
        let {imagePreviewUrl} = this.state;
        let img = new Image();

        if(imagePreviewUrl) {
            let moveX = this.state.moveAmountX;
            let moveY = this.state.moveAmountY;

            const ctx = this.refs.canvas.getContext('2d');
            const canvas = this.refs.canvas;

            if(!this.state.isLoaded) {
                let moveX = this.state.moveAmountX;
                let moveY = this.state.moveAmountY;
                img.onload = function() {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.drawImage(img, (canvas.width/2 - img.width/2) + moveX, 
                    (canvas.height/2 - img.height/2) + moveY);
                    ctx.fill();
                    ctx.beginPath();
                    ctx.stroke();
                }
                img.src = imagePreviewUrl;
            }
        }
        return(
            <div className="board">
                <OptionsComponent canvasHeight={this.state.canvasHeight}
                    canvasWidth={this.state.canvasWidth} 
                    update={this.updateCanvasSize}/>
                <div className="boardContainer">
                    <div className="">
                        <div className="componentBox">
                            <div className="fileContainer">
                                <span>Añadir imagen:</span>
                                <input className="fileInput pointer" type="file"
                                    onChange={(e)=>this._handleImageChange(e)}/>
                            </div>
                        </div>
                    </div>
                    <div className="canvasContent containerBox">
                        <div className="fullRow">
                            <canvas ref="canvas" className="canvasCanvas" 
                                id="canvasCanvas"
                                width={this.state.canvasWidth}
                                height={this.state.canvasHeight}
                                resize="true"
                                onMouseUp = {(e)=>this.handleMouseUp(e)}
                                onMouseDown = {(e)=>this.handleMouseDown(e)}
                                onMouseMove = {(e)=>this.handleMouseMove(e)}
                                onMouseLeave = {(e)=>this.handleMouseLeave(e)}/>
                            <StickersComponent ref="stickerComponent"
                                posX={this.state.stickerX} 
                                posY={this.state.stickerY}
                                updateSticker={this.updateStickerPosition} />  
                        </div> 
                    </div>
                </div>
            </div>
        );
    }
}

export default Board;