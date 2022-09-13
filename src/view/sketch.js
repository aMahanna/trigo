// github.com/aMahanna

/* 
/* Display variables
*/
var cnv;
var yMargin = 0;
var xMargin = 0;

/* 
/* Animation variables
*/
var defaultScaleValue = 1.4;
var scaleValue;
var opacity; 

var backgroundColourValue; 
var isBackgroundEnabled;
var isBezierEnabled;
var isFillEnabled;
var isStrokeEnabled;
var strokeValue;

var trigFunctionValue;
var trigDivisor;
var ellipseDivisor;
var rotateMultiplicand;
var trigEquation;

var startCount;
var endCount; 
var maxParticleDensityValue;
var particleDensity;

/* 
/* Rotate variable; constantly incremented
*/
var x = 0;
var xModifier;

function setup() {
  if (windowWidth < 1000) { 
    defaultScaleValue = 1.1; 
  }
  cnv = createCanvas(windowWidth - xMargin, windowHeight-yMargin);
  centerCanvas();
  setAnimationVariables();
}

function centerCanvas() {
  var z = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(z, y);
}


function setAnimationVariables() {
  let binaryChoice = [0, 1];
  let oneToFourChoice = [1, 2, 3, 4];
  let trigDivisorChoice = [3, 10, 100];
  let ellipseDivisorChoice = [20, 200];
  
  scaleValue = windowHeight > 1000 ? 1 + defaultScaleValue : defaultScaleValue;
  opacity = 100 + int(random(2, 12) * 10);
  
  isBackgroundEnabled = random(binaryChoice) == 1 ? true : false; 
  backgroundColourValue = random(binaryChoice);
  if (backgroundColourValue == 1) background(255, 255 ,255);
  if (backgroundColourValue == 0) background(0, 0, 0);
  
  isBezierEnabled = random(binaryChoice) == 1 ? true : false; 
  isFillEnabled = random(binaryChoice) == 1 ? true : false; 
  isStrokeEnabled = random(binaryChoice) == 1 ? true : false;  
  
  trigFunctionValue = random(oneToFourChoice);
  trigDivisor = random(trigDivisorChoice);
  ellipseDivisor = random(ellipseDivisorChoice);  
  rotateMultiplicand = int(random(1, 7));
  
  // TODO - Investigate more
  startCount = 100 * int(random(-3, 2));
  endCount = 100 * int(random(3, 10));
  maxParticleDensityValue = int((endCount + abs(startCount)) * 0.2);
  particleDensity = int(random(maxParticleDensityValue/2, maxParticleDensityValue - 1));
  
  xModifier = random(oneToFourChoice);

  // startCount = 0;
  // endCount = 1000;
  // trigDivisor = 5;
  // ellipseDivisor = 200;
  // maxParticleDensityValue = 31;
  // particleDensity = 20;
  // rotateMultiplicand = 4;
  
  //console.log("trig: ", trigDivisor);
  // console.log("x: ", xModifier);

}

function generateBackground() {
  if (isBackgroundEnabled) {
    if (backgroundColourValue == 0) {
      background(0,0,0);
    } else {
      background(255, 255, 255);
    }
  }
  
  if (isStrokeEnabled) {
    strokeValue = backgroundColourValue == 0 || isBezierEnabled ? 255 : 0;
    strokeWeight(1);
    stroke(strokeValue, strokeValue, strokeValue, 200);
  } else {
    noStroke();
  }
}

function draw() {
  scale(scaleValue);
  generateBackground();
  generateAnimation();
}

function generateAnimation() {
  
  switch (trigFunctionValue) {
    case 1:
      trigEquation = sin(x/trigDivisor);
      break;
    case 2:
      trigEquation = cos(x/trigDivisor);
      break;
    case 3:
      trigEquation = tan(x/trigDivisor);
      break;
    case 4:
      trigEquation = atan(x/trigDivisor);
      break;
    default:
      //  
  }
  
  for (var i = startCount; i < endCount; i += (maxParticleDensityValue - particleDensity)) {
    push();

    translate((windowWidth-xMargin) / (2 * scaleValue), (windowHeight-yMargin) / (2 * scaleValue));
    
    rotate(x + (trigEquation * i * 1/rotateMultiplicand) + i); 
        
    fill(
      cos(x * 5 + i * 10) * 200,
      sin(x * 5 + i * 10) * 200,
      cos(x * 5 + i * 10) * -200,
      opacity
    );
    
    ellipse(
      100 + sin((x / ellipseDivisor) * i) * 100,
      cos((x / ellipseDivisor) * i) * 20 + 10,
      cos((x / 100) * i) * 10 + 13,
      cos((x / 100) * i) * 10 + 13
    );
    
    if (!isFillEnabled) {
      noFill();
    }
    
    if (isBezierEnabled) {
      bezier(
        100 + sin((x / 200) * i) * 40,
        10 + cos((x / 200) * i) * 20,
        100 + sin((x / 200) * (i - abs(x / 5) * 40)) * 40,
        10 + cos((x / 200) * (i - tan(x / 5) * 40)) * 20,
        100 - cos(x / 5) * 40,
        100 - tan(x / 5) * 40,
        0,
        0
      );
    }

    pop();
  }

  fill(
    cos(x + i * 10) * 200,
    sin(x + i * 10) * 200,
    cos(x + i * 10) * -200,
    150
  );

  ellipse(
    (windowWidth-xMargin) / (2 * scaleValue),
    (windowHeight-yMargin) / (2 * scaleValue),
    cos((x / 200) * 300) * 10 + 13,
    cos((x / 200) * 300) * 10 + 13
  );
  
  switch (xModifier) {
    case 1:
      x += 0.001 + (1 + cos(x));
      break;
    case 2:
      x += 0.0001 * (sin(x) + 30);
      break;
    case 3:
      x += 0.001 + (0.001/(sin(x) + 3));
      break;
    case 4:
      x += 0.001 + (1 - sin(x));
      break;
    default:
      //  
  }
}