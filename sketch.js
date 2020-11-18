
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage,backImg,back;
var FoodGroup, obstacleGroup;
var resart;
var score=0;
var survive; 
var PLAY = 1;
var END = 0;
var gameState = PLAY;
function preload(){
  
  
  backImg=loadImage("jungle.jpg");
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  
  background=createSprite(300,100);
  background.addImage(backImg);
  background.scale=1;
  
  
  monkey=createSprite(80,315);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;

  ground=createSprite(400,350,900,10);
  ground.velocityX=-5;
  ground.x=ground.width/2;
  console.log(ground.x);

  FoodGroup=createGroup();
  obstacleGroup=createGroup();
  
  restart = createSprite(200,200,20,20);
  restart.shapeColor = "#aaff11";
  restart.visible = false;
  
 
}


function draw() {
createCanvas(400,400);
  
  background.velocityX=-3;
     
  if(background.x<0) {
     background.x=background.width/2;
     }
   
  if(gameState===PLAY){
    survive=Math.ceil(frameCount/frameRate());
    if(keyDown("space") && monkey.y>305 ){
     monkey.velocityY=-14;
    
     }
      monkey.velocityY=monkey.velocityY+0.7;
    
     food();
    obstacles();
    
    if(monkey.isTouching(obstacleGroup)){
    
    gameState = END;
    
  }
    if(FoodGroup.isTouching(monkey)){
    FoodGroup.destroyEach();
    score=score+1;
    monkey.scale=0.11;
  }
     switch(score){
    case 10: monkey.scale=0.12;
      break;
      case 20: monkey.scale=0.13;
      break;
      case 30: monkey.scale=0.14;
      break;
      case 40: monkey.scale=0.15;
      break;
  }
    
  }
  
  else if (gameState===END){
    restart.visible = true;
   ground.velocityX = 0;
    monkey.velocityX = 0;
    
    FoodGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)){
      reset();
           
    }
    
  }
  
  
    
  
  
  

  monkey.collide(ground);
  
  
  
  
  monkey.depth=obstacleGroup.depthEach;
  monkey.depth=monkey.depth+1;
  
  
 
  
  
  
  
  
 
  
  ground.x=ground.width/2;
    ground.visible=false;
  
  
  monkey.setCollider("circle",0,0,300);
  obstacleGroup.setColliderEach("circle",0,0,200);
  obstacleGroup.debugEach=true;
  
  drawSprites();
  
  
  
  stroke("yellow");
   
  fill("yellow")
  text("Score: "+score,50,50);
  textSize(15);
  text("Score 50 points and Survive 100 seconds to win.",40,15);
  
  
  if(score===50 && survive>=100 && gameState===PLAY) {
    stroke("red");
  textSize(40);
  fill("red");
    text("You win!",100,200);
    ground.velocityX = 0;
    monkey.velocityY = 0;
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    background.velocityX=0;
       
  
    obstacleGroup.setLifetimeEach(-1);
   FoodGroup.setLifetimeEach(-1);
  }
  else
    {
      stroke("white");
  textSize(20);
  fill("white");
  
    text("Survival time: "+survive,200,50);
    }
}

function food() {
  if(frameCount%80===0){
    banana=createSprite(700,250);
    banana.addImage(bananaImage);
    banana.y=Math.round(random(120,200));
    banana.velocityX=-5;
    banana.scale=0.1;
    banana.lifetime=300;
    banana.depth=monkey.depth;
    monkey.depth=banana.depth+1;
    FoodGroup.add(banana);
  }
}
function obstacles(){
  if(frameCount%80===0){
    obstacle=createSprite(700,315);
    obstacle.addImage(obstacleImage);
    
    obstacle.velocityX=-(6+survive/10);
    obstacle.scale=0.15;
    obstacle.lifetime=300;
    obstacleGroup.add(obstacle);
  }
}
 function reset(){
   monkey.x = 80;
   monkey.y = 315;
   gameState = PLAY;
   score = 0;
   restart.visible = false;
   survive = 0;
   obstacles();
   food();
   }





