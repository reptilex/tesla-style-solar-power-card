# tesla-style-solar-power-card
This is a [home-assistant](home-assistant.io) card for solar installations. It provides a tesla style graphic to see the current
solar yield, solar consumption, home consumption and grid feed in or grid consumption.
If you have a battery you can monitor the battery charge, battery state and battery consumption as well.
And if you have an electric vehicle the charge and charge status can be monitored. The car charging is part of the house consumption for now.

This card is based on the card from [bessarabov animated consumption card](https://github.com/bessarabov/animated-consumption-card), thanks again for that work.

![tesla-style-card-animated-gif]https://github.com/reptilex/tesla-style-solar-power-card/blob/master/tesla-style-card-animation.gif

This is my first version and there might be some hidden bugs and some issues so use with care ;). If you find a bug just raise an issue I'll get at it as soon as I can. If you have any code refactoring hints also raise an issue or create a pull request. Thanks in advance.


## Installation

1) Add the card js file from the repo under your home assistant config in the www folder (create one if you don't have it yet).
2) Add a resource under lovelace (you have to enable advanced M.ode in your user profile to see the resource tab)
![add_resource_in_home_assistant]https://github.com/reptilex/tesla-style-solar-power-card/blob/master/add-card-resource.png

## Usage
This is the minimum required to make it work. Remember you can create
template sensors if you are missing one like solar yield out of solar_consumption and grid_feed_in or if you are missing another one like home_consumption. 

```javascript
grid_consumption_entity: sensor.grid_consumption
grid_feed_in_entity: sensor.grid_feed_in
house_consumption_entity: sensor.house_consumption
solar_consumption_entity: sensor.solar_consumption
solar_yield_entity: sensor.solar_yield
type: 'custom:tesla-style-solar-power-card'
```

This is the full feature set when you have battery and an EV
```javascript
car_charging_entity: sensor.marvin_current_charging
battery_charge_entity: sensor.battery_charge
battery_charging_entity: sensor.battery_charging
battery_consumption_entity: sensor.battery_consumption
car_battery_entity: sensor.marvin_battery_sensor
grid_consumption_entity: sensor.grid_consumption
grid_feed_in_entity: sensor.grid_feed_in
house_consumption_entity: sensor.house_consumption
solar_consumption_entity: sensor.solar_consumption
solar_yield_entity: sensor.solar_yield
type: 'custom:tesla-style-solar-power-card'
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.


## License
[AGPL V3](https://choosealicense.com/licenses/agpl-3.0/)