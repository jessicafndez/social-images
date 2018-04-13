import React, { Component } from 'react';

import Facebook from '../../social/facebookSizes.js';
import Instagram from '../../social/instagramSizes.js';
import Twitter from '../../social/twitterSizes.js';

import './optionsComponent.css';

class OptionsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            childSocialPosition: 0,
            socialName: "Facebook",
            boardWidth: 470,
            boardHeight: 470
        };
        this.fb = new Facebook();
        this.instagram = new Instagram();
        this.twitter = new Twitter();

        //default
        this.socialObj= this.fb;

        console.log("socal: ");
        console.log(this.socialObj);
    }

    _changeSocialPlatform(event) {
        event.preventDefault();
        if (event == 1) {
            this.setState({ 
                socialName: 'Facebook', 
                socialId: 1,
                socialPosition: 0
            });
            this.socialObj = this.fb;
        }
        else if (event == 2) {
            this.setState({
                socialName: 'Instagram', 
                socialId: 2,
                socialPosition: 0
            });
            this.socialObj = this.instagram;
        }
        else if (event == 3) {
            this.setState({
                socialName: 'Twitter', 
                socialId: 3,
                socialPosition: 0
            });
            this.socialObj = this.twitter;
        }
      //  return this.socialObj;
    }

    changeCanvasSocialSize(e) {
    //    e.preventDefault();
     //   let option = parseInt(e.target.value, 10);
     console.log("e: " + e);
        this.setState({
            boardWidth: this.socialObj.socialSizes[e][0].widthWeb,
            boardHeight: this.socialObj.socialSizes[e][0].heightWeb,
        });
    }

    changeCanvasSize(event)  {
        let e = event.target.value;
        let boardWidth = this.socialObj.socialSizes[e][0].widthWeb;
        let boardHeight = this.socialObj.socialSizes[e][0].heightWeb;
        let size = {
            width: boardWidth,
            height: boardHeight
        }
        this.props.update(size);
    }
  
    render() {
        var socialSizesArray = [];
        let index = 0;
        for (var key in this.socialObj.socialSizes) {
            let keyValue = this.socialObj.socialSizes[index][0].key;
            socialSizesArray.push(<option value={index} key={index}>{keyValue}</option>);
            index++;
        }

        return(
            <div className="componentBox">
                <div className="componentSemiBox componentNetwork">
                    <label className="lblSocialPlatform">Selecciona la red social:</label>
                    <select name="socialPlatform" onChange={(e)=>this._changeSocialPlatform(e)}>
                        <option value="1">Facebook</option>
                        <option value="2">Instagram</option>
                        <option value="3">Twitter</option>
                    </select>
                </div>
                <div className="componentSemiBox componentImageSize">
                    <label className="imageType">Añadir imagen tipo {this.state.socialName}:</label>
                    <select name="socialSize" onChange={(e)=>this.changeCanvasSize(e)}>
                            {socialSizesArray}
                    </select>
                </div>
            </div>
        );      
    }
}

export default OptionsComponent;