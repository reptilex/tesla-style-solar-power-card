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

  private pxRate: number;

  private hass: HomeAssistant;

  public constructor(teslaCard: TeslaStyleSolarPowerCard, hass: HomeAssistant) {
    this.teslaCard = teslaCard;
    this.solarCardElements = teslaCard.solarCardElements;
    this.pxRate = teslaCard.pxRate;
    this.hass = hass;
  }

  public writeBubbleDiv(bubbleData: BubbleData
  ): TemplateResult {

    if(bubbleData.noEntitiesWithValueFound) return html``;

    return html` <div class="acc_td ${bubbleData.cssSelector}">
      <div
        class="acc_container ${bubbleData.clickEntitySlot}"
        style="${'width:' + 9 * this.pxRate + 'px; height: ' + 9 * this.pxRate + 'px; padding:' + 5 * this.pxRate + 'px /*; margin-top: ' + -1 * this.pxRate + 'px*/'}"
        @click="${() => this._handleClick(bubbleData.clickEntityHassState)}"
      >
        ${bubbleData.extraValue !== null
          ? html` <div
              class="acc_text_extra"
              style="font-size:${3 * this.pxRate + 'px'};
                        top: ${1 * this.pxRate + 'px'};
                        /* width: ${10 * this.pxRate + 'px'}; */"
            >${bubbleData.extraValue} ${bubbleData.extraUnitOfMeasurement}
            </div>`
          : html``}
        <ha-icon class="acc_icon" style="padding-left:${3 * this.pxRate + 'px'};" icon="${bubbleData.icon}"></ha-icon>
        <div class="acc_text" style="font-size:${3 * this.pxRate + 'px'}; margin-top:${1 * this.pxRate + 'px'}; /*width: ${10 * this.pxRate + 'px'}*/">
          ${bubbleData.mainValue} ${bubbleData.mainUnitOfMeasurement}
        </div>
      </div>
    </div>`;
  }

  public writeBatteryBubbleDiv(bubbleData:BubbleData): TemplateResult {
    if (bubbleData.extraValue !== undefined) {
      if (bubbleData.icon === 'mdi:battery-medium' || bubbleData.icon === 'mdi:battery'){
        bubbleData.icon = this.getBatteryIcon(parseFloat(bubbleData.extraValue), bubbleData.mainValue);
      }
    }
    return this.writeBubbleDiv(bubbleData);
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

  public writeAppliancePowerLineAndCircle(applianceNumber: number, pathDAttribute: string) {
    const divEntity = this.solarCardElements.get('appliance' + applianceNumber + '_consumption_entity');
    if (divEntity == null) return html``;
    const height = 12;
    let verticalPosition: string;
    if (applianceNumber === 1) {
      verticalPosition = 'top:' + 22.4 * this.pxRate + 'px;';
    } else {
      verticalPosition = 'bottom:' + 20.6 * this.pxRate + 'px;';
    }
    return html` <div
      class="acc_line acc_appliance${applianceNumber}_line"
      style="
        height:${(height * this.pxRate)-((applianceNumber-1)*5)+'px'}
        width:10px};
        right:${(11 * this.pxRate) + 10 + 'px'};
        ${verticalPosition}
        position:absolute"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox='${'0 0 '+ ((12*this.pxRate)-((applianceNumber-1)*5)) + ' ' +((12*this.pxRate)-((applianceNumber-1)*5))}'
        preserveAspectRatio="xMinYMax slice"
        style="height:${(height * this.pxRate)-((applianceNumber-1)*5)+'px'};width:10px}"
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
