/*eslint-disable*/
import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import middleware from 'reduxes/middleware'
import reducers, { injectStore } from 'reduxes/reducers'


const finalCreateStore = compose(applyMiddleware(thunk, middleware), window.devToolsExtension ? window.devToolsExtension() : f => f, )(createStore)
let store
// window.devToolsExtension ? window.devToolsExtension() : f => f,
store = finalCreateStore(reducers)
store.subscribe(() => {
    console.log('[LOG--]', store.getState())
})
// 注入到reducer中
injectStore(store)
export default store