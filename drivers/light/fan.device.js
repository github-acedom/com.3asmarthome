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
        this.registerCapabilityListener('fan_speed', this.onFanSpeed.bind(this));

        this.setCapabilityValue('fan_speed', 'off').catch(this.error);

        let fan_speed
        fan_speed = this.getCapabilityValue('fan_speed');
        this.log(fan_speed);

        await super.onNodeInit({
            zclNode
        });
    }

    async onFanSpeed(value, opts) {

        this.log('onFanSpeed');
        this.log('changed request');
        this.log(value);

        this.log('current');
        let current_fan_speed
        current_fan_speed = this.getCapabilityValue('fan_speed');
        this.log(current_fan_speed);


        // Get ZigBeeNode instance from ManagerZigBee
        const node = await this.homey.zigbee.getNode(this);

        // Create ZCLNode instance
        const zclNode = new ZCLNode(node);

        switch (value) {
            case "off":
                switch (current_fan_speed) {
                    case "low":
                        await zclNode.endpoints[4].clusters.onOff.setOff();
                        break;
                    case "medium":
                        await zclNode.endpoints[3].clusters.onOff.setOff();
                        break;
                    case "high":
                        await zclNode.endpoints[2].clusters.onOff.setOff();
                        break;
                    case "off":
                        await zclNode.endpoints[4].clusters.onOff.setOff();
                        await zclNode.endpoints[3].clusters.onOff.setOff();
                        await zclNode.endpoints[2].clusters.onOff.setOff();
                        break;
                    default:
                        await zclNode.endpoints[4].clusters.onOff.setOff();
                        await zclNode.endpoints[3].clusters.onOff.setOff();
                        await zclNode.endpoints[2].clusters.onOff.setOff();
                }
                this.setCapabilityValue('onoff', false).catch(this.error);
                this.setCapabilityValue('fan_speed',"off").catch(this.error);
                break;
            case "low":
                await zclNode.endpoints[4].clusters.onOff.setOn();
                this.setCapabilityValue('onoff', true).catch(this.error);
                this.setCapabilityValue('fan_speed',"low").catch(this.error);
                break;
            case "medium":
                await zclNode.endpoints[3].clusters.onOff.setOn();
                this.setCapabilityValue('onoff', true).catch(this.error);
                this.setCapabilityValue('fan_speed',"medium").catch(this.error);
                break;
            case "high":
                await zclNode.endpoints[2].clusters.onOff.setOn();
                this.setCapabilityValue('onoff', true).catch(this.error);
                this.setCapabilityValue('fan_speed',"high").catch(this.error);
                break;
            default:
            // code block
        }

    }

    async onCapabilityOnoff(value, opts) {

        this.log('onCapabilityOnoff Fan');

        // Get ZigBeeNode instance from ManagerZigBee
        const node = await this.homey.zigbee.getNode(this);

        // Create ZCLNode instance
        const zclNode = new ZCLNode(node);

        // Turned on sets to low speed
        if (value) {
            this.onFanSpeed("low", null);
        } else {
            this.onFanSpeed("off", null);
        }
    }
}

module.exports = Light;
