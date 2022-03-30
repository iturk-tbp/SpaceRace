var database
var playerCount = 0
var database
var gameState = 0
var form, player
var allPlayers
var bg, al, r1, r2, rocket1, rocket2, alien
var allPlayers, rockets, plr, all
var scores, score1, score2, alPos, bg2, index, mrRank
var alg, lifee, galien
function preload(){
  r1 = loadImage("assets/r1.png");
  r2 = loadImage("assets/r2.png");
  al = loadImage("assets/al.png");
  bg = loadImage("assets/bg.jpg");
  bg2 = loadImage("assets/bg2.jpg");
  alg = loadImage("assets/alg.png");
  lifee = loadImage("assets/life.png");
}

function setup(){
  var canvas = createCanvas(windowWidth,windowHeight);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
  
}

function draw(){
  background(bg)
  if(playerCount === 2){
    game.updateState(1);
  }
  if(gameState === 1){
    game.play();
  } 
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}


