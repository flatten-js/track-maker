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

  reset() {
    clearTimeout(this.timer)
    this.init()
    this.render
  }

  init() {
    this.track = [this.sprint, this.interval]
    this.timer = null
    this.time = this.change()
  }

  change() {
    return this.current = this.track.shift()
  }

  start() {
    if (this.timer) return
    this.b = this.a
    return this.tick() || true
  }

  tick = () => {
    this.update()
    this.timer = setTimeout(this.tick, 200)
  }

  update() {
    this.time = this.current - this.diff(this.b)
    if (this.time <= 0) {
      if (!this.change()) this.init()
      this.b = this.a
      this.emit('finished')
    } else {
      this.render
    }
  }

  diff(b) {
    return (this.a - b) / 1000
  }

  get a() {
    return new Date()
  }

  set b(date) {
    this._b = date
  }

  get b() {
    return this._b
  }

  set render(fn) {
    this._cb = fn
    this.render
  }

  get render() {
    return this._cb(this.format(this.time))
  }

  format(s) {
    const min = this.floor0(s / 60)
    const sec = this.floor0(s % 60)
    return `${min}:${sec}`
  }

  floor0(n) {
    return this.zeroPadding(Math.floor(n))
  }

  zeroPadding(n) {
    return `0${n}`.slice(-2)
  }
}

export default TrackTimer
