import { TeslaStyleSolarPowerCard } from "../TeslaStyleSolarPowerCard";

export class DimensionsForPowerCard {  
    static readonly minimumWidth = 280;
    private _pxRate: number = 0; //default should never be seen
    private _width: number = DimensionsForPowerCard.minimumWidth;
    private _bubbleHeight: number = 0; //default should never be seen
    private _padding: number = 0; //default should never be seen
    private _bubbleGap: number = 0;
    private _bubbleBorderWidth: number = 0.5;
    private _powerLinesHeight: number = 0;
    private teslaCard: TeslaStyleSolarPowerCard;

    public constructor(teslaCard: TeslaStyleSolarPowerCard) {
      this.teslaCard = teslaCard;
    }
  
    public updateCardDimensions(newWidth: number):number {
      if (this.teslaCard.config.minimum_width === undefined) 
        this.teslaCard.config.minimum_width = DimensionsForPowerCard.minimumWidth;

      if (newWidth < this.teslaCard.config.minimum_width)
        this._width = this.teslaCard.config.minimum_width;
      else
        this._width = newWidth;

      this._pxRate = this._width / 100;
      this._padding = 3 * this.pxRate;
      this._bubbleHeight = (this._width - (this._padding*2)) / 4;
      this._bubbleGap = this._bubbleHeight / 2
      this._powerLinesHeight = this._bubbleHeight * 2

      return this._width;
    }

    public get pxRate() {
      return this._pxRate;
    }

    public get bubbleHeight(){
      return this._bubbleHeight;
    }

    public get iconHeight(){
      return this._bubbleHeight * 0.33;
    }

    public get fontSize(){
      return this._bubbleHeight * 0.143;
    }

    public get marginTop(){
      return this._bubbleHeight * 0.192; 
    }

    public get width(){
      return this._width;
    }

    public get padding(){
      return this._padding;
    }

    public get bubbleGap(){
      return this._bubbleGap;
    }

    public get powerLinesHeight(){
      return this._powerLinesHeight;
    }

    public get bubbleBorderWidth(){
      return Math.max(1, this._bubbleBorderWidth * this._pxRate);
    }
}