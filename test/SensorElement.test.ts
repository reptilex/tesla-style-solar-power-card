import { expect } from '@open-wc/testing';

import { SensorElement } from '../src/models/SensorElement.js';
// import { TeslaStyleSolarPowerCard } from '../src/TeslaStyleSolarPowerCard.js';
import '../tesla-style-solar-power-card.js';

describe('SensorElements test', () => {
  it('should setSpeed with W', () => {
    const selement = new SensorElement('test_entity', 'solar_consumption');
    selement.value = 1;
    selement.unitOfMeasurement = 'W';
    selement.setSpeed();
    expect(selement.speed).to.equal(0.00004);
  });

  it('should setSpeed with kW', () => {
    const selement = new SensorElement('test_entity', 'solar_consumption');
    selement.value = 1;
    selement.unitOfMeasurement = 'KW';
    selement.setSpeed();
    expect(selement.speed).to.equal(0.00004);
  });

  it('should setValueAndUnitOfMeasurement from kW rounded to 1 decimals', () => {
    const selement = new SensorElement('test_entity', 'solar_consumption');
    selement.setValueAndUnitOfMeasurement('1.1111', 'kW');
    expect(selement.value).to.equal(1111);
  });

  it('should setValueAndUnitOfMeasurement from 0.0111 kW to W', () => {
    const selement = new SensorElement('test_entity', 'solar_consumption');
    selement.setValueAndUnitOfMeasurement('0.0111', 'kW');
    expect(selement.value).to.equal(11);
  });

  it('should setValueAndUnitOfMeasurement from W rounded to two decimals get kW', () => {
    const selement = new SensorElement('test_entity', 'solar_consumption');
    selement.setValueAndUnitOfMeasurement('1100.1', 'W');
    expect(selement.value).to.equal(1100);
  });

  it('should setValueAndUnitOfMeasurement from W rounded to 1 decimals but get W', () => {
    const selement = new SensorElement('test_entity', 'solar_consumption');
    selement.value = 1;
    selement.setValueAndUnitOfMeasurement('1111.111', 'W');
    expect(selement.value).to.equal(1111);
  });

  it('should setValueAndUnitOfMeasurement from percentage', () => {
    const selement = new SensorElement('test_entity', 'solar_consumption');
    selement.value = 1;
    selement.setValueAndUnitOfMeasurement('1', '%');
    expect(selement.value).to.equal(1);
  });

  it('should setValueAndUnitOfMeasurement from undefined', () => {
    const selement = new SensorElement('test_entity', 'solar_consumption');
    selement.value = 1;
    selement.setValueAndUnitOfMeasurement(undefined, '%');
    expect(selement.value).to.equal(0);
  });

  it('should setValueAndUnitOfMeasurement from normal string without unit', () => {
    const selement = new SensorElement('test_entity', 'solar_consumption');
    selement.value = 1;
    selement.setValueAndUnitOfMeasurement('on', undefined);
    expect(selement.value).to.equal('on');
  });
});
