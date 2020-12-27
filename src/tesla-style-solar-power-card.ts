/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  LitElement,
  html,
  customElement,
  property,
  CSSResult,
  TemplateResult,
  css,
  internalProperty,
} from 'lit-element';
import {
  HomeAssistant,
  LovelaceCardEditor,
  getLovelace,
} from 'custom-card-helpers'; // This is a community maintained npm module with common helper functions/types

import type { TeslaStyleSolarPowerCardConfig } from './types';

import './editor';
import { SensorElement } from './SensorElement';
import { CARD_VERSION } from './const';
import { localize } from './localize/localize';

/* eslint no-console: 0 */
console.info(
  `%c  tesla-style-solar-power-card \n%c  ${localize('common.version')} ${CARD_VERSION}    `,
  'color: orange; font-weight: bold; background: black',
  'color: white; font-weight: bold; background: dimgray',
);

// This puts your card into the UI card picker dialog
(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: 'tesla-style-solar-power-card',
  name: 'Tesla Style Solar Power Card',
  description: 'A Solar Power Visualization with svg paths that mimmicks the powerwall app of tesla 2',
});

@customElement('tesla-style-solar-power-card')
export class TeslaStyleSolarPowerCard extends LitElement {
  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    return document.createElement('tesla-style-solar-power-card-editor');
  }

  public static getStubConfig(): Record<string, any> {
    return {};
  }

  // TODO Add any properities that should cause your element to re-render here
  // https://lit-element.polymer-project.org/guide/properties
  @property({ attribute: false }) public hass!: HomeAssistant;
  @internalProperty() private config!: TeslaStyleSolarPowerCardConfig;
  @property({ attribute: false }) public solarCardElements: Map<string,SensorElement> = new Map();
  @internalProperty() private oldWidth = 100;
  private pxRate = 30;
  private powerCardElement;


  // https://lit-element.polymer-project.org/guide/properties#accessors-custom
  public setConfig(config: TeslaStyleSolarPowerCardConfig): void {
    if (!config) {
      throw new Error(localize('common.invalid_configuration'));
    }

    if (config.test_gui) {
      getLovelace().setEditMode(true);
    }

    this.config = {
      ...config,
    };

    if (this.config.grid_icon == null) this.config.grid_icon = 'mdi:transmission-tower';
    if (this.config.pv_icon == null) this.config.pv_icon = 'mdi:solar-panel-large';
    if (this.config.home_icon == null) this.config.home_icon = 'mdi:home';
    if (this.config.appliance1_icon == null) this.config.appliance1_icon = 'mdi:car-sports';
    if (this.config.appliance2_icon == null) this.config.appliance2_icon = 'mdi:air-filter';


    this.createSolarCardElements();
    let obj;
    obj = this;
    setInterval(this.animateCircles, 15, obj)
    obj = this;
  }

  private createSolarCardElements():void {
    Object.keys(this.config).forEach(key => {
      if (key.indexOf('_entity') > 5 && this.config[key] != null) {
        const sensorName = this.config[key].toString()
        this.solarCardElements.set(key, new SensorElement(sensorName, key));
      }
    });
  }

  //LitElement process functions

  async firstUpdated():Promise<void> {
    // Give the browser a chance to paint
    await new Promise((r) => setTimeout(r, 0));
    this.changeStylesDependingOnWidth(this.clientWidth);
  }

  public connectedCallback():void {
    super.connectedCallback();
    this.redraw = this.redraw.bind(this);
    window.addEventListener('resize', this.redraw);
    window.addEventListener('resize', this.redraw);
  }

  shouldUpdate(changedProperties: any): boolean {
    let obj;
    obj = this;
    requestAnimationFrame(function (timestamp) {
      obj.updateAllCircles(timestamp);
    })
    obj = this;

    //Update only when our values in hass changed
    let update = true;
    Array.from(changedProperties.keys()).some((propName) => {
      const oldValue = changedProperties.get(propName);
      if (propName === "hass" && oldValue) {
        update = update && this.sensorChangeDetected(oldValue);
      }
      return !update;
    });
    return update;
  }

  private sensorChangeDetected(oldValue):boolean {
    let change = false;
    this.solarCardElements.forEach((_solarSensor, key) => {
      if (this.hass.states[this.config[key]] != undefined && this.hass.states[this.config[key]].state !== oldValue.states[this.config[key]].state) {
        change = true;
      }
    });
    return change;
  }

  async performUpdate(): Promise<void> {
    this.solarCardElements.forEach((solarSensor) => {
      solarSensor.setValueAndUnitOfMeasurement(
        this.hass.states[solarSensor.entity].state,
        this.config.w_not_kw,
        this.hass.states[solarSensor.entity].attributes.unit_of_measurement);
      solarSensor.setSpeed();
    });

    super.performUpdate();
  }

  //render functions

  protected render(): TemplateResult | void {
    // TODO Check for stateObj or other necessary things and render a warning if missing
    if (this.config.show_warning) return this._showWarning(localize('common.show_warning'));
    if (this.config.show_error) return this._showError(localize('common.show_error'));

    this.pxRate = this.clientWidth / 100;

    return html`
    <ha-card
      .header=${this.config.name}
      tabindex="0"
      .label=${`TeslaStyleSolarPowerCard: ${this.config.entity || 'No Entity Defined'}`}
    >
      <div id="tesla-style-solar-power-card">
        ${this.writeCardDiv('solar_consumption_entity', 'acc_top', 'pv_icon')}
        <div class="acc_center">
          <div class="acc_center_container">
            ${this.writeCardDiv('grid_consumption_entity', 'acc_left', 'grid_icon')}
            ${this.writeCenterPowerLinesAndCircles()}
            ${this.writeCardDiv('home_consumption_entity', 'acc_right', 'home_icon')}
            ${this.writeCardDiv('appliance1_consumption_entity', 'acc_appliance1', 'appliance1_icon')}
            ${this.writeAppliancePowerLineAndCircle(1,'M4,' + 16 * this.pxRate + ' C4,' + 16 *this.pxRate+' 4,0 4,0')}
            ${this.writeCardDiv('appliance2_consumption_entity', 'acc_appliance2', 'appliance2_icon')}
            ${this.writeAppliancePowerLineAndCircle(2,'M4,0 C4,0 4,'+16*this.pxRate+' 4,'+16*this.pxRate)}
          </div>
        </div>
        <div class="acc_bottom">
          ${this.writeCardDiv('battery_consumption_entity', 'acc_battery', 'getBatteryIcon')}
        </div>
      </div>
    </ha-card>
    `;
  }

  private writeCardDiv(entityName: string, cssSelector: string, icon: string): TemplateResult {
    const divEntity = this.solarCardElements.get(entityName);
    if (divEntity == null) return html``;

    let iconName: string;
    if (typeof this[icon] === 'function') {
      iconName = this[icon]();
    } else {
      iconName = this.config[icon];
    }

    return html`
    <div class= "acc_td ${cssSelector}">
        <div class="acc_container ${entityName}"
             style="${'width:' + 9 * this.pxRate + 'px; height: ' + 9 * this.pxRate + 'px; padding:' + 5 * this.pxRate + 'px'}"
             @click="${() => this._handleClick(this.hass.states[divEntity.entity])}"
            >
              ${this.writeSecondInfoOnIconForBatteryAndAppliances(entityName)}
              <ha-icon class="acc_icon" icon="${ iconName }" ></ha-icon>
              <div class='acc_text' style="font-size:${3 * this.pxRate + 'px'}; margin-top:${-1 * this.pxRate + 'px'}">
                ${divEntity.value.toString()} ${divEntity.unitOfMeasurement}
              </div>
        </div>
    </div>`
  }

  private writeCenterPowerLinesAndCircles(): TemplateResult {
    const half = 22 * this.pxRate;
    return html`
    <div class="acc_line power_lines"
      style="
        height:${42 * this.pxRate + 'px'};
        width:${42 * this.pxRate + 'px'};
        top:${0 * this.pxRate + 'px'};
        left:${28 * this.pxRate + 'px'}"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="${"0 0 "+ 42 * this.pxRate + " " + 42 * this.pxRate}"
        preserveAspectRatio="xMinYMax slice"
        style="height:${42 * this.pxRate + 'px'};width:${42 * this.pxRate + 'px'}"
      >
        ${this.writeCircleAndLine('solar_consumption_entity', 'M'+ half +',0 C'+ half +','+ half +' '+ half +','+ half +' '+half*2+','+half)}
        ${this.writeCircleAndLine('grid_consumption_entity', 'M0,'+half+' C'+half+','+ half + ' '+half +','+half+' '+half * 2+','+half) }
        ${this.writeCircleAndLine('grid_feed_in_entity', 'M'+ half +',0 C'+ half +','+ half +' '+ half +','+ half +' 0,'+ half)}
        ${this.writeCircleAndLine('grid_to_battery_entity',  'M0,'+half+' C'+half+','+ half + ' '+half +','+half+' '+half+','+half * 2)}
        ${this.writeCircleAndLine('solar_to_battery_entity', 'M'+half+',0 C'+half+',0 '+half+','+ half * 2 +' '+half+','+ half*2)}
        ${this.writeCircleAndLine('battery_consumption_entity', 'M'+ half +','+ half * 2 +' C'+ half +','+ half +' '+ half +','+ half +' '+ half * 2 +','+ half)}
      </svg>
    </div>`;
  }

  private writeAppliancePowerLineAndCircle(applianceNumber, pathDAttribute:string) {
    const height = 18;
    const width = 4;
    let verticalPosition: string;
    if (applianceNumber == 1) {
      verticalPosition = 'top:' + 23 * this.pxRate + 'px;';
    } else {
      verticalPosition = 'bottom:' + 15 * this.pxRate + 'px;';
    }
    return html`<div class="acc_line acc_appliance${applianceNumber}_line"
      style="
        height:${height * this.pxRate + 'px'};
        width:${width * this.pxRate + 'px'};
        right:${10 * this.pxRate + 'px'};
        ${verticalPosition}
        position:absolute"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="${"0 0 "+ 26 * this.pxRate + " " + 26 * this.pxRate}"
        preserveAspectRatio="xMinYMax slice"
        style="height:${height * this.pxRate + 'px'};width:${width * this.pxRate + 'px'}"
      >
        ${this.writeCircleAndLine('appliance'+applianceNumber+'_consumption_entity', pathDAttribute)}
        </svg>
    </div>`
  }

  private writeCircleAndLine(sensorName: string, pathDAttribute: string) {
    const entity = this.solarCardElements.get(sensorName);
    if (entity == null) return;
    return html `<svg><circle r="4"
        cx="${entity.startPosition.toString()}"
        cy="4"
        fill="${entity.color}"
        id="${sensorName + "_circle"}">
      </circle>
      <path d="${pathDAttribute}" id="${sensorName+"_line"}"></path></svg>`;
  }


  private writeSecondInfoOnIconForBatteryAndAppliances(sensorName):TemplateResult {
    if (sensorName == 'battery_consumption_entity' && this.solarCardElements.has('battery_soc_entity')) {
      return this.writeSecondSensorDataInIcon('battery_soc_entity')
    }
    if (sensorName == 'appliance1_consumption_entity' && this.solarCardElements.has('appliance1_state_entity')) {
      return this.writeSecondSensorDataInIcon('appliance1_state_entity')
    }
    if (sensorName == 'appliance2_consumption_entity' && this.solarCardElements.has('appliance2_state_entity')) {
      return this.writeSecondSensorDataInIcon('appliance2_state_entity')
    }

    return html``;
  }

  writeSecondSensorDataInIcon(sensorName:string):TemplateResult{
    if (this.shadowRoot == null) return html``
    this.powerCardElement = <HTMLElement>this.shadowRoot.querySelector('#tesla-style-solar-power-card');
    if (this.powerCardElement == null) return html``
    const entity = this.solarCardElements.get(sensorName);
    if (entity == null) return html``;

    return html`
      <div class='acc_text_extra'
      style="font-size:${3 * this.pxRate + 'px'};
             top: ${1 * this.pxRate + 'px'};
             width: ${10 * this.pxRate + 'px'};">
        ${entity.value.toString()} ${entity.unitOfMeasurement}
      </div>
     `
  }

  private changeStylesDependingOnWidth(newWidth: number) {
    if ((document.readyState !== "complete" || this.oldWidth == newWidth)) return;
    if (this.shadowRoot == null) return
    this.powerCardElement = <HTMLElement>this.shadowRoot.querySelector('#tesla-style-solar-power-card');
    if (this.powerCardElement == null) return
    //console.log('changing styles oldwidth:'+this.oldWidth+' newwidth:'+newWidth)
    this.oldWidth = newWidth;
    this.pxRate = newWidth / 100;
    const pxRate = this.pxRate; //more readable


    this.changeSelectorStyle('.acc_left', 'top',12 * pxRate +'px');
    this.changeSelectorStyle('.acc_right', 'top',12 * pxRate +'px');
    if(this.solarCardElements.get('battery_consumption_entity') == undefined && this.solarCardElements.get('appliance2_consumption_entity') != undefined ){
      this.changeSelectorStyle('.acc_center_container', 'margin-bottom', 15 * pxRate + 'px');
    }

    //icons
    this.powerCardElement.querySelectorAll('.acc_container').forEach(
      function(_currentValue, currentIndex, iconContainerItem){
        const iconContainer = <HTMLElement>iconContainerItem[currentIndex]
        iconContainer.style["height"] = 9 * pxRate + 'px';
        iconContainer.style["width"] = 9 * pxRate + 'px';
        iconContainer.style["padding"] = 5 * pxRate + 'px';
      }
    );
    this.powerCardElement.querySelectorAll('ha-icon').forEach(
      function(_currentValue, currentIndex, icons){
        const icon = <HTMLElement>icons[currentIndex].shadowRoot?.querySelector('ha-svg-icon');
        if(icon != null){
          icon.style["height"] = 9 * pxRate + 'px';
          icon.style["width"] = 9 * pxRate + 'px';
        }
      }
    );
    this.powerCardElement.querySelectorAll('.acc_text').forEach((icontext) => {
      icontext.style['font-size'] =  3 * pxRate + 'px';
      icontext.style['margin-top'] =  -1 * pxRate + 'px';
    });
    this.powerCardElement.querySelectorAll('.acc_text_extra').forEach((icontext) => {
      icontext.style['font-size'] = 3 * this.pxRate + 'px';
      icontext.style['top'] = 1 * this.pxRate + 'px';
      icontext.style['width'] = 10 * this.pxRate + 'px';
    });


    //power lines
    this.changeSelectorStyle('.power_lines', 'height', 42 * pxRate + 'px');
    this.changeSelectorStyle('.power_lines', 'width', 42 * pxRate + 'px');
    this.changeSelectorStyle('.power_lines', 'top', 21 * pxRate + 'px');
    this.changeSelectorStyle('.power_lines', 'left', 21 * pxRate + 'px');
    this.changeSelectorStyle('.power_lines svg', 'width',42 * pxRate + 'px');
    this.changeSelectorStyle('.power_lines svg', 'height', 42 * pxRate + 'px');
    this.changeSelectorStyle('.power_lines svg', 'viewBox', '0 0 ' + 42 * pxRate + ' ' + 42 * pxRate);
    const half = 22 * pxRate;
    this.changeSelectorStyle('#solar_consumption_entity_line','d', 'M'+ half +',0 C'+ half +','+ half +' '+ half +','+ half +' '+half*2+','+half);
    this.changeSelectorStyle('#grid_feed_in_entity_line','d', 'M'+ half +',0 C'+ half +','+ half +' '+ half +','+ half +' 0,'+ half);
    this.changeSelectorStyle('#grid_consumption_entity_line','d',  'M0,'+half+' C'+half+','+ half + ' '+half +','+half+' '+half * 2+','+half);
    this.changeSelectorStyle("#grid_to_battery_entity_line",'d', 'M0,'+half+' C'+half+','+ half + ' '+half +','+half+' '+half+','+half * 2);
    this.changeSelectorStyle('#battery_consumption_entity_line','d', 'M'+ half +','+ half * 2 +' C'+ half +','+ half +' '+ half +','+ half +' '+ half * 2 +','+ half);
    this.changeSelectorStyle('#solar_to_battery_entity_line', 'd', 'M' + half + ',0 C' + half + ',0 ' + half + ',' + half * 2 + ' ' + half + ',' + half * 2);

    //appliances
    [1, 2].forEach((value) => {
      this.changeSelectorStyle(".acc_appliance"+value+"_line", 'right', 10 * this.pxRate + 'px')
      this.changeSelectorStyle(".acc_appliance"+value+"_line", 'width', 4 * pxRate + 'px')
      this.changeSelectorStyle(".acc_appliance"+value+"_line", 'height', 18 * pxRate + 'px')
      this.changeSelectorStyle(".acc_appliance"+value+"_line svg", 'viewBox', "0 0 "+ 26 * this.pxRate + " " + 26 * this.pxRate)
      this.changeSelectorStyle(".acc_appliance"+value+"_line svg", 'width', 4 * pxRate + 'px')
      this.changeSelectorStyle(".acc_appliance" + value + "_line svg", 'height', 18 * pxRate + 'px')
    });
    this.changeSelectorStyle(".acc_appliance1",'top', 10 + 'px');
    this.changeSelectorStyle(".acc_appliance1_line", 'top', 23 * pxRate + 'px');
    this.changeSelectorStyle(".acc_appliance2", 'bottom', 10 + 'px');
    this.changeSelectorStyle(".acc_appliance2_line", 'bottom', 15 * pxRate + 'px');
  }

  private changeSelectorStyle(selector: string, styleAttribute:string, attributeValue:string) {
    const selectorElement = <HTMLElement > this.powerCardElement.querySelector(selector)
    if (selectorElement == null) {
      return
    }
    selectorElement.style[styleAttribute] = attributeValue;
  }

  private getBatteryIcon() { //called as dynamic function in this.writeCardDiv()
    const batterySoc = this.solarCardElements.get('battery_soc_entity');
    if (batterySoc == null) return;

    if (batterySoc.value <= 5) batterySoc.value = 0;
    const batteryStateValue = Math.ceil(batterySoc.value / 10) * 10;
    let batteryStateIconString = '-'+batteryStateValue.toString();
    let batteryCharging = '';

    //show charging icon beside battery state
    if (this.solarCardElements.get('grid_to_battery_entity') != null || this.solarCardElements.get('solar_to_battery_entity') != null){
      batteryCharging = '-charging';
    }

    if(batteryStateValue == 100) batteryStateIconString = ''; //full
    if(batteryStateValue <= 5) batteryStateIconString = '-outline'; //empty
    return 'mdi:battery'+batteryCharging+batteryStateIconString;
  }

  public updateAllCircles(timestamp): void{
    //console.log('updating all circles')
    this.solarCardElements.forEach((_solarSensor, key, _map) => {
      const element = this.solarCardElements.get(key);
      if(element != undefined)
      this.updateOneCircle(timestamp, element)
    });
  }

  private animateCircles(obj) {
    requestAnimationFrame(function (timestamp) {
      obj.updateAllCircles(timestamp);
    });
  }

  private updateOneCircle(timestamp: number, entity: SensorElement) {
    if (this.shadowRoot == null) return;
    const powerCardElement = <HTMLElement>this.shadowRoot.querySelector('#tesla-style-solar-power-card');
    if (powerCardElement == null) return;
    entity.line = <HTMLElement>powerCardElement.querySelector('#' + entity.entitySlot + '_line');
    if (entity.line == undefined) return;
    const lineLength = entity.line.getTotalLength();
    if(isNaN(lineLength)) return;

    entity.circle = <HTMLElement>powerCardElement.querySelector('#' + entity.entitySlot + '_circle');

    if (entity.speed == 0) {
      entity.circle.setAttribute('visibility', 'hidden');
      if(this.config.hide_inactive_lines) entity.line.setAttribute('visibility', 'hidden');
      return;
    }

    entity.circle.setAttribute('visibility', 'visible');
    if (this.config.hide_inactive_lines) entity.line.setAttribute('visibility', 'visible');

    if (entity.prevTimestamp == 0) {
      entity.prevTimestamp = timestamp;
      entity.currentDelta = 0;
    }

    entity.currentDelta += entity.speed * (timestamp - entity.prevTimestamp);
    let percentageDelta = entity.currentDelta / lineLength;
    if (percentageDelta >= 1 || isNaN(percentageDelta)) {
      entity.currentDelta = 0;
      percentageDelta = 0.01;
    }

    const point = entity.line.getPointAtLength(lineLength * percentageDelta);
    entity.circle.setAttributeNS(null, "cx", point.x);
    entity.circle.setAttributeNS(null, "cy", point.y);

    entity.prevTimestamp = timestamp;
  }


  private redraw(ev: UIEvent) {
    //console.log('redraw + '+ev.type)
    if (this.hass && this.config && ev.type == 'resize') {
      this.changeStylesDependingOnWidth(this.clientWidth)
    }
  }

  //actions

  private _handleClick(stateObj) {
    const event = <any>new Event('hass-more-info', {
      bubbles: true,
      cancelable: true,
      composed: true,
    });
    event.detail = { entityId: stateObj.entity_id };
    if (this.shadowRoot == null) return;
    this.shadowRoot.dispatchEvent(event);
  }

  private _showWarning(warning: string): TemplateResult {
    return html`
      <hui-warning>${warning}</hui-warning>
    `;
  }

  private _showError(error: string): TemplateResult {
    const errorCard = document.createElement('hui-error-card');
    errorCard.setConfig({
      type: 'error',
      error,
      origConfig: this.config,
    });

    return html`
      ${errorCard}
    `;
  }

  static get styles(): CSSResult {
    return css`
    #tesla-style-solar-power-card{
      margin:auto;
      display:table;
      padding: 10px;
      position: relative;
    }
    .acc_container {
        height: 40px;
        width: 40px;
        border: 1px solid black;
        border-radius: 100px;
        padding: 22px;
        color: var(--primary-text-color);
        border-color: var(--primary-text-color);
        position:relative;
        cursor:pointer;
    }
    .acc_icon {
        --mdc-icon-size: 40px;
    }
    .acc_text,
    .acc_text_extra {
        text-align: center;
        white-space: nowrap;
    }
    .acc_text_extra {
      overflow: hidden;
      position: absolute;
    }
    .acc_td {
        vertical-align: top;
    }
    .acc_center .acc_td{
      position:relative;
    }
    .acc_top .acc_container,
    .acc_bottom .acc_container{
        margin:auto;
    }
    .acc_center{
      display:flex;
    }
    .acc_center_container{
      display:inline-block;
      margin: 0px auto;
      margin-bottom:-5px;
    }

    .acc_right ,
    .acc_left ,
    .acc_line{
      display:inline-block;
      margin-right:-4px
    }
    .acc_left {
      vertical-align: top;
      z-index:5;
    }
    .acc_right {
      z-index:5;
      margin-right:0px;
    }
    #battery_consumption_entity_line,
    #solar_consumption_entity_line,
    #grid_consumption_entity_line,
    #solar_to_battery_entity_line,
    #grid_feed_in_entity_line,
    #grid_to_battery_entity_line,
    #appliance1_consumption_entity_line,
    #appliance2_consumption_entity_line{
      stroke:var(--info-color);
      fill:none;
      stroke-width:1;
    }

    .solar_consumption_entity {
      border: 1px solid var(--warning-color);
    }
    .solar_consumption_entity .acc_icon,
    .solar_consumption_entity{
      color: var(--warning-color);
    }
    .home_consumption_entity,
    .appliance1_consumption_entity,
    .appliance2_consumption_entity {
      border: 1px solid var(--info-color);
    }
    .home_consumption_entity,
    .appliance1_consumption_entity,
    .appliance2_consumption_entity{
      color: var(--info-color);
    }
    #grid_consumption_entity_line{
      stroke-width:1;
    }
    #solar_consumption_entity_line,
    #grid_feed_in_entity_line,
    #solar_to_battery_entity_line{
      stroke:var(--warning-color);
    }
    #solar_consumption_entity_circle,
    #grid_feed_in_entity_circle,
    #solar_to_battery_entity_circle{
      fill:var(--warning-color);
    }
    #battery_consumption_entity_line{
      stroke:var(--success-color);
    }
    #battery_consumption_entity_circle{
      fill:var(--success-color);
    }
    .battery_soc_entity,
    .battery_consumption_entity{
      border: 1px solid var(--success-color);
      color: var(--success-color);
    }
    .battery_charge_state_text{
      position:absolute;
      top:8px;
    }
    br.clear {
      clear:both;
    }
    .power_lines svg{
      transform: translateZ(0);
      display:inline-block;
    }
    .acc_center .acc_td.acc_appliance1,
    .acc_center .acc_td.acc_appliance2 {
      position: absolute;
      right: 10px;
    `;
  }
}