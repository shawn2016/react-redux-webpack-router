/*eslint-disable */
import React, { Component } from 'react'
import Routers from 'modules/router'
import propTypes from 'prop-types'
import { Menu, Icon } from 'isui'
import { Link } from 'react-router-dom'
class RouterPage extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  componentWillReceiveProps(nextProps) {
    this.loadComponent(nextProps)
  }
  componentWillMount() {
    this.loadComponent(this.props)
  }
  loadComponent = async props => {
    const { match, history, location } = props
    const { params } = match
    const tempModule = params.modules.split('')
    const routePage = params.page.toLowerCase()
    const routeModule = tempModule.shift().toUpperCase() + tempModule.join('')
    try {
      let route
      outer: for (var i = 0; Routers[`${routeModule}Route`].actions.length; i++) {
        if (
          Routers[`${routeModule}Route`].actions[i] &&
          Routers[`${routeModule}Route`].actions[i].action &&
          Routers[`${routeModule}Route`].actions[i].action.toLowerCase() === routePage
        ) {
          route = Routers[`${routeModule}Route`].actions[i]
          if (Routers[`${routeModule}Route`].actions[i].menuId) {
            this.setState({
              selectMenuId: Routers[`${routeModule}Route`].actions[i].menuId,
            })
          }
          break outer
        } else if (Routers[`${routeModule}Route`].actions[i].childrenList) {
          inter: for (var j = 0; j < Routers[`${routeModule}Route`].actions[i].childrenList.length; j++) {
            if (Routers[`${routeModule}Route`].actions[i].childrenList[j].action.toLowerCase() === routePage) {
              route = Routers[`${routeModule}Route`].actions[i].childrenList[j]
              if (Routers[`${routeModule}Route`].actions[i].menuId) {
                this.setState({
                  selectMenuId: Routers[`${routeModule}Route`].actions[i].menuId,
                })
              }
              break outer
            }
          }
        }
      }
      const component = await route.ensure()
      this.setState({
        component: React.createElement(component.default, { match, history, params: location.state }),
      })
    } catch (e) {
      console.log('Global Router', Routers)
      console.log('moudle: ', `${routeModule}Route`)
      console.log('page: ', routePage)
      console.error('没有找到对应的页面', e)
    }
  }
  onSelect(index, menuItem) {
    console.log('index::', index, menuItem)
  }
  onClose(index) {
    console.log('index::', index)
  }
  render() {
    return (
      <div>
        <div>
          <Menu defaultActive="1" defaultOpened={['5']} style={{ width: 240, height: '100%' }} onClose={this.onClose.bind(this)} onSelect={this.onSelect.bind(this)}>
            <Menu.Item index="1">
              <Icon type="date" />首页
            </Menu.Item>
            <Menu.SubMenu
              index="2"
              title={
                <span>
                  <Icon type="menu" />
                  <span>天猫超市</span>
                </span>
              }
            >
              <Menu.Item index="2-1">进口食品</Menu.Item>
              <Menu.Item index="2-2">食品饮料</Menu.Item>
              <Menu.Item index="2-3">美容洗护</Menu.Item>
            </Menu.SubMenu>
            <Menu.Item disabled index="3">
              <Icon type="windows" />淘抢购
            </Menu.Item>
            <Menu.Item index="4">
              <Icon type="star-on" />电器城
            </Menu.Item>
            <Menu.SubMenu
              index="5"
              title={
                <span>
                  <Icon type="verification" />
                  <span>折叠菜单</span>
                </span>
              }
            >
              <Menu.Item index="5-1">生活电器</Menu.Item>
              <Menu.Item index="5-2">厨房电器</Menu.Item>
              <Menu.Item index="5-3">健康电器</Menu.Item>
              <Menu.Item index="5-4">手机配件</Menu.Item>
            </Menu.SubMenu>
          </Menu>
          <Link to="/home/home">home</Link>
          <br />
          <Link to="/home/dashboard">dashboard</Link>
          <br />
          <Link to="/login">login</Link>
          <br />
        </div>
        {this.state.component}
      </div>
    )
  }
}
RouterPage.propTypes = {
  loadComponent: propTypes.func,
}
RouterPage.defaultProps = {
  loadComponent: () => {},
}
export default RouterPage
