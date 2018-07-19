$(document).ready(function(){

  // Temperature graph code goes here
  var pubnub = new PubNub({
    publishKey: 'pub-c-502ba2b2-a64f-41f7-9607-2c6b371f0460',
    subscribeKey: 'sub-c-fb9f7ab4-83d1-11e8-b9aa-969f058f0c4c'
  });

  var lightObject;
  var tempObject;
  var tempSelection;
  var fanChoice; 
  var currentSwitch = "off";

  $("input[name='group1']").on('change', function() {
    fanChoice = $("input[name='group1']:checked").val();
    console.log(fanChoice);
  });
  

  $("#tempOptions").on("change", function() {
    tempSelection = $(tempOptions).val();
    console.log(tempSelection);
  });

  $(".switchBtnOn").click(function(){
    if (currentSwitch == "on") {
      console.log("switch is already on");
    } else if (currentSwitch == "off") {
      $(".bulb").toggle();
      currentSwitch = $(this).val();
      console.log(currentSwitch);
    }
  
    lightObject = {
      lightStatus: "on"
    }

    $.post("/api/dataLight", lightObject, function(data) {
      console.log(data);
    });
  });

  $(".switchBtnOff").click(function(){
    if (currentSwitch == "off") {
      console.log("switch is already off");
    } else if (currentSwitch == "on") {
      $(".bulb").toggle();
      currentSwitch = $(this).val();
      console.log(currentSwitch);
    }

    lightObject = {
      lightStatus: "off"
    }

    $.post("/api/dataLight", lightObject, function(data) {
      console.log(data);
    });
  });

  eon.chart({
    channels: ['eon-spline'],
    history: true,
    flow: true,
    pubnub: pubnub,
    generate: {
      bindto: '#chart',
      data: {
        labels: false
      }
    }
  });

  setInterval(function(){
    $.get("/api/temp", function(data) {
      console.log(data);
      tempObject = data;
    });

    if (tempObject.temperature > tempSelection && fanChoice == "ac") {
      $("#tempStatus").text("AC is on");
    } else if (tempObject.temperature <= tempSelection && tempSelection != undefined && fanChoice == "ac") {
        $("#tempStatus").text("Temperature set at " + tempSelection + " F");
    } else if (tempObject.temperature < tempSelection && fanChoice == "heat") {
      $("#tempStatus").text("Heat is on");
    } else if (tempObject.temperature >= tempSelection && tempSelection != undefined && fanChoice == "heat") {
      $("#tempStatus").text("Temperature set at " + tempSelection + " F");
    }


    pubnub.publish({
      channel: 'eon-spline',
      message: {
        eon: {
          "temperature": tempObject.temperature
        }
      }
    });

  }, 2000);

  // Temperature Gauge code goes here
  eon.chart({
    pubnub: pubnub,
    channels: ['eon-gauge'],
    generate: {
      bindto: '#gauge',
      data: {
        type: 'gauge',
      },
      gauge: {
        label: {
          format: function(value, ratio){
            return value;
          }
        },
        min: 0,
        max: 100
      },
      color: {
        pattern: ['#FF0000', '#F6C600', '#60B044'],
        threshold: {
          values: [30, 60, 90]
        }
      }
    }
  });

  setInterval(function(){

    pubnub.publish({
      channel: 'eon-gauge',
      message: {
        eon: {
          "temperature": tempObject.temperature
        }
      }
    })

  }, 2000);

  /* --------------------------------------------------------------------- */
});


