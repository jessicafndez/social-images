import React, { Component } from 'react';
import Draggable, {DraggableCore} from 'react-draggable'; // Both at the same time

import './stickers.css';

class StickersComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            canvasPWidth: 250,
            canvasPHeight: 250,
            file: '',
            imagePreviewUrl: '',
            isImageDragging: false,
            isImageLoaded: false,
            posX: 0,
            posY: 0
        };
    }

    handleStickerImage(e) {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        
        reader.onloadend = () => {
            this.setState({
                file: file,
                imagePreviewUrl: reader.result,
                isImageLoaded: true,
                
            });
            console.log("loading image");
            var img = new Image;
            let that = this;
            img.onload = function() {
              console.log("The width of the image is " + this.width);
              console.log("The width of the image is " + this.height);
                that.setState({
                    canvasPHeight: img.height + 10,
                    canvasPWidth: img.width + 10
                });
            };
            console.log("img: " + that.state.canvasPHeight);
            
            img.src = reader.result;
        }
        reader.readAsDataURL(file);
    }

    handleStart(e) {
        console.log("dragin start");
        console.log(e);
    }
    handleDrag() {
        console.log("Is draggin");
    }
    handleStop=(e)=> {
       let width = e.clientX;
       let height = e.clientY;
       console.log(": " + width + ", " + height);


    
       let actualPosition = {
           posX: e.offsetX,
           posY: e.offsetY
       }
     //  this.props.updateSticker(actualPosition);

        console.log("e: ");
        console.log(e);
        this.props.updateSticker(actualPosition);
    }

    render() {
        let {imagePreviewUrl} = this.state;
        let img = new Image();

        if(imagePreviewUrl) {
            let moveX = this.state.moveAmountX;
            let moveY = this.state.moveAmountY;

            const ctx = this.refs.canvasPegatinas.getContext('2d');
            const canvas = this.refs.canvasPegatinas;

            if(!this.state.isLoaded) {
                let moveX = this.state.moveAmountX;
                let moveY = this.state.moveAmountY;
                img.onload = function() {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.drawImage(img, 5, 5);
                    ctx.fill();
                    ctx.beginPath();
                    ctx.stroke();
                }
                img.src = imagePreviewUrl;
            }
        }
        return(
            <div className="stickersContainer">
                <div className="fileContainer">
                    <span>Añadir pegatina</span>
                    <input className="fileInput pointer" type="file"
                    onChange={(e)=>this.handleStickerImage(e)} />
                </div>
                <div className="fullRow">
                    <Draggable 
                    ref="canvasDragable"
                    id="canvasDragable"
                    onStart={(e)=>this.handleStart(e)}
                    onDrag={this.handleDrag}
                    onStop={this.handleStop}>
                        <div id="">
                            <canvas ref="canvasPegatinas" className="canvasPegatinas"
                                id="canvasPegatinas" 
                                width={this.state.canvasPWidth}
                                height={this.state.canvasPHeight}
                                resize="false"/>
                        </div>
                    </Draggable> 
                </div>
            </div>
        );
    }
}

export default StickersComponent;