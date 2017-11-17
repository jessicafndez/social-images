import React, { Component } from 'react';
import TextComponent from '../component/textComponent';
import '../css/social.css';

import Facebook from '../social/facebookSizes.js';
import Instagram from '../social/instagramSizes.js';

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
            socialId: 1
          }

       // var f = this.props.callbackFromParent(SocialId);

          console.log("F: ");
         // console.log(f);
      
        this.textContainer = [];
      //  this.sendValues = this.sendValues.bind(this);
        this.imageDownloadUrl = '';   

        //By default we take facebook options
        let fb = new Facebook();
        let instagram = new Instagram();

        this.socialObj= fb;
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
        this.setState({ isDragging: true });
      }
    
    handleMouseUp(e) {
        this.setState({ isDragging: false });
    } 

    handleMouseMove(e) {
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

    render() {
        var socialSizesArray = [];
        let index = 0;
        for (var key in this.socialObj.socialSizes) {
          index++;
          socialSizesArray.push(<option value={index} key={index}>{key}</option>)
        }

        return(
          <div className="socialContainer">
            <div className="componentBox">
                <label className="imageType">Tipo imágen {this.state.socialName}:</label>
                <select>
                  {socialSizesArray}
                </select>
            </div>
          </div>
        );
      }
}

export default SocialGeneral;