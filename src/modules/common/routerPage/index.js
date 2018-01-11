/*eslint-disable */
import React, { Component } from 'react'
import Routers from 'modules/router'
import propTypes from 'prop-types'
import { Link } from 'react-router-dom'
class RouterPage extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    componentWillReceiveProps(nextProps) {
        this.loadComponent(nextProps)
    }
    componentWillMount() {
        this.loadComponent(this.props)
    }
    loadComponent = async (props) => {
        const { match, history, location } = props
        const { params } = match
        const tempModule = params.modules.split('')
        const routePage = params.page.toLowerCase()
        const routeModule = tempModule.shift().toUpperCase() + tempModule.join('')
        try {
            let route
            outer:
            for (var i = 0; Routers[`${routeModule}Route`].actions.length; i++) {
                if (Routers[`${routeModule}Route`].actions[i] && Routers[`${routeModule}Route`].actions[i].action && Routers[`${routeModule}Route`].actions[i].action.toLowerCase() === routePage) {
                    route = Routers[`${routeModule}Route`].actions[i]
                    if (Routers[`${routeModule}Route`].actions[i].menuId) {
                        this.setState({
                            selectMenuId: Routers[`${routeModule}Route`].actions[i].menuId
                        })
                    }
                    break outer
                } else if (Routers[`${routeModule}Route`].actions[i].childrenList) {
                    inter:
                    for (var j = 0; j < Routers[`${routeModule}Route`].actions[i].childrenList.length; j++) {
                        if (Routers[`${routeModule}Route`].actions[i].childrenList[j].action.toLowerCase() === routePage) {
                            route = Routers[`${routeModule}Route`].actions[i].childrenList[j]
                            if (Routers[`${routeModule}Route`].actions[i].menuId) {
                                this.setState({
                                    selectMenuId: Routers[`${routeModule}Route`].actions[i].menuId
                                })
                            }
                            break outer
                        }
                    }
                }
            }
            const component = await route.ensure()
            this.setState({
                component: React.createElement(component.default, { match, history, params: location.state })
            })
        } catch (e) {
            console.log('Global Router', Routers)
            console.log('moudle: ', `${routeModule}Route`)
            console.log('page: ', routePage)
            console.error('没有找到对应的页面', e)
        }
    }
    render() {
        return (
            <div>
                <div>
                    <Link to="/home/home">home</Link><br />
                    <Link to="/home/dashboard">dashboard</Link><br />
                    <Link to="/login">login</Link><br />
                </div>
                {this.state.component}</div>
        )
    }
}
RouterPage.propTypes = {
    loadComponent: propTypes.func
}
RouterPage.defaultProps = {
    loadComponent: () => { }
}
export default RouterPage