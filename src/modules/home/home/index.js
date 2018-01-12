import React from 'react'
import { connect } from 'react-redux'
import propTypes from 'prop-types'
import { bindActionCreators } from 'redux'
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
  componentWillReceiveProps(nextProps) {
    this.setState({
      count: nextProps.count,
    })
  }
  render() {
    return (
      <div>
        home<br /><br />
        <h1>{this.state.count}</h1>
        <button onClick={this.add}>+</button><br /><br />
        <button onClick={this.decrease}>-</button><br /><br />
      </div>

    )
  }
}
Home.propTypes = {
  add: propTypes.func,
  decrease: propTypes.func,
  count: propTypes.number,
}
Home.defaultProps = {
  add: () => { },
  count: 0,
  decrease: () => { },
}
export default connect(({ demo }) => ({
  count: demo.count,
}), dispatch => ({
  add: bindActionCreators(action.add, dispatch),
  decrease: bindActionCreators(action.decrease, dispatch),
}))(Home)