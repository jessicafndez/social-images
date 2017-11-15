import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../index.css';

import Facebook from '../social/facebook.js';
import Instagram from '../social/instagram.js';

class SocialOptions extends Component {
    constructor(props) {
        super(props);
    }

    createWithSocial(id) {
        console.log("Social Id: ");
        console.log(id);
    }

    render() {
        return (
            <label>In board Options</label>
        )
    }
}

export default SocialOptions