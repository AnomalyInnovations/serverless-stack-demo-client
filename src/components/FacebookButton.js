import React from 'react';
import PropTypes from 'prop-types';
import { socialOAuth2 } from "../libs/awsLib"
import config from '../config'
import { Button, Glyphicon } from "react-bootstrap";

import FacebookProvider, { Login } from 'react-facebook';

class FacebookButton extends React.Component {
    responseFacebook = async (data) => {
        var userToken = await socialOAuth2('Facebook');
        if (!!userToken) this.props.callback(userToken);
    }
    render() {
        const {buttonClass, children} = this.props;
        return (
            <FacebookProvider appId={config.cognito.FACEBOOK_API_KEY}>
                <Login
                    scope="public_profile,email"
                    onResponse={this.responseFacebook}
                    onError={this.handleError}
                >
                    <Button bsSize="large" bsClass={buttonClass + " btn-block btn btn-lg btn-default"}>
                        {children ? children: null}
                    </Button>
                </Login>
            </FacebookProvider>
        )
    }
}

FacebookButton.propTypes = {
    callback: PropTypes.func.isRequired
};

export default FacebookButton;





