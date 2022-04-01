# tesla-style-solar-power-card

> **⚠ WARNING: BREAKING CONFIG CHANGE**

> **You have to define the FLOWS AGAIN!!**  
> Without defining each flow no line will show, read the usage part carefully (the bubbles can be clickable but this is optional)

This is a [home-assistant](home-assistant.io) card for solar installations. It provides a tesla style graphic to see the flows of energy ((k)W).

### Table of contents
* [Concept](#concept)
* [HACS-Installation](#hacs-installation)  
* [Usage](#usage)
* [Tesla Powerwall Usage](#tesla-powerwall-usage)
* [Contributing](#contributing)


![tesla-style-card-animated-gif](https://github.com/reptilex/tesla-style-solar-power-card/blob/master/tesla-style-card-animation.gif)


## Concept
I have tried to make it as generic as possible, for now there are 6 bubbles with 4 main icons and 2 extra appliances. The Four main icon values are controlled by the sum of the flows from and to them:
1. Grid
2. Generation (usually solar)
3. House 
4. Battery

The two optional appliances can be any consumer in the house, they are attached to the house. These two are controlled directly by their consumption. Meaning no flow sum is done.

* appliance1_consumption_entity (car/heater ...)
* appliance2_consumption_entity (car2/oven ...)

The bubbles/icons can be configured to have an entity when clicked, but the numbers are calculated from the flows. You can show an extra entity text/value on the top part of the bubble.

There are 7 main flows and 2 appliance flows.  The main flows are:
* generation_to_grid_entity
* generation_to_battery_entity
* generation_to_house_entity
* grid_to_battery_entity
* grid_to_house_entity
* battery_to_grid_entity
* battery_to_house_entity

You need at least one, the placement of the main bubbles is fixed for now. Some will substract the value from one bubble and will add value to another bubble. For example:

battery_to_house will substract from the battery bubble/icon and add to house bubble/icon.

## Optional clickable entities
The clickable entities can be configured through these entities but are optional:

* grid_entity
* generation_entity (solar/wind ...)
* battery_entity
* house_entity


This card started based on the card from [bessarabov animated consumption card](https://github.com/bessarabov/animated-consumption-card), thanks again for that work. Then was rewritten completely taking [boilerplate card](https://github.com/custom-cards/boilerplate-card) as a starting point but with typescript. I also borrowed a few ideas from [power-wheel-card](https://github.com/gurbyz/power-wheel-card) sadly not yet as many as I would like ;)

## Optional extra entities

On top of the flows and clickable entity every bubble can have an extra value on top. To define those you need to add a sensor to any of theses entities:

* battery_extra_entity
* house_extra_entity
* generation_extra_entity
* grid_extra_entity

I always have the battery current charge as the battery_extra_entity. In this case the battery icon will also change with the charge.

# HACS-Installation 
1. [install HACS](https://hacs.xyz/docs/installation/installation) if you don't have it yet
2. When installed go to HACS->Frontend->Explore & add repositories
3. search for "tesla style"
4. click on the tesla-style-solar-power-card
5. Install repository
6. Restart HA
### Manual Installation (hacs will do all this for you)

1. Add the card js file from the repo under your home assistant config in the www folder (create one if you don't have it yet).
2. Add a resource under lovelace (you have to enable advanced Mode in your user profile to see the resource tab([see here for this card](https://github.com/reptilex/tesla-style-solar-power-card/blob/master/add-card-resource.png)).
3. restart home assistant.
4. add a manual card with the lovelace gui and configure as seen below.

# Usage


### Just a grid a house and a line

Currently I have no minimum configuration, but some combinations might not make sense. I would advice to use the bubbles you want and the flows linked to the one's you are using. The left part of these examples is fixed, change the right part with your own sensors. There are no required entities, though your configuration can show strange results if you leave some combinations out. The sensor can be called whatever you want, they are powermeter sensors in Watt or Kilowatt (choose the same for all, it will create kw from it). __ALL SENSORS NEED TO BE POSITIVE VALUES__

A simple combination example:
```yml
type: 'custom:tesla-style-solar-power-card'
grid_consumption_entity: sensor.grid_consumption
house_consumption_entity: sensor.house_consumption
grid_to_house_entity: sensor.grid_consumption
```
This will allow you to have two bubbles that are clickable and the flow from grid to house, which will determine the values beneath the icons.

### Complete example with all details

```yml
type: 'custom:tesla-style-solar-power-card'
name: My Flows
# 7 flows between bubbles
grid_to_house_entity: sensor.grid_consumption
grid_to_battery_entity: sensor.grid_battery_charge
generation_to_grid_entity: sensor.grid_feed_in
generation_to_battery_entity: sensor.battery_charging
generation_to_house_entity: sensor.solar_consumption
battery_to_house_entity: sensor.battery_consumption
battery_to_grid_entity: sensor.battery_to_grid
# extra values to show as text above icons
battery_extra_entity: sensor.battery_charge
house_extra_entity: sensor.current_temperature
generation_extra_entity: sensor.percent_cloud_coverage
grid_extra_entity: sensor.monthly_feed_in
# optional appliances with consumption and extra values
appliance1_consumption_entity: sensor.car_consumption
appliance1_extra_entity: sensor.car_battery_state_of_charge 
appliance2_consumption_entity: sensor.heating_consumption
appliance2_extra_entity: sensor.heating_operation
# optional 4 main bubble icons for clickable entities
grid_entity: sensor.grid_consumption
house_entity: sensor.house_consumption
generation_entity: sensor.solar_yield
battery_entity: sensor.battery_consumption
```
If you define an extra entity for the battery bubble with the state of charge then the icon will be dynamically replaced with the value of that entity and will override the icon definition above.


There a few configuration variables that change the behaviour:
Heading:
```yml
name: 'My Tesla Power Card!'
```

One to force W (Watt) instead of kW, set it to 1 to use it:
```yml
show_w_not_kw: 1
```

One to set a different speed for the moving dots, normal speed factor is 0.04 so stay near that number at first, 0.2 is really fast:
```yml
speed_factor: 0.03
```

One for the threshold from which W is converted to kW (the example below will change W into kilowatt from 5000 W onwards):
```yml
threshold_in_k: 5
```
threshold_in_k is not compatible with show_w_not_kw, the latter will overrule the threshold_in_k

One to hide the lines not active to use it, please make sure everything is working before you hide the lines:
```yml
hide_inactive_lines: 1
```

One to add gaps for the power lines the way the energy panel from ha does it:
```yml
show_gap: true
```

One to colour the house bubble depending on the highest flow:
```yml
change_house_bubble_color_with_flow: 1
```

One to not show moving circles but an energy flow diagramm (thicker lines when flow is higher):
```yml
energy_flow_diagramm: 1
```
There is a factor to make the lines thicker depending on your flow normaly it's 2:
```yml
energy_flow_diagramm_line_factor: 2
```

Then there are 6 icon configuration variables:
```yml
grid_icon: 'mdi:transmission-tower'
generation_icon: 'mdi:solar-panel-large'
house_icon: 'mdi:home'
battery_icon: 'mdi:battery'
appliance1_icon: 'mdi:car-sports'
appliance2_icon: 'mdi:car-sports'
```

### templates for missing sensors or for negative sensors

Remember you can create
template sensors if you are missing one like solar yield out of solar_consumption and grid_feed_in or if you are missing another one like home_consumption. Some inverters have positive and negative values, here all sensors need to be positive values, so create template sensors like:
```yml
    battery_consumption:
        value_template: '{% set batter_cons = sensor.powerwall_battery_now | int %}
                        {% if batter_cons > 0 %}
                            {{ batter_cons | int }}
                        {% else %}
                            0
                        {% endif %}'
        device_class: power
        unit_of_measurement: W
``` 

# Tesla-Powerwall-Usage 
In order to use this card with the [Tesla Powerwall integration](https://www.home-assistant.io/integrations/powerwall/) you will need to create some additional sensors first. This card expects an entity with a positive numeric value per line shown on the screen. However the Tesla Powerwall integration creates sensors which go negative or positive depending on whether energy is being consumed from or feed into that particular meter. 

Fortunately this can be easily fixed with the addition of a few template sensors, the ones you would need to add are shown below. Note that these sensors assume the default names for each entity created by the Tesla Powerwall integration, if you've changed the names of your entities then you'll need to adjust the config accordingly:
```yaml
template:
  - sensor:
    - name: "Tesla Card Grid Consumption"
      unique_id: 'tesla_card_grid_consumption'
      state: "{{ states('sensor.powerwall_site_now') | float | max(0) | round(1) }}"
      device_class: power
      unit_of_measurement: kW

    - name: "Tesla Card Grid Feed In"
      unique_id: 'tesla_card_grid_feed_in'
      state: "{{ states('sensor.powerwall_site_now') | float | min(0) | abs | round(1) }}"
      device_class: power
      unit_of_measurement: kW

    - name: "Tesla Card Solar Consumption"
      unique_id: 'tesla_card_solar_consumption'
      state: "{{ ((states('sensor.powerwall_solar_now') | float) - (states('sensor.tesla_card_grid_feed_in') | float ) - (states('sensor.tesla_card_battery_charging_inside') | float) ) | round(1) }}"
      device_class: power
      unit_of_measurement: kW

    - name: "Tesla Card Battery Consumption"
      unique_id: 'tesla_card_battery_consumption'
      state: "{{ states('sensor.powerwall_battery_now') | float | max(0) | round(1) }}"
      device_class: power
      unit_of_measurement: kW

    - name: "Tesla Card Battery Charging Inside"
      unique_id: 'tesla_card_battery_charging_inside'
      state: "{{ states('sensor.powerwall_battery_now') | float | min(0) | abs | round(1) }}"
      device_class: power
      unit_of_measurement: kW
    
```
After you've included these sensors then you can configure the card like this:
```yaml
type: 'custom:tesla-style-solar-power-card'
house_entity: sensor.powerwall_load_now
grid_entity: sensor.tesla_card_grid_consumption
battery_entity: sensor.tesla_card_battery_consumption
generation_entity: sensor.powerwall_solar_now

generation_to_grid_entity: sensor.tesla_card_grid_feed_in
generation_to_house_entity: sensor.tesla_card_solar_consumption
generation_to_battery_entity: sensor.tesla_card_battery_charging
battery_to_house_entity: sensor.tesla_card_battery_consumption
grid_to_house_entity: sensor.tesla_card_grid_consumption

battery_extra_entity: sensor.powerwall_charge
```

## Releases
v0.9
v0.92
vbeta1.1.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
Apache License V 2.0
