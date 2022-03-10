import { EVT } from './EVT'
import { DOM } from './DOM'
import { SaveSettings } from './SaveSettings'
import { SettingsForm } from './Settings.d'
import formHtml from './SettingHTML'

// 设置表单
class Settings {
  constructor() {
    this.form = DOM.useSlot('form', formHtml) as SettingsForm

    this.allCheckBox = this.form.querySelectorAll(
      'input[type="checkbox"]'
    ) as NodeListOf<HTMLInputElement>

    this.allRadio = this.form.querySelectorAll(
      'input[type="radio"]'
    ) as NodeListOf<HTMLInputElement>

    this.allSwitch = this.form.querySelectorAll('.checkbox_switch')

    this.allLabel = this.form.querySelectorAll('label')

    this.bindEvents()

    new SaveSettings(this.form)

    // new SaveSettings 会初始化选项，但可能会有一些选项的值在初始化过程中没有发生改变，也就不会被监听到变化。所以这里需要直接初始化以下状态。

    this.initFormBueatiful()
  }

  // 设置表单上美化元素的状态
  private initFormBueatiful() {
    // 设置改变时，重设 label 激活状态
    this.resetLabelActive()

    // 重设该选项的子选项的显示/隐藏
    this.resetSubOptionDisplay()
  }

  public form: SettingsForm
  private allSwitch: NodeListOf<HTMLInputElement> // 所有开关（同时也是复选框）
  private allCheckBox: NodeListOf<HTMLInputElement> // 所有复选框
  private allRadio: NodeListOf<HTMLInputElement> // 单选按钮
  private allLabel: NodeListOf<HTMLLabelElement> // 所有 label 标签

  private readonly activeClass = 'active'

  private readonly chooseKeys = ['Enter', 'NumpadEnter'] // 让回车键可以控制复选框（浏览器默认只支持空格键）

  private bindEvents() {
    // 给美化的复选框绑定功能
    for (const checkbox of this.allCheckBox) {
      this.bindCheckboxEvent(checkbox)
    }

    // 给美化的单选按钮绑定功能
    for (const radio of this.allRadio) {
      this.bindRadioEvent(radio)
    }

    // 处理 label 状态
    window.addEventListener(EVT.events.settingChange, () => {
      this.initFormBueatiful()
    })

    // 显示命名字段提示
    this.form
      .querySelector('.showFileNameTip')!
      .addEventListener('click', () =>
        DOM.toggleEl(document.querySelector('.fileNameTip')! as HTMLDivElement)
      )

    // 显示日期格式提示
    this.form
      .querySelector('.showDateTip')!
      .addEventListener('click', () =>
        DOM.toggleEl(document.querySelector('.dateFormatTip')! as HTMLElement)
      )

    // 输入框获得焦点时自动选择文本（文件名输入框例外）
    const centerInputs: NodeListOf<HTMLInputElement> =
      this.form.querySelectorAll('input[type=text]')
    for (const el of centerInputs) {
      if (el.name !== 'userSetName') {
        el.addEventListener('focus', function () {
          this.select()
        })
      }
    }

    // 把下拉框的选择项插入到文本框里
    this.insertValueToInput(this.form.fileNameSelect, this.form.userSetName)
  }

  // 把下拉框的选择项插入到文本框里
  private insertValueToInput(from: HTMLSelectElement, to: HTMLInputElement) {
    from.addEventListener('change', () => {
      if (from.value !== 'default') {
        // 把选择项插入到光标位置,并设置新的光标位置
        const position = to.selectionStart!
        to.value =
          to.value.substr(0, position) +
          from.value +
          to.value.substr(position, to.value.length)
        to.selectionStart = position + from.value.length
        to.selectionEnd = position + from.value.length
        to.focus()
      }
    })
  }

  // 设置复选框的事件
  private bindCheckboxEvent(el: HTMLInputElement) {
    // 让复选框支持用回车键选择
    el.addEventListener('keydown', (event: KeyboardEvent) => {
      if (this.chooseKeys.includes(event.code)) {
        el.checked = !el.checked
        this.emitChange(el.name, el.checked)
      }
    })

    // 点击美化按钮，反转复选框的值
    el.nextElementSibling!.addEventListener('click', () => {
      el.checked = !el.checked
      this.emitChange(el.name, el.checked)
    })

    // 点击它的 label 时，传递它的值
    const label = this.form.querySelector(`label[for="${el.id}"]`)
    if (label) {
      label.addEventListener('click', () => {
        // 点击复选框的 label 不要手动修改 checked ，因为浏览器会自动处理
        this.emitChange(el.name, el.checked)
      })
    }
  }

  // 设置单选控件的事件
  private bindRadioEvent(el: HTMLInputElement) {
    // 点击美化按钮，选择当前单选控件
    el.nextElementSibling!.addEventListener('click', () => {
      el.checked = true
      // 对于单选按钮，它的值是 value，不是 checked
      this.emitChange(el.name, this.form[el.name].value)
    })

    // 点击它的 label 时，传递它的值
    const label = this.form.querySelector(`label[for="${el.id}"]`)
    if (label) {
      label.addEventListener('click', () => {
        this.emitChange(el.name, this.form[el.name].value)
      })
    }
  }

  // 当选项的值被改变时，触发 settingChange 事件
  private emitChange(name: string, value: string | number | boolean) {
    EVT.fire(EVT.events.settingChange, { name: name, value: value })
  }

  // 重设 label 的激活状态
  private resetLabelActive() {
    // 设置复选框的 label 的激活状态
    for (const checkbox of this.allCheckBox) {
      this.setLabelActive(checkbox)
    }

    // 设置单选按钮的 label 的激活状态
    for (const radio of this.allRadio) {
      this.setLabelActive(radio)
    }
  }

  // 设置 input 元素对应的 label 的激活状态
  private setLabelActive(input: HTMLInputElement) {
    const label = this.form.querySelector(`label[for="${input.id}"]`)
    if (label) {
      const method = input.checked ? 'add' : 'remove'
      label.classList[method]('active')
    }
  }

  // 重设子选项的显示/隐藏
  private resetSubOptionDisplay() {
    for (const _switch of this.allSwitch) {
      const subOption = this.form.querySelector(
        `.subOptionWrap[data-show="${_switch.name}"]`
      ) as HTMLSpanElement
      if (subOption) {
        subOption.style.display = _switch.checked ? 'inline' : 'none'
      }
    }
  }
}

const settings = new Settings()
const form = settings.form

export { form }
