"use strict";

const {
    ZigBeeLightDevice
} = require('homey-zigbeedriver');

const {
    ZigBeeDevice
} = require('homey-zigbeedriver');

const {
    CLUSTER
} = require('zigbee-clusters');

const {
    ZCLNode
} = require('zigbee-clusters');


class Light extends ZigBeeDevice {

    async onNodeInit({
        zclNode
    }) {
        this.log('Device onNodeInit - Fan');

        this.registerCapabilityListener('onoff', this.onCapabilityOnoff.bind(this));
        //this.registerCapabilityListener('fan_Speed', this.onFanSpeed.bind(this));
		

        // Register onoff capability
        //this.registerCapability('onoff', CLUSTER.ON_OFF);

        //this.log(CLUSTER);

  
        await super.onNodeInit({
            zclNode
        });
    }

    async onFanSpeed(value, opts) {

        this.log('onFanSpeed');

        this.log(value);

    }

    async onCapabilityOnoff(value, opts) {

        this.log('onCapabilityOnoff Fan');

        // Get ZigBeeNode instance from ManagerZigBee
        const node = await this.homey.zigbee.getNode(this);

        // Create ZCLNode instance
        const zclNode = new ZCLNode(node);

        if (value) {
            await zclNode.endpoints[4].clusters.onOff.setOn();
        } else {
            await zclNode.endpoints[4].clusters.onOff.setOff();
        }

        // Interact with the node
        //await zclNode.endpoints[4].clusters.onOff.toggle();
        //this.log(zclNode.endpoints);

    }
}

module.exports = Light;
