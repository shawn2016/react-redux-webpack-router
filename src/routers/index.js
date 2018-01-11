import React, { Component } from 'react'
import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom'
import AsyncComponent from 'utils/AsyncComponent'
const Login = AsyncComponent(() => import('modules/login/login'))
const RouterPage = AsyncComponent(() => import('modules/common/routerPage'))

export default class Routers extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/:modules/:page" component={RouterPage} />
          <Route exact path="/" component={Login} />
        </Switch>
      </BrowserRouter>
    )
  }
}