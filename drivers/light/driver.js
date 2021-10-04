'use strict';

const {
    Driver
} = require('homey');

const {
    ZigBeeDriver
} = require('homey-zigbeedriver');

const RootDevice = require('./device.js');
const FanDevice = require('./fan.device.js');

class MyDriver extends ZigBeeDriver {
    /**
     * onInit is called when the driver is initialized.
     */
    async onInit() {
        this.log('MyDriver has been initialized');
    }

    onMapDeviceClass(device) {
        if (device.getData().subDeviceId === 'fan') {
            return FanDevice;
        } else {
            return RootDevice;
        }

        /**
         * onPairListDevices is called when a user is adding a device and the 'list_devices' view is called.
         * This should return an array with the data of devices that are available for pairing.
         */
        //async onPairListDevices() {
        //return [


        // Example device data, note that `store` is optional
        // {
        //   name: 'My Device',
        //   data: {
        //     id: 'my-device',
        //   },
        //   store: {
        //     address: '127.0.0.1',
        //   },
        // },


        //];
    }
}

module.exports = MyDriver;
