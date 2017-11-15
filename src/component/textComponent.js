import React, { Component } from 'react';


class TextComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            textString: '',
            textColor: '#000000',
            textSize: 16,
            textPosX: 0,
            textPosY: 0
        }
    }

    handleAddText(e) {
        this.setState({textString: e.target.value});
    }

    handleAddColor(e) {
        this.setState({textColor: e.target.value});
    }

    handleAddSize(e) {
        this.setState({textSize: e.target.value});
    }   

    sendValues(e) {
        this.props.sendValues(this.state);
    }

    render() {
        return(
            <div className="textContainer">
                <label>Insert New Text on Image</label>
                <div> 
                    <div className="textContainerRow">
                        <label htmlFor="newText">Text to insert:</label><br/>
                        <input className="newText" name="newText" id="newText"
                        onChange={(e)=>this.props.addCanvasText(e)}/>
                    </div>
                    <div className="textContainerRow">
                        <label htmlFor="newColor">Color: </label><br/>
                        <input className="" id="newColor" name="newColor" placeholder="#000000"
                        onChange={(e)=>this.handleAddColor(e)}/>
                    </div>
                    <div className="textContainerRow">
                        <label htmlFor="textSize">Size: </label><br/>
                        <input className="textSize" id="textSize" name="textSize" placeholder="16"
                        onChange={(e)=>this.handleAddSize(e)}/>px
                    </div>
                    <button onClick={(e)=>this.sendValues(e)}>Add</button>
                </div>
            </div>
        );
    }
}

export default TextComponent;