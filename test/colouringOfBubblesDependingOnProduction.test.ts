import { expect, elementUpdated, assert } from '@open-wc/testing';
import { LovelaceCardConfig } from 'custom-card-helpers';
import { setViewport } from '@web/test-runner-commands';

import { TeslaStyleSolarPowerCard } from '../src/TeslaStyleSolarPowerCard.js';
import '../tesla-style-solar-power-card.js';
import { setCard } from './setters.js';

describe('Colouring of bubble depending on production test', () => {
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
      generation_to_house_entity: 'sensor.generation_to_house',
      battery_to_house_entity: 'sensor.battery_to_house',
      grid_to_house_entity: 'sensor.grid_to_house',
      change_house_bubble_color_with_flow: 1,
    };
    hass = {
      states: {
        'sensor.generation_to_house': {
          attributes: {
            unit_of_measurement: 'W',
          },
          entity_id: 'generation_to_house',
          state: '1100.1221',
        },
        'sensor.battery_to_house': {
          attributes: {
            unit_of_measurement: 'W',
          },
          entity_id: 'battery_to_house',
          state: '2051.1221',
        },
        'sensor.grid_to_house': {
          attributes: {
            unit_of_measurement: 'W',
          },
          entity_id: 'grid_to_house',
          state: '1050.1221',
        },
      },
    };
    await setViewport({ width: 1200, height: 1000 });
    card = <TeslaStyleSolarPowerCard>await setCard(hass, config);
    if (card.shadowRoot === null) assert.fail('No Card Shadowroot');
    haCard = card.shadowRoot.querySelector('ha-card');
    if (haCard === null || haCard === undefined) assert.fail('No ha-card');
    teslaCard = <HTMLElement>haCard.querySelector('#tesla-style-solar-power-card');
    if (teslaCard === null || teslaCard === undefined) assert.fail('No tesla-style-card');
  });

  it('house_icon shoud have success colour', async () => {
    const houseEntity = <HTMLElement>teslaCard?.querySelector('.house_entity');
    if (houseEntity === null || houseEntity === undefined) assert.fail('No house_entity element found');
    expect(houseEntity?.querySelector('.acc_text')?.innerHTML, 'sum of consumptions in mixed house consumption is wrong').contains(
      '4.2 kW'
    );
    expect(houseEntity?.querySelector('.acc_icon')?.getAttribute('icon')?.toString()).to.equal('mdi:home');

    expect(houseEntity.style.color).to.equal('var(--success-color)');
  });

  const setGenerationToHouseFlow = async (state: string) => {
    hass.states['sensor.generation_to_house'].state = state;
    card.setAttribute('hass', JSON.stringify(hass));
    await elementUpdated(card);
    await card.setConfig(config);
  };

  it('house_icon shoud have warning colour', async () => {
    await setGenerationToHouseFlow('2500');
    const houseEntity = <HTMLElement>teslaCard?.querySelector('.house_entity');
    if (houseEntity === null || houseEntity === undefined) assert.fail('No house_entity element found');
    expect(houseEntity?.querySelector('.acc_text')?.innerHTML, 'sum of consumptions in mixed house consumption is wrong').contains(
      '5.6 kW'
    );
    expect(houseEntity?.querySelector('.acc_icon')?.getAttribute('icon')?.toString()).to.equal('mdi:home');

    expect(houseEntity.style.color).to.equal('var(--warning-color)');
  });

  const setGridToHouseFlow = async (state: string) => {
    hass.states['sensor.grid_to_house'].state = state;
    card.setAttribute('hass', JSON.stringify(hass));
    await elementUpdated(card);
    await card.setConfig(config);
  };

  it('house_icon shoud have no colour', async () => {
    await setGridToHouseFlow('3500');
    const houseEntity = <HTMLElement>teslaCard?.querySelector('.house_entity');
    if (houseEntity === null || houseEntity === undefined) assert.fail('No house_entity element found');
    expect(houseEntity?.querySelector('.acc_text')?.innerHTML, 'sum of consumptions in mixed house consumption is wrong').contains(
      '6.7 kW'
    );
    expect(houseEntity?.querySelector('.acc_icon')?.getAttribute('icon')?.toString()).to.equal('mdi:home');
    expect(houseEntity.style.color).to.equal('var(--info-color)');
  });
});
