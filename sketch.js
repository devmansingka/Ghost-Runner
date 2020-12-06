var gameState = "play";

var tower, towerImage;
var door, doorImage, doorGroup;
var climber, climberImage, climberGroup;
var invisibleBlock, invisibleBlockGroup;
var ghost, ghostImage;
var spookySound;

function preload() {
  towerImage = loadImage("tower.png");
  doorImage = loadImage("door.png");
  climberImage = loadImage("climber.png");
  ghostImage = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
  
};

function setup() {
  createCanvas(600, 600);
  
  tower = createSprite(300, 300, 600, 600);
  tower.addImage(towerImage);
  tower.velocityY = 1;
  
  ghost = createSprite(300, 300, 10, 10);
  ghost.addImage(ghostImage);
  ghost.scale = 0.4;
  
  doorGroup = new Group();
  climberGroup = new Group();
  invisibleBlockGroup = new Group();
  
  //spookySound.loop();
  
};

function draw() {
  background("black");
  
  if(gameState === "play") {
    
  //make tower never ending
  if(tower.y > 400) {
    tower.y = 300;
  }
  
  //jump control for ghost
  if(keyDown("space")) {
    ghost.velocityY = -5;
  }
  
  //add gravity
  ghost.velocityY += 0.8;
  
  //moving control for ghost
  if(keyDown("right")) {
    ghost.x += 3;
  };
  
  if(keyDown("left")) {
    ghost.x -= 3;
  };
    
  //make ghost stand on climber
  if(ghost.isTouching(climberGroup)) {
    ghost.velocityY = 0;
  }
  
  //add game commands
  if(ghost.isTouching(invisibleBlockGroup) || 
    ghost.y > 600) {
    gameState = "end";
  }
  
  spawnDoors();
  
  drawSprites();
  }
  
  if(gameState === "end") {
    stroke("yellow");
    fill("yellow");
    textSize(50);
    text("Game Over", 170, 300);
  }
};

function spawnDoors() {
  if(frameCount % 240 === 0) {
    door = createSprite(300, -50, 10, 10);
    door.addImage(doorImage);
    
    climber = createSprite(300, 10, 10, 10);
    climber.addImage(climberImage);
    
    invisibleBlock = createSprite(300, 15, 100, 10);
    invisibleBlock.visible = false;
    
    door.x = Math.round(random(120, 400));
    climber.x = door.x;
    invisibleBlock.x = door.x;
    
    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleBlock.velocityY = 1;
    
    door.lifetime = 700;
    climber.lifetime = 700;
    invisibleBlock.lifetime = 700;
    
    doorGroup.add(door);
    climberGroup.add(climber);
    invisibleBlockGroup.add(invisibleBlock);
    
    ghost.depth = door.depth + 1;
  }
}