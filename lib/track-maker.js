'use babel';

import TrackTimer from './track-timer'
import TrackMakerView from './track-maker-view';
import { CompositeDisposable } from 'atom';

export default {

  config: {
    sprint: {
      type: "integer",
      description: 'Set working time from 1 to 60 minutes',
      default: 25,
      minimum: 1,
      maximum: 60,
      order: 1
    },
    interval: {
      type: "integer",
      description: 'Set break time from 0 to 60 minutes',
      default: 5,
      minimum: 0,
      maximum: 60,
      order: 2
    }
  },

  trackMakerView: null,
  modalPanel: null,
  subscriptions: null,

  conf(key) {
    return atom.config.get(`track-maker.${key}`)
  },

  activate(state) {
    this.timer = new TrackTimer({
      sprint: TrackTimer.min(this.conf('sprint')),
      interval: TrackTimer.min(this.conf('interval'))
    })

    this.timer.on('finished', () => this.finish())

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'track-maker:start': () => this.start(),
      'track-maker:pause': () => this.pause(),
      'track-maker:reset': () => this.reset()
    }));
  },

  consumeStatusBar(statusBar) {
    this.view = new TrackMakerView(this.timer);
    statusBar.addRightTile({
      item: this.view.getElement(),
      priority: -999
    })
  },

  deactivate() {
    this.statusBarTile.destroy();
    this.subscriptions.dispose();
    this.view.destroy();
  },

  serialize() {
    return {
      trackMakerViewState: this.view.serialize()
    };
  },

  start() {
    if (!this.timer.start()) return
    atom.notifications.addInfo('Timer started')
  },

  pause() {
    this.timer.pause()
    atom.notifications.addInfo('Timer paused')
  },

  reset() {
    this.timer.reset()
    atom.notifications.addInfo('Timer reset')
  },

  finish() {
    atom.notifications.addInfo('Timer changed')
  }
};
