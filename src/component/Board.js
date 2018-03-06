import React, { Component } from 'react';
import '../index.css';
import '../css/board.css';



import SocialGeneral from '../social/socialGeneral.js'

class Board extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            file: '', 
            imagePreviewUrl: '', 
            dragging: false, 
            socialName: 'Facebook',
            socialId: 1,
            socialPosition: 0,
            canvasWidth: 470,
            canvasHeight: 470
        };   
    }

    _changeSocialPlatform(e) {
        e.preventDefault();

        console.log("Changin social platform");
        console.log(e.target.value);

        if (e.target.value == 1) {
            this.setState({ 
                socialName: 'Facebook', 
                socialId: 1,
                socialPosition: 0
            });
        }
        else if (e.target.value == 2) {
            this.setState({
                socialName: 'Instagram', 
                socialId: 2,
                socialPosition: 0
            });
        }
        else if (e.target.value == 3) {
            this.setState({
                socialName: 'Twitter', 
                socialId: 3,
                socialPosition: 0
            });
        }
        this.render();
    }

    render() {
        console.log("repaint parent");
        return(
            <div className="boardContainer">
                <div className="componentBox">
                    <label className="lblSocialPlatform">Select social network:</label>
                    <select name="socialPlatform" onChange={(e)=>this._changeSocialPlatform(e)}>
                        <option value="1">Facebook</option>
                        <option value="2">Instagram</option>
                        <option value="3">Twitter</option>
                    </select>
                </div>
                <div className="">
                    <SocialGeneral socialId={this.state.socialId} ref='socialGeneral' 
                   />
                </div>
            </div>
        );
    }
}

export default Board;