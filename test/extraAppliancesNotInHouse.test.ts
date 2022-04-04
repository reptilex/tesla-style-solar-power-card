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
      house_without_appliances_values: 'sensor.heating_current_function',
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
    const houseEntity = teslaCard?.querySelector('.house_entity');
    if (houseEntity === null || houseEntity === undefined)
      assert.fail('No house_entity element found');
    expect(houseEntity?.querySelector('.acc_text')?.innerHTML.replace(/<!--[^(-->)]+-->/g, '')).contains('1 kW');
    expect(
      houseEntity?.querySelector('.acc_icon')?.getAttribute('icon')?.toString()
    ).to.equal('mdi:home');
  });
});
