/* eslint-disable no-restricted-globals, prefer-template, no-param-reassign, class-methods-use-this, lit-a11y/click-events-have-key-events, no-bitwise, import/extensions */
import { LitElement, html, TemplateResult, CSSResult, css } from 'lit';
import { property } from 'lit/decorators.js';
import { HomeAssistant, LovelaceCardConfig /* , LovelaceCardEditor */ } from 'custom-card-helpers';
import { TeslaStyleSolarPowerCardConfig } from './models/TeslaStyleSolarPowerCardConfig';

/* import './components/editor'; */

import { SensorElement } from './models/SensorElement';
import { BubbleData } from './models/BubbleData';
import { HtmlWriterForPowerCard } from './services/HtmlWriterForPowerCard';
import { HtmlResizeForPowerCard } from './services/HtmlResizeForPowerCard';
import { DimensionsForPowerCard } from './services/DimensionsForPowerCard';
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

  @property() public config!: TeslaStyleSolarPowerCardConfig;

  @property({ attribute: false }) public solarCardElements: Map<string, SensorElement> = new Map();

  @property() private oldWidth = DimensionsForPowerCard.minimumWidth;

  // public pxRate = 4; //Gets stale, calculate it when required

  private teslaCardElement?: HTMLElement;

  private htmlWriter: HtmlWriterForPowerCard = new HtmlWriterForPowerCard(this, this.hass);

  public dimensions: DimensionsForPowerCard = new DimensionsForPowerCard(this);

  @property({ type: String }) title = 'Hey there';

  @property({ type: Number }) counter = 5;

  __increment() {
    this.counter += 1;
  }

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
    if (!this.config.energy_flow_diagramm) {
      const obj = this;
      setInterval(this.animateCircles, 15, obj);
    }
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

  public static getStubConfig(): Record<string, any> {
    return {};
  }

  /* ** LitElement process functions ** */
  async firstUpdated(): Promise<void> {
    // Give the browser a chance to paint
    await new Promise(r => setTimeout(r, 0));
    this.oldWidth = HtmlResizeForPowerCard.changeStylesDependingOnWidth(this, this.clientWidth, this.oldWidth);
  }

  public connectedCallback(): void {
    super.connectedCallback();
    this.redraw = this.redraw.bind(this);
    window.addEventListener('resize', this.redraw);
  }

  public shouldUpdate(changedProperties: any): boolean {
    let obj: any;
    obj = this;
    if (!this.config.energy_flow_diagramm) {
      requestAnimationFrame(timestamp => {
        obj.updateAllCircles(timestamp);
      });
    }
    obj = this;

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
      } catch (err) {
        this.error += " Configured '" + solarSensor.entity + "' entity was not found. ";
      }
    });
    if (this.config.energy_flow_diagramm) {
      this.setEnergyFlowDiagramm();
    }
    if (this.config.change_house_bubble_color_with_flow) {
      this.colourHouseBubbleDependingOnHighestInput();
    }
    super.performUpdate();
  }

  /* ****  render functions ****** */
  protected render(): TemplateResult | void {
    if (this.error !== '') return this._showError();
    
    this.dimensions.updateCardDimensions(this.clientWidth);

    let topRowHeight = this.dimensions.bubbleHeight;
    let bottomRowHeight = this.dimensions.bubbleHeight;

    if (!(this.config.appliance1_consumption_entity || this.config.generation_to_battery_entity || this.config.generation_to_grid_entity || this.config.generation_to_house_entity)) {
      topRowHeight = 0;
    }

    if (!(this.config.appliance2_consumption_entity || this.config.battery_to_house_entity || this.config.battery_to_house_entity || this.config.battery_to_house_entity)) {
      bottomRowHeight = 0;
    }

    return html`
      <ha-card .header=${this.config.name} tabindex="0">
        <div id="tesla-style-solar-power-card" style="padding:${this.dimensions.padding + 'px'}">
          <div class="power_flow_grid" style="display: grid;grid-template-columns: ${this.dimensions.bubbleHeight}px ${this.dimensions.bubbleGap}px ${this.dimensions.bubbleHeight}px ${this.dimensions.bubbleGap}px ${this.dimensions.bubbleHeight}px;grid-template-rows: ${topRowHeight}px ${this.dimensions.bubbleGap}px ${this.dimensions.bubbleHeight}px ${this.dimensions.bubbleGap}px ${bottomRowHeight}px;grid-gap: 0px;">
            ${this.writeGenerationIconBubble("grid-row: 1/2;grid-column: 3/4;")}
            ${this.writeGridIconBubble("grid-row: 3/4; grid-column: 1/2;")}  
            ${this.writePowerLines("grid-row: 2/5; grid-column: 2/5;")}
            ${this.writeHouseIconBubble("grid-row: 3/4; grid-column: 5/6;")}
            ${this.writeBatteryIconBubble("grid-row: 5/6; grid-column: 3/4;")}
            ${this.writeApplianceIconBubble("grid-row: 1/2; grid-column: 5/6;", 1)}
            ${this.htmlWriter.writeAppliancePowerLineAndCircle("grid-row: 2/3; grid-column: 5/6;", 1, 'M5,' + this.dimensions.accLineLength + ' C5,' + this.dimensions.accLineLength + ' 5,0 5,0', this.dimensions.accLineLength, this.dimensions.pxRate)}
            ${this.writeApplianceIconBubble("grid-row: 5/6;grid-column: 5/6;", 2)}
            ${this.htmlWriter.writeAppliancePowerLineAndCircle("grid-row: 4/5; grid-column: 5/6;", 2, 'M5,0 C5,0 5,' + this.dimensions.accLineLength + ' 5,' + this.dimensions.accLineLength, this.dimensions.accLineLength, this.dimensions.pxRate)}
          </div>
        </div>
      </ha-card>
    `;
  }

  private writePowerLines(extraStyles: string): TemplateResult {
    const half = this.dimensions.powerLinesHeight / 2;
    
    let gap: number;
    if (this.config.show_gap !== undefined && this.config.show_gap) {
      gap = 2 * this.dimensions.pxRate;
    } else {
      gap = 0;
    }

    return html`
    <div  class="acc_line power_lines"
          style="
          height:${this.dimensions.powerLinesHeight + 'px'};
          width:${this.dimensions.powerLinesHeight + 'px'};

          ${extraStyles}"> 
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="${'0 0 ' + this.dimensions.powerLinesHeight + ' ' + this.dimensions.powerLinesHeight}"
        preserveAspectRatio="xMinYMax slice"
        style="height:${this.dimensions.powerLinesHeight + 'px'};width:${this.dimensions.powerLinesHeight + 'px'}">
        ${this.htmlWriter.writeCircleAndLine(
          'generation_to_house_entity',
          'M' +
          (half + gap) +
          ',0' +
          'C' +
          (half + gap) +
          ',' +
          (half - gap) +
          ' ' +
          (half + gap) +
          ',' +
          (half - gap) +
          ' ' +
          half * 2 +
          ',' +
          (half - gap)
      )}
      ${this.htmlWriter.writeCircleAndLine(
        'grid_to_house_entity',
        'M0,' +
          half +
          ' ' +
          'C' +
          half +
          ',' +
          half +
          ' ' +
          half +
          ',' +
          half +
          ' ' +
          half * 2 +
          ',' +
          half
      )}
      ${this.htmlWriter.writeCircleAndLine(
        'generation_to_grid_entity',
        'M' +
          (half - gap) +
          ',0 ' +
          'C' +
          (half - gap) +
          ',' +
          (half - gap) +
          ' ' +
          (half - gap) +
          ',' +
          (half - gap) +
          ' 0,' +
          (half - gap)
      )}
      ${this.htmlWriter.writeCircleAndLine(
        'grid_to_battery_entity',
        'M0,' +
          (half + gap) +
          ' ' +
          'C' +
          (half - gap) +
          ',' +
          (half + gap) +
          ' ' +
          (half - gap) +
          ',' +
          (half + gap) +
          ' ' +
          (half - gap) +
          ',' +
          half * 2
      )}
      ${this.htmlWriter.writeCircleAndLine(
        'battery_to_grid_entity',
        'M' +
          (half - gap) +
          ',' +
          half * 2 +
          ' ' +
          'C' +
          (half - gap) +
          ',' +
          (half + gap) +
          ' ' +
          (half - gap) +
          ',' +
          (half + gap) +
          ' ' +
          '0,' +
          (half + gap)
      )}
      ${this.htmlWriter.writeCircleAndLine(
        'generation_to_battery_entity',
        'M' +
          half +
          ',' + 
          this.dimensions.straightLineOrigin +
          ' C' +
          half +
          ',' + this.dimensions.straightLineOrigin + ' ' +
          half +
          ',' +
          this.dimensions.straightLineLength +
          ' ' +
          half +
          ',' +
          this.dimensions.straightLineLength
      )}
      ${this.htmlWriter.writeCircleAndLine(
        'battery_to_house_entity',
        'M' +
          (half + gap) +
          ',' +
          half * 2 +
          ' ' +
          'C' +
          (half + gap) +
          ',' +
          (half + gap) +
          ' ' +
          (half + gap) +
          ',' +
          (half + gap) +
          ' ' +
          half * 2 +
          ',' +
          (half + gap)
      )}
    </svg>
  </div>
    `;
  }

  private writeGenerationIconBubble(extraStyles: string): TemplateResult {
    const generationEntities = ['generation_to_grid_entity', 'generation_to_house_entity', 'generation_to_battery_entity'];

    const bubbleData:BubbleData = this.calculateIconBubbleData(
      generationEntities,
      'generation_entity',
      'generation_extra_entity');

    bubbleData.cssSelector = 'acc_top';
    bubbleData.icon = this.config.generation_icon;

    return this.htmlWriter.writeBatteryBubbleDiv(extraStyles, bubbleData);
  }

  private writeGridIconBubble(extraStyles: string): TemplateResult {
    const gridEntities = ['-generation_to_grid_entity', 'grid_to_house_entity', '-battery_to_grid_entity', 'grid_to_battery_entity'];

    const bubbleData:BubbleData = this.calculateIconBubbleData(
      gridEntities,
      'grid_entity',
      'grid_extra_entity');

    bubbleData.cssSelector = 'acc_left';
    bubbleData.icon = this.config.grid_icon;

    return this.htmlWriter.writeBatteryBubbleDiv(extraStyles, bubbleData);
  }

  private writeHouseIconBubble(extraStyles: string): TemplateResult {

    let houseEntities:Array<string>;
    if(this.config.house_without_appliances_values){
      houseEntities = ['generation_to_house_entity', 'grid_to_house_entity', 'battery_to_house_entity', '-appliance1_consumption_entity','-appliance2_consumption_entity'];
    } else {
      houseEntities = ['generation_to_house_entity', 'grid_to_house_entity', 'battery_to_house_entity'];
    }


    const bubbleData:BubbleData = this.calculateIconBubbleData(
      houseEntities,
      'house_entity',
      'house_extra_entity');

    bubbleData.cssSelector = 'acc_right';
    bubbleData.icon = this.config.house_icon;

    return this.htmlWriter.writeBatteryBubbleDiv(extraStyles, bubbleData);
  }

  private writeBatteryIconBubble(extraStyles: string): TemplateResult {
    const batteryEntities = [
      'generation_to_battery_entity',
      'grid_to_battery_entity',
      '-battery_to_house_entity',
      '-battery_to_grid_entity',
    ];
    const bubbleData:BubbleData = this.calculateIconBubbleData(
      batteryEntities,
      'battery_entity',
      'battery_extra_entity');

    bubbleData.cssSelector = 'acc_bottom';
    bubbleData.icon = this.config.battery_icon;

    return this.htmlWriter.writeBatteryBubbleDiv(extraStyles, bubbleData);
  }

  private writeApplianceIconBubble(extraStyles: string, applianceNumber: number): TemplateResult {
    const applianceEntities = ['appliance' + applianceNumber + '_consumption_entity'];


    const bubbleData:BubbleData = this.calculateIconBubbleData(
      applianceEntities,
      'appliance' + applianceNumber + '_consumption_entity',
      'appliance' + applianceNumber + '_extra_entity');

    bubbleData.cssSelector = 'acc_appliance' + applianceNumber;
    bubbleData.icon = this.config['appliance' + applianceNumber + '_icon'];

    return this.htmlWriter.writeBatteryBubbleDiv(extraStyles, bubbleData);
  }

  private calculateIconBubbleData(
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

      if (typeof extraEntity?.value !== 'undefined') {
        if (typeof extraEntity?.unitOfMeasurement !== 'undefined') {
          if (extraEntity?.unitOfMeasurement) {
            if (extraEntity.unitOfMeasurement.toLowerCase() == "wh") {
              let extraValue: number = parseInt(extraEntity.value)
              if (!Number.isNaN(extraValue)) {
                if (this.showKW(extraValue)) {
                  extraValue = this.roundValue(extraValue / 1000)

                  bubbleData.extraValue = extraValue.toString();

                  bubbleData.extraUnitOfMeasurement = 'k' + bubbleData.extraUnitOfMeasurement;      
                }
              }
            }
          }
        }
      }
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

  private threeSigFigs(extraValue: number): number {
    if (extraValue < 1000) {
      return parseFloat(extraValue.toPrecision(3));
    } else {
      return extraValue;
    }
  }

  private showKW(value: number) {
    if (this.config.show_w_not_kw) {
      return false;
    }
    if (this.config.threshold_in_k !== undefined && Math.abs(value) < this.config.threshold_in_k * 1000) {
      return false;
    }

    return true;
  }

  private roundValue(value: number): number {
    let roundedValue: number;

    if (value > 0.1) {
      roundedValue = (Math.round((value + Number.EPSILON) * 10) | 0) / 10;
    } else {
      roundedValue = (Math.round((value + Number.EPSILON) * 100) | 0) / 100;
    }

    roundedValue = this.threeSigFigs(roundedValue);

    return roundedValue;
  }

  private animateCircles(obj: any) {
    requestAnimationFrame(timestamp => {
      obj.updateAllCircles(timestamp);
    });
  }

  public updateAllCircles(timestamp: number): void {
    // console.log('updating all circles')
    this.solarCardElements.forEach((_solarSensor, key) => {
      const element = this.solarCardElements.get(key);
      if (element !== undefined) this.updateOneCircle(timestamp, element);
    });
  }

  private updateOneCircle(timestamp: number, entity: SensorElement) {
    if (this.shadowRoot == null) return;
    const teslaCardElement = <HTMLElement>this.shadowRoot.querySelector('#tesla-style-solar-power-card');
    if (teslaCardElement == null) return;
    entity.line = <SVGPathElement>teslaCardElement.querySelector('#' + entity.entitySlot + '_line');
    if (entity.line === null) return;
    const lineLength = entity.line.getTotalLength();
    if (isNaN(lineLength)) return;
    entity.circle = <SVGPathElement>teslaCardElement.querySelector('#' + entity.entitySlot + '_circle');
    if (entity.speed === 0) {
      entity.circle.setAttribute('visibility', 'hidden');
      if (this.config.hide_inactive_lines) entity.line.setAttribute('visibility', 'hidden');
      return;
    }

    entity.circle.setAttribute('visibility', 'visible');
    if (this.config.hide_inactive_lines) {
      entity.line.setAttribute('visibility', 'visible');
    }
    if (entity.prevTimestamp === 0) {
      entity.prevTimestamp = timestamp;
      entity.currentDelta = 0;
    }

    entity.currentDelta += Math.abs(entity.speed) * (timestamp - entity.prevTimestamp);
    let percentageDelta = entity.currentDelta / lineLength;
    if (entity.speed > 0) {
      if (percentageDelta >= 1 || isNaN(percentageDelta)) {
        entity.currentDelta = 0;
        percentageDelta = 0.01;
      }
    } else {
      percentageDelta = 1 - percentageDelta;
      if (percentageDelta <= 0 || isNaN(percentageDelta)) {
        entity.currentDelta = 0;
        percentageDelta = 1;
      }
    }

    const point = entity.line.getPointAtLength(lineLength * percentageDelta);
    entity.circle.setAttributeNS(null, 'cx', point.x.toString());
    entity.circle.setAttributeNS(null, 'cy', point.y.toString());
    entity.prevTimestamp = timestamp;
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
    elementLine.style.stroke = 'var(--' + colour + '-color)';
    elementCircle.style.fill = 'var(--' + colour + '-color)';
  }

  private setEnergyFlowDiagramm() {
    if (this.shadowRoot == null) return;
    const teslaCardElement = <HTMLElement>this.shadowRoot.querySelector('#tesla-style-solar-power-card');

    if (teslaCardElement == null) return;

    this.solarCardElements.forEach((_solarSensor, key) => {
      const element = this.solarCardElements.get(key);

      let width = 1;
      if (teslaCardElement == null) return;
      const entityLine = <SVGPathElement>teslaCardElement.querySelector('#' + key + '_line');
      if (entityLine != null && element !== undefined) {
        const entityCircle = <SVGPathElement>teslaCardElement.querySelector('#' + key + '_circle');
        entityCircle.style.visibility = 'hidden';
        if (this.config.energy_flow_diagramm_lines_factor === undefined) this.config.energy_flow_diagramm_lines_factor = 2;
        if (element?.unitOfMeasurement.toUpperCase() === 'W') {
          width = (Math.floor(element?.value / 100) / 10) * this.config.energy_flow_diagramm_lines_factor;
        } else {
          width = (Math.floor(element?.value * 10) / 10) * this.config.energy_flow_diagramm_lines_factor;
        }
        if (width <= 0.1 && width !== 0) width = 0.1;
        entityLine.style.strokeWidth = width + 'px';
      }
    });
  }

  private redraw(ev: UIEvent) {
    if (this.hass && this.config && ev.type === 'resize') {
      this.oldWidth = HtmlResizeForPowerCard.changeStylesDependingOnWidth(this, this.clientWidth, this.oldWidth);
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
      position: relative;
    }
    .acc_container {
        border: 2px solid black;
        border-radius: 100px;
        color: var(--primary-text-color);
        border-color: var(--primary-text-color);
        position:relative;
        cursor:pointer;
        display:grid;
    }
    .acc_icon {
        margin-left: auto;
        margin-right: auto;
    }
    .acc_text,
    .acc_text_extra {
        text-align: center;
        white-space: nowrap;
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
    }

    .acc_right ,
    .acc_left ,
    .acc_line{
      margin-left: auto;
      margin-right: auto;
    }
    .acc_left {
      vertical-align: top;
      z-index:5;
    }
    .acc_right {
      z-index:5;
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
      stroke-width:2;
    }

    .generation_entity {
      border: 2px solid var(--warning-color);
    }
    .generation_entity .acc_icon,
    .generation_entity{
      color: var(--warning-color);
    }
    .house_entity{
      border: 2px solid var(--info-color);
    }
    .appliance1_consumption_entity,
    .appliance2_consumption_entity {
      border: 2px solid var(--info-color);
    }
    .house_entity,
    .appliance1_consumption_entity,
    .appliance2_consumption_entity{
      color: var(--info-color);
    }
    #generation_to_house_entity_line,
    #generation_to_grid_entity_line,
    #generation_to_battery_entity_line{
      stroke:var(--warning-color);
    }
    #grid_to_battery_entity_circle,
    #grid_to_house_entity_circle,
    #appliance1_consumption_entity_circle,
    #appliance2_consumption_entity_circle{
      fill:var(--info-color);
    }
    #generation_to_house_entity_circle,
    #generation_to_grid_entity_circle,
    #generation_to_battery_entity_circle{
      fill:var(--warning-color);
    }
    #battery_to_house_entity_line,
    #battery_to_grid_entity_line{
      stroke:var(--success-color);
    }
    #battery_to_house_entity_circle,
    #battery_to_grid_entity_circle{
      fill:var(--success-color);
    }
    .battery_extra_entity,
    .battery_entity{
      border: 2px solid var(--success-color);
      color: var(--success-color);
    }
    .battery_extra_text{
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
    `;
  }
}
