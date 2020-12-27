export class SensorElement {
    public speed = 0;
    public startPosition = 0;
    public currentPosition = 0;
    public currentDelta = 0;
    public maxPosition = 30;
    public value;
    public unitOfMeasurement = '';
    public accText = '';
    public accTextclassName = 'accText';
    public entity = '';
    public circle;
    public line;
    public color = 'stroke:var(--info-color)';
    public circleColor = "var(--primary-color)";
    public prevTimestamp = 0;
    public accTextElement = null;
    public entitySlot: string;

    constructor(entity: string, enitySlot:string) {
      this.entity = entity;
      this.entitySlot = enitySlot;
      this.value = 0;
    }

  public setValueAndUnitOfMeasurement(entityState: string, useWnotkW = false, unitOfMeasurement: string | undefined): void {
      let value = 0;
      if (entityState == undefined) {
        this.value = value;
        return
      }
      if (unitOfMeasurement == undefined) {
        this.value = entityState;
        return
      }

      const valueFromState = parseInt(entityState);

      if (unitOfMeasurement === 'kW') {
        value = valueFromState;
      } else if (unitOfMeasurement === 'W' && !useWnotkW) {
        value = valueFromState / 1000;
        unitOfMeasurement = 'kW'
      } else if (unitOfMeasurement === 'W' && useWnotkW) {
        value = valueFromState;
      } else if (unitOfMeasurement === '%') {
        value = valueFromState;
      }

      if (value > 0.1) {
        value = Math.round((value + Number.EPSILON) * 10) / 10
      } else {
        value = Math.round((value + Number.EPSILON) * 100) / 100
      }

      this.unitOfMeasurement = unitOfMeasurement;
      this.value = value;
    }

    public setSpeed(useWnotkW = false):void {
      this.speed = 0;
      if (this.value <= 0) return;

      if (!useWnotkW) {
        this.speed = 0.04 * this.value;
      } else if (this.value > 0 && useWnotkW) {
        this.speed = 0.00004 * this.value;
      }
    }
  }