import { expect, assert } from '@open-wc/testing';
import { LovelaceCardConfig } from 'custom-card-helpers';
import { setViewport } from '@web/test-runner-commands';

import { TeslaStyleSolarPowerCard } from '../src/TeslaStyleSolarPowerCard.js';
import '../tesla-style-solar-power-card.js';
import { setCard } from './setters.js';

describe('TeslaStyleSolarPowerCard battery tests', () => {
  let card: TeslaStyleSolarPowerCard;
  let haCard: HTMLElement | null;
  let teslaCard: HTMLElement | null | undefined;
  let hass: any;
  let config: LovelaceCardConfig;

  /** Tests are extended in energy_capable. * */

  beforeEach(async () => {
    config = {
      type: 'custom:tesla-style-solar-power-card',
      name: 'Powerhouse',
      house_entity: 'sensor.house_consumption',
      // battery_entity: 'sensor.battery_consumption',
      battery_to_house_entity: 'sensor.battery_consumption',
    };
    hass = {
      states: {
        'sensor.house_consumption': {
          attributes: {
            unit_of_measurement: 'W',
            friendly_name: 'House consumption',
          },
          entity_id: 'sensor.house_consumption',
          state: '1300',
        },
        'sensor.battery_consumption': {
          attributes: {
            unit_of_measurement: 'W',
          },
          entity_id: 'battery_consumption',
          state: '1300',
        },
        'sensor.battery_to_house': {
          attributes: {
            unit_of_measurement: 'W',
          },
          entity_id: 'sensor.battery_to_house',
          state: '1300',
        },
      },
    };
    await setViewport({ width: 1200, height: 1000 });
    card = <TeslaStyleSolarPowerCard>await setCard(hass, config);
    // let iframe = document.createElement('iframe');
    // document.body.appendChild(iframe);
    // let div = document.createElement('div');
    // document.body.
    // console.log("document width " + document.body.clientWidth);
    // document.body.appendChild(card);
    if (card.shadowRoot === null) assert.fail('No Card Shadowroot');
    haCard = card.shadowRoot.querySelector('ha-card');
    if (haCard === null || haCard === undefined) assert.fail('No ha-card');
    teslaCard = <HTMLElement>(
      haCard.querySelector('#tesla-style-solar-power-card')
    );
    if (teslaCard === null || teslaCard === undefined)
      assert.fail('No tesla-style-card');
  });

  it('has house_entity, text and icon', async () => {
    const houseEntity = teslaCard?.querySelector('.house_entity');

    if (houseEntity === null || houseEntity === undefined)
      assert.fail('No house_entity element found');
    expect(houseEntity?.querySelector('.acc_text')?.innerHTML.replace(/<!--[^(-->)]+-->/g, '')).contains(
      '1.3kW'
    );
    expect(
      houseEntity?.querySelector('.acc_icon')?.getAttribute('icon')?.toString()
    ).to.equal('mdi:home');
  });

  it('has battery_entity, text and icon', async () => {
    const batteryEntity = teslaCard?.querySelector('.battery_entity');
    if (batteryEntity === null || batteryEntity === undefined)
      assert.fail('No battery_entity element found');
    expect(batteryEntity?.querySelector('.acc_text')?.innerHTML.replace(/<!--[^(-->)]+-->/g, '')).contains(
      '1.3kW'
    );
    expect(
      batteryEntity
        ?.querySelector('.acc_icon')
        ?.getAttribute('icon')
        ?.toString()
    ).to.equal('mdi:battery-medium');
  });

  it('has battery to house consumption line and circle', async () => {
    // await setCardConsumingFromGrid();
    const batteryToHouseLine = teslaCard?.querySelector(
      '#battery_to_house_entity_line'
    );
    if (batteryToHouseLine === null || batteryToHouseLine === undefined) {
      assert.fail('No battery_to_house_line element found');
    }
    const batteryToHouseCircle = teslaCard?.querySelector(
      '#battery_to_house_entity_circle'
    );
    if (batteryToHouseCircle === null || batteryToHouseCircle === undefined) {
      assert.fail('No batter_to_house_entity_circle element found');
    }

    if (haCard === null || haCard === undefined) assert.fail('No ha-card');
    expect(batteryToHouseLine?.getAttribute('hidden')).to.equal(null);
  });

  it('has no pv, grid or appliance icons', async () => {
    const pvEntity = teslaCard?.querySelector('.generation_entity');
    if (pvEntity !== null) assert.fail('No generation_entity element found');

    const gridEntity = teslaCard?.querySelector('.grid_consumption_entity');
    if (gridEntity !== null) assert.fail('No battery_entity element found');

    const appliance1Entity = teslaCard?.querySelector(
      '.appliance1_consumption_entity'
    );
    if (appliance1Entity !== null)
      assert.fail('No appliance1_consumption_entity element found');

    const appliance2Entity = teslaCard?.querySelector(
      '.appliance2_consumption_entity'
    );
    if (appliance2Entity !== null)
      assert.fail('No appliance2_consumption_entity element found');
  });

  it('has battery icon', async () => {
    card.requestUpdate();
    const batteryEntity = teslaCard?.querySelector('.battery_entity');
    if (batteryEntity === null || batteryEntity === undefined)
      assert.fail('No battery_entity element found');
    expect(
      batteryEntity
        ?.querySelector('.acc_icon')
        ?.getAttribute('icon')
        ?.toString()
    ).to.equal('mdi:battery-medium');
  });
});
