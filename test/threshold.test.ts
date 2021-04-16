import { expect, elementUpdated, assert } from '@open-wc/testing';
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
      grid_to_house_entity: 'sensor.grid_to_house',
      grid_entity: 'sensor.grid_consumption',
      threshold_in_k: 5,
    };
    hass = {
      states: {
        'sensor.grid_to_house': {
          attributes: {
            unit_of_measurement: 'W',
          },
          entity_id: 'sensor.grid_to_house',
          state: '4001.000000001',
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

  const setGridToHouseFlow = async (state: string) => {
    hass.states['sensor.grid_to_house'].state = state;
    card.setAttribute('hass', JSON.stringify(hass));
    await elementUpdated(card);
    await card.setConfig(config);
  };

  it('is below threshold', async () => {
    const gridEntity = teslaCard?.querySelector('.grid_entity');
    if (gridEntity === null || gridEntity === undefined) assert.fail('No grid_entity element found');
    expect(gridEntity?.querySelector('.acc_text')?.innerHTML).contains('4001 W');
    expect(gridEntity?.querySelector('.acc_icon')?.getAttribute('icon')?.toString()).to.equal('mdi:transmission-tower');
  });

  it('is below threshold', async () => {
    await setGridToHouseFlow('4920');
    const gridEntity = teslaCard?.querySelector('.grid_entity');
    if (gridEntity === null || gridEntity === undefined) assert.fail('No grid_entity element found');
    expect(gridEntity?.querySelector('.acc_text')?.innerHTML).contains('4920 W');
    expect(gridEntity?.querySelector('.acc_icon')?.getAttribute('icon')?.toString()).to.equal('mdi:transmission-tower');
  });

  it('is above threshold', async () => {
    await setGridToHouseFlow('5000');
    card.requestUpdate();
    const houseEntity = teslaCard?.querySelector('.house_entity');
    if (houseEntity === null || houseEntity === undefined) assert.fail('No house_entity element found');
    expect(houseEntity?.querySelector('.acc_text')?.innerHTML).contains('5 kW');
    expect(houseEntity?.querySelector('.acc_icon')?.getAttribute('icon')?.toString()).to.equal('mdi:home');
  });
});
