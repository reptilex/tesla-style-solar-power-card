/* eslint-disable class-methods-use-this, no-bitwise  */
export class SensorElement {
  public speed = 0;

  public startPosition = 0;

  public currentPosition = 0;

  public currentDelta = 0;

  public maxPosition = 30;

  public value: any;

  public unitOfMeasurement = '';

  public accText = '';

  public accTextclassName = 'accText';

  public entity = '';

  public circle?: SVGPathElement;

  public line?: SVGPathElement;

  public color = 'stroke:var(--info-color)';

  public circleColor = 'var(--primary-color)';

  public prevTimestamp = 0;

  public accTextElement = null;

  public entitySlot: string;

  private static readonly SPEEDFACTOR = 0.04;

  constructor(entity: string, enitySlot: string) {
    this.entity = entity;
    this.entitySlot = enitySlot;
    this.value = 0;
  }

  public setValueAndUnitOfMeasurement(
    entityState: string | undefined,
    unitOfMeasurement: string | undefined,
    useWnotkW = false,
    thresholdInK: number | undefined = undefined
  ): void {
    if (entityState === undefined) {
      this.value = 0;
      return;
    }
    if (unitOfMeasurement === undefined) {
      this.value = entityState;
      return;
    }

    const valueFromState = parseFloat(entityState);

    switch (unitOfMeasurement) {
      case 'W':
      case 'kW':
        this.setValueAndUnitDependingOnExtraOptions(unitOfMeasurement, valueFromState, useWnotkW, thresholdInK);
        break;
      case '%':
        this.value = valueFromState;
        this.unitOfMeasurement = unitOfMeasurement;
        break;
      default:
        this.value = entityState;
        this.unitOfMeasurement = unitOfMeasurement;
        return;
    }

    this.value = this.roundValue(this.value);
  }

  private setValueAndUnitDependingOnExtraOptions(
    unitOfMeasurement: string,
    valueFromState: number,
    useWnotkW: boolean,
    thresholdInK: number | undefined
  ) {
    if (useWnotkW) {
      if (unitOfMeasurement === 'kW') {
        this.value = valueFromState * 1000;
        this.unitOfMeasurement = 'W';
      } else {
        this.value = valueFromState;
      }
      return;
    }

    if (unitOfMeasurement === 'kW') {
      this.value = valueFromState;
    } else if (unitOfMeasurement === 'W') {
      this.value = valueFromState / 1000;
    }
    this.unitOfMeasurement = 'kW';

    if (thresholdInK !== undefined && this.unitOfMeasurement === 'kW' && this.value < thresholdInK) {
      this.value *= 1000;
      this.unitOfMeasurement = 'W';
    }
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

  public setSpeed(): void {
    this.speed = 0;
    if (Math.abs(this.value) === 0) return;

    if (this.unitOfMeasurement !== 'W') {
      this.speed = SensorElement.SPEEDFACTOR * this.value;
    } else {
      this.speed = (SensorElement.SPEEDFACTOR / 1000) * this.value;
    }
  }
}
