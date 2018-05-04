import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { Button } from 'uiw';
import ScrollToTop from 'react-scroll-up';
import * as action from './redux/action';
import './redux/reducer';
import Demo1 from './component/demo1';
import Demo2 from './component/demo2';
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      dataone: {
        companyName: ''
      }
    };
  }
  add = () => {
    this.props.add();
  };
  decrease = () => {
    this.props.decrease();
  };
  asyncAction = () => {
    this.props.asyncAction();
  };
  componentWillMount() {
    console.log('parent-componentWillMount');
  }
  componentDidMount() {
    console.log('parent-componentDidMount');
  }
  componentWillUnmount() {
    console.log('parent-componentWillUnmount');
  }
  componentWillReceiveProps(nextProps) {
    console.log('parent-componentWillReceiveProps');
    this.setState({
      count: nextProps.count
    });
    if (nextProps.dataone && nextProps.dataone.data && nextProps.dataone.data.body) {
      this.setState({
        dataone: nextProps.dataone.data.body ? nextProps.dataone.data.body : {}
      });
    }
  }
  render() {
    console.log('parent-render');
    return (
      <div>
        <Demo1 title={this.state.dataone ? this.state.dataone.companyName : ''} />
        <Demo2 title={this.state.dataone ? this.state.dataone.companyName : ''} />
        home<br />
        <br />
        <h1>{this.state.count}</h1>
        <Button type="primary" onClick={this.add}>
          +
        </Button>
        <br />
        <br />
        <Button type="primary" onClick={this.decrease}>
          -
        </Button>
        <br />
        <br />
        <Button type="primary" onClick={this.asyncAction}>
          异步action
        </Button>
        <br />
        <br />
        {this.state.dataone ? this.state.dataone.companyName : ''}
        <br />
        <br />
        {this.state.dataone ? this.state.dataone.identifyNo : ''}
        <br />
        <br />
        {this.state.dataone ? this.state.dataone.isCfcaUser : ''}
        <br />
        <br />
        {this.state.dataone ? this.state.dataone.phonenum : ''}
        <br />
        <br />
        {this.state.dataone ? this.state.dataone.userCertImgDown : ''}
        <br />
        <br />
        <div>
          <ScrollToTop showUnder={160} style={{ bottom: 20, zIndex: 999 }}>
            <div>Top</div>
          </ScrollToTop>
        </div>
      </div>
    );
  }
}
Home.propTypes = {
  add: propTypes.func,
  decrease: propTypes.func,
  count: propTypes.number,
  asyncAction: propTypes.func,
  dataone: propTypes.object
};
Home.defaultProps = {
  add: () => {},
  count: 0,
  decrease: () => {},
  asyncAction: () => {},
  dataone: {}
};
export default connect(
  ({ demo }) => ({
    count: demo.computed.count,
    dataone: demo.DESP_accountData.res
  }),
  dispatch => ({
    add: bindActionCreators(action.add, dispatch),
    decrease: bindActionCreators(action.decrease, dispatch),
    asyncAction: bindActionCreators(action.asyncAction, dispatch)
  })
)(Home);
