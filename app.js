module.exports = function(app){
  // johnny five photo resistor
  var five = require("johnny-five"),
  board, photoresistor, temperature, led;

  var light;
  var temperature;
  var locTemp;

  board = new five.Board();

  board.on("ready", function() {

    // Create a new `photoresistor` hardware instance.
  /*   photoresistor = new five.Sensor({
      pin: "A2",
      freq: 250
    }); */

    temperature = new five.Thermometer({
      controller: "LM35",
      pin: "A0",
      freq: 250
    });

    var led = new five.Led(10);
    
    this.repl.inject({
      led: led
    });

    

    app.post("/api/dataLight", function(req, res) {
      console.log(req.body.lightStatus);

      light = req.body.lightStatus;

      if (light == "on") {
        led.on();
      } else if (light == "off") {
        led.off();
      }
    });

    

    // Inject the `sensor` hardware into
    // the Repl instance's context;
    // allows direct command line access
    /* board.repl.inject({
      pot: photoresistor
    }); */

    // "data" get the current reading from the photoresistor
   /*  photoresistor.on("data", function() {
      light = this.value;
      console.log(light);
    }); */

    temperature.on("data", function(){
      locTemp = this.fahrenheit;
      console.log(locTemp);
    });
  });

  app.get("/api/temp", function(req, res) {
    res.json({"temperature": locTemp});
  });

/*   app.get("/api/light", function(req, res) {
    res.json({"light": light});
  }); */
}

