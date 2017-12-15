import React from 'react'
import { observer, inject } from 'mobx-react'

@inject('appStore') @observer
class App extends React.Component {
  componentDidMount() {
    const val = this.text.value

    this.text.value = ''
    this.text.focus()
    this.text.value = val
  }

  handleChange = (e) => {
    this.props.appStore.changeMsg(e.target.value)
  }

  render() {
    return (
      <div>
        <p>
          <input
            type="text"
            value={this.props.appStore.msg}
            onChange={this.handleChange}
            ref={(text) => { this.text = text }}
          />
        </p>
        <p>{this.props.appStore.msg}</p>
        <p>距离打开页面已经过：{this.props.appStore.num} 秒</p>
      </div>
    )
  }
}

export default App
