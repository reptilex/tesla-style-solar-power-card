import { HassEntity } from 'home-assistant-js-websocket';

export class BubbleData {

    public mainValue: number = 0;
    
    public mainUnitOfMeasurement: string | undefined;
    
    public clickEntitySlot: string | null = null;
    
    public clickEntityHassState:HassEntity | null = null;

    public icon:string | undefined;

    public cssSelector: string | undefined;

    public extraValue: string | undefined;
    
    public extraUnitOfMeasurement: string | undefined;

    public noEntitiesWithValueFound = true;

}