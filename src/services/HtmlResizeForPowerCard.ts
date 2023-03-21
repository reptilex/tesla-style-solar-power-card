/* eslint-disable func-names, prefer-template, import/extensions, no-param-reassign, class-methods-use-this, lit-a11y/click-events-have-key-events */
import { SensorElement } from '../models/SensorElement';
import { TeslaStyleSolarPowerCard } from '../TeslaStyleSolarPowerCard';

export class HtmlResizeForPowerCard {  
  public static getNewWidth(newWidth: number) {
    if (newWidth < 200)
      newWidth = 250;
    return newWidth;
  }

  public static getPxRate(newWidth: number) {
    return newWidth / 100;
  }

  public static changeStylesDependingOnWidth(
    teslaCard: TeslaStyleSolarPowerCard,
    solarCardElements: Map<string, SensorElement>,
    newWidth: number,
    oldWidth: number
  ): number {
    if (document.readyState !== 'complete' || oldWidth === newWidth)
      return oldWidth;
    if (teslaCard.shadowRoot == null) return oldWidth;
    const teslaCardElement = <HTMLElement>(
      teslaCard.shadowRoot.querySelector('#tesla-style-solar-power-card')
    );
    if (teslaCardElement == null) return oldWidth;

    newWidth = HtmlResizeForPowerCard.getNewWidth(newWidth);
    const pxRate = HtmlResizeForPowerCard.getPxRate(newWidth);

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

    teslaCardElement.style.padding = 2 * pxRate + 'px';

    changeSelectorStyle('.acc_left', 'top', 11 * pxRate + 'px');
    changeSelectorStyle('.acc_right', 'top', 11 * pxRate + 'px');

    // icons
    teslaCardElement
      .querySelectorAll('.acc_container')
      .forEach((_currentValue, currentIndex, iconContainerItem) => {
        const iconContainer = <HTMLElement>iconContainerItem[currentIndex];
        iconContainer.style.height = 21 * pxRate + 'px';
        iconContainer.style.width = 21 * pxRate + 'px';
        iconContainer.style.padding = 0 * pxRate + 'px';
      });
    teslaCardElement
      .querySelectorAll('ha-icon')
      .forEach((_currentValue, currentIndex, icons) => {
        const icon = <HTMLElement>(
          icons[currentIndex].shadowRoot?.querySelector('ha-svg-icon')
        );
        if (icon != null) {
          icon.style.height = 7 * pxRate + 'px';
          icon.style.width = 7 * pxRate + 'px';
        }
      });
    
    teslaCardElement
      .querySelectorAll<HTMLElement>('.acc_text_extra')
      .forEach(icontextExtra => {
        // @ts-ignore
        icontextExtra.style['font-size'] = 3 * pxRate + 'px';
        // @ts-ignore
        icontextExtra.style['margin-top'] = 3 * pxRate + 'px';
        // @ts-ignore
        icontextExtra.style['margin-bottom'] = -0.3 * pxRate + 'px';
        
        // icontextExtra.style.width = 10 * pxRate + 'px';
      });

    teslaCardElement
      .querySelectorAll<HTMLElement>('.acc_text')
      .forEach(icontext => {
        // @ts-ignore
        icontext.style['font-size'] = 3 * pxRate + 'px';
        // @ts-ignore
        icontext.style['margin-top'] = -0.3 * pxRate + 'px';
        // @ts-ignore
        icontext.style['margin-bottom'] = 3 * pxRate + 'px';
        // icontext.style.width = 10 * pxRate + 'px';
      });

    teslaCardElement
      .querySelectorAll<HTMLElement>('.acc_text_extra')
      .forEach(icontextExtra => {
        // @ts-ignore
        icontextExtra.style['font-size'] = 3 * pxRate + 'px';
        icontextExtra.style.top = 1 * pxRate + 'px';
        // icontextExtra.style.width = 10 * pxRate + 'px';
      });

    // power lines
    changeSelectorStyle('.power_lines', 'height', 42 * pxRate + 'px');
    changeSelectorStyle('.power_lines', 'width', 42 * pxRate + 'px');
    changeSelectorStyle('.power_lines', 'top', 0 * pxRate + 'px');
    changeSelectorStyle('.power_lines', 'left', 28 * pxRate + 'px');
    changeSelectorStyle('.power_lines', 'margin-left', -1.15 * pxRate + 'px');
    changeSelectorStyle('.power_lines', 'margin-left', -1.15 * pxRate + 'px');
    changeSelectorStyle('.power_lines svg', 'width', 42 * pxRate + 'px');
    changeSelectorStyle('.power_lines svg', 'height', 42 * pxRate + 'px');
    changeSelectorStyle(
      '.power_lines svg',
      'viewBox',
      '0 0 ' + 42 * pxRate + ' ' + 42 * pxRate
    );
    let selectorElement = <HTMLElement>(
      teslaCardElement.querySelector('.power_lines svg')
    );
    if (selectorElement !== null)
      selectorElement.setAttribute(
        'viewBox',
        '0 0 ' + 42 * pxRate + ' ' + 42 * pxRate
      );
    const half = 22 * pxRate;
    changeSelectorStyle(
      '#generation_to_house_entity_line',
      'd',
      'M' +
        (half-pxRate) +
        ',0 C' +
        (half-pxRate) +
        ',' +
        half +
        ' ' +
        (half-pxRate) +
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
        (half-pxRate) +
        ',0 C' +
        (half-pxRate) +
        ',' +
        half +
        ' ' +
        (half-pxRate) +
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
        (half-pxRate) +
        ',' +
        half * 2 +
        ' C' +
        (half-pxRate) +
        ',' +
        half +
        ' ' +
        (half-pxRate) +
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
        (half-pxRate) +
        ',0 C' +
        (half-pxRate) +
        ',0 ' +
        (half-pxRate) +
        ',' +
        half * 2 +
        ' ' +
        (half-pxRate) +
        ',' +
        half * 2
    );

    // appliances
    const accLineHeight = 11.38 * pxRate;
    const accLowerLineDiff = 2.2 * pxRate;
    [1, 2].forEach(value => {

      changeSelectorStyle(
        '.acc_appliance' + value + '_line',
        'right',
        (11.46 * pxRate) + 'px'
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
        (2.5 * pxRate) + 'px'
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
          19 * pxRate + 'px'
        );
      } else {
        changeSelectorStyle(
          '.acc_center_container',
          'margin-top',
          -0.3 * pxRate + 'px'
        );
      }
      const bottomElement = <HTMLElement>(
        teslaCardElement.querySelector('.battery_entity')
      );
      if (bottomElement === null && value === 2 && selectorElement !== null) {
        changeSelectorStyle(
          '.acc_center_container',
          'margin-bottom',
          19 * pxRate + 'px'
        );
      } else {
        changeSelectorStyle(
          '.acc_center_container',
          'margin-bottom',
          -1.55 * pxRate + 'px'
        );        
      }
    });
    const gridElement = <HTMLElement>(
      teslaCardElement.querySelector('.grid_entity')
    );
    if (gridElement === null) {
      changeSelectorStyle('.generation_entity', 'margin', '0px');
      changeSelectorStyle('.battery_entity', 'margin', '0px');
      changeSelectorStyle('.power_lines', 'width', 30 * pxRate + 'px');
      selectorElement = <HTMLElement>(
        teslaCardElement.querySelector('.power_lines svg')
      );
      if (selectorElement !== null)
        selectorElement.setAttribute(
          'viewBox',
          12 * pxRate + ' 0 ' + 42 * pxRate + ' ' + 42 * pxRate
        );
    }

    changeSelectorStyle('.acc_appliance1', 'top', 2 * pxRate + 'px');    
    changeSelectorStyle('.acc_appliance1', 'right', 2 * pxRate + 'px');
    changeSelectorStyle('.acc_appliance1_line', 'top', 23.45 * pxRate + 'px');
    changeSelectorStyle('.acc_appliance2', 'bottom', 2 * pxRate + 'px');
    changeSelectorStyle('.acc_appliance2', 'right', 2 * pxRate + 'px');
    changeSelectorStyle('.acc_appliance2_line', 'bottom', 22.62 * pxRate +'px');

    changeSelectorStyle('#appliance1_consumption_entity_line', 'd', 'M5,' + accLineHeight + ' C5,' + accLineHeight + ' 5,0 5,0');
    changeSelectorStyle('#appliance2_consumption_entity_line', 'd', 'M5,0 C5,0 5,' + (accLineHeight - accLowerLineDiff) + ' 5,' + (accLineHeight - accLowerLineDiff));

    return newWidth;
  }
}


