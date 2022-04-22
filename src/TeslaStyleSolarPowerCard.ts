/* eslint-disable no-restricted-globals, prefer-template, no-param-reassign, class-methods-use-this, lit-a11y/click-events-have-key-events, no-bitwise, import/extensions */
import { LitElement, html, TemplateResult, CSSResult, css, unsafeCSS } from 'lit';
import { property } from 'lit/decorators.js';
import { HomeAssistant, LovelaceCardConfig /* , LovelaceCardEditor */ } from 'custom-card-helpers';
import { TeslaStyleSolarPowerCardConfig } from './models/TeslaStyleSolarPowerCardConfig';

/* import './components/editor'; */

import { SensorElement } from './models/SensorElement';
import { BubbleData } from './models/BubbleData';
import { HtmlWriterForPowerCard } from './services/HtmlWriterForPowerCard';
import { HtmlResizeForPowerCard } from './services/HtmlResizeForPowerCard';
// import { localize } from './localize/localize';

// This puts your card into the UI card picker dialog
(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: 'tesla-style-solar-power-card',
  name: 'Tesla Style Solar Power Card',
  description: 'A Solar Power Visualization with svg paths that mimmicks the powerwall app of tesla 2',
});
export class TeslaStyleSolarPowerCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;

  @property() private config!: TeslaStyleSolarPowerCardConfig;

  @property({ attribute: false }) public solarCardElements: Map<string, SensorElement> = new Map();
  
  @property() private oldWidth = 100;

  public pxRate = 4;

  private htmlWriter: HtmlWriterForPowerCard = new HtmlWriterForPowerCard(this, this.hass);

  private error: string = '';

  public setConfig(config: LovelaceCardConfig): void {
    if (!config) {
      // throw new Error(localize('common.invalid_configuration'));
    }

    if (config.test_gui) {
      // getLovelace().setEditMode(true);
    }

    this.config = {
      ...config,
    };

    if (this.config.grid_icon == null) this.config.grid_icon = 'mdi:transmission-tower';
    if (this.config.generation_icon == null) this.config.generation_icon = 'mdi:solar-panel-large';
    if (this.config.house_icon == null) this.config.house_icon = 'mdi:home';
    if (this.config.battery_icon == null) this.config.battery_icon = 'mdi:battery-medium';
    if (this.config.appliance1_icon == null) this.config.appliance1_icon = 'mdi:car-sports';
    if (this.config.appliance2_icon == null) this.config.appliance2_icon = 'mdi:air-filter';
    if (this.config.speed_factor == null) this.config.speed_factor = 0.04;

    this.createSolarCardElements();
  }

  private createSolarCardElements(): void {
    Object.keys(this.config).forEach(key => {
      if (this.config[key] != null && key.indexOf('_entity') > 5) {
        // only filled entity config elements
        const sensorName = this.config[key].toString();
        this.solarCardElements.set(key, new SensorElement(sensorName, key));
      }
    });
  }

  public getCardSize() {
    return 5;
  }

  /*
  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    return document.createElement('tesla-style-solar-power-card-editor');
  }
  */


  /* ** LitElement process functions ** */
  async firstUpdated(): Promise<void> {
    // Give the browser a chance to paint
    await new Promise(r => setTimeout(r, 0));
    this.oldWidth = HtmlResizeForPowerCard.changeStylesDependingOnWidth(this, this.solarCardElements, this.clientWidth, this.oldWidth);
  }

  public connectedCallback(): void {
    super.connectedCallback();
    this.redraw = this.redraw.bind(this);
    window.addEventListener('resize', this.redraw);
  }

  public shouldUpdate(changedProperties: any): boolean {
    // Update only when our values in hass changed
    let update = true;
    Array.from(changedProperties.keys()).some((propName: any) => {
      const oldValue = changedProperties.get(propName);
      if (propName === 'hass' && oldValue) {
        update = update && this.sensorChangeDetected(oldValue);
      }
      return !update;
    });
    return update;
  }

  private sensorChangeDetected(oldValue: any): boolean {
    let change = false;
    this.solarCardElements.forEach((_solarSensor, key) => {
      if (
        this.hass.states[this.config[key]] !== undefined &&
        this.hass.states[this.config[key]].state !== oldValue.states[this.config[key]].state
      ) {
        change = true;
      }
    });
    return change;
  }

  public async performUpdate(): Promise<void> {
    this.error = '';
    this.solarCardElements.forEach(solarSensor => {
      try {
        solarSensor.setValueAndUnitOfMeasurement(
          this.hass.states[solarSensor.entity].state,
          this.hass.states[solarSensor.entity].attributes.unit_of_measurement
        );
        solarSensor.setSpeed(this.config.speed_factor);
        this.updatePowerCircleSpeed(solarSensor);
      } catch (err) {
        this.error += " Configured '" + solarSensor.entity + "' entity was not found. ";
      }
    });
    if (this.config.change_house_bubble_color_with_flow) {
      this.colourHouseBubbleDependingOnHighestInput();
    }
    super.performUpdate();
  }

  /* ****  render functions ****** */
  protected render(): TemplateResult | void {
    if (this.error !== '') return this._showError();

    const newWidth = this.clientWidth <= 100 ?  250 : this.clientWidth;
    this.pxRate = newWidth / 100;
    const half = 21 * this.pxRate;

    return html`
      <ha-card .header=${this.config.name} tabindex="0">
        <div id="tesla-style-solar-power-card">
          ${this.writeGenerationIconBubble()}
          <div class="acc_center">
            <div class="acc_center_container">
              ${this.writeGridIconBubble()}
              <div
                class="acc_line power_lines_center"
                style="
                height:${42 * this.pxRate + 'px'};
                width:${42 * this.pxRate + 'px'};"
              >
                
                <div class="power_line" id="generation_to_grid_entity_line">
                  <div id="generation_to_grid_entity_circle" 
                  class="power_circle"  
                  style="offset-path: path('${'M'+half+',0 C'+half+','+half+' '+half+','+half+' 0,'+half}')"
                  >
                </div>
                </div>
                <div class="power_line" id="generation_to_house_entity_line">
                  <div 
                    id="generation_to_house_entity_circle" 
                    class="power_circle"
                    style="offset-path: path('${'M0,0 C0,'+half+' 0,'+half+' '+half+','+half}')"
                  >
                  </div>
                </div>
                <div class="power_line" id="grid_to_battery_entity_line">
                  <div 
                    id="grid_to_battery_entity_circle" 
                    class="power_circle"  
                    style="offset-path: path('${'M0,0 C'+half+',0 '+half+',0 '+half+','+half}')"
                    >
                  </div>
                </div>
                <div class="power_line" id="battery_to_house_entity_line">
                  <div id="battery_to_house_entity_circle" 
                  class="power_circle"  
                  style="offset-path: path('${'M0,'+half+' C0,0 0,0 '+half+',0'}')"
                  >
                </div>
                </div>
                <div class="power_line" id="grid_to_house_entity_line">
                  <div id="grid_to_house_entity_circle" 
                  class="power_circle"  
                  style="offset-path: path('${'M0,0 C'+(half*2)+',0'}')"
                  >
                </div>
                </div>
                <div class="power_line" id="generation_to_battery_entity_line">
                  <div id="generation_to_battery_entity_circle" 
                  class="power_circle"  
                  style="offset-path: path('${'M1,0 C1,'+(half*2)}')"
                  >
                </div>
                </div>
              </div>
              ${this.writeHouseIconBubble()} ${this.writeApplianceIconBubble(1)}
            </div>
            ${this.htmlWriter.writeAppliancePowerLineAndCircle(1, 'M5,' + 12 * this.pxRate + ' C5,' + 12 * this.pxRate + ' 5,0 5,0', this.pxRate)}
            ${this.writeApplianceIconBubble(2)}
            ${this.htmlWriter.writeAppliancePowerLineAndCircle(2, 'M5,0 C5,0 5,' + 11 * this.pxRate + ' 5,' + 11 * this.pxRate, this.pxRate)}
          </div>
          <div class="acc_bottom">${this.writeBatteryIconBubble()}</div>
        </div>
      </ha-card>
    `;
  }

  private writeGenerationIconBubble(): TemplateResult {
    const generationEntities = ['generation_to_grid_entity', 'generation_to_house_entity', 'generation_to_battery_entity'];
    
    const bubbleData:BubbleData = this.getIconBubbleData(
      generationEntities, 
      'generation_entity', 
      'generation_extra_entity');

    bubbleData.cssSelector = 'acc_top';
    bubbleData.icon = this.config.generation_icon;

    return this.htmlWriter.writeBubbleDiv(bubbleData, this.pxRate);
  }

  private writeGridIconBubble(): TemplateResult {
    const gridEntities = ['-generation_to_grid_entity', 
      'grid_to_house_entity', '-battery_to_grid_entity', 
      'grid_to_battery_entity'];
    
    const bubbleData:BubbleData = this.getIconBubbleData(
      gridEntities, 
      'grid_entity', 
      'grid_extra_entity');

    bubbleData.cssSelector = 'acc_left';
    bubbleData.icon = this.config.grid_icon;

    return this.htmlWriter.writeBubbleDiv(bubbleData, this.pxRate);
  }

  private writeHouseIconBubble(): TemplateResult {
    
    let houseEntities:Array<string>;
    if(this.config.house_without_appliances_values){
      houseEntities = [
        'generation_to_house_entity', 
        'grid_to_house_entity', 
        'battery_to_house_entity', 
        '-appliance1_consumption_entity',
        '-appliance2_consumption_entity'];
    } else {
      houseEntities = [
        'generation_to_house_entity', 
        'grid_to_house_entity', 
        'battery_to_house_entity'];
    }


    const bubbleData:BubbleData = this.getIconBubbleData(
      houseEntities, 
      'house_entity', 
      'house_extra_entity');

    bubbleData.cssSelector = 'acc_right';
    bubbleData.icon = this.config.house_icon;


    return this.htmlWriter.writeBubbleDiv(bubbleData, this.pxRate);
  }

  private writeBatteryIconBubble(): TemplateResult {
    const batteryEntities = [
      'generation_to_battery_entity',
      'grid_to_battery_entity',
      '-battery_to_house_entity',
      '-battery_to_grid_entity',
    ];
    const bubbleData:BubbleData = this.getIconBubbleData(
      batteryEntities, 
      'battery_entity', 
      'battery_extra_entity');

    bubbleData.cssSelector = 'acc_bottom';
    bubbleData.icon = this.config.battery_icon;

    return this.htmlWriter.writeBatteryBubbleDiv(bubbleData, this.pxRate);
  }

  private writeApplianceIconBubble(applianceNumber: number): TemplateResult {
    const applianceEntities = ['appliance' + applianceNumber + '_consumption_entity'];


    const bubbleData:BubbleData = this.getIconBubbleData(
      applianceEntities, 
      'appliance' + applianceNumber + '_consumption_entity', 
      'appliance' + applianceNumber + '_extra_entity');

    bubbleData.cssSelector = 'acc_appliance' + applianceNumber;
    bubbleData.icon = this.config['appliance' + applianceNumber + '_icon'];

    return this.htmlWriter.writeBubbleDiv(bubbleData, this.pxRate);
  }

  private getIconBubbleData(
    entitiesForMainValue: Array<string>,
    bubbleClickEntitySlot: string | null = null,
    extraEntitySlot: string | null = null,
  ): BubbleData {
    
    let isSubstractionEntity = false;
    const bubbleData = new BubbleData;
    bubbleData.clickEntitySlot = bubbleClickEntitySlot;

    entitiesForMainValue.forEach((entityHolder: string) => {
      if (entityHolder.substring(0, 1) === '-') {
        entityHolder = entityHolder.substring(1);
        isSubstractionEntity = true;
      }
      const divSolarElement = this.solarCardElements.get(entityHolder);
      if (divSolarElement !== null && divSolarElement?.value !== undefined) {
        bubbleData.noEntitiesWithValueFound = false;
        bubbleData.mainValue = isSubstractionEntity ? (bubbleData.mainValue - divSolarElement?.value) : (bubbleData.mainValue + divSolarElement?.value);
        bubbleData.mainValue = ((bubbleData.mainValue * 100) | 0) / 100;
        bubbleData.mainUnitOfMeasurement = divSolarElement?.unitOfMeasurement;
      }
      isSubstractionEntity = false;
    });

    if (extraEntitySlot !== null) {
      const extraEntity = this.solarCardElements.get(extraEntitySlot);
      bubbleData.extraValue = extraEntity?.value;
      bubbleData.extraUnitOfMeasurement = extraEntity?.unitOfMeasurement;
    }

    if (bubbleClickEntitySlot !== null) {
      bubbleData.clickEntityHassState = this.hass.states[this.config[bubbleClickEntitySlot]];
    }

    if (this.showKW(bubbleData.mainValue)) {
      bubbleData.mainValue = this.roundValue(bubbleData.mainValue / 1000);
      bubbleData.mainUnitOfMeasurement = 'kW';
    }
    return bubbleData;
  }

  private showKW(value: number) {
    if (this.config.show_w_not_kw) return false;
    if (this.config.threshold_in_k !== undefined && Math.abs(value) < this.config.threshold_in_k * 1000) return false;
    return true;
  }

  private roundValue(value: number): number {
    let roundedValue: number;
    if (value > 0.1) {
      roundedValue = (Math.round((value + Number.EPSILON) * 10) | 0) / 10;
    } else {
      roundedValue = (Math.round((value + Number.EPSILON) * 100) | 0) / 100;
    }
    return roundedValue;
  }


  private updatePowerCircleSpeed(entity: SensorElement) {
    if (this.shadowRoot == null) return;
    const teslaCardElement = <HTMLElement>this.shadowRoot.querySelector('#tesla-style-solar-power-card');
    if (teslaCardElement == null) return;
    entity.line = <HTMLElement>teslaCardElement.querySelector('#' + entity.entitySlot + '_line');
    if (entity.line === null) return;
    entity.circle = <HTMLElement>teslaCardElement.querySelector('#' + entity.entitySlot + '_circle');
    if (entity.circle === null) return;
  
    if (entity.value <= 9) {
      if (this.config.hide_inactive_lines) entity.line.style.visibility = 'hidden';
      entity.circle.style.visibility = 'hidden';
      return;
    }
    
    entity.circle.style.visibility = 'visible';
    entity.line.style.visibility = 'visible';

    const currentAnimationDuration =  1 / (entity.value) * 4 * 1000;
    entity.circle.style['animation-duration'] =  currentAnimationDuration.toString()+'s';
  }

  private colourHouseBubbleDependingOnHighestInput() {
    if (this.shadowRoot == null) return;
    const teslaCardElement = <HTMLElement>this.shadowRoot.querySelector('#tesla-style-solar-power-card');
    if (teslaCardElement == null) return;

    const houseEntities = ['generation_to_house_entity', 'grid_to_house_entity', 'battery_to_house_entity'];
    let highestEntity: SensorElement | null = null;
    let highestEntityHolder = '';

    houseEntities.forEach(entityHolder => {
      const divSolarElement = this.solarCardElements.get(entityHolder);
      if (divSolarElement !== null && divSolarElement?.value !== undefined) {
        if (highestEntity == null || divSolarElement?.value > highestEntity.value) {
          highestEntityHolder = entityHolder;
          highestEntity = divSolarElement;
        }
      }
    });

    switch (highestEntityHolder) {
      case 'generation_to_house_entity':
        this.colourBubble('.house_entity', teslaCardElement, 'warning');
        this.colourBubble('.appliance1_consumption_entity', teslaCardElement, 'warning');
        this.colourBubble('.appliance2_consumption_entity', teslaCardElement, 'warning');
        this.colourLineAndCircle('#appliance1_consumption_entity', teslaCardElement, 'warning');
        this.colourLineAndCircle('#appliance2_consumption_entity', teslaCardElement, 'warning');
        break;
      case 'battery_to_house_entity':
        this.colourBubble('.house_entity', teslaCardElement, 'success');
        this.colourBubble('.appliance1_consumption_entity', teslaCardElement, 'success');
        this.colourBubble('.appliance2_consumption_entity', teslaCardElement, 'success');
        this.colourLineAndCircle('#appliance1_consumption_entity', teslaCardElement, 'success');
        this.colourLineAndCircle('#appliance2_consumption_entity', teslaCardElement, 'success');
        break;
      case 'grid_to_house_entity':
        this.colourBubble('.house_entity', teslaCardElement, 'info');
        this.colourBubble('.appliance1_consumption_entity', teslaCardElement, 'info');
        this.colourBubble('.appliance2_consumption_entity', teslaCardElement, 'info');
        this.colourLineAndCircle('#appliance1_consumption_entity', teslaCardElement, 'info');
        this.colourLineAndCircle('#appliance2_consumption_entity', teslaCardElement, 'info');
        break;
      default:
    }
  }

  private colourBubble(elementName: string, teslaCardElement: HTMLElement, colour: string) {
    const element = <HTMLElement>teslaCardElement.querySelector(elementName);
    if (element === null) return;

    element.style.color = 'var(--' + colour + '-color)';
    element.style.border = '1px solid var(--' + colour + '-color)';
  }

  private colourLineAndCircle(elementName: string, teslaCardElement: HTMLElement, colour: string) {
    const elementLine = <HTMLElement>teslaCardElement.querySelector(elementName + '_line');
    const elementCircle = <HTMLElement>teslaCardElement.querySelector(elementName + '_circle');
    if (elementLine === null) return;
    if (elementCircle === null) return;
    elementLine.style.stroke = 'var(--' + colour + '-color)';
    elementCircle.style.fill = 'var(--' + colour + '-color)';
  }


  private redraw(ev: UIEvent) {
    if (this.hass && this.config && ev.type === 'resize') {
      console.warn("resizing, size of clientWidth = "+this.clientWidth);
      //this.render();
      this.oldWidth = HtmlResizeForPowerCard.changeStylesDependingOnWidth(this, this.solarCardElements, this.clientWidth, this.oldWidth);
    }
  }

  /* ******* actions ******** */
  private _showWarning(warning: string): TemplateResult {
    return html` <hui-warning>${warning}</hui-warning> `;
  }

  private _showError(): TemplateResult {
    // const errorCard = <LovelaceCard>document.createElement('hui-error-card');
    // eslint-disable-next-line no-console
    console.log(this.error); 
    return html`
      <hui-warning
        ><div>
          ERROR:<br />
          ${this.error}
        </div></hui-warning
      >
    `;
  }

  /* ******* style ******** */

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
    #battery_to_house_entity_line,
    #generation_to_house_entity_line,
    #grid_to_house_entity_line,
    #generation_to_battery_entity_line,
    #grid_feed_in_entity_line,
    #generation_to_grid_entity_line,
    #battery_to_grid_entity_line,
    #grid_to_battery_entity_line,
    #appliance1_consumption_entity_line,
    #appliance2_consumption_entity_line{
      stroke:var(--info-color);
      fill:none;
      stroke-width:1;
    }

    .generation_entity {
      border: 1px solid var(--warning-color);
    }
    .generation_entity .acc_icon,
    .generation_entity{
      color: var(--warning-color);
    }
    .house_entity{
      border: 1px solid var(--info-color);
    }
    .appliance1_consumption_entity,
    .appliance2_consumption_entity {
      border: 1px solid var(--info-color);
    }
    .house_entity,
    .appliance1_consumption_entity,
    .appliance2_consumption_entity{
      color: var(--info-color);
    }

    .battery_extra_entity,
    .battery_entity{
      border: 1px solid var(--success-color);
      color: var(--success-color);
    }
    .battery_extra_text{
      position:absolute;
      top:8px;
    }
    br.clear {
      clear:both;
    }

    .acc_center .acc_td.acc_appliance1,
    .acc_center .acc_td.acc_appliance2 {
      position: absolute;
      right: 10px;
    }
    .power_lines_center{
      position: relative;
      left: 0px;
    }

    .power_line {
      width: 49%;
      height: 49%;
      border: 1px solid var(--info-color);
      position: absolute;
      visibility: hidden;
    }
    .power_circle {
      width: 8px;
      height: 8px;
      border-radius:100%;
      visibility: hidden;
      animation: move 0ms infinite linear;
    }
    
    #generation_to_grid_entity_line{
      border-radius: 0 0 50% 0;
      border-color: transparent var(--warning-color) var(--warning-color) transparent;
      -moz-border-radius: 0 0 50% 0;
      -webkit-border-radius: 0 0 50% 0;
      left: 0px;
    }
    #generation_to_grid_entity_circle {
      offset-path: path('M60,0 C60,60 60,60 0,60');
      background: var(--warning-color);
    }

    #generation_to_house_entity_line{
      border-radius: 0 0 0 50%;
      border-color: transparent transparent var(--warning-color) var(--warning-color);
      -moz-border-radius: 0 0 0 50%;
      -webkit-border-radius: 0 0 0 50%; 
      right: 0px;
    }
    #generation_to_house_entity_circle {
      offset-path: path('M0,0 C0,60 0,60 60,60');
      background: var(--warning-color);
    }
    
    #grid_to_battery_entity_line{
      border-radius: 0 50% 0 0;
      border-color: var(--info-color) var(--info-color) transparent transparent;
      -moz-border-radius: 0 50% 0 0;
      -webkit-border-radius: 0 50% 0 ¥0;
      bottom: 0px;
      left:0px;
    }
    #grid_to_battery_entity_circle {
      offset-path: path('M0,0 C60,0 60,0 60,60');
      background: var(--info-color);
    }

    #battery_to_house_entity_line{
      border-radius: 50% 0 0 0;
      border-color: var(--success-color) transparent transparent var(--success-color);
      -moz-border-radius: 50% 0 0 0;
      -webkit-border-radius: 50% 0 ¥0 0;
      bottom: 0px;
      right:0px;
      
    }
    #battery_to_house_entity_circle {
      offset-path: path('M0,60 C0,0 0,0 60,0');
      background: var(--success-color);
    }
    
    #generation_to_battery_entity_line{
      width: 1px;
      height: 100%;
      border-color: transparent var(--warning-color) transparent transparent;
      bottom: 0px;
      right:49.5%;
      
    }
    #generation_to_battery_entity_circle {
      offset-path: path('M1,0 1,120');
      background: var(--warning-color);
    }    
    
    #grid_to_house_entity_line{
      width: 100%;
      height: 1px;
      border-color: var(--info-color) transparent transparent transparent;
      top: 49.5%;
      right: 0px;
    }
    #grid_to_house_entity_circle {
      offset-path: path('M0,0 120,0');
      background: var(--info-color);
    }
    
    @keyframes move {
      0% {
        offset-distance: 0%;
      }
      100% {
        offset-distance: 100%;
      }
    }
    `;
  }
}
