class TeslaStyleSolarPowerCard extends HTMLElement {
  set hass(hass) {
    if (!this.contentIsCreated) {

      this.createContent();

      var obj = this;

      requestAnimationFrame(function(timestamp){
        obj.updateAllCircles(timestamp);
      });
    }

    try {
      this.updateProperties(hass);
    } catch (err) {
      this.innerHTML = `
      <div class="acc_error">
        <b>${err}</b>
        <br><br>
        type: 'custom:tesla-style-solar-power-card'
      </div>`;
      this.style.padding = '8px';
      this.style.backgroundColor = '#ff353d';
      this.style.color = 'white';
    }
  }

  setConfig(config) {
    this.config = config;
    this.pxRate = 3;
    var pxRate = this.pxRate;
    this.oldWidth = 0;
    this.w_or_kw = 'kW';

    if(config.show_w_not_kw != undefined){
      this.w_or_kw = 'W';
    }

    class sensorCardData {
      constructor(){
        this.speed = 0;
        this.startPosition= 0;
        this.currentPosition = 0;
        this.currentDelta = 0;
        this.maxPosition = pxRate * 10;
        this.value = 0;
        this.unit_of_measurement = '';
        this.accText = document.createElement('div');
        this.accText.className = 'accText';
        this.entity = null;
        this.circle = null;
        this.circleColor = "var(--primary-color)";
        this.prevTimestamp = undefined;
        this.backwardsMovement = false;
        this.line = null;
        this.accTextElement = null;
      }
    }

    this.solarCardElements = {
      houseConsumption: new sensorCardData(),
      solarConsumption: new sensorCardData(),
      gridConsumption: new sensorCardData(),
      solarYield: new sensorCardData(),
      gridFeedIn: new sensorCardData(),
    }

    class iconElement {
      constructor(){
        this.accTextElement = null;
        this.iconClass = '';
        this.value = 0;
        this.color = "var(--primary-color)";
        this.cardElements = [];
      }
      setValue(){
        this.value = 0;
        for (var element in this.cardElements) {
          if (Object.prototype.hasOwnProperty.call(this.cardElements, element)) {
            this.value += this.cardElements[element].value; 
          }
        }
      }
    }

    this.solarCardIcons = {
      grid: new iconElement(),
      panel: new iconElement(),
      house: new iconElement(),
    }

    this.solarCardIcons.grid.icon = 'mdi:transmission-tower';
    this.solarCardIcons.grid.className = 'grid_text';
    this.solarCardElements.gridConsumption.entity = config.grid_consumption_entity;
    this.solarCardElements.gridConsumption.circleColor = "var(--info-color)";
    this.solarCardElements.gridFeedIn.entity = config.grid_feed_in_entity;
    this.solarCardElements.gridFeedIn.circleColor = "var(--warning-color)";
    
    this.solarCardIcons.panel.icon = 'mdi:solar-panel-large';
    this.solarCardIcons.panel.className = 'panel_text';
    this.solarCardIcons.panel.color = 'var(--warning-color)';
    this.solarCardElements.solarConsumption.entity = config.solar_consumption_entity;
    this.solarCardElements.solarConsumption.circleColor = "var(--warning-color)";
    this.solarCardElements.solarYield.entity = config.solar_yield_entity;

    this.solarCardIcons.house.icon = 'mdi:home';
    this.solarCardIcons.house.className = 'house_text';
    this.solarCardIcons.house.color = 'var(--warning-color)';
    this.solarCardElements.houseConsumption.entity = config.house_consumption_entity;

    if(config.battery_charging_entity != undefined){
      this.solarCardElements['batteryCharge'] = new sensorCardData(),
      this.solarCardElements['batteryCharging'] = new sensorCardData(),
      this.solarCardElements['batteryConsumption'] = new sensorCardData(),
      this.solarCardElements.batteryConsumption.entity = config.battery_consumption_entity;
      this.solarCardElements.batteryConsumption.circleColor = "var(--success-color)";
      this.solarCardElements.batteryCharging.entity = config.battery_charging_entity;
      this.solarCardElements.batteryCharging.circleColor = "var(--warning-color)";
      this.solarCardIcons['battery'] = new iconElement(),
      this.solarCardIcons.battery.icon = 'mdi:battery-charging-50';
      this.solarCardIcons.battery.className = 'battery_text';
      this.solarCardIcons.battery.color = 'var(--success-color)';
      this.houseBatteryState = new sensorCardData();
      this.houseBatteryState.entity = config.battery_charge_entity;
    }

  
    if(config.grid_to_battery_entity != undefined){
      this.solarCardElements['gridToBattery'] = new sensorCardData();
      this.solarCardElements.gridToBattery.entity = config.grid_to_battery_entity;
      this.solarCardElements.gridToBattery.circleColor = "var(--info-color)";
    }

    if(config.car_charging_entity != undefined){
      this.carCharge = new sensorCardData();
      this.carCharge.entity = config.car_charging_entity;
      this.carBatteryState = new sensorCardData();
      this.carBatteryState.entity = config.car_battery_entity;
      this.carIcon = 'mdi:car-sports';
    }

    if(config.car2_charging_entity != undefined){
      this.car2Charge = new sensorCardData();
      this.car2Charge.entity = config.car2_charging_entity;
      this.car2BatteryState = new sensorCardData();
      this.car2BatteryState.entity = config.car2_battery_entity;
      this.car2Icon = 'mdi:car-sports';
    }

    this.contentIsCreated = false
  }

  createContent(hass) {
    const card = document.createElement('ha-card');
    var content = document.createElement('div');
    content.style.padding = '16px';
    card.appendChild(content);
    this.appendChild(card);
    var carHtml = '';
    var car2Html = '';
    var batteryHtml = '';

    if(this.carCharge != undefined){
      carHtml = `<div class="acc_line car_consumption">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20px"
                        height="50%"
                        viewBox="0 0 40 `+ this.pxRate * 10 + `"
                        preserveAspectRatio="xMinYMax slice"
                      >
                      </svg>
                    </div>
                    <div class="acc_container car_icon_container">
                          <div class="car_battery_state_text acc_text">.</div>
                          <ha-icon class="acc_icon" icon="${ this.carIcon }"></ha-icon>
                          <div class="car_charging_text acc_text">.</div>
                    </div>`;
    }


    if(this.car2Charge != undefined){
      car2Html = `<div class="acc_line car2_consumption">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20px"
                        height="50%"
                        viewBox="0 0 40 `+ this.pxRate * 10 + `"
                        preserveAspectRatio="xMinYMax slice"
                      >
                      </svg>
                    </div>
                    <div class="acc_container car2_icon_container">
                          <div class="car2_battery_state_text acc_text">.</div>
                          <ha-icon class="acc_icon" icon="${ this.carIcon }"></ha-icon>
                          <div class="car2_charging_text acc_text">.</div>
                    </div>`;
    }

    if(this.solarCardElements.batteryCharging != undefined){
      var batteryHtml = `
        <div class="acc_container battery_icon_container">
          <div class="battery_charge_state_text acc_text">asdfas</div>
          <ha-icon class="acc_icon" icon="${ this.solarCardIcons.battery.icon }"></ha-icon>
        </div>`;
    }

    content.innerHTML = `
<style>
  .tesla-style-solar-power-card{
    margin:auto;
    display:table;
  }
  .acc_container {
      height: 40px;
      width: 40px;
      border: 1px solid black;
      border-radius: 100px;
      padding: 22px;
      color: var(--primary-text-color);
      border-color: var(--primary-text-color);
  }
  .acc_icon {
      --mdc-icon-size: 40px;
  }
  .panel_icon_container {
    border: 1px solid var(--warning-color);
  }
  .panel_icon_container .acc_icon{
    color: var(--warning-color);
  }
  .battery_icon_container{
    border: 1px solid var(--success-color);
    position:relative;
  }
  .battery_icon_container .acc_icon{
    color: var(--success-color);
  }
  .car_battery_state_text, .battery_charge_state_text,
  .car2_battery_state_text{
    position:absolute;
    top:8px;
  }
  .house_icon_container,  .car_icon_container, .car2_icon_container {
    border: 1px solid var(--info-color);
  }
  .house_icon_container .acc_icon, .car_icon_container, .car2_icon_container{
    color: var(--info-color);
  }
  .car_icon_container, .car2_icon_container{
    position: absolute;
    bottom: 20px;
    right: 20px;
  }
  .acc_text {
      text-align: center;
      white-space: nowrap;
  }
  .acc_td {
      vertical-align: top;
  }
  .acc_center .acc_td{
    width:auto;
    position:relative;
  }
  .acc_left {
    vertical-align: top;
    float:left;
    z-index:5;
  }
  .acc_right {
    float:right;
    z-index:5;
  }
  .acc_top .acc_container, .acc_bottom .acc_container{
      margin:auto;
  }
  .acc_line{
    position:absolute;
  }
  #battery_consumption_line, 
  #solar_consumption_line, 
  #grid_consumption_line, 
  #battery_charging_line, 
  #grid_feed_in_line, 
  #grid_to_battery_line, 
  #car_consumption_line{
    stroke:var(--info-color);
    fill:none;
    stroke-width:1;
  }
  #car2_consumption_line{
    stroke:var(--info-color);
    fill:none;
    stroke-width:1;
  }
  #grid_consumption_line{
    stroke-width:1;
  }
  #solar_consumption_line, #grid_feed_in_line, #battery_charging_line{
    stroke:var(--warning-color);
  }
  #battery_consumption_line{
    stroke:var(--success-color);
  }
  br.clear {
    clear:both;
  }
</style>
<div class="tesla-style-solar-power-card">
  <div class="acc_top">
      <div class="acc_container panel_icon_container">
            <ha-icon class="acc_icon" icon="${ this.solarCardIcons.panel.icon }"></ha-icon>
      </div>
  </div>    
<div class="acc_center">
    <div class="acc_td acc_left">
        <div class="acc_container grid_icon_container">
              <ha-icon class="acc_icon" icon="${ this.solarCardIcons.grid.icon }"></ha-icon>
        </div>
    </div>
    <div class="acc_line power_lines">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20px"
        height="50%"
        viewBox="0 0 40 `+ this.pxRate * 10 + `"
        preserveAspectRatio="xMinYMax slice"
      >
      </svg>
    </div>
    <div class="acc_td acc_right">
        <div class="acc_icon_with_text">
            <div class="acc_container house_icon_container">
                <ha-icon class="acc_icon" icon="${ this.solarCardIcons.house.icon }"></ha-icon>
            </div>
        </div>
    </div>
</div>
<br class="clear">
  <div class="acc_bottom">
    ${ batteryHtml }
    ${ carHtml }
    ${ car2Html }
  </div>
</div>
    `;

    this.createIconTextElement(['houseConsumption'], 'house');
    this.createIconTextElement(['solarYield'], 'panel');
    this.createIconTextElement(['gridFeedIn','gridConsumption'],'grid');

    this.createCircleAndLine(this.solarCardElements.solarConsumption, "solar_consumption", "M5,5 C5,109 5,105 105,105");
    this.createCircleAndLine(this.solarCardElements.gridConsumption, "grid_consumption", "M100,10 C10,109 10,105 105,105");
    this.createCircleAndLine(this.solarCardElements.gridFeedIn, "grid_feed_in", "M101,9 C100,101 99,106 10,102");

    if(this.solarCardElements.gridToBattery != undefined){
      this.createCircleAndLine(this.solarCardElements.gridToBattery, "grid_to_battery", "M10,100 C100,100 100,100 100,200");
    }

    if(this.solarCardElements.batteryCharge != undefined){
      this.createIconTextElement(['batteryCharging','batteryConsumption'], 'battery');
      this.createCircleAndLine(this.solarCardElements.batteryCharging, "battery_charging", "M10,10 C10,10 105,10 105,10");
      this.createCircleAndLine(this.solarCardElements.batteryConsumption, "battery_consumption", "M100,10 C10,109 10,105 105,105");
    }

    if(this.carCharge != undefined){
      this.createCircleAndLine(this.carCharge, "car_consumption", "M10,105 C10,105 10,10 10,10", "car_consumption");
    }
    
    if(this.car2Charge != undefined){
      this.createCircleAndLine(this.car2Charge, "car2_consumption", "M10,10 C10,10 105,10 105,10", "car2_consumption");
    }
    
    this.contentIsCreated = true;
  }

  updateProperties(hass) { 
    //console.log('updating properties');   
    for (var element in this.solarCardElements) {
      if (Object.prototype.hasOwnProperty.call(this.solarCardElements, element)) {
        if(this.solarCardElements[element].entity == undefined) continue;

        this.solarCardElements[element].value = this.getStateValue(hass, this.solarCardElements[element].entity);
        this.solarCardElements[element].speed = this.getSpeed(this.solarCardElements[element].value);
        if (this.solarCardElements[element].speed === 0) {
          this.solarCardElements[element].currentPosition = this.solarCardElements[element].startPosition;
        }
      }
    }

    for (var icon in this.solarCardIcons){
      if (Object.prototype.hasOwnProperty.call(this.solarCardIcons, icon)) {
        if(this.solarCardIcons[icon].accTextElement == null) continue;

        this.solarCardIcons[icon].setValue();
        this.solarCardIcons[icon].accTextElement.textContent = this.solarCardIcons[icon].value + ' ' + this.w_or_kw;
      }
    }

    if(this.carCharge != undefined){
      this.carCharge.value = this.getStateValue(hass, this.carCharge.entity);
      this.carCharge.speed = this.getSpeed(this.carCharge.value)/4;
      this.querySelector(".car_charging_text").textContent = this.carCharge.value + " " + this.w_or_kw;
      if(this.carBatteryState.entity != undefined){
        this.querySelector(".car_battery_state_text").textContent = this.getStateValue(hass, this.carBatteryState.entity)+ " %";
      }
    }    
    if(this.car2Charge != undefined){
      this.car2Charge.value = this.getStateValue(hass, this.car2Charge.entity);
      this.car2Charge.speed = this.getSpeed(this.car2Charge.value)/4;
      this.querySelector(".car2_charging_text").textContent = this.car2Charge.value + " " + this.w_or_kw;
      if(this.car2BatteryState.entity != undefined){
        this.querySelector(".car2_battery_state_text").textContent = this.getStateValue(hass, this.car2BatteryState.entity)+ " %";
      }
    }  

    if(this.houseBatteryState != undefined){
      let batteryChargeValue = this.getStateValue(hass, this.houseBatteryState.entity);
      let batteryChargingValue = this.getStateValue(hass, this.solarCardElements.batteryCharging.entity);
      this.querySelector(".battery_charge_state_text").textContent = batteryChargeValue+" %";
      this.updateBatteryIcon(batteryChargeValue, batteryChargingValue);
    }
  }

  createIconTextElement(cardElements, cardIconName){
    var newTextElement = document.createElement('div');
    newTextElement.className = cardIconName + '_text acc_text';
    newTextElement.value = 0;
    this.querySelector("." + cardIconName +"_icon_container").appendChild(newTextElement);
    this.solarCardIcons[cardIconName].accTextElement = newTextElement;
    cardElements.forEach(element => {
      this.solarCardIcons[cardIconName].cardElements[element] = this.solarCardElements[element];
    });
  }

  createCircleAndLine(entity, cssSelector, pathDAttribute, svgSelector = "power_lines"){
    //console.log("selector:"+cssSelector)
    entity.circle = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
    var circle = entity.circle;
    circle.setAttributeNS(null, "r", "4");
    circle.setAttributeNS(null, "cx", entity.startPosition);
    circle.setAttributeNS(null, "cy", "4");
    circle.setAttributeNS(null, "fill", entity.circleColor);
    circle.setAttributeNS(null, "id", cssSelector+"_circle");
    this.querySelector("."+svgSelector+" svg").appendChild(circle);
    entity.line = document.createElementNS("http://www.w3.org/2000/svg", 'path');
    entity.line.setAttributeNS(null, "d", pathDAttribute);
    entity.line.setAttributeNS(null, 'id', cssSelector+"_line");
    this.querySelector("."+svgSelector+" svg").appendChild(entity.line);
  }

  changeStylesDependingOnWidth(newWidth){
    this.oldWidth = newWidth;
    this.pxRate = newWidth / 100;
    var pxRate = this.pxRate;
    //console.log('pxrate:'+ this.pxRate)


    
    this;
    
    
    this.querySelector('.tesla-style-solar-power-card').style['width'] = 90 * pxRate + 'px';
    if(this.solarCardElements.batteryCharging != undefined){
      this.querySelector('.tesla-style-solar-power-card').style['height'] = 90 * pxRate + 'px';
    }else{
      this.querySelector('.tesla-style-solar-power-card').style['height'] = 60 * pxRate + 'px';
    }

    //icons
    var iconContainer = this.querySelectorAll('.acc_container');
    iconContainer.forEach(
      function(currentValue, currentIndex, iconContainerItem){
        iconContainerItem[currentIndex].style["height"] = 10 * pxRate + 'px';
        iconContainerItem[currentIndex].style["width"] = 10 * pxRate + 'px';
        iconContainerItem[currentIndex].style["padding"] = 7 * pxRate + 'px';        
      }
    );
    var icons = this.querySelectorAll('ha-icon');
    icons.forEach(
      function(currentValue, currentIndex, iconItem){
        const iconElement = iconItem[currentIndex].shadowRoot.querySelector('ha-svg-icon');
        if(iconElement != null){
          iconElement.style["height"] = 10 * pxRate + 'px';       
          iconElement.style["width"] = 10 * pxRate + 'px';        
        }
      }
    );
    this.querySelector('.acc_top').style['padding-bottom'] = 9 * pxRate + 'px';
    this.querySelector('.acc_bottom').style['padding-top'] = 9 * pxRate + 'px';

    //icon texts
    this.querySelectorAll('.acc_text').forEach((el) => {
      el.style['font-size'] = 3 * pxRate + 'px';
    });

    //power lines
    this.querySelector('.power_lines').style['height'] = 42 * pxRate + 'px';
    this.querySelector('.power_lines').style['width'] = 42 * pxRate + 'px';
    this.querySelector('.power_lines').style['top'] = 29 * pxRate + 'px';
    this.querySelector('.power_lines').style['left'] = 29 * pxRate + 'px';
    this.querySelector('.power_lines svg').style['height'] = 42 * pxRate + 'px';
    this.querySelector('.power_lines svg').style['width'] = 42 * pxRate + 'px';
    this.querySelector(".power_lines svg").setAttribute("viewBox", "0 0 "+ 42 * pxRate + " " + 42 * pxRate); 
    let half = 22 * pxRate;

    this.correctDimensionsOfCircleLineAndContainer('solar_consumption', 'M'+ half +',0 C'+ half +','+ half +' '+ half +','+ half +' '+half*2+','+half);
    this.correctDimensionsOfCircleLineAndContainer('grid_feed_in', 'M'+ half +',0 C'+ half +','+ half +' '+ half +','+ half +' 0,'+ half);
    this.correctDimensionsOfCircleLineAndContainer('grid_consumption',  'M0,'+half+' C'+half+','+ half + ' '+half +','+half+' '+half * 2+','+half);
    
    if(this.solarCardElements.gridToBattery != undefined){
      this.correctDimensionsOfCircleLineAndContainer("grid_to_battery", 'M0,'+half+' C'+half+','+ half + ' '+half +','+half+' '+half+','+half * 2);
    }
    //battery
    if(this.solarCardElements.batteryCharge != undefined){
      this.correctDimensionsOfCircleLineAndContainer('battery_consumption', 'M'+ half +','+ half * 2 +' C'+ half +','+ half +' '+ half +','+ half +' '+ half * 2 +','+ half);
      this.correctDimensionsOfCircleLineAndContainer('battery_charging',   'M'+half+',0 C'+half+',0 '+half+','+ half * 2 +' '+half+','+ half*2);
      this.querySelector(".battery_charge_state_text").style['padding-left'] = 2 * pxRate + 'px';
    }

    //car charge
    if(this.carCharge != undefined){
      if(this.solarCardElements.batteryCharge != undefined){
        this.querySelector('.car_icon_container').style['top'] = -62 * pxRate + 'px';
      }else{
        this.querySelector('.car_icon_container').style['top'] = -39 * pxRate + 'px';
      }
      this.querySelector('.car_icon_container').style['right'] = 5 * pxRate + 'px';
      this.querySelector('.car_consumption').style['height'] = 10 * pxRate + 'px';
      this.querySelector('.car_consumption').style['width'] = 3 * pxRate + 'px';
      this.querySelector('.car_consumption').style['top'] = 29 * pxRate + 'px';
      this.querySelector('.car_consumption').style['right'] = 16 * pxRate + 'px';
      this.querySelector('.car_consumption svg').setAttribute('height', 10 * pxRate + 'px');
      this.querySelector('.car_consumption svg').setAttribute('width', 3 * pxRate + 'px');
      this.querySelector(".car_consumption svg").setAttribute("viewBox", "0 0 "+ 3 * pxRate + " " + 10 * pxRate); 
      this.correctDimensionsOfCircleLineAndContainer('car_consumption', 'M4,'+10*pxRate+' C4,'+10*pxRate+' 4,0 4,0');
      this.querySelector(".car_battery_state_text").style['padding-left'] = 2 * pxRate + 'px'; 
    }

    //2nd charge
    if(this.car2Charge != undefined){
      this.querySelector('.car2_icon_container').style['bottom'] = 4 * pxRate + 'px';
      this.querySelector('.car2_icon_container').style['right'] = 5 * pxRate + 'px';
      this.querySelector('.car2_consumption').style['height'] = 10 * pxRate + 'px';
      this.querySelector('.car2_consumption').style['width'] = 3 * pxRate + 'px';
      this.querySelector('.car2_consumption').style['bottom'] = 29 * pxRate + 'px';
      this.querySelector('.car2_consumption').style['right'] = 16 * pxRate + 'px';
      this.querySelector('.car2_consumption svg').setAttribute('height', 10 * pxRate + 'px');
      this.querySelector('.car2_consumption svg').setAttribute('width', 3 * pxRate + 'px');
      this.querySelector(".car2_consumption svg").setAttribute("viewBox", "0 0 "+ 3 * pxRate + " " + 10 * pxRate); 
      this.correctDimensionsOfCircleLineAndContainer('car2_consumption', 'M4,0 C4,0 4,'+10*pxRate+' 4,'+10*pxRate);
      this.querySelector(".car2_battery_state_text").style['padding-left'] = 2 * pxRate + 'px'; 
    }
  }

  correctDimensionsOfCircleLineAndContainer(cssClass, pathDAttribute){
    this.querySelector("#" + cssClass +'_line').setAttribute('d',pathDAttribute);
  }

  updateAllCircles(timestamp){
    for (var prop in this.solarCardElements) {
      if (Object.prototype.hasOwnProperty.call(this.solarCardElements, prop)) {
        this.updateOneCircle(timestamp, this.solarCardElements[prop])
      }
    }

    if(this.gridToBattery != undefined) this.updateOneCircle(timestamp, this.gridToBattery);

    if(this.carCharge != undefined) this.updateOneCircle(timestamp, this.carCharge);
    if(this.car2Charge != undefined) this.updateOneCircle(timestamp, this.car2Charge);

    if(this.batteryCharge != undefined) this.updateBatteryIcon(this.batteryCharge);

    if(this.oldWidth != this.clientWidth && document.readyState === "complete") {
      //console.log('changing style');
      this.changeStylesDependingOnWidth(this.clientWidth);
    }

    var obj = this;
    requestAnimationFrame(function(timestamp){
      obj.updateAllCircles(timestamp);
    });
  }

  updateOneCircle(timestamp, entity) {
    if(entity.line == undefined) return;

    let lineLength = entity.line.getTotalLength();
    if(isNaN(lineLength)) return;

    if(entity.speed == 0){
      entity.circle.setAttribute('visibility', 'hidden');
      return;
    } else{
      entity.circle.setAttribute('visibility', 'visible');
    }

    if (entity.prevTimestamp === undefined) {
      entity.prevTimestamp = timestamp;
      entity.currentDelta = 0;
    }
    var timePassed = timestamp - entity.prevTimestamp;
    var delta = entity.speed * timePassed;
    entity.currentDelta += delta;
    let percentageDelta = entity.currentDelta / lineLength;
    if (percentageDelta >= 1 || isNaN(percentageDelta)) {
      entity.currentDelta = 0;
      percentageDelta = 0.01;
    }

    let point = entity.line.getPointAtLength(lineLength * percentageDelta);
    entity.circle.setAttributeNS(null, "cx", point.x);
    entity.circle.setAttributeNS(null, "cy", point.y);

    entity.prevTimestamp = timestamp;
  }

  updateBatteryIcon(batteryChargeValue, batteryChargingValue){
    let normalizedValue = batteryChargeValue / 100;
    normalizedValue = normalizedValue.toFixed(1) * 100;
    let normalizedString = '-' + normalizedValue.toString();
    let chargingIcon = '';
    if(batteryChargingValue > 0) chargingIcon = '-charging';
    if(normalizedValue == 100) normalizedString = '';
    if(normalizedValue <= 4) normalizedString = '-outline';
    this.querySelector(".battery_icon_container ha-icon").setAttribute('icon','mdi:battery'+chargingIcon+normalizedString);
  }

  getStateValue(hass, entityId){
    const state = hass.states[entityId];

    if (state) {
        var valueStr = state.state;
        const unit_of_measurement = state.attributes.unit_of_measurement;

        var value;
        if (unit_of_measurement === 'kW') {
          value = valueStr * 1;
        } else if (unit_of_measurement === 'W' && this.w_or_kw !== 'W') {
          value = valueStr / 1000;
        } else if (unit_of_measurement === 'W' && this.w_or_kw === 'W') {
          value = valueStr;
        } else if (unit_of_measurement === '%') {
          value = valueStr;
        }

        if (value > 0.1) {
          value = Math.round(value * 10) / 10
        } else {
          value = Math.round(value * 100) / 100
        }
    }
    return value;
  }

  getSpeed(value) {
    var speed = 0;
    if (value > 0) {
      speed = 0.07 * value;
    }
    return speed;
  }
}

customElements.define('tesla-style-solar-power-card', TeslaStyleSolarPowerCard);