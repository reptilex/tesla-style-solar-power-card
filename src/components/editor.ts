/* eslint-disable @typescript-eslint/no-explicit-any, no-param-reassign, camelcase, lit/no-useless-template-literals, lit-a11y/click-events-have-key-events */
import {
  LitElement,
  html,
  customElement,
  property,
  TemplateResult,
  CSSResult,
  css,
  internalProperty,
} from 'lit-element';
import {
  HomeAssistant,
  fireEvent,
  LovelaceCardEditor,
  ActionConfig,
  LovelaceCardConfig,
} from 'custom-card-helpers';

import { TeslaStyleSolarPowerCardConfig } from '../models/TeslaStyleSolarPowerCardConfig.js';

const options = {
  entities: {
    icon: 'tune',
    name: 'Entities',
    secondary:
      'Entities for card to make sense, none are required but you should have a few.',
    show: false,
  },
  actions: {
    icon: 'gesture-tap-hold',
    name: 'Actions',
    secondary: 'Perform actions based on tapping/clicking',
    show: false,
    options: {
      tap: {
        icon: 'gesture-tap',
        name: 'Tap',
        secondary: 'Set the action to perform on tap',
        show: false,
      },
      hold: {
        icon: 'gesture-tap-hold',
        name: 'Hold',
        secondary: 'Set the action to perform on hold',
        show: false,
      },
      double_tap: {
        icon: 'gesture-double-tap',
        name: 'Double Tap',
        secondary: 'Set the action to perform on double tap',
        show: false,
      },
    },
  },
  appearance: {
    icon: 'palette',
    name: 'Appearance',
    secondary: 'Customize the name, icon, etc',
    show: false,
  },
};

@customElement('tesla-style-solar-power-card-editor')
export class TeslaStyleSolarPowerCardEditor
  extends LitElement
  implements LovelaceCardEditor {
  @property({ attribute: false }) public hass?: HomeAssistant;

  @internalProperty() private _config?: LovelaceCardConfig;

  @internalProperty() private _toggle?: boolean;

  @internalProperty() private _helpers?: any;

  private _initialized = false;

  private _entityMap = new Map();

  public setConfig(config: LovelaceCardConfig): void {
    this._config = config;

    // this._fillLineEntityMap();
    this.loadCardHelpers();
  }

  protected shouldUpdate(): boolean {
    if (!this._initialized) {
      this._initialize();
    }

    return true;
  }

  get name(): string {
    return this._config?.name || '';
  }

  // entities
  get home_entity(): string {
    return this._config?.home_entity || '';
  }

  get battery_entity(): string {
    return this._config?.battery_consumption_entity || '';
  }

  get grid_entity(): string {
    return this._config?.grid_entity || '';
  }

  get generation_entity(): string {
    return this._config?.generation_entity || '';
  }

  get home_extra_entity(): string {
    return this._config?.home_entity || '';
  }

  get battery_extra_entity(): string {
    return this._config?.battery_consumption_entity || '';
  }

  get grid_extra_entity(): string {
    return this._config?.grid_entity || '';
  }

  get generation_extra_entity(): string {
    return this._config?.generation_entity || '';
  }

  get grid_to_house_entity(): string {
    return this._config?.grid_to_house_entity || '';
  }

  get grid_to_battery_entity(): string {
    return this._config?.grid_to_battery_entity || '';
  }

  get battery_to_grid_in_entity(): string {
    return this._config?.battery_to_grid_entity || '';
  }

  get generation_to_grid_entity(): string {
    return this._config?.grid_to_battery_entity || '';
  }

  get generation_to_house_entity(): string {
    return this._config?.generation_entity || '';
  }

  get generation_to_battery_entity(): string {
    return this._config?.generation_yield_entity || '';
  }

  get appliance1_consumption_entity(): string {
    return this._config?.appliance1_consumption_entity || '';
  }

  get appliance1_extra_entity(): string {
    return this._config?.appliance1_state_entity || '';
  }

  get appliance2_consumption_entity(): string {
    return this._config?.appliance2_consumption_entity || '';
  }

  get appliance2_extra_entity(): string {
    return this._config?.appliance2_state_entity || '';
  }

  get show_w_not_kw(): boolean {
    return this._config?.show_w_not_kw || false;
  }

  get show_warning(): boolean {
    return this._config?.show_warning || false;
  }

  get show_error(): boolean {
    return this._config?.show_error || false;
  }

  get hide_inactive_lines(): boolean {
    return this._config?.hide_inactive_lines || false;
  }

  get tap_action(): ActionConfig {
    return this._config?.tap_action || { action: 'more-info' };
  }

  get hold_action(): ActionConfig {
    return this._config?.hold_action || { action: 'none' };
  }

  get double_tap_action(): ActionConfig {
    return this._config?.double_tap_action || { action: 'none' };
  }

  protected render(): TemplateResult | void {
    if (!this.hass || !this._helpers) {
      return html``;
    }

    // The climate more-info has ha-switch and paper-dropdown-menu elements that are lazy loaded unless explicitly done here
    this._helpers.importMoreInfoControl('climate');

    return html`
      <div class="card-config">
        <paper-input
          .label="${this.hass.localize(
            'ui.panel.lovelace.editor.card.generic.title'
          )} (${this.hass.localize(
            'ui.panel.lovelace.editor.card.config.optional'
          )})"
          .value=${this.name}
          .configValue=${'name'}
          @value-changed=${this._valueChanged}
        ></paper-input>
        <div class="option" @click=${this._toggleOption} .option=${'entities'}>
          <div class="row">
            <ha-icon .icon=${`mdi:${options.entities.icon}`}></ha-icon>
            <div class="title">${options.entities.name}</div>
          </div>
          <div class="secondary">${options.entities.secondary}</div>
        </div>
        ${options.entities.show
          ? html`<div class="values">
              ${Array.from(this._entityMap).map(entityArr => {
                const entityName: keyof TeslaStyleSolarPowerCardConfig =
                  entityArr[0];
                const entityFunction = this[`_${entityName}`];
                return html`
                  <ha-entity-picker
                    label="${entityName}"
                    @value-changed=${this._valueChanged}
                    .hass="${this.hass}"
                    .value="${entityFunction}"
                    .configValue=${entityName}
                    @change="${this._valueChanged}"
                    allow-custom-entity
                  >
                  </ha-entity-picker>
                `;
              })}
            </div>`
          : ''}
        <div class="option" @click=${this._toggleOption} .option=${'actions'}>
          <div class="row">
            <ha-icon .icon=${`mdi:${options.actions.icon}`}></ha-icon>
            <div class="title">${options.actions.name}</div>
          </div>
          <div class="secondary">${options.actions.secondary}</div>
        </div>
        ${options.actions.show
          ? html`
              <div class="values">
                <div
                  class="option"
                  @click=${this._toggleAction}
                  .option=${'tap'}
                >
                  <div class="row">
                    <ha-icon
                      .icon=${`mdi:${options.actions.options.tap.icon}`}
                    ></ha-icon>
                    <div class="title">${options.actions.options.tap.name}</div>
                  </div>
                  <div class="secondary">
                    ${options.actions.options.tap.secondary}
                  </div>
                </div>
                ${options.actions.options.tap.show
                  ? html`
                      <div class="values">
                        <paper-item>Action Editors Coming Soon</paper-item>
                      </div>
                    `
                  : ''}
                <div
                  class="option"
                  @click=${this._toggleAction}
                  .option=${'hold'}
                >
                  <div class="row">
                    <ha-icon
                      .icon=${`mdi:${options.actions.options.hold.icon}`}
                    ></ha-icon>
                    <div class="title">
                      ${options.actions.options.hold.name}
                    </div>
                  </div>
                  <div class="secondary">
                    ${options.actions.options.hold.secondary}
                  </div>
                </div>
                ${options.actions.options.hold.show
                  ? html`
                      <div class="values">
                        <paper-item>Action Editors Coming Soon</paper-item>
                      </div>
                    `
                  : ''}
                <div
                  class="option"
                  @click=${this._toggleAction}
                  .option=${'double_tap'}
                >
                  <div class="row">
                    <ha-icon
                      .icon=${`mdi:${options.actions.options.double_tap.icon}`}
                    ></ha-icon>
                    <div class="title">
                      ${options.actions.options.double_tap.name}
                    </div>
                  </div>
                  <div class="secondary">
                    ${options.actions.options.double_tap.secondary}
                  </div>
                </div>
                ${options.actions.options.double_tap.show
                  ? html`
                      <div class="values">
                        <paper-item>Action Editors Coming Soon</paper-item>
                      </div>
                    `
                  : ''}
              </div>
            `
          : ''}
        <div
          class="option"
          @click=${this._toggleOption}
          .option=${'appearance'}
        >
          <div class="row">
            <ha-icon .icon=${`mdi:${options.appearance.icon}`}></ha-icon>
            <div class="title">${options.appearance.name}</div>
          </div>
          <div class="secondary">${options.appearance.secondary}</div>
        </div>
        ${options.appearance.show
          ? html`
              <div class="values">
                <br />
                <ha-formfield
                  .label=${`Toggle warning ${this.show_warning ? 'off' : 'on'}`}
                >
                  <ha-switch
                    .checked=${this.show_warning !== false}
                    .configValue=${'show_warning'}
                    @change=${this._valueChanged}
                  ></ha-switch>
                </ha-formfield>
                <ha-formfield
                  .label=${`Toggle error ${this.show_error ? 'off' : 'on'}`}
                >
                  <ha-switch
                    .checked=${this.show_error !== false}
                    .configValue=${'show_error'}
                    @change=${this._valueChanged}
                  ></ha-switch>
                </ha-formfield>
                <ha-formfield
                  .label=${`Toggle W instead of kW ${
                    this.show_w_not_kw ? 'off' : 'on'
                  }`}
                >
                  <ha-switch
                    .checked=${this.show_w_not_kw !== false}
                    .configValue=${'show_w_not_kw'}
                    @change=${this._valueChanged}
                  ></ha-switch>
                </ha-formfield>
                <ha-formfield
                  .label=${`Toggle hiding inactive power lines ${
                    this.hide_inactive_lines ? 'off' : 'on'
                  }`}
                >
                  <ha-switch
                    .checked=${this.hide_inactive_lines !== false}
                    .configValue=${'hide_inactive_lines'}
                    @change=${this._valueChanged}
                  ></ha-switch>
                </ha-formfield>
              </div>
            `
          : ''}
      </div>
    `;
  }

  private _initialize(): void {
    if (this.hass === undefined) return;
    if (this._config === undefined) return;
    if (this._helpers === undefined) return;
    this._initialized = true;
  }

  private async loadCardHelpers(): Promise<void> {
    this._helpers = await (window as any).loadCardHelpers();
  }

  private _toggleAction(ev: any): void {
    this._toggleThing(ev, options.actions.options);
  }

  private _toggleOption(ev: any): void {
    this._toggleThing(ev, options);
  }

  private _toggleThing(ev: any, optionList: any): void {
    const show = !optionList[ev.target.option].show;
    for (const [key] of Object.entries(optionList)) {
      optionList[key].show = false;
    }
    optionList[ev.target.option].show = show;
    this._toggle = !this._toggle;
  }

  private _valueChanged(ev: any): void {
    if (!this._config || !this.hass) {
      return;
    }
    const { target } = ev;
    if (this[`_${target.configValue}`] === target.value) {
      return;
    }
    if (target.configValue) {
      if (target.value === '') {
        delete this._config[target.configValue];
      } else {
        this._config = {
          ...this._config,
          [target.configValue]:
            target.checked !== undefined ? target.checked : target.value,
        };
      }
    }
    fireEvent(this, 'config-changed', { config: this._config });
  }

  private _fillLineEntityMap() {
    if (this._config !== undefined) {
      this._entityMap.set('home_entity', this._config.home_entity);
      this._entityMap.set('grid_entity', this._config.grid_entity);
      this._entityMap.set('generation_entity', this._config.generation_entity);
      this._entityMap.set('battery_entity', this._config.battery_entity);

      this._entityMap.set(
        'grid_to_house_entity',
        this._config.grid_to_battery_entity
      );
      this._entityMap.set(
        'grid_to_battery_entity',
        this._config.grid_to_battery_entity
      );
      this._entityMap.set(
        'generation_to_grid_entity',
        this._config.grid_feed_in_entity
      );
      this._entityMap.set(
        'generation_to_house_entity',
        this._config.generation_consumption_entity
      );
      this._entityMap.set(
        'generation_to_battery_entity',
        this._config.generation_to_battery_entity
      );
      this._entityMap.set(
        'battery_to_grid_entity',
        this._config.generation_consumption_entity
      );
      this._entityMap.set(
        'battery_to_house_entity',
        this._config.generation_to_battery_entity
      );
      this._entityMap.set(
        'battery_extra_entity',
        this._config.battery_extra_entity
      );
      this._entityMap.set(
        'appliance1_consumption_entity',
        this._config.appliance1_entity
      );
      this._entityMap.set(
        'appliance1_state_entity',
        this._config.appliance1_state_entity
      );
      this._entityMap.set(
        'appliance2_consumption_entity',
        this._config.appliance2_entity
      );
      this._entityMap.set(
        'appliance2_state_entity',
        this._config.appliance2_state_entity
      );
    }
  }

  private _fillIconEntityMap() {
    if (this._config !== undefined) {
      this._entityMap.set('grid_entity', this._config.grid_entity);
      this._entityMap.set('home_entity', this._config.home_entity);
      this._entityMap.set('generation_entity', this._config.generation_entity);
      this._entityMap.set('battery_entity', this._config.battery_entity);
      this._entityMap.set('appliance1_entity', this._config.appliance1_entity);
      this._entityMap.set('appliance2_entity', this._config.appliance2_entity);
    }
  }

  static get styles(): CSSResult {
    return css`
      .option {
        padding: 4px 0px;
        cursor: pointer;
      }
      .row {
        display: flex;
        margin-bottom: -14px;
        pointer-events: none;
      }
      .title {
        padding-left: 16px;
        margin-top: -6px;
        pointer-events: none;
      }
      .secondary {
        padding-left: 40px;
        color: var(--secondary-text-color);
        pointer-events: none;
      }
      .values {
        padding-left: 16px;
        background: var(--secondary-background-color);
        display: grid;
      }
      ha-formfield {
        padding-bottom: 8px;
      }
    `;
  }
}
