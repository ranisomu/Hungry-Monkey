var monkey , monkey_running;
var ground;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score, r;
var survivalTime;

function preload(){
  
 //preloading images
 monkey_running =                                          loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
 bananaImage = loadImage("banana.png");
 obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
  createCanvas(600,400);

  //creating monkey sprite
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;
  
  //creating ground sprite
  ground = createSprite(400,350,900,10);
  ground.velocityX = -4;
  ground.x = ground.width/2; 
  
  //creating groups for banana and obstacles
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
  
  score = 0;
  survivalTime = 0;
  
  monkey.setCollider("circle",0,0,260)
  monkey.debug = true;
}


function draw() {
  background("white");
  
  //display score and survival time
  fill("black");
  textSize(20);
  text("score : " + score,510,20)
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate());
  text("Survival Time : " + survivalTime,10,20)
  
  
  //making monkey jump with gravity
  if(keyDown("space")&& monkey.y >= 314) {
    monkey.velocityY = -18;
  }
  monkey.velocityY = monkey.velocityY + 1;
  monkey.collide(ground);
  
  //creating infinite ground
  //console.log(ground.x);
  if(ground.x < 150){
    ground.x = ground.width/2;
  }
  
  //calling food and obstacle function
  Food();
  Obstacle();
  
  if(FoodGroup.isTouching(monkey)) {
    FoodGroup.destroyEach();
    score = score + 1;
  }
  
  if(obstacleGroup.isTouching(monkey)) {
    ground.velocityX = 0;
    monkey.velocityY = 0;
    FoodGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    score = 0;
  }
  drawSprites();
  
}

function Food() {
  if(frameCount % 150 === 0) {
   r = Math.round(random(120,200));
   banana = createSprite(630,r,10,10); 
   banana.addAnimation("banana", bananaImage);
   banana.scale = 0.1;
   banana.velocityX = -4;
   banana.lifetime = 150;
   FoodGroup.add(banana);
  }
}

function Obstacle() {
  if(frameCount % 300 === 0) {
    obstacle = createSprite(630,330,20,20);
    obstacle.addAnimation("obstacle", obstacleImage);
    obstacle.scale = 0.09;
    obstacle.velocityX = -4;
    obstacle.lifetime = 160
    obstacleGroup.add(obstacle);
  }

}