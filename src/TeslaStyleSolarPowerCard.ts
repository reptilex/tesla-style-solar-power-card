/* eslint-disable no-restricted-globals, prefer-template, no-param-reassign, class-methods-use-this, lit-a11y/click-events-have-key-events, no-bitwise, import/extensions */
import { LitElement, html, property, TemplateResult, CSSResult, css, internalProperty } from 'lit-element';
import { HomeAssistant, LovelaceCardConfig /* , LovelaceCardEditor */ } from 'custom-card-helpers';
import { TeslaStyleSolarPowerCardConfig } from './models/TeslaStyleSolarPowerCardConfig';

/* import './components/editor'; */

import { SensorElement } from './models/SensorElement';
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

  @internalProperty() private config!: TeslaStyleSolarPowerCardConfig;

  @property({ attribute: false }) public solarCardElements: Map<string, SensorElement> = new Map();

  @internalProperty() private oldWidth = 100;

  public pxRate = 4;

  private teslaCardElement?: HTMLElement;

  private htmlWriter: HtmlWriterForPowerCard = new HtmlWriterForPowerCard(this, this.hass);

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
    this.oldWidth = HtmlResizeForPowerCard.changeStylesDependingOnWidth(this, this.solarCardElements, this.clientWidth, this.oldWidth);
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
        solarSensor.setSpeed();
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

    this.pxRate = this.clientWidth / 100;
    const gap = 2 * this.pxRate;
    const half = 22 * this.pxRate;
    //
    return html`
      <ha-card .header=${this.config.name} tabindex="0">
        <div id="tesla-style-solar-power-card">
          ${this.writeGenerationIconBubble()}
          <div class="acc_center">
            <div class="acc_center_container">
              ${this.writeGridIconBubble()}
              <div
                class="acc_line power_lines"
                style="
                height:${42 * this.pxRate + 'px'};
                width:${42 * this.pxRate + 'px'};
                top:${0 * this.pxRate + 'px'};
                left:${28 * this.pxRate + 'px'}"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="${'0 0 ' + 42 * this.pxRate + ' ' + 42 * this.pxRate}"
                  preserveAspectRatio="xMinYMax slice"
                  style="height:${42 * this.pxRate + 'px'};width:${42 * this.pxRate + 'px'}"
                >
                  ${this.htmlWriter.writeCircleAndLine(
                    'generation_to_house_entity',
                    'M' + (half - this.pxRate + gap) + ',0' + 
                      'C' + (half - this.pxRate + gap) + ',' + (half - gap) + ' ' +
                      (half - this.pxRate + gap) + ',' + (half - gap) + ' ' +
                      half * 2 + ',' + (half - gap)
                  )}
                  ${this.htmlWriter.writeCircleAndLine(
                    'grid_to_house_entity',
                    'M0,' + half + ' ' + 
                    'C' + (half - this.pxRate) + ',' + half + ' ' + 
                    (half - this.pxRate) + ',' + half + ' ' + 
                    (half - this.pxRate) * 2 + ',' + half
                  )}
                  ${this.htmlWriter.writeCircleAndLine(
                    'generation_to_grid_entity',
                    'M' + (half - this.pxRate - gap) + ',0 ' + 
                      'C' + (half - this.pxRate - gap) + ',' + (half - gap) + ' ' + 
                      (half - this.pxRate - gap) + ',' + (half - gap) +
                      ' 0,' + (half - gap)
                  )}
                  ${this.htmlWriter.writeCircleAndLine(
                    'grid_to_battery_entity',
                    'M0,' + (half + gap) + ' ' + 
                      'C' + (half - this.pxRate - gap) + ',' + (half + gap) + ' ' + 
                      (half - this.pxRate - gap) + ',' + (half + gap) + ' ' + 
                      (half - this.pxRate - gap) + ',' + half * 2
                  )}
                  ${this.htmlWriter.writeCircleAndLine(
                    'battery_to_grid_entity',
                    'M' + (half - this.pxRate - gap) + ',' + half * 2 + ' ' + 
                      'C' + (half - this.pxRate - gap) + ',' + (half + gap) + ' ' + 
                      (half - this.pxRate - gap) + ',' + (half + gap) + ' ' + 
                      '0,' + (half + gap)
                  )}
                  ${this.htmlWriter.writeCircleAndLine(
                    'generation_to_battery_entity',
                    'M' + (half - this.pxRate) + ',0 ' + 
                      'C' + (half - this.pxRate) + ',0 ' +
                      (half - this.pxRate) + ',' + half * 2 + ' ' +
                      (half - this.pxRate) + ',' + half * 2
                  )}
                  ${this.htmlWriter.writeCircleAndLine(
                    'battery_to_house_entity',
                    'M' + (half - this.pxRate + gap) + ',' + half * 2 + ' ' + 
                      'C' + (half - this.pxRate + gap) + ',' + (half + gap) + ' ' +
                      (half - this.pxRate + gap) + ',' + (half + gap) + ' ' +
                      half * 2 + ',' + (half + gap)
                  )}
                </svg>
              </div>

              ${this.writeHouseIconBubble()} ${this.writeApplianceIconBubble(1)}
              ${this.htmlWriter.writeAppliancePowerLineAndCircle(1, 'M5,' + 12 * this.pxRate + ' C5,' + 12 * this.pxRate + ' 5,0 5,0')}
              ${this.writeApplianceIconBubble(2)}
              ${this.htmlWriter.writeAppliancePowerLineAndCircle(2, 'M5,0 C5,0 5,' + 11 * this.pxRate + ' 5,' + 11 * this.pxRate)}
            </div>
          </div>
          <div class="acc_bottom">${this.writeBatteryIconBubble()}</div>
        </div>
      </ha-card>
    `;
  }

  private writeGenerationIconBubble(): TemplateResult {
    const generationEntities = ['generation_to_grid_entity', 'generation_to_house_entity', 'generation_to_battery_entity'];

    return this.writeIconBubble(generationEntities, 'acc_top', 'generation_icon', 'generation_entity', 'generation_extra_entity');
  }

  private writeGridIconBubble(): TemplateResult {
    const gridEntities = ['-generation_to_grid_entity', 'grid_to_house_entity', '-battery_to_grid_entity', 'grid_to_battery_entity'];

    return this.writeIconBubble(gridEntities, 'acc_left', 'grid_icon', 'grid_entity', 'grid_extra_entity');
  }

  private writeHouseIconBubble(): TemplateResult {
    const houseEntities = ['generation_to_house_entity', 'grid_to_house_entity', 'battery_to_house_entity'];

    return this.writeIconBubble(houseEntities, 'acc_right', 'house_icon', 'house_entity', 'house_extra_entity');
  }

  private writeBatteryIconBubble(): TemplateResult {
    const batteryEntities = [
      'generation_to_battery_entity',
      'grid_to_battery_entity',
      '-battery_to_house_entity',
      '-battery_to_grid_entity',
    ];
    return this.writeIconBubble(batteryEntities, 'acc_bottom', 'battery_icon', 'battery_entity', 'battery_extra_entity', true);
  }

  private writeApplianceIconBubble(applianceNumber: number): TemplateResult {
    const applianceEntities = ['appliance' + applianceNumber + '_consumption_entity'];
    return this.writeIconBubble(
      applianceEntities,
      'acc_appliance' + applianceNumber,
      'appliance' + applianceNumber + '_icon',
      'appliance' + applianceNumber + '_consumption_entity',
      'appliance' + applianceNumber + '_extra_entity'
    );
  }

  private writeIconBubble(
    entitiesForMainValue: Array<string>,
    cssSelector: string,
    iconVariable: string,
    bubblClickEntitySlot: string | null = null,
    extraEntitySlot: string | null = null,
    isBatteryBubble: boolean = false
  ): TemplateResult {
    let mainValue: number = 0;
    let mainUnitOfMeasurement: string | undefined;
    let extraValue: string | undefined;
    let extraUnitOfMeasurement: string | undefined;
    let isSubstractionEntity = false;
    let oneDefinedEntity = false;
    let clickEntityHassState = null;

    entitiesForMainValue.forEach((entityHolder: string) => {
      if (entityHolder.substring(0, 1) === '-') {
        entityHolder = entityHolder.substring(1);
        isSubstractionEntity = true;
      }
      const divSolarElement = this.solarCardElements.get(entityHolder);
      if (divSolarElement !== null && divSolarElement?.value !== undefined) {
        oneDefinedEntity = true;
        if (isSubstractionEntity) {
          mainValue -= divSolarElement?.value;
        } else {
          mainValue += divSolarElement?.value;
        }
        mainValue = ((mainValue * 100) | 0) / 100;
        mainUnitOfMeasurement = divSolarElement?.unitOfMeasurement;
      }
      isSubstractionEntity = false;
    });

    if (!oneDefinedEntity) return html``;

    if (extraEntitySlot !== null) {
      const extraEntity = this.solarCardElements.get(extraEntitySlot);
      extraValue = extraEntity?.value;
      extraUnitOfMeasurement = extraEntity?.unitOfMeasurement;
    }

    if (bubblClickEntitySlot !== null) {
      clickEntityHassState = this.hass.states[this.config[bubblClickEntitySlot]];
    }

    if (this.showKW(mainValue)) {
      mainValue = this.roundValue(mainValue / 1000);
      mainUnitOfMeasurement = 'kW';
    }

    if (isBatteryBubble) {
      return this.htmlWriter.writeBatteryBubbleDiv(
        mainValue,
        mainUnitOfMeasurement,
        cssSelector,
        this.config[iconVariable],
        bubblClickEntitySlot,
        clickEntityHassState,
        extraValue,
        extraUnitOfMeasurement
      );
    }

    return this.htmlWriter.writeBubbleDiv(
      mainValue,
      mainUnitOfMeasurement,
      cssSelector,
      this.config[iconVariable],
      bubblClickEntitySlot,
      clickEntityHassState,
      extraValue,
      extraUnitOfMeasurement
    );
  }

  private showKW(value: number) {
    if (this.config.show_w_not_kw) {
      return false;
    }
    if (this.config.threshold_in_k !== undefined && value < this.config.threshold_in_k * 1000) {
      return false;
    }

    return true;
  }

  private roundValue(value: number): number {
    let roundedValue: number;
    roundedValue = Math.abs(value);
    if (value > 0.1) {
      roundedValue = (Math.round((roundedValue + Number.EPSILON) * 10) | 0) / 10;
    } else {
      roundedValue = (Math.round((roundedValue + Number.EPSILON) * 100) | 0) / 100;
    }
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
        if (element?.unitOfMeasurement === 'W') {
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
      this.oldWidth = HtmlResizeForPowerCard.changeStylesDependingOnWidth(this, this.solarCardElements, this.clientWidth, this.oldWidth);
    }
  }

  /* ******* actions ******** */
  private _showWarning(warning: string): TemplateResult {
    return html` <hui-warning>${warning}</hui-warning> `;
  }

  private _showError(): TemplateResult {
    // const errorCard = <LovelaceCard>document.createElement('hui-error-card');
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
