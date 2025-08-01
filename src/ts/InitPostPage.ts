import { lang } from './Lang'
import { Colors } from './Colors'
import { Tools } from './Tools'
import { InitPageBase } from './InitPageBase'
import { API } from './API'
import { Utils } from './utils/Utils'
import { EVT } from './EVT'
import { states } from './States'

class InitPostPage extends InitPageBase {
  constructor() {
    super()
    this.init()
  }

  // 添加中间按钮
  protected addCrawlBtns() {
    Tools.addBtn('crawlBtns', Colors.bgBlue, '_抓取这篇投稿').addEventListener(
      'click',
      () => {
        this.readyCrawl()
      }
    )
  }

  protected initAny(): void {
    EVT.bindOnce('quickCrawl', EVT.list.quickCrawl, () => {
      if (!states.busy) {
        this.readyCrawl()
      }
    })
  }

  protected destroy() {
    Tools.clearSlot('crawlBtns')
  }

  protected nextStep() {
    this.getPostDataThreadNum = 1
    this.fetchPost()
  }

  protected async fetchPost() {
    await states.awaitNextCrawl()

    try {
      const data = await API.getPost(
        Utils.getURLPathField(window.location.pathname, 'posts')
      )
      states.addNextCrawlTime()
      this.afterFetchPost(data)
    } catch (error) {
      console.log(error)
      states.addNextCrawlTime('long')
      this.fetchPost()
    }
  }
}

export { InitPostPage }
