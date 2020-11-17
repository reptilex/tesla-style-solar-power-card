# tesla-style-solar-power-card
| :warning: **The newest version only works with the newest version (>0.116.4) of home assistant!!** |
| --- |

This is a [home-assistant](home-assistant.io) card for solar installations. It provides a tesla style graphic to see the current
solar yield, solar consumption, home consumption and grid feed in or grid consumption.
If you have a battery you can monitor the battery charge, battery state and battery consumption as well.
And if you have an electric vehicle the charge and charge status can be monitored. The car charging is part of the house consumption for now.

This card is based on the card from [bessarabov animated consumption card](https://github.com/bessarabov/animated-consumption-card), thanks again for that work.

![tesla-style-card-animated-gif](https://github.com/reptilex/tesla-style-solar-power-card/blob/master/tesla-style-card-animation.gif)

This is my first version and there might be some hidden bugs and some issues so use with care ;). If you find a bug just raise an issue I'll get at it as soon as I can. If you have any code refactoring hints also raise an issue or create a pull request. This is MY VERY FIRST CONTRIBUTION, so please have patience with me. Thanks in advance.


## Installation
!The newest version only works with the newest version of home assistant!!

1. Add the card js file from the repo under your home assistant config in the www folder (create one if you don't have it yet).
2. Add a resource under lovelace (you have to enable advanced Mode in your user profile to see the resource tab([see here for this card](https://github.com/reptilex/tesla-style-solar-power-card/blob/master/add-card-resource.png)).
3. restart home assistant.
4. add a manual card with the lovelace gui and configure as seen below.

## Usage
This is the minimum required to make it work. Remember you can create
template sensors if you are missing one like solar yield out of solar_consumption and grid_feed_in or if you are missing another one like home_consumption. 
The sensor can be called whatever you want, they are powermeter sensors in Watt or Kilowatt (choose the same for all, it will create kw from it). 
```javascript
grid_consumption_entity: sensor.grid_consumption
grid_feed_in_entity: sensor.grid_feed_in
house_consumption_entity: sensor.house_consumption
solar_consumption_entity: sensor.solar_consumption
solar_yield_entity: sensor.solar_yield
type: 'custom:tesla-style-solar-power-card'
```

This is the full feature set when you have battery and an EVs (grid_to_battery, battery, car and car2 entities are all optional) 

The battery sensors (for cars too) need to be the percentage numbers (1-100). The left part of the equation can have any name.
```javascript
grid_consumption_entity: sensor.grid_consumption //(k)W for the power being fed from the grid to the house
grid_feed_in_entity: sensor.grid_feed_in
grid_to_battery_entity: sensor.grid_to_battery
house_consumption_entity: sensor.house_consumption
solar_consumption_entity: sensor.solar_consumption
solar_yield_entity: sensor.solar_yield
battery_charge_entity: sensor.battery_charge
battery_charging_entity: sensor.battery_charging
battery_consumption_entity: sensor.battery_consumption
car_battery_entity: sensor.marvin_battery_sensor
car_charging_entity: sensor.marvin_current_charging
car2_battery_entity: sensor.igor_battery_sensor
car2_charging_entity: sensor.igor_current_charging
type: 'custom:tesla-style-solar-power-card'
```
So what are the sensors expected current values.
grid_consumption_entity: (k)W for the power being fed from the grid to the house
grid_feed_in_entity: expects (k)W for the power being fed from the panels to the grid (selling)
grid_to_battery_entity: expects (k)W for the power being fed from the grid to the battery (low cost grid prices)
house_consumption_entity: expects (k)W for the power being consumed in the house (can be a template sensor summing up (grid_consumption, solar_consumptio and battery_consumption)
solar_consumption_entity: expects (k)W for the power being fed from the panels to the house
solar_yield_entity: expects (k)W for the power being produced currently from the panels
battery_charge_entity: expects % of charge of battery
battery_charging_entity: expects (k)W for the power being fed from the solar panels to the battery
battery_consumption_entity: expects (k)W for the power being consumed by the house from the battery
car_battery_entity: expects % of battery charge
car_charging_entity: expects (k)W for the power being fed into the car 
car2_battery_entity: expects % of battery charge
car2_charging_entity: expects (k)W for the power being fed into the car 

## Releases
v0.9 Hacs version number one, with still a few vector flaws and unorganised html/css

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.


## License
[AGPL V3](https://choosealicense.com/licenses/agpl-3.0/)
