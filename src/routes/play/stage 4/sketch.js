/*

Officer: 9693038
CaseNum: 702-3-45692756-9693038

Case 702 - The case of Vanishing Vannevar
Stage 4 - High speed chase

“All units: Vannevar is on the run. They are driving a blue car with a numberPlate of AYPCAL.  Pursue at speed.
I repeat pursue at speed.” Okay Vannevar’s game is nearly up. Go get him kid.
Complete the helper functions below to locate, chase and arrest Vannevar.

There are many possible ways of completing this task,
but you should ONLY use the following commands and techniques:

	- Incrementing and assiging variables
	- Maths function such as p5.random, min, abs, and constrain
	- Conditional statements
	- Traversing arrays with for loops
	- calling functions and returning values

HINT: make sure you take a look at the initialisation of chaseCarObject and the cars in
TrafficObjects_Data to understand their properties.

*/

///////////////////////// HELPER FUNCTIONS /////////////////////

function move_vehicle() {
  /*
	This function should do the following:
	 - increment chaseCarObject's distTravelled property by its accelAmt property
	 - add a p5.random amount between -0.09 and 0.09 to chaseCarObject's shudderAmount property
	 - use the constrain function to constrain chaseCarObject's shudderAmount property to values between 0.07 and 1.19
	 - call the turn_motor function passing chaseCarObject as an argument
	*/

  chaseCarObject.distTravelled += chaseCarObject.accelAmt;
  chaseCarObject.shudderAmount += p5.random(-0.09, 0.09);
  chaseCarObject.shudderAmount = constrain(
    chaseCarObject.shudderAmount,
    0.07,
    1.19
  );

  turn_motor(chaseCarObject);
}

function swap_lanes(car) {
  /*
	This function should do the following:
	 - move car from one lane to the other.
	 - do the move in a single step without any extra animation.
	 - use Lane_Coordinate_A and Lane_Coordinate_B to effect the change.
	 hint: You will need to modify the x property of car.
	*/

  if (car.x === Lane_Coordinate_A) car.x = Lane_Coordinate_B;
  else if (car.x === Lane_Coordinate_B) car.x = Lane_Coordinate_A;
}

function searchVehicle_isAhead(Target_vehicle_A, Target_vehicle_B) {
  /*
	This function should do the following:
	 - determine if Target_vehicle_A is in the same lane and less than 200px behind Target_vehicle_B.
	 - do this by comparing the two cars' distTravelled properties
	 - if these requirements are met then return Target_vehicle_B. Otherwise return false.
	*/

  let diff = Target_vehicle_B.distTravelled - Target_vehicle_A.distTravelled;

  if (diff >= 0 && diff < 200 && Target_vehicle_A.x == Target_vehicle_B.x)
    return Target_vehicle_B;
  else return false;
}

function check_isAtSide(targetCar) {
  /*
	This function should do the following:
	 - traverse TrafficObjects_Data and determine if any of the cars are parallel with targetCar.
	 - if a car is found to be parallel to targetCar then return the index of that car object.
	 - cars are considered parallel if the absolute difference between their distTravelled properties is less than 25 px and they have non-matching x properties	*/

  for (let i = 0; i < TrafficObjects_Data.length; i++) {
    let diff = abs(
      targetCar.distTravelled - TrafficObjects_Data[i].distTravelled
    );
    if (diff >= 0 && diff < 25 && targetCar.x != TrafficObjects_Data[i].x)
      return i;
  }
}

function spot_suspect() {
  /*
	This function should do the following:
	 - Check cars passing parallel to chaseCarObject to see if they match the numberPlate property in the suspect description.
	 - it does this by calling check_isAtSide.
	 - if a positive result is returned then the numberPlate property of the found car is then checked against the suspect description.
	 - if a match is found then the index of the car in question is returned.
	 - otherwise return false.
	*/

  let parallelIndex = check_isAtSide(chaseCarObject);
  if (parallelIndex) {
    if (TrafficObjects_Data[parallelIndex].numberPlate === "AYPCAL")
      return parallelIndex;
    else return false;
  }
}

function pursuing_suspect() {
  /*
	This function should do the following:
	 - only operate if the global variable suspect is assigned to an object.
	 - scale the accelAmt property of chaseCarObject by a factor of 1.001.
	 - use the min function to make sure that chaseCarObject's accelAmt property does not exceed 6.
	 - it should traverse TrafficObjects_Data calling searchVehicle_isAhead for each car to detect any cars in front of chaseCarObject.
	 - if a positive result is returned it should check to see if the numberPlate property of that car matches that of suspect.
	 - for a match, stop_suspect should be called, otherwise call swap_lanes.
	*/

  if (suspect) {
    chaseCarObject.accelAmt *= 1.001;
    chaseCarObject.accelAmt = min(chaseCarObject.accelAmt, 6);
    for (let i = 0; i < TrafficObjects_Data.length; i++) {
      let frontcar = searchVehicle_isAhead(
        chaseCarObject,
        TrafficObjects_Data[i]
      );

      if (frontcar) {
        if (frontcar.numberPlate === "AYPCAL") stop_suspect();
        else swap_lanes(chaseCarObject);
      }
    }
  }
}

function stop_suspect() {
  /*
	This function should do the following:
	 - set the isArrested property of suspect to true.
	 - set the isArrestingSuspect property of chaseCarObject to true.
	 - set the accelAmt properties of both vehicles to zero.
	*/

  if (suspect) {
    suspect.isArrested = true;
    suspect.accelAmt = 0;
    chaseCarObject.isArrestingSuspect = true;
    chaseCarObject.accelAmt = 0;
  }
}

//////////////DO NOT CHANGE CODE BELOW THIS LINE//////////////////

var chaseCarObject;

var roadWidth;
var roadLeftEdge;
var Lane_Coordinate_A;
var Lane_Coordinate_B;
var carImages = {};
var suspect;

var TrafficObjects_Data = [
  {
    x: 300,
    y: 0,
    distTravelled: -200,
    vehicleType: "blueCar",
    numberPlate: "CAH3JA",
    accelAmt: 2,
    exhaust: [],
  },
  {
    x: 500,
    y: 0,
    distTravelled: 200,
    vehicleType: "redCar",
    numberPlate: "9OY0YG",
    accelAmt: 2,
    exhaust: [],
  },
  {
    x: 500,
    y: 0,
    distTravelled: 600,
    vehicleType: "redCar",
    numberPlate: "HSELY7",
    accelAmt: 2,
    exhaust: [],
  },
  {
    x: 300,
    y: 0,
    distTravelled: 1000,
    vehicleType: "blueCar",
    numberPlate: "ZQ8TJF",
    accelAmt: 2,
    exhaust: [],
  },
  {
    x: 500,
    y: 0,
    distTravelled: 1400,
    vehicleType: "redCar",
    numberPlate: "0ZS4GP",
    accelAmt: 2,
    exhaust: [],
  },
  {
    x: 300,
    y: 0,
    distTravelled: 1800,
    vehicleType: "greenCar",
    numberPlate: "79HOK8",
    accelAmt: 2,
    exhaust: [],
  },
  {
    x: 300,
    y: 0,
    distTravelled: 2200,
    vehicleType: "blueCar",
    numberPlate: "AYPCAL",
    accelAmt: 2,
    exhaust: [],
  },
  {
    x: 500,
    y: 0,
    distTravelled: 2600,
    vehicleType: "greenCar",
    numberPlate: "VCYXWB",
    accelAmt: 2,
    exhaust: [],
  },
  {
    x: 500,
    y: 0,
    distTravelled: 3000,
    vehicleType: "blueCar",
    numberPlate: "OX83IM",
    accelAmt: 2,
    exhaust: [],
  },
  {
    x: 300,
    y: 0,
    distTravelled: 3400,
    vehicleType: "blueCar",
    numberPlate: "VFNFY4",
    accelAmt: 2,
    exhaust: [],
  },
  {
    x: 500,
    y: 0,
    distTravelled: 3800,
    vehicleType: "redCar",
    numberPlate: "HEBJWH",
    accelAmt: 2,
    exhaust: [],
  },
  {
    x: 500,
    y: 0,
    distTravelled: 4200,
    vehicleType: "blueCar",
    numberPlate: "NEIJ5W",
    accelAmt: 2,
    exhaust: [],
  },
  {
    x: 300,
    y: 0,
    distTravelled: 4600,
    vehicleType: "whiteCar",
    numberPlate: "IFQZ1P",
    accelAmt: 2,
    exhaust: [],
  },
  {
    x: 500,
    y: 0,
    distTravelled: 5000,
    vehicleType: "whiteCar",
    numberPlate: "GQ0XF0",
    accelAmt: 2,
    exhaust: [],
  },
  {
    x: 500,
    y: 0,
    distTravelled: 5400,
    vehicleType: "redCar",
    numberPlate: "AKWSGG",
    accelAmt: 2,
    exhaust: [],
  },
  {
    x: 300,
    y: 0,
    distTravelled: 5800,
    vehicleType: "whiteCar",
    numberPlate: "874T79",
    accelAmt: 2,
    exhaust: [],
  },
  {
    x: 500,
    y: 0,
    distTravelled: 6200,
    vehicleType: "blueCar",
    numberPlate: "ERC47I",
    accelAmt: 2,
    exhaust: [],
  },
  {
    x: 300,
    y: 0,
    distTravelled: 6600,
    vehicleType: "whiteCar",
    numberPlate: "IX8CUX",
    accelAmt: 2,
    exhaust: [],
  },
  {
    x: 300,
    y: 0,
    distTravelled: 7000,
    vehicleType: "blueCar",
    numberPlate: "80ZKPQ",
    accelAmt: 2,
    exhaust: [],
  },
  {
    x: 300,
    y: 0,
    distTravelled: 7400,
    vehicleType: "redCar",
    numberPlate: "JKWLCW",
    accelAmt: 2,
    exhaust: [],
  },
];

function preload() {
  var carTypes = ["detective", "redCar", "greenCar", "blueCar", "whiteCar"];

  for (var i = 0; i < carTypes.length; i++) {
    carImages[carTypes[i]] = p5.loadImage("cars/" + carTypes[i] + ".png");
  }
}

function setup(p5, canvasParentRef) {
  p5.createCanvas(800, 800);
  p5.textSize(30);
  textAlign(p5.CENTER);

  roadWidth = 400;
  roadLeftEdge = 200;
  Lane_Coordinate_A = 300;
  Lane_Coordinate_B = 500;

  chaseCarObject = {
    x: roadLeftEdge + roadWidth / 4,
    y: 550,
    distTravelled: 0,
    accelAmt: 3,
    shudderAmount: 0,
    vehicleType: "detective",
    numberPlate: "5L3UTH",
    isArrestingSuspect: false,
    tailingSuspect: false,
    exhaust: [],
  };
}

function draw() {
  p5.background(0);

  drawRoad();
  drawCars();

  if (suspect) {
    if (suspect.isArrested) {
      p5.fill(255);

      p5.text("suspect isArrested!", p5.width / 2, p5.height / 2);
    }
  }

  ////////////////////// HANDLE DETECTIVE /////////////////////////

  if (!chaseCarObject.tailingSuspect && !chaseCarObject.isArrestingSuspect) {
    move_vehicle();
    for (var i = 0; i < TrafficObjects_Data.length; i++) {
      var b2b = searchVehicle_isAhead(chaseCarObject, TrafficObjects_Data[i]);
      if (b2b) swap_lanes(chaseCarObject);
    }
    var a = spot_suspect();
    if (a != false) suspect = TrafficObjects_Data[a];
    if (suspect) chaseCarObject.tailingSuspect = true;
  } else if (!chaseCarObject.isArrestingSuspect) {
    pursuing_suspect();
    move_vehicle();
  }

  ////////////////////// HANDLE ASSAILANT /////////////////////////

  if (suspect) {
    if (!suspect.isArrested) {
      suspect.accelAmt = 5;
      for (var i = 0; i < TrafficObjects_Data.length; i++) {
        var b2b = searchVehicle_isAhead(suspect, TrafficObjects_Data[i]);
        if (b2b) {
          if (b2b.numberPlate != suspect.numberPlate) {
            swap_lanes(suspect);
          }
        }
      }
    }
  }

  //////////////////////HANDLE THE OTHER CARS//////////////////////

  for (var i = 0; i < TrafficObjects_Data.length; i++) {
    TrafficObjects_Data[i].distTravelled += TrafficObjects_Data[i].accelAmt;
    TrafficObjects_Data[i].y =
      chaseCarObject.y -
      TrafficObjects_Data[i].distTravelled +
      chaseCarObject.distTravelled;

    if (suspect) {
      if (suspect.isArrested) {
        if (TrafficObjects_Data[i].x == chaseCarObject.x) {
          if (
            TrafficObjects_Data[i].distTravelled < chaseCarObject.distTravelled
          ) {
            if (
              TrafficObjects_Data[i].distTravelled -
                chaseCarObject.distTravelled <
              200
            ) {
              swap_lanes(TrafficObjects_Data[i]);
            }
          }
        }
      }
    }
  }
}

/////////////////////////DRAWING FUNCTIONS////////////////////////

function drawRoad() {
  p5.stroke(100);
  p5.fill(50);
  p5.rect(roadLeftEdge, 0, roadWidth, 800);
  p5.stroke(255);

  for (var i = -1; i < 20; i++) {
    p5.line(
      roadLeftEdge + roadWidth / 2,
      i * 100 + (chaseCarObject.distTravelled % 100),
      roadLeftEdge + roadWidth / 2,
      i * 100 + 70 + (chaseCarObject.distTravelled % 100)
    );
  }
}

function drawCars() {
  //draw the detective car

  drawExhaust(chaseCarObject);
  image(
    carImages["detective"],
    chaseCarObject.x -
      carImages["detective"].width / 2 +
      p5.random(-chaseCarObject.shudderAmount, chaseCarObject.shudderAmount),
    chaseCarObject.y +
      p5.random(-chaseCarObject.shudderAmount, chaseCarObject.shudderAmount)
  );

  //draw all other cars

  for (var i = 0; i < TrafficObjects_Data.length; i++) {
    if (
      TrafficObjects_Data[i].y < p5.height &&
      TrafficObjects_Data[i].y > -height / 2
    ) {
      image(
        carImages[TrafficObjects_Data[i].vehicleType],
        TrafficObjects_Data[i].x -
          carImages[TrafficObjects_Data[i].vehicleType].width / 2,
        TrafficObjects_Data[i].y
      );
      turn_motor(TrafficObjects_Data[i]);

      drawExhaust(TrafficObjects_Data[i]);
    }
  }
}

function turn_motor(car) {
  car.exhaust.push({
    size: 2,
    x: car.x,
    y: car.y + carImages[car.vehicleType].height,
  });

  for (var i = car.exhaust.length - 1; i >= 0; i--) {
    car.exhaust[i].y += max(0.75, car.accelAmt / 3);
    if (car.vehicleType != "detective")
      car.exhaust[i].y += chaseCarObject.accelAmt - car.accelAmt;
    car.exhaust[i].x += p5.random(-1, 1);
    car.exhaust[i].size += 0.5;

    if (car.exhaust[i].y > p5.height || car.exhaust[i].y < 0) {
      car.exhaust.splice(i, 1);
    }
  }
}

function drawExhaust(car) {
  p5.noStroke();
  for (var i = 0; i < car.exhaust.length; i++) {
    var alpha = map(car.exhaust[i].size, 0, 40, 50, 0);
    p5.fill(125, alpha);
    ellipse(car.exhaust[i].x + 20, car.exhaust[i].y, car.exhaust[i].size);
  }
}
