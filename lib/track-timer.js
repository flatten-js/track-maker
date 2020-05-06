'use babel'

import { EventEmitter } from 'events'

class TrackTimer extends EventEmitter {
  constructor(opt = {}) {
    super()
    this.sprint = opt.sprint
    this.interval = opt.interval
    this.track = []
    this.current = null
    this.init()
  }

  init() {
    this.track = [this.sprint, this.interval]
    this.timer = null
    this.change()
  }

  change() {
    return this.current = this.track.shift()
  }

  start() {
    if (this.timer) return
    return this.tick() || true
  }

  tick = () => {
    this.update()
    this.timer = setTimeout(this.tick, 1000)
  }

  update() {
    if (!this.current) {
      if (!this.change()) this.init()
      this.emit('finished')
    } else {
      this.current--
    }
    this.render
  }

  reset() {
    clearTimeout(this.timer)
    this.init()
    this.render
  }

  zeroPadding(n) {
    return ('0' + n).slice(-2)
  }

  floor0(n) {
    return this.zeroPadding(Math.floor(n))
  }

  format(s) {
    const min = this.floor0(s / 60)
    const sec = this.floor0(s % 60)
    return `${min}:${sec}`
  }

  set render(fn) {
    this._cb = fn
    this.render
  }

  get render() {
    return this._cb(this.format(this.current))
  }
}

export default TrackTimer
