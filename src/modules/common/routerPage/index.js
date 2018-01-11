import React, { Component } from 'react'
import Routers from 'modules/router'
import propTypes from 'prop-types'
class RouterPage extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
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
            if (Routers[`${routeModule}Route`] === undefined) { // url第一个反斜杠后面没有匹配
                this.setState({
                    is404: true
                })
            }
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
            console.log(route)
            if (route === undefined) { // url第一个反斜杠匹配上了 第二个没有匹配上
                this.setState({
                    is404: true
                })
            }
            const component = await route.ensure()
            console.log(component)
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
            <div>cococo{this.state.component}</div>
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