const { BoundCluster } = require('zigbee-clusters');

class OnOffControlBoundCluster extends BoundCluster {

  constructor({onSetOff, onSetOn, onToggle,}) {
    super();
    this._onToggle = onToggle;
    this._onSetOff = onSetOff;
    this._onSetOn = onSetOn;
  }

  toggle() {
    if (typeof this._onToggle === 'function') {
		this.log('1xxxxxxxxxxxxxxxxxxx');
      this._onToggle();
    }
  }

  setOn() {
    if (typeof this._onSetOn === 'function') {
		this.log('2xxxxxxxxxxxxxxxxxxx');
      this._onSetOn();
    }
  }

  setOff() {
    if (typeof this._onSetOff === 'function') {
		this.log('3xxxxxxxxxxxxxxxxxxx');
      this._onSetOff();
    }
  }
}

module.exports = OnOffControlBoundCluster;