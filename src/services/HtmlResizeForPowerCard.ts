/* eslint-disable func-names, prefer-template, import/extensions, no-param-reassign, class-methods-use-this, lit-a11y/click-events-have-key-events */
import { SensorElement } from '../models/SensorElement';
import { TeslaStyleSolarPowerCard } from '../TeslaStyleSolarPowerCard';

export class HtmlResizeForPowerCard {  
  public static changeStylesDependingOnWidth(
    teslaCard: TeslaStyleSolarPowerCard,
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

    teslaCardElement.style.padding = teslaCard.dimensions.padding + 'px';

    // grid
    let topRowHeight = teslaCard.dimensions.bubbleHeight;
    let bottomRowHeight = teslaCard.dimensions.bubbleHeight;

    if (!(teslaCard.config.appliance1_consumption_entity || teslaCard.config.generation_to_battery_entity || teslaCard.config.generation_to_grid_entity || teslaCard.config.generation_to_house_entity)) {
      topRowHeight = 0;
    }

    if (!(teslaCard.config.appliance2_consumption_entity || teslaCard.config.battery_to_house_entity || teslaCard.config.battery_to_house_entity || teslaCard.config.battery_to_house_entity)) {
      bottomRowHeight = 0;
    }


    changeSelectorStyle('.power_flow_grid', 'grid-template-rows', topRowHeight + 'px ' + teslaCard.dimensions.bubbleGap + 'px ' + teslaCard.dimensions.bubbleHeight + 'px ' + teslaCard.dimensions.bubbleGap + 'px ' + bottomRowHeight + 'px');
    changeSelectorStyle('.power_flow_grid', 'grid-template-columns', teslaCard.dimensions.bubbleHeight + 'px ' + teslaCard.dimensions.bubbleGap + 'px ' + teslaCard.dimensions.bubbleHeight + 'px ' + teslaCard.dimensions.bubbleGap + 'px ' + teslaCard.dimensions.bubbleHeight + 'px;');

    // icons
    teslaCardElement
      .querySelectorAll('.acc_container')
      .forEach((_currentValue, currentIndex, iconContainerItem) => {
        const iconContainer = <HTMLElement>iconContainerItem[currentIndex];
        iconContainer.style.height = teslaCard.dimensions.bubbleHeight + 'px';
        iconContainer.style.width = teslaCard.dimensions.bubbleHeight + 'px';
        iconContainer.style.margin = '-' + teslaCard.dimensions.bubbleBorderWidth + 'px'; //TODO: factor out to bubble line width
        iconContainer.style.borderWidth = teslaCard.dimensions.bubbleBorderWidth + 'px'
        iconContainer.style.padding = '0px';
      });
    teslaCardElement
      .querySelectorAll('ha-icon')
      .forEach((_currentValue, currentIndex, icons) => {
        icons[currentIndex].setAttribute('style', `--mdc-icon-size:${teslaCard.dimensions.iconHeight + 'px'};width:${teslaCard.dimensions.iconHeight + 'px'};height:${teslaCard.dimensions.iconHeight + 'px'}`)
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
        icontextExtra.style['font-size'] = teslaCard.dimensions.fontSize + 'px';
        icontextExtra.style.top = 1 * teslaCard.dimensions.pxRate + 'px';
      });

    // power lines
    changeSelectorStyle('.power_lines', 'height', teslaCard.dimensions.powerLinesHeight + 'px');
    changeSelectorStyle('.power_lines', 'width', teslaCard.dimensions.powerLinesHeight + 'px');
    changeSelectorStyle('.power_lines svg', 'width', teslaCard.dimensions.powerLinesHeight + 'px');
    changeSelectorStyle('.power_lines svg', 'height', teslaCard.dimensions.powerLinesHeight + 'px');
    changeSelectorStyle(
      '.power_lines svg',
      'viewBox',
      '0 0 ' + teslaCard.dimensions.powerLinesHeight + ' ' + teslaCard.dimensions.powerLinesHeight
    );
    let selectorElement = <HTMLElement>(
      teslaCardElement.querySelector('.power_lines svg')
    );
    if (selectorElement !== null)
      selectorElement.setAttribute(
        'viewBox',
        '0 0 ' + teslaCard.dimensions.powerLinesHeight + ' ' + teslaCard.dimensions.powerLinesHeight
      );
    const half = teslaCard.dimensions.powerLinesHeight / 2;
    changeSelectorStyle(
      '#generation_to_house_entity_line',
      'd',
      'M' +
        half +
        ',0 C' +
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
      '#grid_feed_in_entity_line',
      'd',
      'M' +
        half +
        ',0 C' +
        half +
        ',' +
        half +
        ' ' +
        half +
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
      'M' + teslaCard.dimensions.straightLineOrigin + ',' +
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
        teslaCard.dimensions.straightLineLength
    );
    changeSelectorStyle(
      '#battery_to_house_entity_line',
      'd',
      'M' +
        half +
        ',' +
        half * 2 +
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
      '#generation_to_battery_entity_line',
      'd',
      'M' +
        half +
        ',0 C' +
        half +
        ',0 ' +
        half +
        ',' +
        half * 2 +
        ' ' +
        half +
        ',' +
        half * 2
    );

    // appliances
    [1, 2].forEach(value => {
      selectorElement = <HTMLElement>(
        teslaCardElement.querySelector('.acc_appliance' + value + '_line_svg')
      );

      if (selectorElement !== null) {
        selectorElement.setAttribute(
          'viewBox',
          '0 0 ' + teslaCard.dimensions.bubbleGap + ' ' + teslaCard.dimensions.bubbleGap
        );
      }
    });
    const gridElement = <HTMLElement>(
      teslaCardElement.querySelector('.grid_entity')
    );
    if (gridElement === null) {
      changeSelectorStyle('.generation_entity', 'margin', '0px');
      changeSelectorStyle('.battery_entity', 'margin', '0px');
      changeSelectorStyle('.power_lines', 'width', teslaCard.dimensions.powerLinesHeight + 'px');
      selectorElement = <HTMLElement>(
        teslaCardElement.querySelector('.power_lines svg')
      );
      if (selectorElement !== null)
        selectorElement.setAttribute(
          'viewBox',
          12 * teslaCard.dimensions.powerLinesHeight + ' 0 ' + teslaCard.dimensions.powerLinesHeight + ' ' + teslaCard.dimensions.powerLinesHeight
        );
    }

    changeSelectorStyle('#appliance1_consumption_entity_line', 'd', 'M5,' + teslaCard.dimensions.accLineLength + ' C5,' + teslaCard.dimensions.accLineLength + ' 5,0 5,0');
    changeSelectorStyle('#appliance2_consumption_entity_line', 'd', 'M5,0 C5,0 5,' + teslaCard.dimensions.accLineLength + ' 5,' + teslaCard.dimensions.accLineLength);

    return teslaCard.dimensions.width;
  }
}


