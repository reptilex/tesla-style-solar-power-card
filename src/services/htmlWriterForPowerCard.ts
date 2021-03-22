/* eslint-disable no-param-reassign, import/extensions, prefer-template, class-methods-use-this, lit-a11y/click-events-have-key-events, lines-between-class-members */
import { html, TemplateResult } from 'lit-element';
import { HomeAssistant } from 'custom-card-helpers';
import { HassEntity } from 'home-assistant-js-websocket';
import { SensorElement } from '../models/SensorElement';
import { TeslaStyleSolarPowerCard } from '../TeslaStyleSolarPowerCard';

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

  public writeBubbleDiv(
    mainValue: number,
    mainUnitOfMeasurement: string | undefined,
    cssSelector: string,
    icon: string,
    bubblClickEntitySlot: string | null = null,
    bubblClickEntitySlotHassState: HassEntity | null = null,
    extraValue: string | null = null,
    extraUnitOfMeasurement: string | null = null
  ): TemplateResult {
    return html` <div class="acc_td ${cssSelector}">
      <div
        class="acc_container ${bubblClickEntitySlot}"
        style="${'width:' +
        9 * this.pxRate +
        'px; height: ' +
        9 * this.pxRate +
        'px; padding:' +
        5 * this.pxRate +
        'px'}"
        @click="${() => this._handleClick(bubblClickEntitySlotHassState)}"
      >
        ${extraValue !== null
          ? html` <div
              class="acc_text_extra"
              style="font-size:${3 * this.pxRate + 'px'};
                        top: ${1 * this.pxRate + 'px'};
                        width: ${10 * this.pxRate + 'px'};"
            >
              ${extraValue} ${extraUnitOfMeasurement}
            </div>`
          : html``}
        <ha-icon class="acc_icon" icon="${icon}"></ha-icon>
        <div
          class="acc_text"
          style="font-size:${3 * this.pxRate + 'px'}; margin-top:${-0.5 *
            this.pxRate +
          'px'}"
        >
          ${mainValue} ${mainUnitOfMeasurement}
        </div>
      </div>
    </div>`;
  }

  public writeBatteryBubbleDiv(
    mainValue: number,
    mainUnitOfMeasurement: string | undefined,
    cssSelector: string,
    icon: string,
    bubblClickEntitySlot: string | null,
    bubblClickEntitySlotHassState: HassEntity | null,
    extraValue: string | undefined = undefined,
    extraUnitOfMeasurement: string | undefined = undefined
  ): TemplateResult {
    if (extraValue !== undefined) {
      icon = this.getBatteryIcon(parseFloat(extraValue), mainValue);
    }
    return this.writeBubbleDiv(
      mainValue,
      mainUnitOfMeasurement,
      cssSelector,
      icon,
      bubblClickEntitySlot,
      bubblClickEntitySlotHassState,
      extraValue,
      extraUnitOfMeasurement
    );
  }

  private getBatteryIcon(
    batteryValue: number,
    batteryChargeDischargeValue: number
  ) {
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

  public writeAppliancePowerLineAndCircle(
    applianceNumber: number,
    pathDAttribute: string
  ) {
    const divEntity = this.solarCardElements.get(
      'appliance' + applianceNumber + '_consumption_entity'
    );
    if (divEntity == null) return html``;
    const height = 18;
    const width = 4;
    let verticalPosition: string;
    if (applianceNumber === 1) {
      verticalPosition = 'top:' + 22.5 * this.pxRate + 'px;';
    } else {
      verticalPosition = 'bottom:' + 15 * this.pxRate + 'px;';
    }
    return html` <div
      class="acc_line acc_appliance${applianceNumber}_line"
      style="
        height:${height * this.pxRate + 'px'};
        width:${width * this.pxRate + 'px'};
        right:${10 * this.pxRate + 'px'};
        ${verticalPosition}
        position:absolute"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="${'0 0 ' + 26 * this.pxRate + ' ' + 26 * this.pxRate}"
        preserveAspectRatio="xMinYMax slice"
        style="height:${height * this.pxRate + 'px'};width:${width *
          this.pxRate +
        'px'}"
        class="acc_appliance${applianceNumber}_line_svg"
      >
        ${this.writeCircleAndLine(
          'appliance' + applianceNumber + '_consumption_entity',
          pathDAttribute
        )}
      </svg>
    </div>`;
  }

  public writeCircleAndLine(sensorName: string, pathDAttribute: string) {
    const entity = this.solarCardElements.get(sensorName);
    if (entity == null) return html``;
    return html`<svg>
      <circle
        r="4"
        cx="${entity.startPosition.toString()}"
        cy="4"
        fill="${entity.color}"
        id="${sensorName + '_circle'}"
      ></circle>
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
