import { __decorate } from "tslib";
/* eslint-disable @typescript-eslint/no-explicit-any, no-param-reassign, camelcase, lit/no-useless-template-literals, lit-a11y/click-events-have-key-events */
import { LitElement, html, customElement, property, css, internalProperty } from 'lit-element';
import '../types.js';
const options = {
    entities: {
        icon: 'tune',
        name: 'Entities',
        secondary: 'Entities for card to make sense, none are required but you should have a few.',
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
let TeslaStyleSolarPowerCardEditor = class TeslaStyleSolarPowerCardEditor extends LitElement {
    constructor() {
        super(...arguments);
        this._initialized = false;
        this._entityMap = new Map();
    }
    setConfig(config) {
        this._config = config;
        // this._fillLineEntityMap();
        this.loadCardHelpers();
    }
    shouldUpdate() {
        if (!this._initialized) {
            this._initialize();
        }
        return true;
    }
    get name() {
        var _a;
        return ((_a = this._config) === null || _a === void 0 ? void 0 : _a.name) || '';
    }
    // entities
    get home_entity() {
        var _a;
        return ((_a = this._config) === null || _a === void 0 ? void 0 : _a.home_entity) || '';
    }
    get battery_entity() {
        var _a;
        return ((_a = this._config) === null || _a === void 0 ? void 0 : _a.battery_consumption_entity) || '';
    }
    get grid_entity() {
        var _a;
        return ((_a = this._config) === null || _a === void 0 ? void 0 : _a.grid_entity) || '';
    }
    get generation_entity() {
        var _a;
        return ((_a = this._config) === null || _a === void 0 ? void 0 : _a.generation_entity) || '';
    }
    get home_extra_entity() {
        var _a;
        return ((_a = this._config) === null || _a === void 0 ? void 0 : _a.home_entity) || '';
    }
    get battery_extra_entity() {
        var _a;
        return ((_a = this._config) === null || _a === void 0 ? void 0 : _a.battery_consumption_entity) || '';
    }
    get grid_extra_entity() {
        var _a;
        return ((_a = this._config) === null || _a === void 0 ? void 0 : _a.grid_entity) || '';
    }
    get generation_extra_entity() {
        var _a;
        return ((_a = this._config) === null || _a === void 0 ? void 0 : _a.generation_entity) || '';
    }
    get grid_to_house_entity() {
        var _a;
        return ((_a = this._config) === null || _a === void 0 ? void 0 : _a.grid_to_house_entity) || '';
    }
    get grid_to_battery_entity() {
        var _a;
        return ((_a = this._config) === null || _a === void 0 ? void 0 : _a.grid_to_battery_entity) || '';
    }
    get battery_to_grid_in_entity() {
        var _a;
        return ((_a = this._config) === null || _a === void 0 ? void 0 : _a.battery_to_grid_entity) || '';
    }
    get generation_to_grid_entity() {
        var _a;
        return ((_a = this._config) === null || _a === void 0 ? void 0 : _a.grid_to_battery_entity) || '';
    }
    get generation_to_house_entity() {
        var _a;
        return ((_a = this._config) === null || _a === void 0 ? void 0 : _a.generation_entity) || '';
    }
    get generation_to_battery_entity() {
        var _a;
        return ((_a = this._config) === null || _a === void 0 ? void 0 : _a.generation_yield_entity) || '';
    }
    get appliance1_consumption_entity() {
        var _a;
        return ((_a = this._config) === null || _a === void 0 ? void 0 : _a.appliance1_consumption_entity) || '';
    }
    get appliance1_extra_entity() {
        var _a;
        return ((_a = this._config) === null || _a === void 0 ? void 0 : _a.appliance1_state_entity) || '';
    }
    get appliance2_consumption_entity() {
        var _a;
        return ((_a = this._config) === null || _a === void 0 ? void 0 : _a.appliance2_consumption_entity) || '';
    }
    get appliance2_extra_entity() {
        var _a;
        return ((_a = this._config) === null || _a === void 0 ? void 0 : _a.appliance2_state_entity) || '';
    }
    get show_w_not_kw() {
        var _a;
        return ((_a = this._config) === null || _a === void 0 ? void 0 : _a.show_w_not_kw) || false;
    }
    get show_warning() {
        var _a;
        return ((_a = this._config) === null || _a === void 0 ? void 0 : _a.show_warning) || false;
    }
    get show_error() {
        var _a;
        return ((_a = this._config) === null || _a === void 0 ? void 0 : _a.show_error) || false;
    }
    get hide_inactive_lines() {
        var _a;
        return ((_a = this._config) === null || _a === void 0 ? void 0 : _a.hide_inactive_lines) || false;
    }
    get tap_action() {
        var _a;
        return ((_a = this._config) === null || _a === void 0 ? void 0 : _a.tap_action) || { action: 'more-info' };
    }
    get hold_action() {
        var _a;
        return ((_a = this._config) === null || _a === void 0 ? void 0 : _a.hold_action) || { action: 'none' };
    }
    get double_tap_action() {
        var _a;
        return ((_a = this._config) === null || _a === void 0 ? void 0 : _a.double_tap_action) || { action: 'none' };
    }
    render() {
        if (!this.hass || !this._helpers) {
            return html ``;
        }
        // The climate more-info has ha-switch and paper-dropdown-menu elements that are lazy loaded unless explicitly done here
        this._helpers.importMoreInfoControl('climate');
        return html `
      <div class="card-config">
        <paper-input
          .label="${this.hass.localize('ui.panel.lovelace.editor.card.generic.title')} (${this.hass.localize('ui.panel.lovelace.editor.card.config.optional')})"
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
            ? html `<div class="values">
              ${Array.from(this._entityMap).map(entityArr => {
                const entityName = entityArr[0];
                const entityFunction = this[`_${entityName}`];
                return html `
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
            ? html `
              <div class="values">
                <div class="option" @click=${this._toggleAction} .option=${'tap'}>
                  <div class="row">
                    <ha-icon .icon=${`mdi:${options.actions.options.tap.icon}`}></ha-icon>
                    <div class="title">${options.actions.options.tap.name}</div>
                  </div>
                  <div class="secondary">${options.actions.options.tap.secondary}</div>
                </div>
                ${options.actions.options.tap.show
                ? html `
                      <div class="values">
                        <paper-item>Action Editors Coming Soon</paper-item>
                      </div>
                    `
                : ''}
                <div class="option" @click=${this._toggleAction} .option=${'hold'}>
                  <div class="row">
                    <ha-icon .icon=${`mdi:${options.actions.options.hold.icon}`}></ha-icon>
                    <div class="title">${options.actions.options.hold.name}</div>
                  </div>
                  <div class="secondary">${options.actions.options.hold.secondary}</div>
                </div>
                ${options.actions.options.hold.show
                ? html `
                      <div class="values">
                        <paper-item>Action Editors Coming Soon</paper-item>
                      </div>
                    `
                : ''}
                <div class="option" @click=${this._toggleAction} .option=${'double_tap'}>
                  <div class="row">
                    <ha-icon .icon=${`mdi:${options.actions.options.double_tap.icon}`}></ha-icon>
                    <div class="title">${options.actions.options.double_tap.name}</div>
                  </div>
                  <div class="secondary">${options.actions.options.double_tap.secondary}</div>
                </div>
                ${options.actions.options.double_tap.show
                ? html `
                      <div class="values">
                        <paper-item>Action Editors Coming Soon</paper-item>
                      </div>
                    `
                : ''}
              </div>
            `
            : ''}
        <div class="option" @click=${this._toggleOption} .option=${'appearance'}>
          <div class="row">
            <ha-icon .icon=${`mdi:${options.appearance.icon}`}></ha-icon>
            <div class="title">${options.appearance.name}</div>
          </div>
          <div class="secondary">${options.appearance.secondary}</div>
        </div>
        ${options.appearance.show
            ? html `
              <div class="values">
                <br />
                <ha-formfield .label=${`Toggle warning ${this.show_warning ? 'off' : 'on'}`}>
                  <ha-switch
                    .checked=${this.show_warning !== false}
                    .configValue=${'show_warning'}
                    @change=${this._valueChanged}
                  ></ha-switch>
                </ha-formfield>
                <ha-formfield .label=${`Toggle error ${this.show_error ? 'off' : 'on'}`}>
                  <ha-switch .checked=${this.show_error !== false} .configValue=${'show_error'} @change=${this._valueChanged}></ha-switch>
                </ha-formfield>
                <ha-formfield .label=${`Toggle W instead of kW ${this.show_w_not_kw ? 'off' : 'on'}`}>
                  <ha-switch
                    .checked=${this.show_w_not_kw !== false}
                    .configValue=${'show_w_not_kw'}
                    @change=${this._valueChanged}
                  ></ha-switch>
                </ha-formfield>
                <ha-formfield .label=${`Toggle hiding inactive power lines ${this.hide_inactive_lines ? 'off' : 'on'}`}>
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
    _initialize() {
        if (this.hass === undefined)
            return;
        if (this._config === undefined)
            return;
        if (this._helpers === undefined)
            return;
        this._initialized = true;
    }
    async loadCardHelpers() {
        this._helpers = await window.loadCardHelpers();
    }
    _toggleAction(ev) {
        this._toggleThing(ev, options.actions.options);
    }
    _toggleOption(ev) {
        this._toggleThing(ev, options);
    }
    _toggleThing(ev, optionList) {
        const show = !optionList[ev.target.option].show;
        for (const [key] of Object.entries(optionList)) {
            optionList[key].show = false;
        }
        optionList[ev.target.option].show = show;
        this._toggle = !this._toggle;
    }
    _valueChanged(ev) {
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
            }
            else {
                this._config = {
                    ...this._config,
                    [target.configValue]: target.checked !== undefined ? target.checked : target.value,
                };
            }
        }
        // fireEvent(this, 'config-changed', { config: this._config }); // this is breaking the card built when terser is activated
    }
    _fillLineEntityMap() {
        if (this._config !== undefined) {
            this._entityMap.set('home_entity', this._config.home_entity);
            this._entityMap.set('grid_entity', this._config.grid_entity);
            this._entityMap.set('generation_entity', this._config.generation_entity);
            this._entityMap.set('battery_entity', this._config.battery_entity);
            this._entityMap.set('grid_to_house_entity', this._config.grid_to_battery_entity);
            this._entityMap.set('grid_to_battery_entity', this._config.grid_to_battery_entity);
            this._entityMap.set('generation_to_grid_entity', this._config.grid_feed_in_entity);
            this._entityMap.set('generation_to_house_entity', this._config.generation_consumption_entity);
            this._entityMap.set('generation_to_battery_entity', this._config.generation_to_battery_entity);
            this._entityMap.set('battery_to_grid_entity', this._config.generation_consumption_entity);
            this._entityMap.set('battery_to_house_entity', this._config.generation_to_battery_entity);
            this._entityMap.set('battery_extra_entity', this._config.battery_extra_entity);
            this._entityMap.set('appliance1_consumption_entity', this._config.appliance1_entity);
            this._entityMap.set('appliance1_state_entity', this._config.appliance1_state_entity);
            this._entityMap.set('appliance2_consumption_entity', this._config.appliance2_entity);
            this._entityMap.set('appliance2_state_entity', this._config.appliance2_state_entity);
        }
    }
    _fillIconEntityMap() {
        if (this._config !== undefined) {
            this._entityMap.set('grid_entity', this._config.grid_entity);
            this._entityMap.set('home_entity', this._config.home_entity);
            this._entityMap.set('generation_entity', this._config.generation_entity);
            this._entityMap.set('battery_entity', this._config.battery_entity);
            this._entityMap.set('appliance1_entity', this._config.appliance1_entity);
            this._entityMap.set('appliance2_entity', this._config.appliance2_entity);
        }
    }
    static get styles() {
        return css `
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
};
__decorate([
    property({ attribute: false })
], TeslaStyleSolarPowerCardEditor.prototype, "hass", void 0);
__decorate([
    internalProperty()
], TeslaStyleSolarPowerCardEditor.prototype, "_config", void 0);
__decorate([
    internalProperty()
], TeslaStyleSolarPowerCardEditor.prototype, "_toggle", void 0);
__decorate([
    internalProperty()
], TeslaStyleSolarPowerCardEditor.prototype, "_helpers", void 0);
TeslaStyleSolarPowerCardEditor = __decorate([
    customElement('tesla-style-solar-power-card-editor')
], TeslaStyleSolarPowerCardEditor);
export { TeslaStyleSolarPowerCardEditor };
//# sourceMappingURL=editor.js.map