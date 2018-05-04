import React from 'react'
export default class Demo2 extends React.Component {
  componentWillMount() {
    console.log('child2-componentWillMount')
  }
  componentDidMount() {
    console.log('child2-componentDidMount')
  }
  componentWillReceiveProps() {
    console.log('child2-componentWillReceiveProps')
  }
  componentWillUnmount() {
    console.log('child2-componentWillUnmount')
  }
  render() {
    console.log('child2-render')
    return <div>2222222</div>
  }
}
