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

  public setValueAndUnitOfMeasurement(entityState: string | undefined, unitOfMeasurement: string | undefined): void {
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
        this.value = valueFromState;
        if (unitOfMeasurement === 'kW') {
          this.value *= 1000;
        }
        this.unitOfMeasurement = 'W';
        this.value = Math.round(this.value);
        break;
      case '%':
        this.value = valueFromState;
        this.unitOfMeasurement = unitOfMeasurement;
        break;
      default:
        this.value = entityState;
        this.unitOfMeasurement = unitOfMeasurement;
    }
  }

  public setSpeed(): void {
    this.speed = 0;
    if (Math.abs(this.value) === 0) return;
    this.speed = (SensorElement.SPEEDFACTOR * this.value) / 1000;
  }
}
