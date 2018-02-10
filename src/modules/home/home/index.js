import React from 'react'
import { connect } from 'react-redux'
import propTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { Button } from 'uiw'
import ScrollToTop from 'react-scroll-up'
import * as action from './redux/action'
import './redux/reducer'
class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0,
    }
  }
  add = () => {
    this.props.add()
  }
  decrease = () => {
    this.props.decrease()
  }
  asyncAction = () => {
    this.props.asyncAction()
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    this.setState({
      count: nextProps.count,
      dataone: nextProps.dataone.body,
    })
  }
  render() {
    return (
      <div>
        home<br /><br />
        <h1>{this.state.count}</h1>
        <Button type="primary" onClick={this.add}>+</Button><br /><br />
        <Button type="primary" onClick={this.decrease}>-</Button><br /><br />
        <Button type="primary" onClick={this.asyncAction}>-</Button><br /><br />
        {this.state.dataone ? this.state.dataone.companyName : ''}<br /><br />
        {this.state.dataone ? this.state.dataone.identifyNo : ''}<br /><br />
        {this.state.dataone ? this.state.dataone.isCfcaUser : ''}<br /><br />
        {this.state.dataone ? this.state.dataone.phonenum : ''}<br /><br />
        {this.state.dataone ? this.state.dataone.userCertImgDown : ''}<br /><br />
        <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
        <div>
          <ScrollToTop showUnder={160} style={{ bottom: 20, zIndex: 999 }}>
            <div>Top</div>
          </ScrollToTop>
        </div>
      </div>


    )
  }
}
Home.propTypes = {
  add: propTypes.func,
  decrease: propTypes.func,
  count: propTypes.number,
  asyncAction: propTypes.func,
  dataone: propTypes.object,
}
Home.defaultProps = {
  add: () => { },
  count: 0,
  decrease: () => { },
  asyncAction: () => { },
  dataone: {},
}
export default connect(({ demo }) => ({
  count: demo.computed.count,
  dataone: demo.DESP_accountData.res,
}), dispatch => ({
  add: bindActionCreators(action.add, dispatch),
  decrease: bindActionCreators(action.decrease, dispatch),
  asyncAction: bindActionCreators(action.asyncAction, dispatch),
}))(Home)