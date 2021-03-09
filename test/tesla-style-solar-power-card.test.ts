import { html, fixture, expect } from '@open-wc/testing';

import { TeslaStyleSolarPowerCard } from '../src/TeslaStyleSolarPowerCard.js';
import '../tesla-style-solar-power-card.js';
/*
 describe('TeslaStyleSolarPowerCard', () => {
  it('has a default title "Hey there" and counter 5', async () => {
    const el = await fixture<TeslaStyleSolarPowerCard>(html`<tesla-style-solar-power-card></tesla-style-solar-power-card>`);

    expect(el.title).to.equal('Hey there');
    expect(el.counter).to.equal(5);
  });

  it('increases the counter on button click', async () => {
    const el = await fixture<TeslaStyleSolarPowerCard>(html`<tesla-style-solar-power-card></tesla-style-solar-power-card>`);
    el.shadowRoot!.querySelector('button')!.click();

    expect(el.counter).to.equal(6);
  });

  it('can override the title via attribute', async () => {
    const el = await fixture<TeslaStyleSolarPowerCard>(html`<tesla-style-solar-power-card title="attribute title"></tesla-style-solar-power-card>`);

    expect(el.title).to.equal('attribute title');
  });
  

  it('has an accesible shadowDom', async () => {
    const el = await fixture<TeslaStyleSolarPowerCard>(html`<tesla-style-solar-power-card></tesla-style-solar-power-card>`);

    await expect(el).shadowDom.to.be.accessible();
  });
  
});
*/