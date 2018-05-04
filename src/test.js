/** @format */

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import store from 'reduxes/store'
import router from 'routers'
import { BrowserRouter } from 'react-router-dom'
import 'assets/css/scss/main.scss'
import 'assets/css/scss/main.scss'
const renders = Component =>
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Component />
      </BrowserRouter>
    </Provider>,
    document.getElementById('root'),
  )
renders(router)
