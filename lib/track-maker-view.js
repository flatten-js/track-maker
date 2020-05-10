'use babel';

export default class TrackMakerView {
  constructor(timer) {
    this.timer = timer
    this.init()
  }

  init() {
    this.element()
    this.timer.message = this._message
    this.timer.render = this._render
  }

  element() {
    this.root = document.createElement('div')
    this.root.classList.add('track-maker', 'inline-block')

    const icon = document.createElement('span')
    icon.classList.add('icon', 'icon-watch')

    this.status = document.createElement('span')
    this.status.classList.add('track-timer')

    this.root.appendChild(icon)
    this.root.appendChild(this.status)
  }

  tooltip(title) {
    this.tip = atom.tooltips.add(this.root, { title: title })
  }

  getElement() {
    return this.root
  }

  destroy() {
    this.root.remove()
  }

  _message = name => {
    if (this.tip) this.tip.dispose()
    this.tooltip(`Now in the ${name}`)
  }

  _render = status => {
    this.status.textContent = status
  }
}
