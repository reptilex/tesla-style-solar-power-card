/* eslint-disable func-names, prefer-template, import/extensions, no-param-reassign, class-methods-use-this, lit-a11y/click-events-have-key-events */
import { SensorElement } from '../models/SensorElement';
import { TeslaStyleSolarPowerCard } from '../TeslaStyleSolarPowerCard';

export class HtmlResizeForPowerCard {
  public static changeStylesDependingOnWidth(
    teslaCard: TeslaStyleSolarPowerCard,
    solarCardElements: Map<string, SensorElement>,
    newWidth: number,
    oldWidth: number
  ): number {
    if (document.readyState !== 'complete' || oldWidth === newWidth)
      return oldWidth;
    if (teslaCard.shadowRoot == null) return oldWidth;

	const cardElement = <HTMLElement>teslaCard.shadowRoot?.querySelector('#tesla-style-solar-power-card>div');
	if (cardElement == null) return oldWidth;

	const bubbleWidth = (teslaCard.bubblePercentage / 100) * cardElement.clientWidth;
	teslaCard.style.setProperty('--mdc-icon-size', `${bubbleWidth/2}px`);
	teslaCard.style.setProperty('--bubble-size', `${bubbleWidth}px`);
	teslaCard.style.setProperty('--font-size', `${bubbleWidth/6}px`);

	return newWidth;
  }
}
