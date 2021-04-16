import { expect } from '@open-wc/testing';

import { SensorElement } from '../src/models/SensorElement.js';
// import { TeslaStyleSolarPowerCard } from '../src/TeslaStyleSolarPowerCard.js';
import '../tesla-style-solar-power-card.js';

describe('SensorElements test', () => {
  it('should setSpeed with kW', () => {
    const selement = new SensorElement('test_entity', 'solar_consumption');
    selement.value = 1;
    selement.unitOfMeasurement = 'W';
    selement.setSpeed();
    expect(selement.speed).to.equal(0.00004);
  });

  it('should setSpeed with W', () => {
    const selement = new SensorElement('test_entity', 'solar_consumption');
    selement.value = 1;
    selement.unitOfMeasurement = 'kW';
    selement.setSpeed();
    expect(selement.speed).to.equal(0.04);
  });

  it('should setValueAndUnitOfMeasurement from kW rounded to 1 decimals', () => {
    const selement = new SensorElement('test_entity', 'solar_consumption');
    selement.setValueAndUnitOfMeasurement('1.1111', 'kW', false);
    expect(selement.value).to.equal(1.1);
  });

  it('should setValueAndUnitOfMeasurement from kW rounded to 2 decimals', () => {
    const selement = new SensorElement('test_entity', 'solar_consumption');
    selement.setValueAndUnitOfMeasurement('0.0111', 'kW', false);
    expect(selement.value).to.equal(0.01);
  });

  it('should setValueAndUnitOfMeasurement from W rounded to two decimals get kW', () => {
    const selement = new SensorElement('test_entity', 'solar_consumption');
    selement.setValueAndUnitOfMeasurement('1100.1', 'W', false);
    expect(selement.value).to.equal(1.1);
  });

  it('should setValueAndUnitOfMeasurement from W rounded to 1 decimals but get W', () => {
    const selement = new SensorElement('test_entity', 'solar_consumption');
    selement.value = 1;
    selement.setValueAndUnitOfMeasurement('1111.111', 'W', true);
    expect(selement.value).to.equal(1111.1);
  });

  it('should setValueAndUnitOfMeasurement from percentage', () => {
    const selement = new SensorElement('test_entity', 'solar_consumption');
    selement.value = 1;
    selement.setValueAndUnitOfMeasurement('1', '%', true);
    expect(selement.value).to.equal(1);
  });

  it('testing speed for 1 kw with W not kW', () => {
    const selement = new SensorElement('test_entity', 'solar_consumption');
    selement.value = 1;
    selement.setValueAndUnitOfMeasurement('1', 'kW', true);
    expect(selement.value).to.equal(1000);
    expect(selement.unitOfMeasurement).to.equal('W');
    selement.setSpeed();
    expect(selement.speed.toString()).contains('0.04');
  });

  it('testing speed for 1000 W with W not kW', () => {
    const selement = new SensorElement('test_entity', 'solar_consumption');
    selement.value = 1;
    selement.setValueAndUnitOfMeasurement('1', 'kW', true);
    expect(selement.value).to.equal(1000);
    expect(selement.unitOfMeasurement).to.equal('W');
    selement.setSpeed();
    expect(selement.speed.toString()).contains('0.04');
  });

  it('testing speed for 1000 W', () => {
    const selement = new SensorElement('test_entity', 'solar_consumption');
    selement.value = 1;
    selement.setValueAndUnitOfMeasurement('1', 'kW', false);
    expect(selement.value).to.equal(1);
    expect(selement.unitOfMeasurement).to.equal('kW');
    selement.setSpeed();
    expect(selement.speed.toString()).contains('0.04');
  });

  it('testing speed for 1 kw', () => {
    const selement = new SensorElement('test_entity', 'solar_consumption');
    selement.value = 1;
    selement.setValueAndUnitOfMeasurement('1', 'kW', false);
    expect(selement.value).to.equal(1);
    expect(selement.unitOfMeasurement).to.equal('kW');
    selement.setSpeed();
    expect(selement.speed.toString()).contains('0.04');
  });

  it('should setValueAndUnitOfMeasurement from undefined', () => {
    const selement = new SensorElement('test_entity', 'solar_consumption');
    selement.value = 1;
    selement.setValueAndUnitOfMeasurement(undefined, '%', true);
    expect(selement.value).to.equal(0);
  });

  it('should setValueAndUnitOfMeasurement from normal string without unit', () => {
    const selement = new SensorElement('test_entity', 'solar_consumption');
    selement.value = 1;
    selement.setValueAndUnitOfMeasurement('on', undefined, true);
    expect(selement.value).to.equal('on');
  });

  it('should setValueAndUnitOfMeasurement from with threshhold with value below threshold 5', () => {
    const selement = new SensorElement('test_entity', 'solar_consumption');
    selement.value = 4500;
    selement.setValueAndUnitOfMeasurement('4.5', 'kW', false, 5);
    expect(selement.value).to.equal(4500);
    expect(selement.unitOfMeasurement).to.equal('W');
    selement.setSpeed();
    expect(selement.speed.toString()).contains('0.18');
  });

  it('should setValueAndUnitOfMeasurement from with threshhold with value above threshold 5', () => {
    const selement = new SensorElement('test_entity', 'solar_consumption');
    selement.value = 4500;
    selement.setValueAndUnitOfMeasurement('5.5', 'kW', false, 5);
    expect(selement.value).to.equal(5.5);
    expect(selement.unitOfMeasurement).to.equal('kW');
    selement.setSpeed();
    expect(selement.speed.toString()).contains('0.22');
  });

  it('should setValueAndUnitOfMeasurement from with threshhold with value above threshold 1', () => {
    const selement = new SensorElement('test_entity', 'solar_consumption');
    selement.setValueAndUnitOfMeasurement('1', 'kW', false, 1);
    expect(selement.value).to.equal(1);
    expect(selement.unitOfMeasurement).to.equal('kW');
    selement.setSpeed();
    expect(selement.speed.toString()).contains('0.04');
  });

  it('should setValueAndUnitOfMeasurement from with threshhold with value 1.1 above threshold 1', () => {
    const selement = new SensorElement('test_entity', 'solar_consumption');
    selement.setValueAndUnitOfMeasurement('1.1', 'kW', false, 1);
    expect(selement.value).to.equal(1.1);
    expect(selement.unitOfMeasurement).to.equal('kW');
    selement.setSpeed();
    expect(selement.speed.toString()).contains('0.044');
  });

  it('should setValueAndUnitOfMeasurement from with threshhold with value above threshold 1', () => {
    const selement = new SensorElement('test_entity', 'solar_consumption');
    selement.setValueAndUnitOfMeasurement('0.9', 'kW', false, 1);
    expect(selement.value).to.equal(900);
    expect(selement.unitOfMeasurement).to.equal('W');
    selement.setSpeed();
    expect(selement.speed.toString()).contains('0.036');
  });
});
