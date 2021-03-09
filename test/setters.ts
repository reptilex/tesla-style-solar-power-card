import {elementUpdated, fixture, html} from "@open-wc/testing";
import { TeslaStyleSolarPowerCard } from "../src/TeslaStyleSolarPowerCard.js";

const setCard = async (hass:any, config:any) => {
  const card = await fixture<TeslaStyleSolarPowerCard>(
    html`
        <tesla-style-solar-power-card .hass=${hass} .config=${{}}></tesla-style-solar-power-card>
      `
  );
  await card.setConfig(config);
  // Call firstUpdated() again because fixture already triggered it the first time.
  await card.firstUpdated();
  // TODO: Why is this needed for one test case only: 'has debug warning'?
  await card.setConfig(config);

  return card;
};

const setCardView = async (card:any, view:any) => {
  card.setAttribute('view', view);
};

const setCardAllInactive = async (card:any, hass:any, config:any) => {
  hass.states['sensor.solar_power'].state = "0";
  if (hass.states['sensor.grid_power']) {
    hass.states['sensor.grid_power'].state = "0";
  }
  if (hass.states['sensor.grid_power_consumption']) {
    hass.states['sensor.grid_power_consumption'].state = "0";
  }
  if (hass.states['sensor.grid_power_production']) {
    hass.states['sensor.grid_power_production'].state = "0";
  }
  if (hass.states['sensor.battery_power']) {
    hass.states['sensor.battery_power'].state = "0";
  }
  card.setAttribute('hass', JSON.stringify(hass));
  await elementUpdated(card);
  await card.setConfig(config);
};

export {setCard, setCardView, setCardAllInactive};