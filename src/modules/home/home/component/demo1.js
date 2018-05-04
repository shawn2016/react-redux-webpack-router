import React from 'react'
export default class Demo1 extends React.Component {
  componentWillMount() {
    console.log('child1-componentWillMount')
  }
  componentDidMount() {
    console.log('child1-componentDidMount')
  }
  componentWillReceiveProps() {
    console.log('child1-componentWillReceiveProps')
  }
  componentWillUnmount() {
    console.log('child1-componentWillUnmount')
  }
  render() {
    console.log('child1-render')
    return <div>2222222</div>
  }
}
