/* eslint-disable func-names, prefer-template, import/extensions, no-param-reassign, class-methods-use-this, lit-a11y/click-events-have-key-events */
import { SensorElement } from '../models/SensorElement';
import { TeslaStyleSolarPowerCard } from '../TeslaStyleSolarPowerCard';
import { DimensionsForPowerCard } from './DimensionsForPowerCard';

export class HtmlResizeForPowerCard {  
  public static changeStylesDependingOnWidth(
    teslaCard: TeslaStyleSolarPowerCard,
    solarCardElements: Map<string, SensorElement>,
    newWidth: number,
    oldWidth: number
  ): number {
    if (document.readyState !== 'complete'|| oldWidth === newWidth)
      return oldWidth;
    if (teslaCard.shadowRoot == null) return oldWidth;
    const teslaCardElement = <HTMLElement>(
      teslaCard.shadowRoot.querySelector('#tesla-style-solar-power-card')
    );
    if (teslaCardElement == null) return oldWidth;

    teslaCard.dimensions.updateCardDimensions(newWidth);

    const changeSelectorStyle = function (
      selector: string,
      styleAttribute: any,
      attributeValue: string
    ) {
      const selectorElement = <HTMLElement>(
        teslaCardElement.querySelector(selector)
      );
      if (selectorElement !== null)
        selectorElement.style[styleAttribute] = attributeValue;
    };

    teslaCardElement.style.padding = 2 * teslaCard.dimensions.pxRate + 'px';

    changeSelectorStyle('.acc_left', 'top', 11 * teslaCard.dimensions.pxRate + 'px');
    changeSelectorStyle('.acc_right', 'top', 11 * teslaCard.dimensions.pxRate + 'px');

    // icons
    teslaCardElement
      .querySelectorAll('.acc_container')
      .forEach((_currentValue, currentIndex, iconContainerItem) => {
        const iconContainer = <HTMLElement>iconContainerItem[currentIndex];
        iconContainer.style.height = teslaCard.dimensions.bubbleHeight + 'px';
        iconContainer.style.width = teslaCard.dimensions.bubbleHeight + 'px';
        iconContainer.style.padding = '0px';
      });
    teslaCardElement
      .querySelectorAll('ha-icon')
      .forEach((_currentValue, currentIndex, icons) => {
        const icon = <HTMLElement>(
          icons[currentIndex].shadowRoot?.querySelector('ha-svg-icon')
        );
        if (icon != null) {
          icon.style.height = teslaCard.dimensions.iconHeight + 'px';
          icon.style.width = teslaCard.dimensions.iconHeight + 'px';
        }
      });
    
    teslaCardElement
      .querySelectorAll<HTMLElement>('.acc_text_extra')
      .forEach(icontextExtra => {
        // @ts-ignore
        icontextExtra.style['font-size'] = teslaCard.dimensions.fontSize + 'px';
        // @ts-ignore
        icontextExtra.style['line-height'] = teslaCard.dimensions.fontSize + 'px';
        // @ts-ignore
        icontextExtra.style['margin-top'] = teslaCard.dimensions.marginTop + 'px';
      });

    teslaCardElement
      .querySelectorAll<HTMLElement>('.acc_text')
      .forEach(icontext => {
        // @ts-ignore
        icontext.style['font-size'] = teslaCard.dimensions.fontSize + 'px';
        // @ts-ignore
        icontext.style['line-height'] = teslaCard.dimensions.fontSize + 'px';
        // @ts-ignore
        icontext.style['margin-bottom'] = teslaCard.dimensions.fontSize + 'px';
      });

    teslaCardElement
      .querySelectorAll<HTMLElement>('.acc_text_extra')
      .forEach(icontextExtra => {
        // @ts-ignore
        icontextExtra.style['font-size'] = 3 * pxRate + 'px';
        icontextExtra.style.top = 1 * teslaCard.dimensions.pxRate + 'px';
        // icontextExtra.style.width = 10 * pxRate + 'px';
      });

    // power lines
    changeSelectorStyle('.power_lines', 'height', 42 * teslaCard.dimensions.pxRate + 'px');
    changeSelectorStyle('.power_lines', 'width', 42 * teslaCard.dimensions.pxRate + 'px');
    changeSelectorStyle('.power_lines', 'top', 0 * teslaCard.dimensions.pxRate + 'px');
    changeSelectorStyle('.power_lines', 'left', 28 * teslaCard.dimensions.pxRate + 'px');
    changeSelectorStyle('.power_lines', 'margin-left', -1.15 * teslaCard.dimensions.pxRate + 'px');
    changeSelectorStyle('.power_lines', 'margin-left', -1.15 * teslaCard.dimensions.pxRate + 'px');
    changeSelectorStyle('.power_lines svg', 'width', 42 * teslaCard.dimensions.pxRate + 'px');
    changeSelectorStyle('.power_lines svg', 'height', 42 * teslaCard.dimensions.pxRate + 'px');
    changeSelectorStyle(
      '.power_lines svg',
      'viewBox',
      '0 0 ' + 42 * teslaCard.dimensions.pxRate + ' ' + 42 * teslaCard.dimensions.pxRate
    );
    let selectorElement = <HTMLElement>(
      teslaCardElement.querySelector('.power_lines svg')
    );
    if (selectorElement !== null)
      selectorElement.setAttribute(
        'viewBox',
        '0 0 ' + 42 * teslaCard.dimensions.pxRate + ' ' + 42 * teslaCard.dimensions.pxRate
      );
    const half = 22 * teslaCard.dimensions.pxRate;
    changeSelectorStyle(
      '#generation_to_house_entity_line',
      'd',
      'M' +
        (half-teslaCard.dimensions.pxRate) +
        ',0 C' +
        (half-teslaCard.dimensions.pxRate) +
        ',' +
        half +
        ' ' +
        (half-teslaCard.dimensions.pxRate) +
        ',' +
        half +
        ' ' +
        half * 2 +
        ',' +
        half
    );
    changeSelectorStyle(
      '#grid_feed_in_entity_line',
      'd',
      'M' +
        (half-teslaCard.dimensions.pxRate) +
        ',0 C' +
        (half-teslaCard.dimensions.pxRate) +
        ',' +
        half +
        ' ' +
        (half-teslaCard.dimensions.pxRate) +
        ',' +
        half +
        ' 0,' +
        half
    );
    changeSelectorStyle(
      '#grid_to_house_entity_line',
      'd',
      'M0,' +
        half +
        ' C' +
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
    );
    changeSelectorStyle(
      '#grid_to_battery_entity_line',
      'd',
      'M0,' +
        half +
        ' C' +
        half +
        ',' +
        half +
        ' ' +
        half +
        ',' +
        half +
        ' ' +
        half +
        ',' +
        half * 2
    );
    changeSelectorStyle(
      '#battery_to_house_entity_line',
      'd',
      'M' +
        (half-teslaCard.dimensions.pxRate) +
        ',' +
        half * 2 +
        ' C' +
        (half-teslaCard.dimensions.pxRate) +
        ',' +
        half +
        ' ' +
        (half-teslaCard.dimensions.pxRate) +
        ',' +
        half +
        ' ' +
        half * 2 +
        ',' +
        half
    );
    changeSelectorStyle(
      '#generation_to_battery_entity_line',
      'd',
      'M' +
        (half-teslaCard.dimensions.pxRate) +
        ',0 C' +
        (half-teslaCard.dimensions.pxRate) +
        ',0 ' +
        (half-teslaCard.dimensions.pxRate) +
        ',' +
        half * 2 +
        ' ' +
        (half-teslaCard.dimensions.pxRate) +
        ',' +
        half * 2
    );

    // appliances
    const accLineHeight = 11.38 * teslaCard.dimensions.pxRate;
    const accLowerLineDiff = 2.2 * teslaCard.dimensions.pxRate;
    [1, 2].forEach(value => {

      changeSelectorStyle(
        '.acc_appliance' + value + '_line',
        'right',
        (11.46 * teslaCard.dimensions.pxRate) + 'px'
      );
      // changeSelectorStyle(
      //   '.acc_appliance' + value + '_line',
      //   'width',
      //   (2 * pxRate) + 'px'
      // );
      // changeSelectorStyle(
      //   '.acc_appliance' + value + '_line',
      //   'height',
      //   (accLineHeight) - (( value - 1) * accLowerLineDiff) + 'px'
      // );
      changeSelectorStyle(
        '.acc_appliance' + value + '_line svg',
        'width',
        (2.5 * teslaCard.dimensions.pxRate) + 'px'
      );
      changeSelectorStyle(
        '.acc_appliance' + value + '_line svg',
        'height',
        (accLineHeight) - (( value - 1) * accLowerLineDiff) + 'px'
      );
      selectorElement = <HTMLElement>(
        teslaCardElement.querySelector('.acc_appliance' + value + '_line_svg')
      );

      if (selectorElement !== null) {
        selectorElement.setAttribute(
          'viewBox',
          '0 0 ' + ((accLineHeight)-((value-1)*accLowerLineDiff)) + ' ' + ((accLineHeight)-((value-1)*accLowerLineDiff))
        );
      }

      const topElement = <HTMLElement>(
        teslaCardElement.querySelector('.generation_entity')
      );
      if (topElement === null && value === 1 && selectorElement !== null) {
        changeSelectorStyle(
          '.acc_center_container',
          'margin-top',
          19 * teslaCard.dimensions.pxRate + 'px'
        );
      } else {
        changeSelectorStyle(
          '.acc_center_container',
          'margin-top',
          -0.3 * teslaCard.dimensions.pxRate + 'px'
        );
      }
      const bottomElement = <HTMLElement>(
        teslaCardElement.querySelector('.battery_entity')
      );
      if (bottomElement === null && value === 2 && selectorElement !== null) {
        changeSelectorStyle(
          '.acc_center_container',
          'margin-bottom',
          19 * teslaCard.dimensions.pxRate + 'px'
        );
      } else {
        changeSelectorStyle(
          '.acc_center_container',
          'margin-bottom',
          -1.55 * teslaCard.dimensions.pxRate + 'px'
        );        
      }
    });
    const gridElement = <HTMLElement>(
      teslaCardElement.querySelector('.grid_entity')
    );
    if (gridElement === null) {
      changeSelectorStyle('.generation_entity', 'margin', '0px');
      changeSelectorStyle('.battery_entity', 'margin', '0px');
      changeSelectorStyle('.power_lines', 'width', 30 * teslaCard.dimensions.pxRate + 'px');
      selectorElement = <HTMLElement>(
        teslaCardElement.querySelector('.power_lines svg')
      );
      if (selectorElement !== null)
        selectorElement.setAttribute(
          'viewBox',
          12 * teslaCard.dimensions.pxRate + ' 0 ' + 42 * teslaCard.dimensions.pxRate + ' ' + 42 * teslaCard.dimensions.pxRate
        );
    }

    changeSelectorStyle('.acc_appliance1', 'top', 2 * teslaCard.dimensions.pxRate + 'px');    
    changeSelectorStyle('.acc_appliance1', 'right', 2 * teslaCard.dimensions.pxRate + 'px');
    changeSelectorStyle('.acc_appliance1_line', 'top', 23.45 * teslaCard.dimensions.pxRate + 'px');
    changeSelectorStyle('.acc_appliance2', 'bottom', 2 * teslaCard.dimensions.pxRate + 'px');
    changeSelectorStyle('.acc_appliance2', 'right', 2 * teslaCard.dimensions.pxRate + 'px');
    changeSelectorStyle('.acc_appliance2_line', 'bottom', 22.62 * teslaCard.dimensions.pxRate +'px');

    changeSelectorStyle('#appliance1_consumption_entity_line', 'd', 'M5,' + accLineHeight + ' C5,' + accLineHeight + ' 5,0 5,0');
    changeSelectorStyle('#appliance2_consumption_entity_line', 'd', 'M5,0 C5,0 5,' + (accLineHeight - accLowerLineDiff) + ' 5,' + (accLineHeight - accLowerLineDiff));

    return teslaCard.dimensions.width;
  }
}


