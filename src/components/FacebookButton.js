import React from "react";
import PropTypes from "prop-types";
import { Auth } from "aws-amplify";
import config from "../config";
import { Button, Glyphicon } from "react-bootstrap";

import FacebookProvider, { Login } from "react-facebook-sdk";

class FacebookButton extends React.Component {
  responseFacebook = async data => {
    const _this = this;

    const { reauthorize_required_in, accessToken } = data.tokenDetail;
    const user = {
      email: data.profile.email,
      name: data.profile.name
    };

    return Auth.federatedSignIn(
      "facebook",
      {
        token: accessToken,
        reauthorize_required_in
      },
      // a user object
      user
    ).then(data => {
      _this.props.callback(data);
    });
  };

  render() {
    const { buttonClass, children } = this.props;
    return (
      <FacebookProvider appId={config.social.facebook}>
        <Login
          scope="public_profile,email"
          onResponse={this.responseFacebook}
          onError={this.handleError}
        >
          <Button
            bsSize="large"
            bsClass={buttonClass + " btn-block btn btn-lg btn-default"}
          >
            {children ? children : null}
          </Button>
        </Login>
      </FacebookProvider>
    );
  }
}

FacebookButton.propTypes = {
  callback: PropTypes.func.isRequired
};

export default FacebookButton;
