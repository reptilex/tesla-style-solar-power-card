import { expect, elementUpdated, assert } from '@open-wc/testing';
import { LovelaceCardConfig } from 'custom-card-helpers';
import { setViewport } from '@web/test-runner-commands';

import { TeslaStyleSolarPowerCard } from '../src/TeslaStyleSolarPowerCard.js';
import '../tesla-style-solar-power-card.js';
import { setCard } from './setters.js';

describe('TeslaStyleSolarPowerCard with defaultConfig', () => {
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
      generation_to_battery_entity: 'sensor.battery_charging',
      grid_to_battery_entity: 'sensor.grid_to_battery',
      battery_extra_entity: 'sensor.battery_charge',
      battery_entity: 'sensor.battery_consumption',
    };
    hass = {
      states: {
        'sensor.grid_to_battery': {
          attributes: {
            unit_of_measurement: 'W',
            friendly_name: 'Grid to battery',
          },
          entity_id: 'sensor.grid_to_battery',
          state: '1000',
        },
        'sensor.battery_consumption': {
          attributes: {
            unit_of_measurement: 'W',
          },
          entity_id: 'battery_consumption',
          state: '0',
        },
        'sensor.battery_charging': {
          attributes: {
            unit_of_measurement: 'W',
          },
          entity_id: 'battery_charging',
          state: '1000',
        },
        'sensor.battery_charge': {
          attributes: {
            unit_of_measurement: '%',
          },
          entity_id: 'sensor.battery_charge',
          state: '99',
        },
      },
    };
    await setViewport({ width: 1200, height: 1000 });
    card = <TeslaStyleSolarPowerCard>await setCard(hass, config);
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

  it('has battery_entity, text and icon', async () => {
    const batteryEntity = teslaCard?.querySelector('.battery_entity');
    if (batteryEntity === null || batteryEntity === undefined)
      assert.fail('No battery_entity element found');
    expect(
      batteryEntity?.querySelector('.acc_text')?.innerHTML,
      'No sum of battery charging flows in acc_text of battery_entity'
    ).contains('2 kW');
    expect(
      batteryEntity
        ?.querySelector('.acc_icon')
        ?.getAttribute('icon')
        ?.toString()
    ).to.equal('mdi:battery-charging');
    expect(batteryEntity?.querySelector('.acc_text_extra')?.innerHTML).contains(
      '99 %'
    );
  });

  it('has grid to battery charging line and circle', async () => {
    const gridToBatteryLine = teslaCard?.querySelector(
      '#grid_to_battery_entity_line'
    );
    if (gridToBatteryLine === null || gridToBatteryLine === undefined) {
      assert.fail('No grid_to_battery_entity_line element found');
    }
    const gridToBatteryCircle = teslaCard?.querySelector(
      '#grid_to_battery_entity_circle'
    );
    if (gridToBatteryCircle === null || gridToBatteryCircle === undefined) {
      assert.fail('No grid_to_battery_entity_circle element found');
    }

    expect(gridToBatteryLine?.getAttribute('hidden')).to.equal(null);
  });

  it('has solar to battery charging line and circle', async () => {
    const SolarToBatteryLine = teslaCard?.querySelector(
      '#generation_to_battery_entity_line'
    );
    if (SolarToBatteryLine === null || SolarToBatteryLine === undefined) {
      assert.fail('No generation_to_battery_entity_line element found');
    }
    const SolarToBatteryCircle = teslaCard?.querySelector(
      '#generation_to_battery_entity_circle'
    );
    if (SolarToBatteryCircle === null || SolarToBatteryCircle === undefined) {
      assert.fail('No generation_to_battery_entity_circle element found');
    }

    expect(SolarToBatteryLine?.getAttribute('hidden')).to.equal(null);
  });

  it('has no pv, grid or appliance icons', async () => {
    const pvEntity = teslaCard?.querySelector('.pv_consumption_entity');
    if (pvEntity !== null)
      assert.fail('No pv_consumption_entity element found');

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

  it('has battery at 100%', async () => {
    await setBatteryState('100');
    const batteryEntity = teslaCard?.querySelector('.battery_entity');
    if (batteryEntity === null || batteryEntity === undefined)
      assert.fail('No battery_entity element found');
    expect(
      batteryEntity
        ?.querySelector('.acc_icon')
        ?.getAttribute('icon')
        ?.toString()
    ).to.equal('mdi:battery-charging');
    expect(batteryEntity?.querySelector('.acc_text_extra')?.innerHTML).contains(
      '100 %'
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
    ).to.equal('mdi:battery-charging-90');
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
    ).to.equal('mdi:battery-charging-80');
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
    ).to.equal('mdi:battery-charging-70');
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
    ).to.equal('mdi:battery-charging-20');
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
    ).to.equal('mdi:battery-charging-10');
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
    ).to.equal('mdi:battery-charging-outline');
    expect(batteryEntity?.querySelector('.acc_text_extra')?.innerHTML).contains(
      '5 %'
    );
  });
});
