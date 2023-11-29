/* eslint-disable no-param-reassign,  import/extensions, prefer-template, class-methods-use-this, lit-a11y/click-events-have-key-events, lines-between-class-members */
import { html, TemplateResult } from 'lit';
import { HomeAssistant } from 'custom-card-helpers';
import { HassEntity } from 'home-assistant-js-websocket';
import { SensorElement } from '../models/SensorElement';
import { TeslaStyleSolarPowerCard } from '../TeslaStyleSolarPowerCard';
import { BubbleData } from '../models/BubbleData';

export class HtmlWriterForPowerCard {
  private teslaCard: TeslaStyleSolarPowerCard;

  private solarCardElements: Map<string, SensorElement>;

  // public pxRate: number; //removed as it gets stale to easily

  private hass: HomeAssistant;

  public constructor(teslaCard: TeslaStyleSolarPowerCard, hass: HomeAssistant) {
    this.teslaCard = teslaCard;
    this.solarCardElements = teslaCard.solarCardElements;
    // pxRate = teslaCard.pxRate; //removed as it gets stale to easily
    this.hass = hass;
  }

  public writeBubbleDiv(extraStyles: string="", bubbleData: BubbleData): TemplateResult {

    if(bubbleData.noEntitiesWithValueFound) return html``;

    if (extraStyles.length > 0) {
      if (!extraStyles.startsWith(';')) {
        extraStyles = '; ' + extraStyles;
      }
    } 

    const spaceBeforeExtraUnit = this.getSpaceBeforeUnit(bubbleData.extraUnitOfMeasurement);
    const spaceBeforeUnit = this.getSpaceBeforeUnit(bubbleData.mainUnitOfMeasurement);

    return html` <div class="acc_td ${bubbleData.cssSelector}" style="${extraStyles}">
      <div
        class="acc_container ${bubbleData.clickEntitySlot}"
        style="${'width:' + this.teslaCard.dimensions.bubbleHeight + 'px; height: ' + this.teslaCard.dimensions.bubbleHeight + 'px; border-width: ' + this.teslaCard.dimensions.bubbleBorderWidth + 'px; margin: -' + this.teslaCard.dimensions.bubbleBorderWidth + 'px'}"
        @click="${() => this._handleClick(bubbleData.clickEntityHassState)}"
      >
        ${bubbleData.extraValue !== null
          ? html` <div
              class="acc_text_extra"
              style="font-size:${this.teslaCard.dimensions.fontSize + 'px'};
                     line-height:${this.teslaCard.dimensions.fontSize + 'px'};
                     margin-top:${this.teslaCard.dimensions.marginTop + 'px'}; "
            >${bubbleData.extraValue}${spaceBeforeExtraUnit}${bubbleData.extraUnitOfMeasurement}
            </div>`
          : html``}
        <ha-icon class="acc_icon" icon="${bubbleData.icon}" style="--mdc-icon-size:${this.teslaCard.dimensions.iconHeight + 'px'};width:${this.teslaCard.dimensions.iconHeight + 'px'};height:${this.teslaCard.dimensions.iconHeight + 'px'}"></ha-icon>
        <div class="acc_text" style="font-size:${this.teslaCard.dimensions.fontSize + 'px'}; line-height:${this.teslaCard.dimensions.fontSize + 'px'}; margin-bottom:${this.teslaCard.dimensions.fontSize + 'px'};">
          ${bubbleData.mainValue}${spaceBeforeUnit}${bubbleData.mainUnitOfMeasurement}
        </div>
      </div>
    </div>`;
  }

  getSpaceBeforeUnit(unitOfMeasurement: string | undefined) {
    if (this.teslaCard.config.show_space_before_all_units) {
      return " ";
    } else if (this.teslaCard.config.show_space_before_power_units) {
      if (unitOfMeasurement && (unitOfMeasurement?.toLocaleLowerCase().startsWith('kw') || unitOfMeasurement?.toLocaleLowerCase().startsWith('w'))) {
        return " ";
      }
    } else {
      return "";
    }
  }

  public writeBatteryBubbleDiv(extraStyles: string="", bubbleData:BubbleData): TemplateResult {
    if (bubbleData.extraValue !== undefined) {
      if (bubbleData.icon === 'mdi:battery-medium' || bubbleData.icon === 'mdi:battery'){
        bubbleData.icon = this.getBatteryIcon(parseFloat(bubbleData.extraValue), bubbleData.mainValue);
      }
    }
    return this.writeBubbleDiv(extraStyles, bubbleData);
  }

  private getBatteryIcon(batteryValue: number, batteryChargeDischargeValue: number) {
    let TempSocValue = batteryValue;
    if (batteryValue <= 5) TempSocValue = 0;

    const batteryStateRoundedValue = Math.ceil(TempSocValue / 10) * 10;
    let batteryStateIconString = '-' + batteryStateRoundedValue.toString();

    // show charging icon beside battery state
    let batteryCharging: string = '-charging';
    if (batteryChargeDischargeValue <= 0) {
      batteryCharging = '';
    }

    if (batteryStateRoundedValue === 100) batteryStateIconString = ''; // full
    if (batteryStateRoundedValue <= 5) batteryStateIconString = '-outline'; // empty
    return 'mdi:battery' + batteryCharging + batteryStateIconString;
  }

  public writeAppliancePowerLineAndCircle(extraStyles: string="", applianceNumber: number, pathDAttribute: string, accLineHeight: number, pxRate: number) {
    const divEntity = this.solarCardElements.get('appliance' + applianceNumber + '_consumption_entity');
    if (divEntity == null) return html``;

    return html` <div
      class="acc_line acc_appliance${applianceNumber}_line"
      style="
        ${extraStyles}"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox='${'0 0 '+ accLineHeight + ' ' + accLineHeight}'
        preserveAspectRatio="xMinYMax slice"
        style="height:${accLineHeight+'px'};width:${(2.5 * pxRate) + 'px'}"
        class="acc_appliance${applianceNumber}_line_svg"
      >
        ${this.writeCircleAndLine('appliance' + applianceNumber + '_consumption_entity', pathDAttribute)}
      </svg>
    </div>`;
  }

  public writeCircleAndLine(sensorName: string, pathDAttribute: string) {
    const entity = this.solarCardElements.get(sensorName);
    if (entity == null) return html``;
    return html`<svg>
      <circle r="4" cx="${entity.startPosition.toString()}" cy="4" fill="${entity.color}" id="${sensorName + '_circle'}"></circle>
      <path d="${pathDAttribute}" id="${sensorName + '_line'}"></path>
    </svg>`;
  }

  private _handleClick(stateObj: HassEntity | null) {
    if (stateObj == null) return;
    const event = <any>new Event('hass-more-info', {
      bubbles: true,
      cancelable: true,
      composed: true,
    });
    event.detail = { entityId: stateObj.entity_id };
    if (this.teslaCard.shadowRoot == null) return;
    this.teslaCard.shadowRoot.dispatchEvent(event);
  }
}
