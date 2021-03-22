import { expect, elementUpdated, assert } from '@open-wc/testing';
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
      battery_extra_entity: 'sensor.battery_charge',
      battery_entity: 'sensor.battery_consumption',
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
        'sensor.battery_charge': {
          attributes: {
            unit_of_measurement: '%',
          },
          entity_id: 'sensor.battery_charge',
          state: '100',
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

  const setBatteryState = async (state: string) => {
    hass.states['sensor.battery_charge'].state = state;
    card.setAttribute('hass', JSON.stringify(hass));
    await elementUpdated(card);
    await card.setConfig(config);
  };

  it('has house_entity, text and icon', async () => {
    const houseEntity = teslaCard?.querySelector('.house_entity');
    if (houseEntity === null || houseEntity === undefined)
      assert.fail('No house_entity element found');
    expect(houseEntity?.querySelector('.acc_text')?.innerHTML).contains(
      '1.3 kW'
    );
    expect(
      houseEntity?.querySelector('.acc_icon')?.getAttribute('icon')?.toString()
    ).to.equal('mdi:home');
  });

  it('has battery_entity, text and icon', async () => {
    const batteryEntity = teslaCard?.querySelector('.battery_entity');
    if (batteryEntity === null || batteryEntity === undefined)
      assert.fail('No battery_entity element found');
    expect(batteryEntity?.querySelector('.acc_text')?.innerHTML).contains(
      '1.3 kW'
    );
    expect(
      batteryEntity
        ?.querySelector('.acc_icon')
        ?.getAttribute('icon')
        ?.toString()
    ).to.equal('mdi:battery');
    expect(batteryEntity?.querySelector('.acc_text_extra')?.innerHTML).contains(
      '100 %'
    );
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
    const pvEntity = teslaCard?.querySelector('.pv_consumption_entity');
    if (pvEntity !== null)
      assert.fail('No pv_consumption_entity element found');

    const gridEntity = teslaCard?.querySelector('.grid_entity');
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

  it('has battery at 90%', async () => {
    await setBatteryState('90');
    card.requestUpdate();
    const batteryEntity = teslaCard?.querySelector('.battery_entity');
    if (batteryEntity === null || batteryEntity === undefined)
      assert.fail('No battery_entity element found');
    expect(
      batteryEntity
        ?.querySelector('.acc_icon')
        ?.getAttribute('icon')
        ?.toString()
    ).to.equal('mdi:battery-90');
    expect(batteryEntity?.querySelector('.acc_text_extra')?.innerHTML).contains(
      '90 %'
    );
  });

  it('has battery at 83%', async () => {
    await setBatteryState('83');
    card.requestUpdate();
    const batteryEntity = teslaCard?.querySelector('.battery_entity');
    if (batteryEntity === null || batteryEntity === undefined)
      assert.fail('No battery_entity element found');
    expect(
      batteryEntity
        ?.querySelector('.acc_icon')
        ?.getAttribute('icon')
        ?.toString()
    ).to.equal('mdi:battery-90');
    expect(batteryEntity?.querySelector('.acc_text_extra')?.innerHTML).contains(
      '83 %'
    );
  });

  it('has battery at 73%', async () => {
    await setBatteryState('73');
    card.requestUpdate();
    const batteryEntity = teslaCard?.querySelector('.battery_entity');
    if (batteryEntity === null || batteryEntity === undefined)
      assert.fail('No battery_entity element found');
    expect(
      batteryEntity
        ?.querySelector('.acc_icon')
        ?.getAttribute('icon')
        ?.toString()
    ).to.equal('mdi:battery-80');
    expect(batteryEntity?.querySelector('.acc_text_extra')?.innerHTML).contains(
      '73 %'
    );
  });

  it('has battery at 65%', async () => {
    await setBatteryState('65');
    card.requestUpdate();
    const batteryEntity = teslaCard?.querySelector('.battery_entity');
    if (batteryEntity === null || batteryEntity === undefined)
      assert.fail('No battery_entity element found');
    expect(
      batteryEntity
        ?.querySelector('.acc_icon')
        ?.getAttribute('icon')
        ?.toString()
    ).to.equal('mdi:battery-70');
    expect(batteryEntity?.querySelector('.acc_text_extra')?.innerHTML).contains(
      '65 %'
    );
  });

  it('has battery at 15%', async () => {
    await setBatteryState('15');
    card.requestUpdate();
    const batteryEntity = teslaCard?.querySelector('.battery_entity');
    if (batteryEntity === null || batteryEntity === undefined)
      assert.fail('No battery_entity element found');
    expect(
      batteryEntity
        ?.querySelector('.acc_icon')
        ?.getAttribute('icon')
        ?.toString()
    ).to.equal('mdi:battery-20');
    expect(batteryEntity?.querySelector('.acc_text_extra')?.innerHTML).contains(
      '15 %'
    );
  });

  it('has battery at 6%', async () => {
    await setBatteryState('6');
    card.requestUpdate();
    const batteryEntity = teslaCard?.querySelector('.battery_entity');
    if (batteryEntity === null || batteryEntity === undefined)
      assert.fail('No battery_entity element found');
    expect(
      batteryEntity
        ?.querySelector('.acc_icon')
        ?.getAttribute('icon')
        ?.toString()
    ).to.equal('mdi:battery-10');
    expect(batteryEntity?.querySelector('.acc_text_extra')?.innerHTML).contains(
      '6 %'
    );
  });

  it('has battery at 5%', async () => {
    await setBatteryState('5');
    card.requestUpdate();
    const batteryEntity = teslaCard?.querySelector('.battery_entity');
    if (batteryEntity === null || batteryEntity === undefined)
      assert.fail('No battery_entity element found');
    expect(
      batteryEntity
        ?.querySelector('.acc_icon')
        ?.getAttribute('icon')
        ?.toString()
    ).to.equal('mdi:battery-outline');
    expect(batteryEntity?.querySelector('.acc_text_extra')?.innerHTML).contains(
      '5 %'
    );
  });

  it('has battery at 5%', async () => {
    await setBatteryState('5');
    card.requestUpdate();
    const batteryEntity = teslaCard?.querySelector('.battery_entity');
    if (batteryEntity === null || batteryEntity === undefined)
      assert.fail('No battery_entity element found');
    expect(
      batteryEntity
        ?.querySelector('.acc_icon')
        ?.getAttribute('icon')
        ?.toString()
    ).to.equal('mdi:battery-outline');
    expect(batteryEntity?.querySelector('.acc_text_extra')?.innerHTML).contains(
      '5 %'
    );
  });
});
