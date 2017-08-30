# Serverless Stack Demo React App

[Serverless Stack](http://serverless-stack.com) is a free comprehensive guide to creating full-stack serverless applications. We create a [note taking app](http://demo.serverless-stack.com) from scratch.

This repo is for the frontend React app that we build over the course of the tutorial. You can find the repo for the backend serverless API [here](https://github.com/AnomalyInnovations/serverless-stack-demo-api). And the repo for the tutorial [here](https://github.com/AnomalyInnovations/serverless-stack-com).

#### Steps

To support the different chapters and steps of the tutorial; we use branches to represent the project codebase at the various points. Here is an index of the various chapters and branches in order.

- [Create a New React.js App](../../tree/create-a-new-reactjs-app)
- [Add App Favicons](../../tree/add-app-favicons)
- [Set up Custom Fonts](../../tree/setup-custom-fonts)
- [Set up Bootstrap](../../tree/setup-bootstrap)
- [Handle Routes with React Router](../../tree/handle-routes-with-react-router)
- [Create Containers](../../tree/create-containers)
- [Adding Links in the Navbar](../../tree/adding-links-in-the-navbar)
- [Handle 404s](../../tree/handle-404s)
- [Create a Login Page](../../tree/create-a-login-page)
- [Login with AWS Cognito](../../tree/login-with-aws-cognito)
- [Add the Session to the State](../../tree/add-the-session-to-the-state)
- [Load the State from the Session](../../tree/load-the-state-from-the-session)
- [Clear the Session on Logout](../../tree/clear-the-session-on-logout)
- [Redirect on Login and Logout](../../tree/redirect-on-login-and-logout)
- [Give Feedback While Logging In](../../tree/give-feedback-while-logging-in)
- [Create the Signup Form](../../tree/create-the-signup-form)
- [Signup with AWS Cognito](../../tree/signup-with-aws-cognito)
- [Add the Create Note Page](../../tree/add-the-create-note-page)
- [Call the Create API](../../tree/call-the-create-api)
- [Upload a File to S3](../../tree/upload-a-file-to-s3)
- [Clear AWS Credentials Cache](../../tree/clear-aws-credentials-cache)
- [List All the Notes](../../tree/list-all-the-notes)
- [Call the List API](../../tree/call-the-list-api)
- [Display a Note](../../tree/display-a-note)
- [Render the Note Form](../../tree/render-the-note-form)
- [Save Changes to a Note](../../tree/save-changes-to-a-note)
- [Delete a Note](../../tree/delete-a-note)
- [Create a Route That Redirects](../../tree/create-a-route-that-redirects)
- [Use the Redirect Routes](../../tree/use-the-redirect-routes)
- [Redirect on Login](../../tree/redirect-on-login)
- [Update the App](../../tree/update-the-app)
- [Code Splitting in Create React App](../../tree/code-splitting-in-create-react-app)

#### Usage

This project is created using [Create React App](https://github.com/facebookincubator/create-react-app).

To use this repo locally, start by cloning it and installing the NPM packages.

``` bash
$ git clone https://github.com/AnomalyInnovations/serverless-stack-demo-client
$ npm install
```

Run it locally.

``` bash
$ npm run start
```

To deploy, replace the following in the [`package.json`](package.json) with your S3 bucket and CloudFront distributions.

```
"deploy": "aws s3 sync build/ s3://notes-app-client",
"postdeploy": "aws cloudfront create-invalidation --distribution-id E1KTCKT9SOAHBW --paths '/*' && aws cloudfront create-invalidation --distribution-id E3MQXGQ47VCJB0 --paths '/*'",
```

And run.

``` bash
$ npm run deploy
```

#### Maintainers

Serverless Stack is authored and maintained by Frank Wang ([@fanjiewang](https://twitter.com/fanjiewang)) & Jay V ([@jayair](https://twitter.com/jayair)). [**Subscribe to our newsletter**](http://eepurl.com/cEaBlf) for updates on Serverless Stack. Send us an [email][Email] if you have any questions.

[Email]: mailto:contact@anoma.ly


