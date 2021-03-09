import { ActionConfig,  LovelaceCardConfig } from 'custom-card-helpers';

export interface TeslaStyleSolarPowerCardConfig extends LovelaceCardConfig {
    type: string;
    name?: string;
    show_header_toggle?: boolean;
  
    show_warning?: boolean;
    show_error?: boolean;
    test_gui?: boolean;
    w_not_kw: boolean;
    hide_inactive_lines?: boolean;
  
    grid_icon?: string;
    generation_icon?: string;
    house_icon?: string;
    battery_icon?: string;
    appliance1_icon?: string;
    appliance2_icon?: string;
  
    icon_entities?:Map<string,string>;
    line_entities?:Map<string,string>;
  
  
    house_consumption_entity?: string;
    grid_consumption_entity?: string;
    grid_to_generation_entity?: string;
    grid_to_battery_entity?: string;
    battery_to_grid_entity?: string;
    generation_yield_entity?: string;
    generation_consumption_entity?: string;
    generation_to_battery_entity?: string;
    battery_consumption_entity?: string;

    grid_extra_entity?: string;
    generation_extra_entity?: string;
    house_extra_entity?: string;
    battery_extra_entity?: string;

    appliance1_consumption_entity?: string;
    appliance1_extra_entity?: string;
    appliance2_consumption_entity?: string;
    appliance2_extra_entity?: string;
  
    tap_action?: ActionConfig;
    hold_action?: ActionConfig;
    double_tap_action?: ActionConfig;
  }