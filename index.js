import levels from './levels/levels.js';
//-------------------------------DOM Things--------------------------------------
const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');
canvas.width = 1200;
canvas.height = 900;
const deathsEl = document.querySelector('#deathsEl');
const startGameBtn = document.querySelector('#startGameBtn');
const modalEl = document.querySelector('#modalEl');
const statsEl = document.querySelector('#statsEl');
const bigScoreEl = document.querySelector('#bigScoreEl');
//-------------------------------------------------------------------------------
//-----------------------------Global variables----------------------------------
//Main game loop related vars
let stop = false;
let fpsInterval = 1000 / 60;
let then;
let startTime;
let now;
let elapsed;
let animationId;
let isFirstTime = true;
//Level related vars
let level;
let tileWidth;
let tileHeight;
let currentLevel = 0;
let currentLevelPixels = [];
let difficulty = 4  ;
//Player related vars
let player;
let playerImg;
let vxr = 0;
let vxl = 0;
let vy = 0;
//Enemy related vars
let enemies = [];
let enemyBlueImg;
//Sound related vars
let awesomeSound;
let beginSound;
let dieSound;
let excellentSound;
let wonderfulSound;
//Music related vars
let easyMusic;
let mediumMusic;
let hardMusic;
let hellmodeMusic;
let musicList = [];
let musicRepeatCounter = 2;
let currentSong;
//global CONSTs
const COLOR_BLACK = 'rgba(0,0,0,1)';
const COLOR_WHITE = 'rgba(255,255,255,1)';
const COLOR_GRAY = 'rgba(192,192,192,1)';
const COLOR_GREEN = 'rgba(0,255,0,1)';
const COLOR_CYAN = 'rgba(0,255,255,1)';
const COLOR_YELLOW = 'rgba(255,255,0,1)';
const TILESIZE = 40;
//-------------------------------------------------------------------------------
//--------------------------------CLASSES----------------------------------------
class Player {
  constructor(x, y, speed, size, img) {
    this.x = x;
    this.y = y;
    this.img = img;
    this.speed = speed;
    this.isMoving = false;
    this.isMovingRight = false;
    this.isMovingLeft = false;
    this.isMovingUp = false;
    this.isMovingDown = false;
    this.tileCoord;
    this.tilePixelIndex;
    this.isCollidingX = false;
    this.isCollidingY = false;
    this.size = size;
    this.deaths = 0;
  }

  draw() {
    c.drawImage(this.img, this.x, this.y);
  } 

  update() {
    this.tileCoord = getTileCoord(this.x, this.y);
    this.tilePixelIndex = getPixelIndex(this.tileCoord);
    if (!this.isMovingDown && !this.isMovingLeft && !this.isMovingRight && !this.isMovingUp) {
      this.isMoving = false;
    }


    this.isColliding();
    if (this.isMoving && !this.isCollidingX) {
      this.x += vxr;
      this.x += vxl
    }
    if (this.isMoving && !this.isCollidingY){
      this.y += vy;
    }
    this.isCollidingX = false;
    this.isCollidingY = false; 
  }

  isColliding() {
    if(this.isMovingRight) {
      let ftcX = getTileCoord((this.x - 2 + this.size) + vxr, this.y);
      let ftcXi = getPixelIndex(ftcX);

      let ftcX2 = getTileCoord((this.x - 2 + this.size) + vxr, this.y + this.size - 2);
      let ftcXi2 = getPixelIndex(ftcX2);
      if (isBlack(level.levelPixels[ftcXi]) || isBlack(level.levelPixels[ftcXi2])){
        this.isCollidingX = true;
      }
    }
    if(this.isMovingLeft) {
      let ftcX = getTileCoord((this.x) + vxl, this.y);
      let ftcXi = getPixelIndex(ftcX);

      let ftcX2 = getTileCoord((this.x) + vxl, this.y + this.size - 2);
      let ftcXi2 = getPixelIndex(ftcX2);
      if (isBlack(level.levelPixels[ftcXi]) || isBlack(level.levelPixels[ftcXi2])){
        this.isCollidingX = true;
      }
    }
    if(this.isMovingUp) {
      let ftcY = getTileCoord(this.x, this.y + vy);
      let ftcYi = getPixelIndex(ftcY);

      let ftcY2 = getTileCoord(this.x + this.size - 2, this.y + vy);
      let ftcYi2 = getPixelIndex(ftcY2);
      if (isBlack(level.levelPixels[ftcYi]) || isBlack(level.levelPixels[ftcYi2])){
        this.isCollidingY = true;
      }
    }
    if(this.isMovingDown) {
      let ftcY = getTileCoord(this.x, this.y + this.size - 2 + vy);
      let ftcYi = getPixelIndex(ftcY);

      let ftcY2 = getTileCoord(this.x + this.size - 2, this.y + this.size - 2 + vy);
      let ftcYi2 = getPixelIndex(ftcY2);
      if (isBlack(level.levelPixels[ftcYi]) || isBlack(level.levelPixels[ftcYi2])){
        this.isCollidingY = true;
      }
    }
  }

  die() {
    this.deaths++;
    dieSound.play();
    musicList[difficulty -1].pause();
    this.respawn();
  }

  respawn(){
    this.x = levels[currentLevel].playerSpawn.x * TILESIZE;
    this.y = levels[currentLevel].playerSpawn.y * TILESIZE;
    playMusic();
  }
}
//--------
class Enemy {
  constructor(x, y, speed, img, id) {
    this.x = x + 8;
    this.y = y + 8;
    this.speed = speed;
    this.img = img;
    this.originX = this.x;
    this.originY = this.y;
    this.id = id;
    this.currentPath = 0;
    this.destinyX;
    this.destinyY;
    this.size = 24;
    this.getNextDestiny();
  }

  move(){
    if(this.destinyX >= this.x) {
      if(this.destinyX - this.x <= this.speed) {
        this.x = this.destinyX;
      }else {
        this.x += this.speed;
      }
    }else if(this.destinyX <= this.x) {
      if(this.x - this.destinyX <= this.speed) {
        this.x = this.destinyX;
      }else {
        this.x -= this.speed;
      }
    }
    if(this.destinyY >= this.y) {
      if(this.destinyY - this.y <= this.speed) {
        this.y = this.destinyY;
      }else {
        this.y += this.speed;
      }
    }else if(this.destinyY <= this.y) {
      if(this.y - this.destinyY <= this.speed) {
        this.y = this.destinyY;
      }else {
        this.y -= this.speed;
      }
    }

    if (this.destinyX == this.x && this.destinyY == this.y) {
      this.getNextDestiny();
    }

  }
  //The hardcoded "8" is there to actually center the thing in the middle of the tile
  getNextDestiny() {
    if (this.currentPath == 0) { //Origin to first
      this.destinyX = (levels[currentLevel].enemyPath[this.id][this.currentPath].x * TILESIZE) + 8;
      this.destinyY = (levels[currentLevel].enemyPath[this.id][this.currentPath].y * TILESIZE) + 8;
      this.currentPath++;
    } else {
      if(!levels[0].enemyPath[this.id][this.currentPath]){ //No more destinations? back to origin
        this.destinyX = this.originX;
        this.destinyY = this.destinyY;
        this.currentPath = 0;
      } else { //More destinations? go for them
        this.destinyX = (levels[currentLevel].enemyPath[this.id][this.currentPath].x * TILESIZE) + 8;
        this.destinyY = (levels[currentLevel].enemyPath[this.id][this.currentPath].y * TILESIZE) + 8;
        this.currentPath++;
      }
    }
  }

  isColliding(){
    if (player.x > this.size + this.x || this.x > player.size + player.x || player.y > this.size + this.y || this.y > player.size + player.y){
      return false;
    }else{
      player.die();
    }

    
  }

  update(){
    this.move();
    this.isColliding();
  }

  draw(){
    c.drawImage(this.img, this.x, this.y);
  }
}
//--------
class Level {
  constructor(levelPixels, tileWidth, tileHeight){
    this.levelPixels = levelPixels;
    this.tileSize = TILESIZE;
    this.tileWidth = tileWidth;
    this.tileHeight = tileHeight;
    this.loadEntities();
  }

  loadEntities(){
    for (let i = 0; i < levels[currentLevel].enemies; i++) {
      enemies.push(new Enemy(levels[currentLevel].enemySpawn[i].x * TILESIZE, levels[currentLevel].enemySpawn[i].y * TILESIZE, levels[currentLevel].enemySpeed * difficulty , enemyBlueImg, i));
    }
  }

  draw(){
    let yOffset = 0;
    let xOffset = 0;
    let color;
    let x = 0;
    for (let i = 0; i < this.levelPixels.length; i++) {
      if(isBlack(this.levelPixels[i])) color = COLOR_BLACK;
      else if(isWhite(this.levelPixels[i])) color = COLOR_WHITE;
      else if(isGray(this.levelPixels[i])) color = COLOR_GRAY;
      else if(isGreen(this.levelPixels[i])) color = COLOR_GREEN;
      else if(isCyan(this.levelPixels[i])) color = COLOR_CYAN;
      else if(isYellow(this.levelPixels[i])) color = COLOR_YELLOW;
      if (x < this.tileWidth) {
        createRect(xOffset, yOffset, this.tileSize, this.tileSize, color);
        xOffset += this.tileSize;
        x++;
      }
      else{
        xOffset = 0;
        x = 1;
        yOffset += this.tileSize;
        createRect(xOffset, yOffset, this.tileSize, this.tileSize, color);
        xOffset += this.tileSize;
      } 
    }
  } 
}
//----------------------------------------------------------------------------------------
//-------------------------------- LEVEL INITIALIZATION ----------------------------------------
function init() {
  level = new Level(currentLevelPixels, tileWidth, tileHeight);
  let playerSpeed = 2;
  let playerSize = 30;
  player = new Player(levels[currentLevel].playerSpawn.x * TILESIZE, levels[currentLevel].playerSpawn.y * TILESIZE, playerSpeed, playerSize, playerImg); 
}
//----------------------------------------------------------------------------------------
//-----------------------------------MAIN-------------------------------------------------
function animate () {
  if (stop) return;
  animationId = requestAnimationFrame(animate);
  now = Date.now();
  elapsed = now - then;

  if (elapsed > fpsInterval) { //Only executes in interval time
    then = now - (elapsed % fpsInterval);
    c.fillStyle = COLOR_BLACK;
    c.clearRect(0,0, canvas.width, canvas.height);

    update();
    draw();
  }
}

function update () {
  deathsEl.innerHTML = player.deaths;
  player.update();
  enemies.forEach((enemy => {
    enemy.update();
  }))
}

function draw() {
  level.draw();
  player.draw();
  
  enemies.forEach((enemy => {
    enemy.draw();
  }))
}
//-------------------------------------------------------------------------------------
// -----------------------------------Utils--------------------------------------------
function createRect(x,y,width, height,color) {
  c.fillStyle = color;
  c.fillRect(x, y, width, height);
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

function getTileCoord(x, y) {
  let tileX = Math.floor(x / TILESIZE);
  let tileY = Math.floor(y / TILESIZE);
  return {x: tileX, y: tileY};
}

function getPixelIndex(coords) {
  return coords.x + (coords.y * level.tileWidth);
}

function playMusic() {
  if (difficulty == 4) {
    musicList[difficulty - 1].play();
    return;
  }
  if (isFirstTime) {
    musicList[difficulty - 1].currentTime = 0;
    currentSong = musicList[difficulty - 1];
    musicList[difficulty - 1].play();
    isFirstTime = false;
    musicRepeatCounter --;
  } else {
    if (musicRepeatCounter > 0) {
      currentSong.play();
      musicRepeatCounter --;
    }else {
      let randomizer = Math.floor(Math.random() * (6 - 1 + 1) + 1);
      console.log(randomizer);
      musicRepeatCounter = 2;
      randomizer == 1 ? musicList[difficulty - 1].currentTime = 0 : randomizer == 2 ? musicList[difficulty - 1].currentTime = 14 : randomizer == 3 ? musicList[difficulty - 1].currentTime = 51 : randomizer == 4 ? musicList[difficulty - 1].currentTime = 84 : musicList[difficulty - 1].currentTime = 99;
      musicList[difficulty -1].play();
    }
    
    
  }
  
}

function loadAll() {
  loadLevel(currentLevel);
  loadPlayer();
  loadEnemies();
  loadSounds();
  loadMusic();
}
//loaders
function loadLevel(level) {
  Jimp.read('./assets/levels/level1.png').then(image => {
    tileWidth = image.bitmap.width;
    tileHeight = image.bitmap.height;
    for (let i = 0; i < image.bitmap.height; i++) {
      for (let j = 0; j < image.bitmap.width; j++){
        currentLevelPixels.push(Jimp.intToRGBA(image.getPixelColor(j,i)));
      }
    }
  })
}
function loadPlayer() {
  playerImg = new Image();
  playerImg.src = './assets/player/player.png';
}
function loadEnemies(){
  enemyBlueImg = new Image();
  enemyBlueImg.src = './assets/enemies/enemyblue.png'
}
function loadSounds() {
  awesomeSound = new Audio();
  awesomeSound.src = './assets/sounds/awesome.wav';
  beginSound = new Audio();
  beginSound.src = './assets/sounds/begin.wav';
  dieSound = new Audio();
  dieSound.src = './assets/sounds/die.wav';
  excellentSound = new Audio();
  excellentSound.src = './assets/sounds/excellent.wav';
  wonderfulSound = new Audio();
  wonderfulSound.src = './assets/sounds/wonderful.wav';
}
function loadMusic() {
  easyMusic = new Audio();
  easyMusic.src = './assets/music/easy.dat';
  mediumMusic = new Audio();
  mediumMusic.src = './assets/music/medium.dat';
  hardMusic = new Audio();
  hardMusic.src = './assets/music/hard.dat';
  hellmodeMusic = new Audio();
  hellmodeMusic.src = './assets/music/hellmode.dat';
  musicList.push(easyMusic, mediumMusic, hardMusic, hellmodeMusic);
}
//------------------------------Event Listeners----------------------------------
startGameBtn.addEventListener('click', () =>{
  let difficultyRadioEl = document.querySelector('input[name="difficulty"]:checked').value;
  difficulty = difficultyRadioEl;
  then = Date.now();
  startTime = then;
  init();
  animate();
  modalEl.style.display = 'none';
  statsEl.style.visibility = 'visible';
  document.querySelector('body').style.background = '#00bbff';
  beginSound.play();
  playMusic();

  if (difficulty == 4) document.querySelector('canvas').classList.add("canvashell");
  if (difficulty == 4) document.querySelector('body').classList.add("hellmode");
  else if (difficulty == 1) document.querySelector('body').classList.add("easy");
  else if (difficulty == 2) document.querySelector('body').classList.add("medium");
  else if (difficulty == 3) document.querySelector('body').classList.add("hard");

})
window.addEventListener("keydown", (event) => {
  if (event.key == 'a') {
    player.isMoving = true;
    player.isMovingLeft = true;
    vxl = -player.speed;
  } else if (event.key == 'w'){
    player.isMoving = true;
    player.isMovingUp = true;
    vy = -player.speed;
  } else if (event.key == 'd') {
    player.isMoving = true;
    player.isMovingRight = true;
    vxr = player.speed;
  } else if (event.key == 's') {
    player.isMoving = true;
    player.isMovingDown = true;
    vy = player.speed;
  } 
  }
)
window.addEventListener("keyup", (event) => {
  if (event.key == 'a') {
    vxl = 0;
    player.isMovingLeft = false;
  } else if (event.key == 'w'){
    vy = 0;
    player.isMovingUp = false;
  } else if (event.key == 'd') {
    player.isMovingRight = false;
    vxr = 0;
  } else if (event.key == 's') {
    player.isMovingDown = false;
    vy = 0;
  } 

  }
)
//Load al images before player clicks start button
loadAll();