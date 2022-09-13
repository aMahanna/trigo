// github.com/aMahanna

/* 
/* Display variables
*/
var cnv;
var yMargin = 75;
var xMargin = 0;

/* 
/* Slider variables
*/
var speedSlider;
var particleSlider;
var scaleSlider;
var opacitySlider; 
var rotateMultiplicandSlider;
var trigDivisorSlider; 
var maxParticleSliderValue = 31;
var defaultScaleValue = 1.4;
var strkValue;

/* 
/* Button variables
*/
var animationPresetNum;
var preset1;
var preset2;
var preset3;
var preset4;
var preset5;
var isPaused;
var trigFunctionRadio;
var backgroundColourRadio; 

/* 
/* Rotate variable; constantly incremented
*/
var x;

function setup() {
  if (windowWidth < 1000) { 
    yMargin = 300; 
    defaultScaleValue = 1.1; 
  }
  cnv = createCanvas(windowWidth - xMargin, windowHeight-yMargin);
  centerCanvas();
  setupSliders();
  setupPresets();
  setupCheckbox();
  setupRadio();
  applyAnimationPresetNum(0);
  displayInstructions();
}

function centerCanvas() {
  var z = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(z, y);
}

function setupSliders() {
  scaleSlider = createSlider(0, 10, 1.5, 0.01);
  opacitySlider = createSlider(0, 255, 150, 1);
  particleSlider = createSlider(1, maxParticleSliderValue - 1, (maxParticleSliderValue - 1)/2);
  speedSlider = createSlider(0, 10, 5, 0.1);
  rotateMultiplicandSlider = createSlider(1, 6, 1, 1);
  trigDivisorSlider = createSlider(2, 7, 2, 1);
}

function setupPresets() {
  preset1 = createButton("1");
  preset1.mousePressed(function() {
    applyAnimationPresetNum(1);
  });
      
  preset2 = createButton("2"); 
  preset2.mousePressed(function() {
    applyAnimationPresetNum(2);
  });
  
  preset3 = createButton("3");
  preset3.mousePressed(function() {
    applyAnimationPresetNum(3);
  });

  preset4 = createButton("4");
  preset4.mousePressed(function() {
    applyAnimationPresetNum(4);
  });

  preset5 = createButton("5");
  preset5.mousePressed(function() {
    applyAnimationPresetNum(5);
  });
  
  
  if (windowWidth < 1000) {
    preset1.size(75, 75);
    preset1.position((windowWidth/2) - 225, 55);
    preset2.size(75, 75);
    preset2.position((windowWidth/2) - 125, 55);
    preset3.size(75, 75);
    preset3.position((windowWidth/2) - 25, 55);
    preset4.size(75, 75);
    preset4.position((windowWidth/2) + 75, 55);
    preset5.size(75, 75);
    preset5.position((windowWidth/2) + 175, 55);
  }
}

function setupCheckbox() {
  isPaused = createCheckbox('Paused', false);
  isPaused.position(windowWidth/2 + 170, windowHeight - 27);
}

function setupRadio() {
  trigFunctionRadio = createRadio();
  trigFunctionRadio.option('sin ', 1);
  trigFunctionRadio.option('cos ', 2);
  trigFunctionRadio.option('tan ', 3);
  trigFunctionRadio.option('atan ', 4);
  trigFunctionRadio.style('width', '200px');
  trigFunctionRadio.position(windowWidth/2 - 90, windowHeight - 27);
  trigFunctionRadio.value(2);
  
  backgroundColourRadio = createRadio();
  backgroundColourRadio.option('O', 1);
  backgroundColourRadio.option('Ø', 2);
  backgroundColourRadio.style('width', '95px');
  backgroundColourRadio.position(windowWidth/2 - 250, windowHeight - 27);
  backgroundColourRadio.value(1);
}

function applyPresetSettings(speedVal, particleVal, scaleVal, opacityVal, trigFunctionVal) {
  speedSlider.value(speedVal);
  particleSlider.value(particleVal);
  scaleVal = windowHeight > 1000 ? 1 + scaleVal : scaleVal;
  scaleSlider.value(scaleVal);
  opacitySlider.value(opacityVal);
  trigFunctionRadio.value(trigFunctionVal);
  
  rotateMultiplicandSlider.value(random(1, 7));
  trigDivisorSlider.value(random(2, 8));
}

function displayInstructions() {
  textAlign(CENTER, CENTER);
  textFont('Verdana');
  textSize(15);
  text('- Start by clicking on a preset (the numbered buttons) -', (windowWidth - xMargin) / 2, ((windowHeight-yMargin) / 2) - 50);
  textStyle(BOLD);
  text("The first 4 sliders (from left to right) control the scale, opacity, density, & speed of animations.", (windowWidth - xMargin) / 2, ((windowHeight-yMargin) / 2) - 25);
  textStyle(NORMAL);
  text('The remaining 2 sliders control rotation dynamics. They are randomized every time a new animation is called.', (windowWidth - xMargin) / 2, (windowHeight-yMargin) / 2);
  text("The radio buttons (see below) control which trigonometric function is powering the animation.", (windowWidth - xMargin) / 2, ((windowHeight-yMargin) / 2) + 25);
  text("Source code can be found at github.com/aMahanna", (windowWidth - xMargin) / 2, ((windowHeight-yMargin) / 2) + 70);
  text("(Currently not optimized for mobile)", (windowWidth - xMargin) / 2, ((windowHeight-yMargin) / 2) + 95);
}

function draw() {
  if (!isPaused.checked() && animationPresetNum != 0) {  
    if (animationPresetNum == 5) {
      sirSingleton();
    } else {
      callMeTrippy();
    }
  }
  
}

function callMeTrippy() {
  if (isBackgroundEnabled) {
    if (backgroundColourRadio.value() == 1) {
      background(255, 255, 255)
      strkValue = 0;
    } else {
      background(0,0,0);
      strkValue = 255;
    }
  }
  
  if (isStrokeDisabled) {
    noStroke();
  } else {
    if (animationPresetNum == 3 || animationPresetNum == 4) {
      strkValue = 255;
    }
    strokeWeight(1);
    stroke(strkValue, strkValue, strkValue, 200);
  }

  if (trigFunctionRadio.value() == 1) {
    trigEquation = sin(x/trigDivisorSlider.value());
  } else if (trigFunctionRadio.value() == 2) {
    trigEquation = cos(x/trigDivisorSlider.value());
  } else if (trigFunctionRadio.value() == 3) {
    trigEquation = tan(x/trigDivisorSlider.value());
  } else {
    trigEquation = atan(x/trigDivisorSlider.value());
  }
  
  scale(scaleSlider.value());
  
  for (var i = startCount; i < endCount; i += (maxParticleSliderValue - particleSlider.value())) {
    push();

    translate((windowWidth-xMargin) / (2 * scaleSlider.value()), (windowHeight-yMargin) / (2 * scaleSlider.value()));
    
    rotate(x + (trigEquation * i * (1/rotateMultiplicandSlider.value())) + i); 
        
    fill(
      cos(x * 5 + i * 10) * 200,
      sin(x * 5 + i * 10) * 200,
      cos(x * 5 + i * 10) * -200,
      opacitySlider.value()
    );
    
    ellipse(
      100 + sin((x / 200) * i) * 100,
      cos((x / 200) * i) * 20 + 10,
      cos((x / 100) * i) * 10 + 13,
      cos((x / 100) * i) * 10 + 13
    );
    
    if (isFillDisabled) {
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
    (windowWidth-xMargin) / (2 * scaleSlider.value()),
    (windowHeight-yMargin) / (2 * scaleSlider.value()),
    cos((x / 200) * 300) * 10 + 13,
    cos((x / 200) * 300) * 10 + 13
  );
  
  x += 1 / pow(10, (10 - speedSlider.value())) + (cos(x) * speedMultiplicand + speedAddend);
}

function sirSingleton() {
  if (isBackgroundEnabled) {
    if (backgroundColourRadio.value() == 1) {
      background(255, 255, 255)
      strkValue = 0;
    } else {
      background(0,0,0);
      strkValue = 255;
    }
  }
  
  strokeWeight(1);
  stroke(strkValue, strkValue, strkValue, 200);
  scale(scaleSlider.value());
  
  if (trigFunctionRadio.value() == 1) {
    trigEquation = sin(x/trigDivisorSlider.value());
  } else if (trigFunctionRadio.value() == 2) {
    trigEquation = cos(x/trigDivisorSlider.value());
  } else if (trigFunctionRadio.value() == 3) {
    trigEquation = tan(x/trigDivisorSlider.value());
  } else {
    trigEquation = atan(x/trigDivisorSlider.value());
  }

  for (var i = 0; i < 1000; i += 500) {
    push();

    translate((windowWidth-xMargin) / (2 * scaleSlider.value()), (windowHeight-yMargin) / (2 * scaleSlider.value()));
    rotate(x + (trigEquation * i * rotateMultiplicandSlider.value()) + i); 

    fill(
      cos(x * 5 + i * 10) * 200,
      sin(x * 5 + i * 10) * 200,
      cos(x * 5 + i * 10) * -200,
      opacitySlider.value()
    );

    ellipse(
      100 + sin((x / 200) * i) * 100,
      10 + cos((x / 200) * i) * 20,
      cos((x / 100) * i) * 10 + 13,
      cos((x / 100) * i) * 10 + 13
    );

    noFill();
    bezier(
      100 + sin((x / 200) * i) * 100,
      10 + cos((x / 200) * i) * 30,
      100 + sin((x / 200) * (i - sin(x / 5) * 40)) * 100,
      10 + cos((x / 200) * (i - cos(x / 5) * 50)) * 30,
      100 - cos(x / 5) * 40,
      100 - sin(x / 5) * 100,
      0,
      0
    );

    pop();
  }

  fill(
    cos(x + i * 10) * 200,
    sin(x + i * 10) * 200,
    cos(x + i * 10) * -200,
    150
  );
  ellipse(
    (windowWidth-xMargin) / (2 * scaleSlider.value()),
    (windowHeight-yMargin) / (2 * scaleSlider.value()),
    cos((x / 200) * 300) * 10 + 13,
    cos((x / 200) * 300) * 10 + 13
  );

  x += 0.0009 + (cos(x / 3) + 1);
}

function applyAnimationPresetNum(val) {
  x = 0;
  animationPresetNum = val;
  if (animationPresetNum == 1) {
    applyPresetSettings(6.8, 22, defaultScaleValue, 160, 1);
    isStrokeDisabled = true; 
    isBackgroundEnabled = true;
    backgroundColourRadio.value(1);
    isFillDisabled = false;
    isBezierEnabled = false;
    
    startCount = 0;
    endCount = 1000;
    
    speedMultiplicand = 1;
    speedAddend = 1;
    
  } else if (animationPresetNum == 2) {
    applyPresetSettings(7, 20, defaultScaleValue, 255, 2);
    isBackgroundEnabled = true;
    backgroundColourRadio.value(2);
    isStrokeDisabled = false; 
    isFillDisabled = true;
    isBezierEnabled = true;
    
    startCount = -500;
    endCount = 500;
    
    speedMultiplicand = 2;
    speedAddend = 2;

  } else if (animationPresetNum == 3) {
    applyPresetSettings(7, 20, defaultScaleValue, 150, 4);
    isBackgroundEnabled = true;
    backgroundColourRadio.value(1);
    isStrokeDisabled = false; 
    isFillDisabled = false;
    isBezierEnabled = true;
    
    startCount = 0;
    endCount = 1000;

    speedMultiplicand = 2;
    speedAddend = 2;
    
  } else if (animationPresetNum == 4) {
    backgroundColourRadio.value() == 1 ? background(255,255,255) : background(0,0, 0);
    applyPresetSettings(7, 0, defaultScaleValue, 255, 3);
    isBackgroundEnabled = false;
    isStrokeDisabled = false; 
    isFillDisabled = false;
    isBezierEnabled = false;
    
    startCount = -500;
    endCount = 500;
    
    speedMultiplicand = 1;
    speedAddend = 1;

  } else {
    applyPresetSettings(5, 0, defaultScaleValue, 150, 1);
    isBackgroundEnabled = true;
    backgroundColourRadio.value(1);
  }
}