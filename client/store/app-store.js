import { observable, computed, action } from 'mobx'

class AppStore {
  @observable text = '测试双向绑定'
  @observable num = 0

  @computed get msg() {
    return this.text
  }

  @action changeMsg(val) {
    this.text = val
  }

  @action addNum() {
    this.num += 1
  }
}

const appStore = new AppStore()

setInterval(() => {
  appStore.addNum()
}, 1000)

export default appStore
