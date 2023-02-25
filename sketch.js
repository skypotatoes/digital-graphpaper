//Initial setup: set the cursor position and window zoom here
// set the cursor starting position here
let CursorStartX = -4.602;
let CursorStartY = 1.295;
//Adjust starting scale here:
let yScale = 89;
let xScale = 71;

let cnv;
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
  cnv=createCanvas(graphX, graphY);

}




let xPos = 0 - xScale * CursorStartX;
let yPos = 0 - yScale * -CursorStartY;
function draw() {
  clear();
  if (keyIsDown(UP_ARROW)) {
    
    yScale += 1

    if(keyIsDown(16)){
      yScale+=1
    }

   // console.log("yScale: " + yScale)
  }
  if (keyIsDown(DOWN_ARROW)) {
    yScale -= 1
    if(keyIsDown(16)){
      yScale-=1
    }
  }
  if (yScale < 15) { yScale = 15; }
  if (xScale < 15) { xScale = 15; }
  if (keyIsDown(LEFT_ARROW)) {
    
    xScale -= 1;
    if(keyIsDown(16)){
      xScale-=1
    }
  }
  if (keyIsDown(RIGHT_ARROW)) {
    xScale += 1
    if(keyIsDown(16)){
      xScale+=1
    }
    //console.log("xScale: " + xScale)
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
  //    console.log("i: "+i)
  //    console.log("graphY: "+graphY)
  //    console.log("yScale: "+yScale)
  //determine how many markers should be appearing onscreen.
  //how much space is above the origin?
  let pixelsAboveOrigin = (height - 1) / 2 + yPos
  let pixelsBelowOrigin = (height - 1) / 2 - yPos
  //how much space is below the origin?
  //  console.log("pixels below 0,0: "+belowOriginY)
  let pixelsLeftOfOrigin = (width - 1) / 2 + xPos
  let pixelsRightOfOrigin = (width - 1) / 2 - xPos
  //console.log(pixelsRightOfOrigin)

  //console.log("pixels left of Origin: "+pixelsLeftOfOrigin)
  //console.log("pixels right of Origin: "+ pixelsRightOfOrigin)

  //console.log("leftOfOrigin: "+pixelsLeftOfOrigin)
  //console.log("rightOfOrigin: "+pixelsRightOfOrigin); 

  let integersAbove = Math.floor(pixelsAboveOrigin / yScale)
  let integersBelow = Math.floor(pixelsBelowOrigin / yScale)
  let integersLeft = Math.floor(pixelsLeftOfOrigin / xScale)
  let integersRight = Math.floor(pixelsRightOfOrigin/xScale)
  // console.log("left: "+integersLeft)
  // console.log("right: "+integersRight)
  

  //console.log("points below: "+pointsBelow)
  for (let i = -integersBelow;
    i <= integersAbove + 1;    //i <= integersAbove origin
    i++) {
    if (pixelsLeftOfOrigin <= 0) {
      push();
      line(-pixelsLeftOfOrigin, 0 - yScale * i, (-pixelsLeftOfOrigin + xScale), (0 - yScale * i))
      stroke('green')
      line((-pixelsLeftOfOrigin + xScale), (0 - yScale * i), (-pixelsLeftOfOrigin + xScale), (0 - yScale * (i - 1)))
      stroke('red');
      textFont('Courier');
      textSize(16);
      text(i, -pixelsLeftOfOrigin, 7 - yScale * i) // displays the integer e.g. 1,2,etc
      stroke('black')
      pop();
    }

    if (pixelsRightOfOrigin - xScale <= 0) {
      push();
      line(((pixelsRightOfOrigin - xScale)), (0 + yScale * i), width, (0 + yScale * i));
      stroke('green');
      line((pixelsRightOfOrigin - xScale), (0 - yScale * i), (pixelsRightOfOrigin), (1 - yScale * (i)));
      line((pixelsRightOfOrigin - xScale), (0 - yScale * i), (pixelsRightOfOrigin - xScale), (1 - yScale * (i - 1)));
      stroke('red');
      textFont('Courier');
      textSize(16);
      text(i, pixelsRightOfOrigin - xScale, 7 - yScale * i) // displays the integer e.g. 1,2,etc
      pop();
    }
  
 

//the y-axis and integers marks
    line(xScale, -yScale * i, 0, -yScale * i)
    push();
    stroke('red')
    textSize(16);
    noFill();
    textFont('Courier');
    text(i, 0, 7 - yScale * i)
    stroke('grey')
    line(-pixelsLeftOfOrigin,0-i*yScale, pixelsRightOfOrigin,0-i*yScale)

    pop();



//circle(-pixelsLeftOfOrigin,0-i*yScale,50)
//circle(pixelsRightOfOrigin,0-i*yScale,50)

  }


  for (let j = -integersLeft;
    j <= integersRight + 1;    //i <= integersAbove origin
    j++) {
     // console.log(j)
     
     if (pixelsBelowOrigin <= 0) {
       push();
      //  circle(xScale*j,pixelsBelowOrigin-yScale,30)
      //  circle(xScale*j,0+pixelsBelowOrigin,30)
      stroke('green') ;
       line(xScale*j,pixelsBelowOrigin-yScale,xScale*j,0+pixelsBelowOrigin)
    //   line(-pixelsLeftOfOrigin, 0 - yScale * i, (-pixelsLeftOfOrigin + xScale), (0 - yScale * i))
    //   
    //   line((-pixelsLeftOfOrigin + xScale), (0 - yScale * i), (-pixelsLeftOfOrigin + xScale), (0 - yScale * (i - 1)))
      stroke('red');
      textFont('Courier');
      textSize(16);
       text(j, xScale*j,0+pixelsBelowOrigin) // displays the integer e.g. 1,2,etc
    //   stroke('black')
       pop();
      }

    // if (pixelsRightOfOrigin - xScale <= 0) {
    //   push();
    //   line(((pixelsRightOfOrigin - xScale)), (0 + yScale * i), width, (0 + yScale * i));
    //   stroke('green');
    //   line((pixelsRightOfOrigin - xScale), (0 - yScale * i), (pixelsRightOfOrigin), (1 - yScale * (i)));
    //   line((pixelsRightOfOrigin - xScale), (0 - yScale * i), (pixelsRightOfOrigin - xScale), (1 - yScale * (i - 1)));
    //   stroke('red');
    //   textFont('Courier');
    //   textSize(16);
    //   text(i, pixelsRightOfOrigin - xScale, 7 - yScale * i) // displays the integer e.g. 1,2,etc
    //   pop();
    // }

    
    line(xScale * width / 2, 0, -xScale * width / 2, 0) // the x-axis

//the x-axis and integers marks
line(xScale*j, -yScale, xScale*j, 0)
push();
stroke('red')
textSize(16);
noFill();
textFont('Courier');
text(j, (0 +xScale * j),0)
//console.log(0 +xScale * j)
stroke('grey')
line(j*xScale, -pixelsAboveOrigin,j*xScale, pixelsBelowOrigin)
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
  point(0, 0);
  textSize(16);
  noFill();
  textFont('Courier');
  text('x:' + -xPos / xScale, 10 - xPos, -yPos);
  text('y:' + yPos / yScale, 10 - xPos, 13 - yPos);
  text('xScale: ' + xScale, 10 - xPos, 40 - yPos)
  text('yScale: ' + yScale, 10 - xPos, 60 - yPos)
  // line(-xPos,-yPos,-xPos-25,-yPos)
  // text('xr:'+xScale, -20-xPos, -5-yPos)
  // text('yr:'+yScale,-10-xPos,-60-yPos)
  pop();
  pop();
}
