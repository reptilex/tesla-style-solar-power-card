import { TeslaStyleSolarPowerCard } from "../TeslaStyleSolarPowerCard";

export class DimensionsForPowerCard {  
    static readonly minimumWidth = 280;
    private _pxRate: number = 0; //default should never be seen
    private _width: number = DimensionsForPowerCard.minimumWidth;
    private _bubbleHeight: number = 0; //default should never be seen
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
      this._bubbleHeight = 21 * this.pxRate;

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
}