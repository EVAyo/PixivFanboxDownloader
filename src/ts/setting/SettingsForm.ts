export interface SettingsForm extends HTMLFormElement {
  image: HTMLInputElement
  music: HTMLInputElement
  video: HTMLInputElement
  compressed: HTMLInputElement
  ps: HTMLInputElement
  other: HTMLInputElement
  free: HTMLInputElement
  pay: HTMLInputElement
  feeSwitch: HTMLInputElement
  fee: HTMLInputElement
  idRangeSwitch: HTMLInputElement
  idRange: RadioNodeList
  idRangeInput: HTMLInputElement
  postDate: HTMLInputElement
  postDateStart: HTMLInputElement
  postDateEnd: HTMLInputElement
  saveLink: HTMLInputElement
  saveText: HTMLInputElement
  userSetName: HTMLInputElement
  fileNameSelect: HTMLSelectElement
  autoStartDownload: HTMLInputElement
  downloadThread: HTMLInputElement
  dateFormat: HTMLInputElement
  savePostCover: HTMLInputElement
  userSetLang: HTMLInputElement
  tipCreateFolder: HTMLInputElement
  showAdvancedSettings: HTMLInputElement
  bgDisplay: HTMLInputElement
  bgOpacity: HTMLInputElement
  bgPositionY: HTMLInputElement
  namingRuleList: HTMLElement
  boldKeywords: HTMLElement
  showNotificationAfterDownloadComplete: HTMLInputElement
  zeroPadding: HTMLInputElement
  zeroPaddingLength: HTMLInputElement
  deduplication: HTMLInputElement
  unifiedURL: HTMLInputElement
  titleMustTextSwitch: HTMLInputElement
  titleMustText: HTMLInputElement
  titleCannotTextSwitch: HTMLInputElement
  titleCannotText: HTMLInputElement
  nameruleForNonImages: HTMLInputElement
  fileNameIncludeSwitch: HTMLInputElement
  fileNameInclude: HTMLInputElement
  fileNameExcludeSwitch: HTMLInputElement
  fileNameExclude: HTMLInputElement
}
