import { expect, assert } from '@open-wc/testing';
import { LovelaceCardConfig } from 'custom-card-helpers';
import { setViewport } from '@web/test-runner-commands';

import { TeslaStyleSolarPowerCard } from '../src/TeslaStyleSolarPowerCard.js';
import '../tesla-style-solar-power-card.js';
import { setCard } from './setters.js';

describe('TeslaStyleSolarPowerCard with extra appliances', () => {
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
      grid_to_house_entity: 'sensor.grid_to_house',
      appliance1_consumption_entity: 'sensor.car_consumption',
      appliance1_extra_entity: 'sensor.car_soc',
      appliance2_consumption_entity: 'sensor.heating_consumption',
      appliance2_extra_entity: 'sensor.heating_current_function',
    };
    hass = {
      states: {
        'sensor.heating_consumption': {
          attributes: {
            unit_of_measurement: 'W',
            friendly_name: 'Heating consumption',
          },
          entity_id: 'heating_consumption',
          state: '1000',
        },
        'sensor.heating_current_function': {
          attributes: {
            unit_of_measurement: null,
            friendly_name: 'Heating function',
          },
          entity_id: 'heating_current_function',
          state: 'Warm water',
        },
        'sensor.car_consumption': {
          attributes: {
            unit_of_measurement: 'W',
          },
          entity_id: 'car_consumption',
          state: '2000',
        },
        'sensor.car_soc': {
          attributes: {
            unit_of_measurement: '%',
          },
          entity_id: 'car_soc',
          state: '90',
        },
        'sensor.house_consumption': {
          attributes: {
            unit_of_measurement: 'W',
          },
          entity_id: 'house_consumption',
          state: '4000',
        },
        'sensor.grid_to_house': {
          attributes: {
            unit_of_measurement: 'W',
          },
          entity_id: 'grid_to_house',
          state: '4000',
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

  it('has house_entity, text and icon', async () => {
    const gridEntity = teslaCard?.querySelector('.house_entity');
    if (gridEntity === null || gridEntity === undefined)
      assert.fail('No house_entity element found');
    expect(gridEntity?.querySelector('.acc_text')?.innerHTML).contains('4 kW');
    expect(
      gridEntity?.querySelector('.acc_icon')?.getAttribute('icon')?.toString()
    ).to.equal('mdi:home');
  });

  it('has appliance1_consumption_entity, text and icon', async () => {
    const gridEntity = teslaCard?.querySelector(
      '.appliance1_consumption_entity'
    );
    if (gridEntity === null || gridEntity === undefined)
      assert.fail('No appliance1_consumption_entity element found');
    expect(
      gridEntity?.querySelector('.acc_text')?.innerHTML,
      'No sum of appliance1 charging flows in acc_text of grid_entity'
    ).contains('2 kW');
    expect(
      gridEntity?.querySelector('.acc_icon')?.getAttribute('icon')?.toString()
    ).to.equal('mdi:car-sports');
    expect(
      gridEntity?.querySelector('.acc_text_extra')?.innerHTML,
      'Appliance 1 extra text is wrong'
    ).contains('90 %');
  });

  it('has appliance2_consumption_entity, text and icon', async () => {
    const gridEntity = teslaCard?.querySelector(
      '.appliance2_consumption_entity'
    );
    if (gridEntity === null || gridEntity === undefined)
      assert.fail('No appliance2_consumption_entity element found');
    expect(
      gridEntity?.querySelector('.acc_text')?.innerHTML,
      'No sum of appliance2 charging flows in acc_text of grid_entity'
    ).contains('1 kW');
    expect(
      gridEntity?.querySelector('.acc_icon')?.getAttribute('icon')?.toString()
    ).to.equal('mdi:air-filter');
    expect(
      gridEntity?.querySelector('.acc_text_extra')?.innerHTML,
      'Appliance 2 extra text is wrong'
    ).contains('Warm water');
  });

  it('has appliance1 line and circle', async () => {
    const appliance = teslaCard?.querySelector(
      '#appliance1_consumption_entity_line'
    );
    if (appliance === null || appliance === undefined) {
      assert.fail('No appliance1_consumption_entity_line element found');
    }
    const applianceCircle = teslaCard?.querySelector(
      '#appliance1_consumption_entity_circle'
    );
    if (applianceCircle === null || applianceCircle === undefined) {
      assert.fail('No appliance1_consumption_entity_circle element found');
    }
    expect(appliance?.getAttribute('hidden')).to.equal(null);
  });

  it('has appliance2 line and circle', async () => {
    const applianceLine = teslaCard?.querySelector(
      '#appliance2_consumption_entity_line'
    );
    if (applianceLine === null || applianceLine === undefined) {
      assert.fail('No appliance2_consumption_entity_line element found');
    }
    const applianceCircle = teslaCard?.querySelector(
      '#appliance1_consumption_entity_circle'
    );
    if (applianceCircle === null || applianceCircle === undefined) {
      assert.fail('No appliance2_consumption_entity_circle element found');
    }

    expect(applianceLine?.getAttribute('hidden')).to.equal(null);
  });

  it('has no pv, grid or battery icons', async () => {
    // assert.fail(haCard?.innerHTML);
    const pvEntity = teslaCard?.querySelector('.generation_yield_entity');
    if (pvEntity !== null)
      assert.fail('pv_consumption_entity element found, should not be there');

    const batteryEntity = teslaCard?.querySelector(
      '.battery_consumption_entity'
    );
    if (batteryEntity !== null)
      assert.fail(
        'battery_consumption_entity element found, should not be there'
      );

    const gridEntity = teslaCard?.querySelector('.grid_consumption_entity');
    if (gridEntity !== null)
      assert.fail('grid_consumption_entity element found, should not be there');
  });
});
