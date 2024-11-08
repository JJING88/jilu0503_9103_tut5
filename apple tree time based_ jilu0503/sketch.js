let circles = [];
let currentCircleIndex = 0;
let isFirstDraw = true;
let isSecondDraw = false;
let strokeColor = '#3c4449';
let density = 0.01;  // Control line density
let backgroundColor = '#1E3A5F';
let timeOffset = 0;
function setup() {
  createCanvas(windowWidth, windowHeight);

  // Draw the background pattern only once
  drawStaticBackground();

  // Generate all circular data
  generateShapesData();
  

  // Initiate the drawing process
  drawNextCircle();
  squareColor = color('#69a27d');
  drawGreenSquares();

  // Creating a base
  baseColors = ['#e4be6e', '#5ea269', '#fc4b46'];
  createBase();

  // Creating a base
  drawBase();

}

// Draw static background function: background and lines on the background are drawn only once
function drawStaticBackground() {
  background(backgroundColor); 
  strokeWeight(0.5);

  // Randomly generated background line colours
  let randomLineColor = color(random(255), random(255), random(255), 50); // Add transparency

  stroke(randomLineColor); // new line colors
  noFill();

  // Calculate the number of lines based on the canvas area
  let numBranches = int(windowWidth * windowHeight * density);

  // Drawing the lines of the background
  for (let i = 0; i < numBranches; i++) {
    drawBranch(random(width), random(height));
  }
}

// Line Drawing Functions
function drawBranch(x, y) {
  let length = random(20, 100);
  let angle = random(TWO_PI);
  let xEnd = x + length * cos(angle);
  let yEnd = y + length * sin(angle);

  line(x, y, xEnd, yEnd);
}

// Generate data for all circles
function generateShapesData() {
  let squareSize = height * 0.1;
  let baseWidth = squareSize * 3.5;
  let rectWidth = baseWidth / 6;
  let yPosition = height * 0.7 - (rectWidth * 1.5) / 2;

  let diameters = [];
  let totalWidth = 0;
  for (let i = 0; i < 5; i++) {
    let diameter = random(rectWidth * 0.5, rectWidth);
    diameters.push(diameter);
    totalWidth += diameter;
  }

  let centerX = width / 2;
  let startX = centerX - totalWidth / 2;

  let currentX = startX;
  for (let i = 0; i < 5; i++) {
    let circleDiameter = diameters[i];
    circles.push({
      type: 'circle',
      x: currentX + circleDiameter / 2,
      y: yPosition,
      diameter: circleDiameter
    });
    currentX += circleDiameter;

    if (i === 2) {
      let verticalY = yPosition - circleDiameter / 2;
      let fifthVerticalCircleY = null;
      let fifthCircleDiameter = null;

      for (let j = 0; j < 6; j++) {
        let verticalDiameter = random(rectWidth * 0.75, rectWidth * 1.25);
        circles.push({
          type: 'verticalCircle',
          x: currentX - circleDiameter / 2,
          y: verticalY - verticalDiameter / 2,
          diameter: verticalDiameter
        });

        if (j === 4) {
          fifthVerticalCircleY = verticalY;
          fifthCircleDiameter = verticalDiameter;
        }
        verticalY -= verticalDiameter;
      }

      if (fifthVerticalCircleY !== null && fifthCircleDiameter !== null) {
        let adjustedY = fifthVerticalCircleY - fifthCircleDiameter / 2;
        let leftDiameters = [];
        let leftTotalWidth = 0;
        for (let k = 0; k < 4; k++) {
          let leftDiameter = random(rectWidth * 0.5, rectWidth);
          leftDiameters.push(leftDiameter);
          leftTotalWidth += leftDiameter;
        }

        let leftStartX = currentX - circleDiameter / 2 - fifthCircleDiameter / 2 - leftTotalWidth;
        for (let k = 0; k < 4; k++) {
          let leftCircleDiameter = leftDiameters[k];
          circles.push({
            type: 'circle',
            x: leftStartX + leftCircleDiameter / 2,
            y: adjustedY,
            diameter: leftCircleDiameter
          });
          leftStartX += leftCircleDiameter;

          if (k === 0) {
            let verticalY = adjustedY - leftCircleDiameter / 2;
            for (let j = 0; j < 4; j++) {
              let verticalDiameter = random(rectWidth * 0.75, rectWidth * 1);
              circles.push({
                type: 'verticalCircle',
                x: leftStartX,
                y: verticalY - verticalDiameter / 2,
                diameter: verticalDiameter
              });
              verticalY -= verticalDiameter;
            }
          }
        }

        let rightDiameters = [];
        let rightTotalWidth = 0;
        for (let k = 0; k < 3; k++) {
          let rightDiameter = random(rectWidth * 0.5, rectWidth);
          rightDiameters.push(rightDiameter);
          rightTotalWidth += rightDiameter;
        }

        let rightStartX = currentX - circleDiameter / 2 + fifthCircleDiameter / 2;
        for (let k = 0; k < 3; k++) {
          let rightCircleDiameter = rightDiameters[k];
          circles.push({
            type: 'circle',
            x: rightStartX + rightCircleDiameter / 2,
            y: adjustedY,
            diameter: rightCircleDiameter
          });
          rightStartX += rightCircleDiameter;

          if (k === 2) {
            let verticalY = adjustedY - rightCircleDiameter / 2;
            for (let j = 0; j < 4; j++) {
              let verticalDiameter = random(rectWidth * 0.75, rectWidth * 1);
              circles.push({
                type: 'verticalCircle',
                x: rightStartX,
                y: verticalY - verticalDiameter / 2,
                diameter: verticalDiameter
              });
              verticalY -= verticalDiameter;
            }
          }
        }
      }

      let topYPosition = verticalY;
      let topDiameters = [];
      let topTotalWidth = 0;
      for (let k = 0; k < 3; k++) {
        let topDiameter = random(rectWidth * 0.5, rectWidth);
        topDiameters.push(topDiameter);
        topTotalWidth += topDiameter;
      }

      let topStartX = currentX - circleDiameter / 2 - topTotalWidth / 2;
      for (let k = 0; k < 3; k++) {
        let topCircleDiameter = topDiameters[k];
        circles.push({
          type: 'circle',
          x: topStartX + topCircleDiameter / 2,
          y: topYPosition - topCircleDiameter / 2,
          diameter: topCircleDiameter
        });
        topStartX += topCircleDiameter;
      }
    }
  }
}

function drawNextCircle() {
  if (currentCircleIndex < circles.length) {
    let circleData = circles[currentCircleIndex];
    if (circleData.type === 'circle') {
      let circle = new BicolorCircle(circleData.x, circleData.y, circleData.diameter);
      circle.display();
    } else if (circleData.type === 'verticalCircle') {
      push();
      translate(circleData.x, circleData.y);
      rotate(HALF_PI);
      let verticalCircle = new BicolorCircle(0, 0, circleData.diameter);
      verticalCircle.display();
      pop();
    }

    currentCircleIndex++;

    // Wait 200ms after each circle is drawn before drawing the next one.
    setTimeout(drawNextCircle, 200);
  } else if (isFirstDraw) {
    isFirstDraw = false;
    isSecondDraw = true;
    clear();
    // keep background don't change
    drawStaticBackground(); 
    currentCircleIndex = 0;
    drawNextCircle();
  } else if (isSecondDraw) {
    isSecondDraw = false;
    clear();
    // Keep the background unchanged and update the background line colour
    drawStaticBackground(); 
    currentCircleIndex = 0;
    drawNextCircle();
  }
}

// BicolorCircle class definition
class BicolorCircle {
  constructor(x, y, diameter, color1 = null, color2 = null) {
    this.x = x;
    this.y = y;
    this.diameter = diameter;
    this.color1 = color1;
    this.color2 = color2;
  }

  display() {
    // Fixed colours are used if it's the first time they are drawn
    if (isFirstDraw) {
      stroke('#455158');
      strokeWeight(3);

      // Draw the top half red
      fill('#fc4b46');
      arc(this.x, this.y, this.diameter, this.diameter, PI, 0);

      // Drawing the lower half green
      fill('#5ea269');
      arc(this.x, this.y, this.diameter, this.diameter, 0, PI);

      // Drawing the yellow line dividing the centre
      stroke('#e4be6e');
      line(this.x - this.diameter / 2 + 3, this.y, this.x + this.diameter / 2 - 3, this.y);
    } else {
      // Use random colours
      stroke('#C9C9C9');
      strokeWeight(3);
      let color1 = color(random(255), random(255), random(255));
      let color2 = color(random(255), random(255), random(255));

      fill(color1);
      ellipse(this.x, this.y, this.diameter);

      fill(color2);
      ellipse(this.x, this.y, this.diameter * 0.5);
    }
  }
}
function drawGreenSquares() {
  let squareSize = height * 0.1;
  let numSquares = width / squareSize;
  let yPositionBase = height * 0.7;

  fill(squareColor);
  stroke(strokeColor);
  strokeWeight(3);

  for (let i = 0; i < numSquares; i++) {
    let yOffset = random(-5, 5); // Random offsets up and down, ranging from -5 to 5 pixels
    rect(i * squareSize, yPositionBase + yOffset, squareSize, squareSize);
  }
}

  
// Creating a base
function createBase() {
  // Proportionally sizing small rectangles
  let squareSize = height * 0.1;
  let baseWidth = squareSize * 3.5;
  let rectWidth = baseWidth / 6;
  let rectHeight = rectWidth * 1.5;
  let yPosition = height * 0.7 - rectHeight / 2;

  // Create small rectangles for the base and store them in an array.
  baseUnits = [];
  for (let i = 0; i < 6; i++) {
    let x = (width - baseWidth) / 2 + i * rectWidth;
    let color = random(baseColors);
    let unit = new RectangleUnit(x, yPosition, rectWidth, rectHeight, color);
    baseUnits.push(unit);
  }
}

// Drawing the base
function drawBase() {
  // Drawing the peripheral stroke of the base
  let squareSize = height * 0.1;
  let baseWidth = squareSize * 3.5;
  let rectHeight = (baseWidth / 6) * 1.5;
  let yPosition = height * 0.7 - rectHeight / 2;

  push();
  translate((width - baseWidth) / 2, yPosition);
  stroke(strokeColor);
  strokeWeight(3);
  noFill();
  rect(-3, -3, baseWidth + 6, rectHeight + 6);
  pop();
  // Draw each small rectangle
  for (let unit of baseUnits) {
    unit.display();
  }
}
// RectangleUnit class
class RectangleUnit {
  constructor(x, y, width, height, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.semicircleDiameter = random(width * 0.5, width * 0.75);
    this.bottomSemicircleColor = random(baseColors);
  }

  display() {
    let noiseFactor = noise(this.x * 0.01, timeOffset) * 5;
    let animatedY = this.y + noiseFactor;
    // Small rectangular base
    stroke('#e4be6e');
    strokeWeight(3);
    fill(this.color);
    rect(this.x, animatedY, this.width, this.height);

    // Drawing the bottom half-circle
    noStroke();
    fill(this.bottomSemicircleColor);
    arc(
      this.x + this.width / 2,
      animatedY + this.height - 1.5,
      this.semicircleDiameter,
      this.semicircleDiameter,
      PI, TWO_PI
    );
  }
}

// Adaptation to screen size
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  setup();
}

// I use ChatGPT to help me check and fix Big Momma's mistakes: https://chatgpt.com/share/672d900f-1154-8007-8f61-5c3fb47c4810