//-------------------------------DOM Things--------------------------------------
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1200;
canvas.height = 1200;

const scoreEl = document.querySelector('#scoreEl');
const startGameBtn = document.querySelector('#startGameBtn');
const modalEl = document.querySelector('#modalEl');
const bigScoreEl = document.querySelector('#bigScoreEl');
//-------------------------------------------------------------------------------
//-----------------------------Global variables----------------------------------
let currentLevel = 1;
let currentLevelPixels = [];

let stop = false;

let fpsInterval = 1000 / 1;
let then;
let startTime;
let now;
let elapsed;

let level;
let tileWidth;
let tileHeight;

let animationId;

const COLOR_BLACK = 'rgba(0,0,0,1)';
const COLOR_WHITE = 'rgba(255,255,255,1)';
const COLOR_GRAY = 'rgba(192,192,192,1)';
const COLOR_GREEN = 'rgba(0,255,0,1)';
const COLOR_CYAN = 'rgba(0,255,255,1)';
const COLOR_YELLOW = 'rgba(255,255,0,1)';
const TILESIZE = 40;

//-------------------------------------------------------------------------------

class Level {
  constructor(levelPixels, tileWidth, tileHeight){
    this.levelPixels = levelPixels;
    this.tileSize = TILESIZE;
    this.tileWidth = tileWidth;
    this.tileHeight = tileHeight;
  }

  draw(){
    let yOffset = 0;
    let xOffset = 0;
    let color;
    let x = 0;
    
    for (let i = 0; i < this.tileWidth * this.tileHeight; i++) {
      if(isBlack(this.levelPixels[i])) color = COLOR_BLACK;
      else if(isWhite(this.levelPixels[i])) color = COLOR_WHITE;
      else if(isGray(this.levelPixels[i])) color = COLOR_GRAY;
      else if(isGreen(this.levelPixels[i])) color = COLOR_GREEN;
      else if(isCyan(this.levelPixels[i])) color = COLOR_CYAN;
      else if(isYellow(this.levelPixels[i])) color = COLOR_YELLOW;
      if (x < this.tileWidth) {
        console.log(x);
        createRect(xOffset, yOffset, TILESIZE, TILESIZE, color);
        xOffset += TILESIZE;
        x++;
      }
      else{
        xOffset = 0;
        x = 0;
        yOffset += TILESIZE;
      } 
    }
  } 
}


function isBlack (pixel) {
  return pixel.r === 0 && pixel.g === 0 && pixel.b === 0 ? true : null;
}
function isWhite (pixel) {
  return pixel.r === 255 && pixel.g === 255 && pixel.b === 255 ? true : null;
}
function isGray (pixel) {
  return pixel.r === 192 && pixel.g === 192 && pixel.b === 192 ? true : null;
}
function isGreen (pixel) {
  return pixel.r === 0 && pixel.g === 255 && pixel.b === 0 ? true : null;
}
function isCyan (pixel) {
  return pixel.r === 0 && pixel.g === 255 && pixel.b === 255 ? true : null;
}
function isYellow (pixel) {
  return pixel.r === 255 && pixel.g === 255 && pixel.b === 0 ? true : null;
}

//utils
function loadLevel(level) {
  Jimp.read('./assets/level1.png').then(image => {
    tileWidth = image.bitmap.width;
    tileHeight = image.bitmap.height;
    for (let i = 0; i < image.bitmap.width; i++) {
      for (let j = 0; j < image.bitmap.height; j++){
        currentLevelPixels.push(Jimp.intToRGBA(image.getPixelColor(j,i)));
      }
    }
  })
}

//init
function init() {
  loadLevel(currentLevel);
  setTimeout(() => {
    level = new Level(currentLevelPixels, tileWidth, tileHeight);
  },1000)
}

function animate () {
  if (stop) return;
  animationId = requestAnimationFrame(animate);
  now = Date.now();
  elapsed = now - then;

  if (elapsed > fpsInterval) { //Only executes in interval time
    then = now - (elapsed % fpsInterval);
    c.fillStyle = 'rgba(0,0,0,0)';
    c.clearRect(0,0, canvas.width, canvas.height);

    update();
    draw();
  }
}

function update () {

}

function draw() {
  level.draw();
}

function createRect(x,y,width, height,color) {
  c.fillStyle = color;
  c.fillRect(x, y, width, height);
}



//------------------------------Event Listeners----------------------------------
startGameBtn.addEventListener('click', () =>{
  then = Date.now();
  startTime = then;
  init();
  animate();
  modalEl.style.display = 'none';
})