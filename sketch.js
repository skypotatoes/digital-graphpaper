//Initial setup: set the cursor position and window zoom here
// set the cursor starting position here
let CursorStartX = 5;
let CursorStartY = 10;
//Adjust starting scale here:
let yScale = 50;
let xScale = 230;

graphX = window.innerWidth;
graphY = window.innerHeight;
// graphX = 500;
// graphY = 500;


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

//define the function to be graphed
function f(x) { return Math.sin(x) }
//function f(x) { return x * x }
//function f(x) { return 2*x}
//set up 1:1 scale, where each pixel is an integer point on the graph
//let xMin = -graphX/2;//-250
//let xMax = 
let yMin = -graphY / 2;
let yMax = graphY / 2




let xMin = -graphX / 2 / xScale;
let xMax = graphX / 2 / xScale;
let step = 1 / xScale;

function getYScale(f) {
  return
}

//get every value of f(x) between xMin and xMax, using step as the space between points
let arr = [];
let Xarr = [];
let Yarr = [];

function getValues(f, xMin, xMax, step, xScale, yScale) {
  // console.log("xMin" + xMin);
  // console.log("xMax" + xMax);
  // console.log("step" + step);
  let Xarr = [];
  let Yarr = [];

  for (let i = xMin; i <= xMax; i += step) {

    arr[arr.length] = [i, f(i)];
    Xarr[Xarr.length] = [i]
    Yarr[Yarr.length] = f(i);

  }


  console.log("Number of points calculated: " + arr.length)

  xMin = Math.min(...Xarr);
  xMax = Math.max(...Xarr);
  xScale = (230)

  console.log("xScale set: " + xScale)

  yMin = Math.min(...Yarr);
  yMax = Math.max(...Yarr);
  //yScale = (yMax * graphY / 2);
  yScale = 230;
  console.log("yScale set: " + yScale)
  //step=(1/yScale)


  return arr;
}

arr = getValues(f, xMin, xMax, step);

function setup() {
  createCanvas(graphX, graphY);

}




let xPos = 0-xScale*CursorStartX;
let yPos = 0-yScale*-CursorStartY;
function draw() {
  clear();
  if (keyIsDown(UP_ARROW)) {

    yScale += 1
    console.log("yScale: " + yScale)
  }
  if (keyIsDown(DOWN_ARROW)) {
    yScale -= 1
    console.log("yScale: " + yScale)
  }
  if (yScale < 15) { yScale = 15; }
  if (keyIsDown(LEFT_ARROW)) {
    xScale -= 1
    console.log("xScale: " + xScale)
  }
  if (keyIsDown(RIGHT_ARROW)) {
    xScale += 1
    console.log("xScale: " + xScale)
  }
  if (keyIsDown(87)) {
    yPos += 1
  }
  if (keyIsDown(83)) {
    yPos -= 1
  }
  if (keyIsDown(65)) {
    xPos += 1;
  }
  if (keyIsDown(68)) {
    xPos -= 1;
  }

  background(220);

  //backHUD, the white circle behind the graph 
  push();
  circle(width / 2, height / 2, 50)
  stroke('red')
  point(width / 2, height / 2)
  pop();


  push();
  translate(xPos + width / 2, yPos + height / 2);//set 0,0 to the center of the screen
  //scale(1, -1); //flip the y-axis
  //now we can use co-ords of the graph to draw items on the screen
  line(xScale * width / 2, 0, -xScale * width / 2, 0) // the x-axis
  line(0, yScale * height / 2, 0, -yScale * height / 2) // the y-axis
  //numberline markers

  //however, i want to lay markers for each integer that is
  //onscreen, then change to integer*10 etc depending on scale

  // //this is where i lay down the axis marker 1-9etc lines     
  push();
  // for (let i = 1; i * yScale < graphY / 2; i++) {
  //    console.log("i: "+i)
  //    console.log("graphY: "+graphY)
  //    console.log("yScale: "+yScale)

  //   line(xScale, -yScale * i, 0, -yScale * i)
  //   //console.log("Spawned y-mark " + i)
  //   push();
  //   stroke('red')
  //   textSize(16);
  //   noFill();
  //   textFont('Courier');
  //   text(i, 0, 7 - yScale * i)
  //   pop();

  //   line(xScale, yScale * i, 0, yScale * i)
  //   //console.log("Spawned y-mark " + -i)
  //   push();
  //   stroke('red')
  //   textSize(16);
  //   noFill();
  //   textFont('Courier');
  //   text(-i, 0, 7 + yScale * i)
  //   pop();
  // }

  //determine how many markers should be appearing onscreen.
  //how much space is above the origin?
  let pixelsAboveOriginY = (height - 1) / 2 + yPos
  let pixelsBelowOriginY = (height - 1) / 2 - yPos
  // console.log("pixels above OriginY: "+pixelsAboveOriginY)
  // console.log("pixels below OriginY: "+pixelsBelowOriginY)
  //  console.log("pixels above 0,0: "+aboveOriginY)
  //how much space is below the origin?

  //  console.log("pixels below 0,0: "+belowOriginY)
  let pixelsLeftOfOrigin = (width - 1) / 2 + xPos
  let pixelsRightOfOrigin = (width - 1) / 2 - xPos


  //console.log("pixels left of Origin: "+pixelsLeftOfOrigin)
  //console.log("pixels right of Origin: "+ pixelsRightOfOrigin)

  //console.log("leftOfOrigin: "+pixelsLeftOfOrigin)
  //console.log("rightOfOrigin: "+pixelsRightOfOrigin); 

  let integersAbove = Math.floor(pixelsAboveOriginY / yScale)
  let integersBelow = Math.floor(pixelsBelowOriginY / yScale)
  let integersLeft = Math.floor(pixelsLeftOfOrigin / xScale)
  let integersRight = Math.floor(pixelsRightOfOrigin)

  //console.log("points below: "+pointsBelow)
  for (let i = -integersBelow;
    i <= integersAbove+1;
    //i <= integersAbove origin AND (i<=20 AND i>=-20)
    i++) {
    //    console.log(i)
    //    console.log("b@$%#!! : "+(i<=integersAbove && i<=20 ));

    if (pixelsLeftOfOrigin <= 0){
      //console.log("The origin is left of the left screen edge") 
     // console.log("Pixels Left of Origin"+pixelsLeftOfOrigin)
     // consodle.log("integers above: "+integersAbove)
      //   s
      //   
      push();
        line(-pixelsLeftOfOrigin, 0-yScale*i,(-pixelsLeftOfOrigin + xScale), (0-yScale*i))
        //console.log("# Spawned leftEdge:" + i)
        stroke('green')
        circle((-pixelsLeftOfOrigin + xScale),(0-yScale*i),3)
        line((-pixelsLeftOfOrigin + xScale),(0-yScale*i),(-pixelsLeftOfOrigin + xScale),(0-yScale*(i-1))) 
        //^^^    x coords are good, need to correct ycoords
    //    console.log("point x1,y1: "+ (-pixelsLeftOfOrigin + xScale)+","+(0-yScale*i));
    //    console.log("point x2,y2: "+ (-pixelsLeftOfOrigin + xScale)+","+(0-yScale*(i-1)));
//need to spawn an additional extra point in the positive direction so green line continues to screen edge 
      //  console.log("yScale*i: "+yScale*i)
      //  console.log("i: "+i)
      //  console.log("x,y: "+(-pixelsLeftOfOrigin + xScale)+ ","+yScale*i)
          stroke('red')
          textFont('Courier')
          textSize(16);
           text(i, -pixelsLeftOfOrigin, 7 - yScale * i) // displays the integer e.g. 1,2,etc
           stroke('black')
          // text("x: "+((-pixelsLeftOfOrigin + xScale)),(10-pixelsLeftOfOrigin + xScale),(0-yScale*i))
          //w text("y: "+(yScale*i),(10-pixelsLeftOfOrigin + xScale),13-(yScale*i));


  // text('x:' + -xPos / xScale, 10 - xPos, -yPos);
  // text('y:' + yPos / yScale, 10 - xPos, 13 - yPos)


        pop();
      
  
  }
     
    line(xScale, -yScale * i, 0, -yScale * i)
    //console.log("# Spawned:" + i)
    push();
    stroke('red')
    textSize(16);
    noFill();
    textFont('Courier');
    text(i, 0, 7 - yScale * i)
    pop();



  }




  pop();


  //height of screen  



  push();
  scale(1, -1);
  for (let i = 0; i < arr.length - 1; i++) {
    line(arr[i][0] * xScale, arr[i][1] * yScale, arr[i + 1][0] * xScale, arr[i + 1][1] * yScale)
    circle(arr[i][0] * xScale, arr[i][1] * yScale, 5)
    //point((arr[i][0]*xScale,arr[i][1]*yScale))
  }
  pop();
  //frontHUD, the red dot in front of the graph
  push();


  //scale(1, -1); //flip the y-axis
  stroke('red');
  const Dot = (0, 0)
  point(Dot);
  textSize(16);
  noFill();
  textFont('Courier');
  text('x:' + -xPos / xScale, 10 - xPos, -yPos);
  text('y:' + yPos / yScale, 10 - xPos, 13 - yPos);
  text('xScale: '+xScale,10-xPos,40-yPos)
  text('yScale: '+yScale,10-xPos,60-yPos)
  // line(-xPos,-yPos,-xPos-25,-yPos)
  // text('xr:'+xScale, -20-xPos, -5-yPos)
  // text('yr:'+yScale,-10-xPos,-60-yPos)
  pop();
  pop();
}
