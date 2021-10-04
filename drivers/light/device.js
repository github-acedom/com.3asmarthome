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
        this.log('Device onNodeInit');

        this.registerCapabilityListener('onoff', this.onCapabilityOnoff.bind(this));

        this.registerCapabilityListener('fan_Speed', this.onFanSpeed.bind(this));
/** 
        this.registerCapabilityListener('fan_Speed', async (value) => {

            this.log('Changes to :', value);

          });
*/
let fan_speed;
fan_speed = this.getCapabilityValue('fan_Speed');
this.log(fan_speed);
        

    this.setCapabilityValue('fan_Speed', 'low').catch(this.error);

    fan_speed = this.getCapabilityValue('fan_Speed');
this.log(fan_speed);

        await this.configureAttributeReporting([{
                    endpointId: 1,
                    cluster: CLUSTER.ON_OFF,
                    attributeName: 'onOff',
                },
            ]);
        await this.configureAttributeReporting([{
                    endpointId: 2,
                    cluster: CLUSTER.ON_OFF,
                    attributeName: 'onOff',
                },
            ]);
        await this.configureAttributeReporting([{
                    endpointId: 3,
                    cluster: CLUSTER.ON_OFF,
                    attributeName: 'onOff',
                },
            ]);
        await this.configureAttributeReporting([{
                    endpointId: 4,
                    cluster: CLUSTER.ON_OFF,
                    attributeName: 'onOff',
                },
            ]);

        //await zclNode.endpoints[1].clusters[CLUSTER.ON_OFF.NAME].toggle();

        // Listen to attribute reports for the above configured attribute reporting
        zclNode.endpoints[1].clusters[CLUSTER.ON_OFF.NAME].on('attr.onOff', (currentState) => {
            // Do something with the received attribute report
            this.log('endpoints[1]');
            this.setCapabilityValue('onoff', currentState).catch(this.error);
        });
        zclNode.endpoints[2].clusters[CLUSTER.ON_OFF.NAME].on('attr.onOff', (currentState) => {
            // Do something with the received attribute report
            this.log('endpoints[2]');
            this.setCapabilityValue('onoff', currentState).catch(this.error);
        });

        zclNode.endpoints[3].clusters[CLUSTER.ON_OFF.NAME].on('attr.onOff', (currentState) => {
            // Do something with the received attribute report
            this.log('endpoints[3]');
            this.setCapabilityValue('onoff', currentState).catch(this.error);
        });

        //this.log(zclNode.endpoints[4].clusters[CLUSTER.LEVEL_CONTROL.NAME]);

        zclNode.endpoints[4].clusters[CLUSTER.ON_OFF.NAME].on('attr.onOff', (currentState) => {
            // Do something with the received attribute report
            this.log('endpoints[4]');
            this.setCapabilityValue('onoff', currentState).catch(this.error);
        });

        //const currentOnOffValue = await zclNode.endpoints[1].clusters.onOff.readAttributes("onOff");

        
        await super.onNodeInit({
            zclNode
        });
    }


    async onFanSpeed(value, opts) {

        this.log('onFanSpeed');

        this.log(value);

    }

    async onCapabilityOnoff(value, opts) {

        this.log('onCapabilityOnoff Light');
		this.log(value);

        // Get ZigBeeNode instance from ManagerZigBee
        const node = await this.homey.zigbee.getNode(this);

        // Create ZCLNode instance
        const zclNode = new ZCLNode(node);

        if (value) {
            await zclNode.endpoints[1].clusters.onOff.setOn();
        } else {
            await zclNode.endpoints[1].clusters.onOff.setOff();
        }
        // Interact with the node
        //await zclNode.endpoints[1].clusters.onOff.toggle();

        //		 this.log(zclNode.endpoints);

    }
}

module.exports = Light;
