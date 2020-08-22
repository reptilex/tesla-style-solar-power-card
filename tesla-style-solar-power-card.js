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
    if (!config.entity) {
      throw new Error('You need to define "entity"');
    }
    this.config = config;
    this.pxRate = 3;
    var pxRate = this.pxRate;
    this.oldWidth = 0;

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

    if(config.car_charging_entity != undefined){
      this.carCharge = new sensorCardData();
      this.carCharge.entity = config.car_charging_entity;
      this.carBatteryState = new sensorCardData();
      this.carBatteryState.entity = config.car_battery_entity;
      this.carIcon = 'mdi:car-sports';
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
                          <div class="car_battery_state_text acc_text">asdfs</div>
                          <ha-icon class="acc_icon" icon="${ this.carIcon }"></ha-icon>
                          <div class="car_charging_text acc_text">asdfs</div>
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
  .car_battery_state_text, .battery_charge_state_text{
    position:absolute;
    top:8px;
  }
  .house_icon_container,  .car_icon_container {
    border: 1px solid var(--info-color);
  }
  .house_icon_container .acc_icon, .car_icon_container{
    color: var(--info-color);
  }
  .car_icon_container{
    position: absolute;
    bottom: 20px;
    right: 20px;
  }
  .acc_text {
      text-align: center;
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
  #car_consumption_line{
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
  </div>
</div>
    `;

    this.createIconTextElement(['houseConsumption'], 'house');
    this.createIconTextElement(['solarYield'], 'panel');
    this.createIconTextElement(['gridFeedIn','gridConsumption'],'grid');

    this.createCircleAndLine(this.solarCardElements.solarConsumption, "solar_consumption", "M5,5 C5,109 5,105 105,105");
    this.createCircleAndLine(this.solarCardElements.gridConsumption, "grid_consumption", "M100,10 C10,109 10,105 105,105");
    this.createCircleAndLine(this.solarCardElements.gridFeedIn, "grid_feed_in", "M101,9 C100,101 99,106 10,102");

    if(this.solarCardElements.batteryCharge != undefined){
      this.createIconTextElement(['batteryCharging','batteryConsumption'], 'battery');
      this.createCircleAndLine(this.solarCardElements.batteryCharging, "battery_charging", "M10,10 C10,10 105,10 105,10");
      this.createCircleAndLine(this.solarCardElements.batteryConsumption, "battery_consumption", "M100,10 C10,109 10,105 105,105");
    }
    
    if(this.carCharge != undefined){
      this.createCircleAndLine(this.carCharge, "car_consumption", "M10,10 C10,10 105,10 105,10", "car_consumption");
    }
    
    this.contentIsCreated = true;
  }

  updateProperties(hass) {    
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
        this.solarCardIcons[icon].accTextElement.textContent = this.solarCardIcons[icon].value + ' kW';
      }
    }

    if(this.carCharge != undefined){
      this.carCharge.value = this.getStateValue(hass, this.carCharge.entity);
      this.carCharge.speed = this.getSpeed(this.carCharge.value)/4;
      this.querySelector(".car_charging_text").textContent = this.carCharge.value + " kW";
      if(this.carBatteryState.entity != undefined){
        this.querySelector(".car_battery_state_text").textContent = this.getStateValue(hass, this.carBatteryState.entity)+ " %";
      }
    }    

    if(this.houseBatteryState != undefined){
      this.querySelector(".battery_charge_state_text").textContent = this.getStateValue(hass, this.houseBatteryState.entity)+ " %";
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

    try {
      this.cardRoot = document.querySelector('home-assistant').shadowRoot.querySelector('home-assistant-main').shadowRoot.querySelector('ha-panel-lovelace').shadowRoot.querySelector('hui-root').shadowRoot.querySelector('hui-view').shadowRoot.querySelector('tesla-style-solar-power-card ha-card');  
    } catch (error) {
      return;
    }
    
    if(this.cardRoot == null) return;
    
    this.cardRoot.querySelector('.tesla-style-solar-power-card').style['width'] = 90 * pxRate + 'px';
    if(this.solarCardElements.batteryCharging != undefined){
      this.cardRoot.querySelector('.tesla-style-solar-power-card').style['height'] = 90 * pxRate + 'px';
    }else{
      this.cardRoot.querySelector('.tesla-style-solar-power-card').style['height'] = 60 * pxRate + 'px';
    }

    //icons
    var iconContainer = this.cardRoot.querySelectorAll('.acc_container');
    iconContainer.forEach(
      function(currentValue, currentIndex, iconObj){
        iconObj[currentIndex].style["height"] = 10 * pxRate + 'px';
        iconObj[currentIndex].style["width"] = 10 * pxRate + 'px';
        iconObj[currentIndex].style["padding"] = 7 * pxRate + 'px';        
      }
    );
    var icons = this.cardRoot.querySelectorAll('ha-icon');
    icons.forEach(
      function(currentValue, currentIndex, listObj){
        listObj[currentIndex].shadowRoot.querySelector('ha-svg-icon').style["height"] = 10 * pxRate + 'px';       
        listObj[currentIndex].shadowRoot.querySelector('ha-svg-icon').style["width"] = 10 * pxRate + 'px';       
      }
    );
    this.cardRoot.querySelector('.acc_top').style['padding-bottom'] = 9 * pxRate + 'px';
    this.cardRoot.querySelector('.acc_bottom').style['padding-top'] = 9 * pxRate + 'px';

    //icon texts
    this.cardRoot.querySelectorAll('.acc_text').forEach((el) => {
      el.style['font-size'] = 3 * pxRate + 'px';
    });

    //power lines
    this.cardRoot.querySelector('.power_lines').style['height'] = 42 * pxRate + 'px';
    this.cardRoot.querySelector('.power_lines').style['width'] = 42 * pxRate + 'px';
    this.cardRoot.querySelector('.power_lines').style['top'] = 29 * pxRate + 'px';
    this.cardRoot.querySelector('.power_lines').style['left'] = 29 * pxRate + 'px';
    this.cardRoot.querySelector('.power_lines svg').style['height'] = 42 * pxRate + 'px';
    this.cardRoot.querySelector('.power_lines svg').style['width'] = 42 * pxRate + 'px';
    this.cardRoot.querySelector(".power_lines svg").setAttribute("viewBox", "0 0 "+ 42 * pxRate + " " + 42 * pxRate); 
    let half = 22 * pxRate;

    this.correctDimensionsOfCircleLineAndContainer('solar_consumption', 'M'+ half +',0 C'+ half +','+ half +' '+ half +','+ half +' '+half*2+','+half);
    this.correctDimensionsOfCircleLineAndContainer('grid_feed_in', 'M'+ half +',0 C'+ half +','+ half +' '+ half +','+ half +' 0,'+ half);
    this.correctDimensionsOfCircleLineAndContainer('grid_consumption',  'M0,'+half+' C'+half+','+ half + ' '+half +','+half+' '+half * 2+','+half);

    //battery
    if(this.solarCardElements.batteryCharge != undefined){
      this.correctDimensionsOfCircleLineAndContainer('battery_consumption', 'M'+ half +','+ half * 2 +' C'+ half +','+ half +' '+ half +','+ half +' '+ half * 2 +','+ half);
      this.correctDimensionsOfCircleLineAndContainer('battery_charging',   'M'+half+',0 C'+half+',0 '+half+','+ half * 2 +' '+half+','+ half*2);
      this.cardRoot.querySelector(".battery_charge_state_text").style['padding-left'] = 2 * pxRate + 'px';
    }

    //car charge
    if(this.carCharge != undefined){
      this.cardRoot.querySelector('.car_icon_container').style['bottom'] = 4 * pxRate + 'px';
      this.cardRoot.querySelector('.car_icon_container').style['right'] = 5 * pxRate + 'px';
      this.cardRoot.querySelector('.car_consumption').style['height'] = 10 * pxRate + 'px';
      this.cardRoot.querySelector('.car_consumption').style['width'] = 3 * pxRate + 'px';
      this.cardRoot.querySelector('.car_consumption').style['bottom'] = 29 * pxRate + 'px';
      this.cardRoot.querySelector('.car_consumption').style['right'] = 16 * pxRate + 'px';
      this.cardRoot.querySelector('.car_consumption svg').setAttribute('height', 10 * pxRate + 'px');
      this.cardRoot.querySelector('.car_consumption svg').setAttribute('width', 3 * pxRate + 'px');
      this.cardRoot.querySelector(".car_consumption svg").setAttribute("viewBox", "0 0 "+ 3 * pxRate + " " + 10 * pxRate); 
      this.correctDimensionsOfCircleLineAndContainer('car_consumption', 'M4,0 C4,0 4,'+10*pxRate+' 4,'+10*pxRate);
      this.cardRoot.querySelector(".car_battery_state_text").style['padding-left'] = 2 * pxRate + 'px'; 
    }
  }

  correctDimensionsOfCircleLineAndContainer(cssClass, pathDAttribute){
    this.cardRoot.querySelector("#" + cssClass +'_line').setAttribute('d',pathDAttribute);
  }

  updateAllCircles(timestamp){
    for (var prop in this.solarCardElements) {
      if (Object.prototype.hasOwnProperty.call(this.solarCardElements, prop)) {
        this.updateOneCircle(timestamp, this.solarCardElements[prop])
      }
    }

    if(this.carCharge != undefined) this.updateOneCircle(timestamp, this.carCharge);

    if(this.oldWidth != this.clientWidth && document.readyState === "complete") {
      this.changeStylesDependingOnWidth(this.clientWidth);
    }

    var obj = this;
    requestAnimationFrame(function(timestamp){
      obj.updateAllCircles(timestamp);
    });
  }

  updateOneCircle(timestamp, entity) {
    if(entity.line == undefined) return;

    if(entity.speed == 0){
      entity.circle.setAttribute('visibility', 'hidden');
      return;
    } else{
      entity.circle.setAttribute('visibility', 'visible');
    }

    let LineLength = entity.line.getTotalLength();
    
    if (entity.prevTimestamp === undefined) {
      entity.prevTimestamp = timestamp;
    }
    var timePassed = timestamp - entity.prevTimestamp;
    var delta = entity.speed * timePassed;
    entity.currentDelta += delta;
    let percentageDelta = entity.currentDelta / LineLength;
    if (percentageDelta >= 1) {
      entity.currentDelta = 0;
      percentageDelta = 0.01;
    }

    let point = entity.line.getPointAtLength(LineLength * percentageDelta);
    entity.circle.setAttributeNS(null, "cx", point.x);
    entity.circle.setAttributeNS(null, "cy", point.y);

    entity.prevTimestamp = timestamp;
  }

  getStateValue(hass, entityId){
    const state = hass.states[entityId];

    if (state) {
        var valueStr = state.state;
        const unit_of_measurement = state.attributes.unit_of_measurement;

        var value;
        if (unit_of_measurement === 'kW') {
          value = valueStr * 1;
        } else if (unit_of_measurement === 'W') {
          value = valueStr / 1000;
        } else if (unit_of_measurement === '%') {
          value = valueStr;
        }

        if (value > 0.2) {
          value = Math.round(value * 10) / 10
        } else {
          value = Math.round(value * 1000) / 1000
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