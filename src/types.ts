import { ActionConfig, HomeAssistant, LovelaceCard, LovelaceCardConfig, LovelaceCardEditor } from 'custom-card-helpers';
import { TeslaStyleSolarPowerCardEditor } from './editor';

declare global {
  interface HTMLElementTagNameMap {
    'tesla-style-solar-power-card-editor': LovelaceCardEditor;
    'hui-error-card': LovelaceCard;
  }
}

export interface TeslaStyleSolarPowerCardConfig extends LovelaceCardConfig {
  type: string;
  name?: string;

  show_warning?: boolean;
  show_error?: boolean;
  test_gui?: boolean;
  w_not_kw: boolean;
  hide_inactive_lines?: boolean;

  grid_icon?: string;
  pv_icon?: string;
  home_icon?: string;
  battery_icon?: string;
  appliance1_icon?: string;
  appliance2_icon?: string;

  home_consumption_entity?: string;
  grid_consumption_entity?: string;
  grid_feed_in_entity?: string;
  grid_to_battery_entity?: string;
  solar_yield_entity?: string;
  solar_consumption_entity?: string;
  solar_to_battery_entity?: string;
  battery_soc_entity?: string;
  battery_consumption_entity?: string;
  appliance1_consumption_entity?: string;
  appliance1_state_entity?: string;
  appliance2_consumption_entity?: string;
  appliance2_state_entity?: string;

  tap_action?: ActionConfig;
  hold_action?: ActionConfig;
  double_tap_action?: ActionConfig;
}


