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
      grid_to_house_entity: 'sensor.grid_to_house',
      grid_entity: 'sensor.grid_consumption',
    };
    hass = {
      states: {
        'sensor.grid_to_house': {
          attributes: {
            unit_of_measurement: 'W',
          },
          entity_id: 'sensor.grid_to_house',
          state: '500.000000001',
        },
        'sensor.grid_consumption': {
          attributes: {
            unit_of_measurement: 'W',
          },
          entity_id: 'sensor.grid_consumption',
          state: '500.000000001',
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

  it('has card size 5', () => {
    expect(card.getCardSize()).to.equal(5);
  });

  /* it('has a title "Powerhouse"', async () => {
    if(haCard === null || haCard === undefined) assert.fail("No ha-card");
    if(haCard.shadowRoot === null) assert.fail(haCard.outerHTML);
    console.log(haCard);
    expect(haCard.shadowRoot.querySelector('h1')?.innerText).is.equal('Powerhouse');
  }); */

  it('has no warnings or errors', async () => {
    if (card.shadowRoot === null) assert.fail('No Card Shadowroot');
    console.log(card.innerHTML);
    expect(card.shadowRoot.querySelectorAll('.message').length).to.equal(0);
  });

  it('has grid_entity and icon', async () => {
    const gridEntity = teslaCard?.querySelector('.grid_entity');
    if (gridEntity === null || gridEntity === undefined)
      assert.fail('No grid_entity element found');
    expect(gridEntity?.querySelector('.acc_text')?.innerHTML).contains(
      '0.5 kW'
    );
    expect(
      gridEntity?.querySelector('.acc_icon')?.getAttribute('icon')?.toString()
    ).to.equal('mdi:transmission-tower');
  });

  it('has house_entity, text and icon', async () => {
    const houseEntity = teslaCard?.querySelector('.house_entity');
    if (houseEntity === null || houseEntity === undefined)
      assert.fail('No house_entity element found');
    expect(houseEntity?.querySelector('.acc_text')?.innerHTML).contains(
      '0.5 kW'
    );
    expect(
      houseEntity?.querySelector('.acc_icon')?.getAttribute('icon')?.toString()
    ).to.equal('mdi:home');
  });

  it('has grid to house consumption line and circle', async () => {
    // await setCardConsumingFromGrid();
    const gridConsumptionLine = teslaCard?.querySelector(
      '#grid_to_house_entity_line'
    );
    if (gridConsumptionLine === null || gridConsumptionLine === undefined) {
      assert.fail('No grid_to_house_entity_line element found');
    }
    const gridConsumptionCircle = teslaCard?.querySelector(
      '#grid_to_house_entity_circle'
    );
    if (gridConsumptionCircle === null || gridConsumptionCircle === undefined) {
      assert.fail('No grid_to_house_entity_circle element found');
    }

    if (haCard === null || haCard === undefined) assert.fail('No ha-card');
    expect(gridConsumptionLine?.getAttribute('hidden')).to.equal(null);
  });

  it('has no pv, battery or appliance icons', async () => {
    const pvEntity = teslaCard?.querySelector('.generation_entity');
    if (pvEntity !== null) assert.fail('No generation_entity element found');

    const batteryEntity = teslaCard?.querySelector('.battery_entity');
    if (batteryEntity !== null) assert.fail('No battery_entity element found');

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
