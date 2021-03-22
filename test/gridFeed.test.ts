import { expect, assert } from '@open-wc/testing';
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
      generation_to_grid_entity: 'sensor.generation_to_grid',
      battery_to_grid_entity: 'sensor.battery_to_grid',
      grid_entity: 'sensor.grid_consumption',
    };
    hass = {
      states: {
        'sensor.battery_to_grid': {
          attributes: {
            unit_of_measurement: 'W',
            friendly_name: 'Batter to battery',
          },
          entity_id: 'sensor.battery_to_grid',
          state: '1000',
        },
        'sensor.grid_consumption': {
          attributes: {
            unit_of_measurement: 'W',
          },
          entity_id: 'grid_consumption',
          state: '0',
        },
        'sensor.generation_to_grid': {
          attributes: {
            unit_of_measurement: 'W',
          },
          entity_id: 'generation_to_grid',
          state: '1000',
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

  it('has grid_entity, text and icon', async () => {
    const gridEntity = teslaCard?.querySelector('.grid_entity');
    if (gridEntity === null || gridEntity === undefined)
      assert.fail('No grid_entity element found');
    expect(
      gridEntity?.querySelector('.acc_text')?.innerHTML,
      'No sum of grid charging flows in acc_text of grid_entity'
    ).contains('2 kW');
    expect(
      gridEntity?.querySelector('.acc_icon')?.getAttribute('icon')?.toString()
    ).to.equal('mdi:transmission-tower');
  });

  it('has battery to grid feed in line and circle', async () => {
    const batteryToGridLine = teslaCard?.querySelector(
      '#battery_to_grid_entity_line'
    );
    if (batteryToGridLine === null || batteryToGridLine === undefined) {
      assert.fail('No battery_to_grid_entity_line element found');
    }
    const batteryToGridCircle = teslaCard?.querySelector(
      '#battery_to_grid_entity_circle'
    );
    if (batteryToGridCircle === null || batteryToGridCircle === undefined) {
      assert.fail('No battery_to_grid_entity_circle element found');
    }
    expect(batteryToGridLine?.getAttribute('hidden')).to.equal(null);
  });

  it('has solar to grid line and circle', async () => {
    const solarToGridLine = teslaCard?.querySelector(
      '#generation_to_grid_entity_line'
    );
    if (solarToGridLine === null || solarToGridLine === undefined) {
      assert.fail('No generation_to_battery_entity_line element found');
    }
    const solarToGridCircle = teslaCard?.querySelector(
      '#generation_to_grid_entity_circle'
    );
    if (solarToGridCircle === null || solarToGridCircle === undefined) {
      assert.fail('No generation_to_battery_entity_circle element found');
    }

    expect(solarToGridLine?.getAttribute('hidden')).to.equal(null);
  });

  it('has no pv, grid or appliance icons', async () => {
    const pvEntity = teslaCard?.querySelector('.pv_consumption_entity');
    if (pvEntity !== null)
      assert.fail('No pv_consumption_entity element found');

    const batteryEntity = teslaCard?.querySelector(
      '.battery_consumption_entity'
    );
    if (batteryEntity !== null)
      assert.fail('No battery_consumption_entity element found');

    const houseEntity = teslaCard?.querySelector('.house_consumption_entity');
    if (houseEntity !== null)
      assert.fail('No house_consumption_entity element found');

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
});
