import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class OAuth extends Component {
    getHashValue(key) {
        var matches = window.location.hash.match(new RegExp(key + '=([^&]*)'));
        return matches ? matches[1] : null;
    }
    render() {
        if (!!this.getHashValue('error_description')) {
            window.opener.postMessage({
                error_description: this.getHashValue('error_description')
            }, '*');
        } else {
            window.opener.postMessage({
                AccessToken: this.getHashValue('access_token'),
                ExpiresIn: this.getHashValue('expires_in'),
                IdToken: this.getHashValue('id_token'),
                TokenType: this.getHashValue('token_type')
            }, '*');
        }
        // window.close();

        return null;
    }
}


export default withRouter(OAuth);
