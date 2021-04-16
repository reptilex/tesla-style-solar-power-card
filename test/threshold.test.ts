import { expect, /* elementUpdated, */ assert } from '@open-wc/testing';
import { LovelaceCardConfig } from 'custom-card-helpers';
import { setViewport } from '@web/test-runner-commands';

import { TeslaStyleSolarPowerCard } from '../src/TeslaStyleSolarPowerCard.js';
import '../tesla-style-solar-power-card.js';
import { setCard } from './setters.js';

describe('TeslaStyleSolarPowerCard with threshold', () => {
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
      generation_to_grid_entity: 'sensor.generation_to_grid',
      battery_to_house_entity: 'sensor.battery_to_house',
      threshold_in_k: 1,
    };
    hass = {
      states: {
        'sensor.generation_to_house': {
          attributes: {
            unit_of_measurement: 'W',
          },
          entity_id: 'sensor.grid_to_house',
          state: '2801.000000001',
        },
        'sensor.generation_to_grid': {
          attributes: {
            unit_of_measurement: 'W',
          },
          entity_id: 'sensor.grid_to_house',
          state: '1801.000000001',
        },
        'sensor.battery_to_house': {
          attributes: {
            unit_of_measurement: 'W',
          },
          entity_id: 'sensor.battery_to_house',
          state: '801.000000001',
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
    teslaCard = <HTMLElement>haCard.querySelector('#tesla-style-solar-power-card');
    if (teslaCard === null || teslaCard === undefined) assert.fail('No tesla-style-card');
  });

  /* const setGridToHouseFlow = async (state: string) => {
    hass.states['sensor.grid_to_house'].state = state;
    card.setAttribute('hass', JSON.stringify(hass));
    await elementUpdated(card);
    await card.setConfig(config);
  }; */

  it('battery is below threshold', async () => {
    const gridEntity = teslaCard?.querySelector('.battery_entity');
    if (gridEntity === null || gridEntity === undefined) assert.fail('No battery_entity element found');
    expect(gridEntity?.querySelector('.acc_text')?.innerHTML).contains('801 W');
    expect(gridEntity?.querySelector('.acc_icon')?.getAttribute('icon')?.toString()).to.equal('mdi:battery-medium');
  });

  it('grid is above threshold', async () => {
    const gridEntity = teslaCard?.querySelector('.grid_entity');
    if (gridEntity === null || gridEntity === undefined) assert.fail('No grid_entity element found');
    expect(gridEntity?.querySelector('.acc_text')?.innerHTML).contains('1.8 kW');
    expect(gridEntity?.querySelector('.acc_icon')?.getAttribute('icon')?.toString()).to.equal('mdi:transmission-tower');
  });

  it('house is above threshold', async () => {
    card.requestUpdate();
    const houseEntity = teslaCard?.querySelector('.house_entity');
    if (houseEntity === null || houseEntity === undefined) assert.fail('No house_entity element found');
    expect(houseEntity?.querySelector('.acc_text')?.innerHTML).contains('3.6 kW');
    expect(houseEntity?.querySelector('.acc_icon')?.getAttribute('icon')?.toString()).to.equal('mdi:home');
  });
});
