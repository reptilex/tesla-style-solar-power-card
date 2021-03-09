export class SensorElement
{
  public speed = 0;
  
  public startPosition = 0;

  public currentPosition = 0;

  public currentDelta = 0;

  public maxPosition = 30;

  public value:any;

  public unitOfMeasurement = '';

  public accText = '';

  public accTextclassName = 'accText';

  public entity = '';

  public circle?:SVGPathElement;

  public line?:SVGPathElement;

  public color = 'stroke:var(--info-color)';

  public circleColor = "var(--primary-color)";

  public prevTimestamp = 0;

  public accTextElement = null;
  
  public entitySlot: string;

  private static readonly SPEEDFACTOR = 0.04;

  constructor(entity: string, enitySlot: string)
  {
    this.entity = entity;
    this.entitySlot = enitySlot;
    this.value = 0;
  }

  public setValueAndUnitOfMeasurement(entityState: string | undefined, useWnotkW = false, unitOfMeasurement: string | undefined): void
  {
      let value = 0;
      if (entityState === undefined) {
        this.value = value;
        return
      }
      if (unitOfMeasurement === undefined) {
        this.value = entityState;
        return
      }

      const valueFromState = parseFloat(entityState);

      if (unitOfMeasurement === 'kW') {
        value = valueFromState;
      } else if (unitOfMeasurement === 'W' && !useWnotkW) {
        value = valueFromState / 1000;
        unitOfMeasurement = 'kW'
      } else if (unitOfMeasurement === 'W' && useWnotkW) {
        value = valueFromState;
      } else if (unitOfMeasurement === '%') {
        value = valueFromState;
      } else {
        this.value = entityState;
        return;
      }

      this.unitOfMeasurement = unitOfMeasurement;
      this.value = this.roundValue(value);
    }

    private roundValue(value:number):number {
      if (value > 0.1) {
        value = (Math.round((value + Number.EPSILON) * 10) | 0) / 10
      } else {
        value = (Math.round((value + Number.EPSILON) * 100) | 0 ) / 100
      }
      return value;
    }

    public setSpeed(useWnotkW:boolean):void {
      this.speed = 0;
      if (Math.abs(this.value) == 0) return;

      if (!useWnotkW) {
        this.speed = SensorElement.SPEEDFACTOR * this.value;
      } else {
        this.speed = SensorElement.SPEEDFACTOR / 1000 * this.value;
      }
    }
  }