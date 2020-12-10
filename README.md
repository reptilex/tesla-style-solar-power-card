# tesla-style-solar-power-card

This is a [home-assistant](home-assistant.io) card for solar installations. It provides a tesla style graphic to see the current
solar yield, solar consumption, home consumption and grid feed in or grid consumption.
If you have a battery you can monitor the battery charge, battery state and battery consumption as well.
And if you have an electric vehicle the charge and charge status can be monitored. The car charging is part of the house consumption for now.

This card is based on the card from [bessarabov animated consumption card](https://github.com/bessarabov/animated-consumption-card), thanks again for that work.

![tesla-style-card-animated-gif](https://github.com/reptilex/tesla-style-solar-power-card/blob/master/tesla-style-card-animation.gif)

This is my first version and there might be some hidden bugs and some issues so use with care ;). If you find a bug just raise an issue I'll get at it as soon as I can. If you have any code refactoring hints also raise an issue or create a pull request. This is MY VERY FIRST CONTRIBUTION, so please have patience with me. Thanks in advance.


## Manual Installation (hacs will do all this for you)

1. Add the card js file from the repo under your home assistant config in the www folder (create one if you don't have it yet).
2. Add a resource under lovelace (you have to enable advanced Mode in your user profile to see the resource tab([see here for this card](https://github.com/reptilex/tesla-style-solar-power-card/blob/master/add-card-resource.png)).
3. restart home assistant.
4. add a manual card with the lovelace gui and configure as seen below.

## Usage
Underneath is the minimum required to make it work. Remember you can create
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
The sensor can be called whatever you want, they are powermeter sensors in Watt or Kilowatt (choose the same for all, it will create kw from it). Look to the next part to see what is expected. Beware we the sensors are expected to only be positive, so in case you have a negative value sensor you need to probably create a template sensor and divide it. 
```javascript
//general
house_consumption_entity: sensor.house_consumption
//grid
grid_consumption_entity: sensor.grid_consumption
grid_feed_in_entity: sensor.grid_feed_in
//solar
solar_consumption_entity: sensor.solar_consumption
solar_yield_entity: sensor.solar_yield
type: 'custom:tesla-style-solar-power-card'
```

Underneath follows the full feature set when you have battery and an EVs (grid_to_battery, battery, car and car2 entities are all optional) 

The battery sensors (for cars too) need to be the percentage numbers (1-100). The left part of the equation can have any name.
```javascript
//general
house_consumption_entity: sensor.house_consumption //expects (k)W for the power being consumed in the house (can be a template sensor sum (grid_consumption, solar_consumptio and battery_consumption)
//grid
grid_consumption_entity: sensor.grid_consumption //(k)W for the power being fed from the grid to the house
grid_feed_in_entity: sensor.grid_feed_in //expects (k)W for the power being fed from the panels to the grid (selling)
//solar
solar_consumption_entity: sensor.solar_consumption  //expects (k)W for the power being fed from the panels to the house
solar_yield_entity: sensor.solar_yield //expects (k)W for the power being produced currently from the panels
//battery
grid_to_battery_entity: sensor.grid_to_battery //expects (k)W for the power being fed from the grid to the battery (buying low cost grid price power)
battery_charge_entity: sensor.battery_charge //expects % of charge of battery
battery_charging_entity: sensor.battery_charging //expects (k)W for the power being fed from the solar panels to the battery
battery_consumption_entity: sensor.battery_consumption //expects (k)W for the power being consumed by the house from the battery
//car 1
car_battery_entity: sensor.marvin_battery_sensor //expects % of car1 battery charge
car_charging_entity: sensor.marvin_current_charging //expects (k)W for the power being fed into car1 
//car2
car2_battery_entity: sensor.igor_battery_sensor //expects % of battery charge
car2_charging_entity: sensor.igor_current_charging //expects (k)W for the power being fed into car2 
type: 'custom:tesla-style-solar-power-card'
```

There two extra variable now:
One to force W (Watt) instead of kW, set it to 1 to use it:
```javascript
show_w_not_kw: 1
```
One to hide the lines not active to use it:
```javascript
hide_inactive_lines: 1
```

## Releases
v0.9 Hacs version number one, with still a few vector flaws and unorganised html/css

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.


## License
[AGPL V3](https://choosealicense.com/licenses/agpl-3.0/)
