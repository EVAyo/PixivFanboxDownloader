// 获取页面上的一些信息，用于文件名中
import { API } from './API'
import { EVT } from './EVT'
import { store } from './Store'

class PageInfo {
  constructor() {
    this.getPageInfo()

    // 页面切换时获取新的页面信息
    window.addEventListener(EVT.events.pageSwitch, () => {
      this.getPageInfo()
    })
  }

  private pageTitle = ''
  private pageTag = ''

  public get getPageTag() {
    return this.pageTag
  }

  // 重置
  // 切换页面时可能旧页面的一些标记在新页面没有了，所以要先重置
  private reset() {
    this.pageTitle = ''
    this.pageTag = ''
  }

  // 储存信息
  // 开始抓取时，把此时的页面信息保存到 store 里。这样即使下载时页面切换了，使用的还是刚开始抓取时的数据。
  public store() {
    this.getPageInfo()
    store.pageInfo.pageTitle = this.pageTitle
    store.pageInfo.pageTag = this.pageTag
  }

  // 获取当前页面的一些信息，用于文件名中
  private getPageInfo() {
    this.reset()

    // 去掉标题上的下载状态、消息数量提示
    this.pageTitle = document.title
      .replace(/\[(↑|→|▶|↓|║|■|√| )\] /, '')
      .replace(/^\(\d.*\) /, '')
  }
}

const pageInfo = new PageInfo()
export { pageInfo }
