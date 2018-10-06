# Serverless Stack Demo React App

[Serverless Stack](http://serverless-stack.com) is a free comprehensive guide to creating full-stack serverless applications. We create a [note taking app](http://demo.serverless-stack.com) from scratch.

This repo is for the frontend React app that we build over the course of the tutorial. You can find the repo for the backend serverless API [here](https://github.com/AnomalyInnovations/serverless-stack-demo-api). And the repo for the tutorial [here](https://github.com/AnomalyInnovations/serverless-stack-com).

#### Steps

To support the different chapters and steps of the tutorial; we use branches to represent the project codebase at the various points. Here is an index of the various chapters and branches in order.

- [Part I](../../tree/part-1)
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


