
'use strict';
// require('babel-register')();

const express = require('express');
const path = require('path');
const fs = require('fs');

const chalk = require('chalk');
// chalk是一个颜色的插件。可以通过chalk.blue(‘hello world’)来改变颜色，但是我并没有式样成功，有待验证。
const bodyParser = require('body-parser');
// const helmet = require('helmet');
const compression = require('compression');
const PrettyError = require('pretty-error');
const Promise = require('bluebird');
const serialize = require('serialize-javascript');
const morgan = require('morgan');
// isomorphic:
import React from 'react';
import { renderToString } from 'react-dom/server';
import moment from 'moment';
import { Provider } from 'react-redux'
import store from 'reduxes/store'
import { StaticRouter } from 'react-router-dom'
import Router from 'routers'
// import jsdom from 'jsdom'
const jsdom = require('rs-jsdom').rsJsdom
global.document = jsdom('<!doctype html><html><body></body></html>', { url: 'http://localhost' })
global.window = document.defaultView
global.navigator = window.navigator
global.location = window.location
global.history = window.history
global.sessionStorage = window.sessionStorage
const DOCS_PATH = '../../../dist';
const PORT = 8090;
const IP_ADRESS = 'localhost';

const app = express();
let templateHtml = fs.readFileSync(path.join(__dirname, '../../../dist/assets/index.html'), 'utf8')
console.log(templateHtml)
app.set('port', PORT);
app.set('ipAdress', IP_ADRESS);

// not mandatory but better looking console errors
const pe = new PrettyError();
pe.start();

// app.use(helmet());          // ensure app security
app.use(compression());     // gzip compress if bowser supports it
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// if you need logs (note: uncomment line 11 too):
app.use(morgan('combined'));

app.use('/assets', express.static(path.resolve(__dirname, DOCS_PATH, 'assets/')));
// IMPORTANT: '/*' and not '/'
// since you want browser refresh (= first render) to work from any route of the application
app.get('*', serverRender);
// global.document = window.document
/** ========================================================
*    error management
======================================================== */
// catch error 404:
app.use(
  (req, res, next) => {
    console.log('req.url: ', req.url);
    const err = new Error('Not found');
    err.status = 404;
    next(err);
  }
);

/* eslint-disable no-unused-vars */
app.use(
  (err, req, res, next) => {
    if (err.status === 404) {
      res.status(404).send('Sorry nothing here for now...');
    }
    console.error(err);
    res.status(500).send('internal server error');
  }
);

/* eslint-enable no-unused-vars */
/* ======================================================= */
// $FlowIgnore
// launch server:
app.listen(
  PORT,
  IP_ADRESS,
  () => console.log(`
    =====================================================
    -> Server (${chalk.bgBlue('SSR')}) 🏃 (running) on ${chalk.green(IP_ADRESS)}:${chalk.green(PORT)}
    =====================================================
  `)
);

module.exports = app; // export app just for testing purpose


async function serverRender(req, res) {

  const location = req.url;
  const context = {};

  const response = await fakeFetch();

  const InitialView = (
    <Provider store={store}>
      <StaticRouter
        url={req.url}
        context={context}
      >
        <Router />
      </StaticRouter>
    </Provider>
  );
  console.log('InitialView', InitialView)
  let html = '';
  try {
    html = renderToString(InitialView);
  } catch (error) {
    console.error('error: renderToString failed: ', error);
  }

  if (context.url) {
    return res.status.end({ location: context.url });
  }

  const preloadedState = JSON.stringify(store.getState()); // serialize is better than 
  console.log(store.getState())
  return res
    .status(200)
    .set('content-type', 'text/html')
    .send(renderFullPage(html, preloadedState));

}

function fakeFetch() {
  return new Promise((resolve) => setTimeout(() => resolve({ info: 'whats up?' }), 200));
}

function renderFullPage(html, preloadedState = '') {
  // const indexHtml = {
  //   template: `<!DOCTYPE html>
  //   <html lang="en">

  //   <head>
  //       <meta charset="UTF-8">
  //       <meta name="viewport" content="width=device-width, initial-scale=1.0">
  //       <meta http-equiv="X-UA-Compatible" content="ie=edge">
  //       <title>react</title>
  //   <link href="/../assets/styles.css" rel="stylesheet"></head>

  //   <body>
  //       <div id="root">${html}</div>
  //   <script type="text/javascript" src="/../assets/vendor.js"></script><script type="text/javascript" src="/../assets/main.js"></script></body>

  //   </html>  
  // `
  // };
  const indexHtml = {
    template: templateHtml.replace('<!-- app -->', html)
  }

  return indexHtml.template;
}
