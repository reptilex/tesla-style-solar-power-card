import {  expect } from '@open-wc/testing';

import { SensorElement } from '../src/models/SensorElement.js';
// import { TeslaStyleSolarPowerCard } from '../src/TeslaStyleSolarPowerCard.js';
import '../tesla-style-solar-power-card.js';

describe('SensorElements test', () => {

    it('should setSpeed with kW', () => {
        const selement = new SensorElement('test_entity', 'solar_consumption');
        selement.value = 1;
        selement.setSpeed(false);
        expect(selement.speed).to.equal(0.04);
    });

    it('should setSpeed with W', () => {
        const selement = new SensorElement('test_entity', 'solar_consumption');
        selement.value = 1;
        selement.setSpeed(true);
        expect(selement.speed).to.equal(0.00004);
    });

    it('should setValueAndUnitOfMeasurement fro kW rounded to 1 decimals', () => {
        const selement = new SensorElement('test_entity', 'solar_consumption');
        selement.value = 1;
        selement.setValueAndUnitOfMeasurement('1.1111', false, 'kW');
        expect(selement.value).to.equal(1.1);
    });

    it('should setValueAndUnitOfMeasurement fro kW rounded to 2 decimals', () => {
        const selement = new SensorElement('test_entity', 'solar_consumption');
        selement.value = 1;
        selement.setValueAndUnitOfMeasurement('0.0111', false, 'kW');
        expect(selement.value).to.equal(0.01);
    });

    it('should setValueAndUnitOfMeasurement from W rounded to two decimals get kW', () => {
        const selement = new SensorElement('test_entity', 'solar_consumption');
        selement.value = 1;
        selement.setValueAndUnitOfMeasurement('1100.1', false, 'W');
        expect(selement.value).to.equal(1.1);
    });

    it('should setValueAndUnitOfMeasurement from W rounded to 1 decimals but get W', () => {
        const selement = new SensorElement('test_entity', 'solar_consumption');
        selement.value = 1;
        selement.setValueAndUnitOfMeasurement('1111.111', true, 'W');
        expect(selement.value).to.equal(1111.1);
    });

    it('should setValueAndUnitOfMeasurement from percentage', () => {
        const selement = new SensorElement('test_entity', 'solar_consumption');
        selement.value = 1;
        selement.setValueAndUnitOfMeasurement('1', true, '%');
        expect(selement.value).to.equal(1);
    });

    it('should setValueAndUnitOfMeasurement from undefined', () => {
        const selement = new SensorElement('test_entity', 'solar_consumption');
        selement.value = 1;
        selement.setValueAndUnitOfMeasurement(undefined, true, '%');
        expect(selement.value).to.equal(0);
    });

    it('should setValueAndUnitOfMeasurement from normal string without unit', () => {
        const selement = new SensorElement('test_entity', 'solar_consumption');
        selement.value = 1;
        selement.setValueAndUnitOfMeasurement('on', true, undefined);
        expect(selement.value).to.equal('on');
    });
});