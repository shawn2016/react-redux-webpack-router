
'use strict';
// require('babel-register')();

const express = require('express');
const path = require('path');
const fs = require('fs');
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux'
import store from 'reduxes/store'
import { StaticRouter } from 'react-router-dom'
import Router from 'routers'
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
let templateHtml = fs.readFileSync(path.join(__dirname, `${DOCS_PATH}/assets/index.html`), 'utf8')
app.set('port', PORT);
app.set('ipAdress', IP_ADRESS);
app.use('/assets', express.static(path.resolve(__dirname, DOCS_PATH, 'assets/')));
app.get('*', serverRender);
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
app.listen(
  PORT,
  IP_ADRESS,
  () => console.log(`server is listening on ${IP_ADRESS}:${PORT}`)
);


function serverRender(req, res) {

  const location = req.url;
  const context = {};

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
  return res
    .status(200)
    .set('content-type', 'text/html')
    .send(renderFullPage(html));

}
function renderFullPage(html) {
  const indexHtml = {
    template: templateHtml.replace('<!-- app -->', html)
  }
  return indexHtml.template;
}
