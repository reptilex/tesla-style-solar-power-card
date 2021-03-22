import { expect, assert } from '@open-wc/testing';
import { LovelaceCardConfig } from 'custom-card-helpers';
import { setViewport } from '@web/test-runner-commands';

import { TeslaStyleSolarPowerCard } from '../src/TeslaStyleSolarPowerCard.js';
import '../tesla-style-solar-power-card.js';
import { setCard } from './setters.js';

describe('TeslaStyleSolarPowerCard with solarConfig', () => {
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
      generation_to_grid_entity: 'sensor.generation_to_grid',
      generation_to_battery_entity: 'sensor.generation_to_battery',
      generation_to_house_entity: 'sensor.generation_to_house',
      generation_entity: 'sensor.generation_entity',
    };
    hass = {
      states: {
        'sensor.generation_to_battery': {
          attributes: {
            unit_of_measurement: 'W',
            friendly_name: 'Batter to battery',
          },
          entity_id: 'sensor.generation_to_battery',
          state: '3100.211',
        },
        'sensor.generation_entity': {
          attributes: {
            unit_of_measurement: 'W',
          },
          entity_id: 'generation_entity',
          state: '8100',
        },
        'sensor.generation_to_grid': {
          attributes: {
            unit_of_measurement: 'W',
          },
          entity_id: 'generation_to_grid',
          state: '4000.0000011221',
        },
        'sensor.generation_to_house': {
          attributes: {
            unit_of_measurement: 'W',
          },
          entity_id: 'generation_to_house',
          state: '1000.1221',
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

  it('has generation_entity, text and icon', async () => {
    const solarYieldEntity = teslaCard?.querySelector('.generation_entity');
    if (solarYieldEntity === null || solarYieldEntity === undefined)
      assert.fail('No generation_entity element found');
    expect(
      solarYieldEntity?.querySelector('.acc_text')?.innerHTML,
      'No sum of grid charging flows in acc_text of grid_entity'
    ).contains('8.1 kW');
    expect(
      solarYieldEntity
        ?.querySelector('.acc_icon')
        ?.getAttribute('icon')
        ?.toString()
    ).to.equal('mdi:solar-panel-large');
  });

  it('has solar to house feed line and circle', async () => {
    const solarToHouseLine = teslaCard?.querySelector(
      '#generation_to_house_entity_line'
    );
    if (solarToHouseLine === null || solarToHouseLine === undefined) {
      assert.fail('No generation_to_house_entity_line element found');
    }
    const solarToHouseCircle = teslaCard?.querySelector(
      '#generation_to_house_entity_circle'
    );
    if (solarToHouseCircle === null || solarToHouseCircle === undefined) {
      assert.fail('No generation_to_house_entity_circle element found');
    }
    expect(solarToHouseLine?.getAttribute('hidden')).to.equal(null);
  });

  it('has solar to grid line and circle', async () => {
    const solarToGridLine = teslaCard?.querySelector(
      '#generation_to_grid_entity_line'
    );
    if (solarToGridLine === null || solarToGridLine === undefined) {
      assert.fail('No generation_to_grid_entity_line element found');
    }
    const solarToGridCircle = teslaCard?.querySelector(
      '#generation_to_grid_entity_circle'
    );
    if (solarToGridCircle === null || solarToGridCircle === undefined) {
      assert.fail('No generation_to_grid_entity_circle element found');
    }
    expect(solarToGridLine?.getAttribute('hidden')).to.equal(null);
  });

  it('has solar to battery line and circle', async () => {
    const solarToBatteryLine = teslaCard?.querySelector(
      '#generation_to_battery_entity_line'
    );
    if (solarToBatteryLine === null || solarToBatteryLine === undefined) {
      assert.fail('No generation_to_battery_entity_line element found');
    }
    const solarToBatteryCircle = teslaCard?.querySelector(
      '#generation_to_battery_entity_circle'
    );
    if (solarToBatteryCircle === null || solarToBatteryCircle === undefined) {
      assert.fail('No generation_to_battery_entity_circle element found');
    }

    expect(solarToBatteryLine?.getAttribute('hidden')).to.equal(null);
  });

  it('has no pv, grid or appliance icons', async () => {
    const gridEntity = teslaCard?.querySelector('.grid_consumption_entity');
    if (gridEntity !== null)
      assert.fail('grid_consumption_entity element found');

    const batteryEntity = teslaCard?.querySelector(
      '.battery_consumption_entity'
    );
    if (batteryEntity !== null)
      assert.fail('battery_consumption_entity element found');

    const houseEntity = teslaCard?.querySelector('.house_consumption_entity');
    if (houseEntity !== null)
      assert.fail('house_consumption_entity element found');

    const appliance1Entity = teslaCard?.querySelector(
      '.appliance1_consumption_entity'
    );
    if (appliance1Entity !== null)
      assert.fail('appliance1_consumption_entity element found');

    const appliance2Entity = teslaCard?.querySelector(
      '.appliance2_consumption_entity'
    );
    if (appliance2Entity !== null)
      assert.fail('appliance2_consumption_entity element found');
  });
});
