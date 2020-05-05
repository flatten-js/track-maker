'use babel';

export default class TrackMakerView {
  constructor(timer) {
    this.timer = timer
    this.init()
  }

  init() {
    this.element()
    this.timer.render = this._render
  }

  element() {
    this.root = document.createElement('div')
    this.root.classList.add('track-maker', 'inline-block')

    const icon = document.createElement('span')
    icon.classList.add('icon', 'icon-watch')

    this.message = document.createElement('span')
    this.message.classList.add('track-timer')

    this.root.appendChild(icon)
    this.root.appendChild(this.message)
  }

  getElement() {
    return this.root
  }

  _render = (status) => {
    this.message.textContent = status
  }
}
