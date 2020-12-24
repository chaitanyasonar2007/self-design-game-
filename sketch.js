const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;


var gameState;
var PLAY,END;
var score;
var  bg,bgImg;
var gameoverImg,gameover;
var girlrunning,girl;
var coins,coinsGroup;
var invisibleGround;
var bomb,bombGroup;
var tomb,tombGroup;


function preload(){

    bgImg = loadImage("images/gamebackground.jpg");
    girlrunning = loadAnimation("images/Run(1).png","images/Run(2).png","images/Run(3).png","images/Run(4).png","images/Run(5).png","images/Run(6).png","images/Run(7).png","images/Run(8).png");
    coinsImg = loadImage("images/coins.png");
    bombImg = loadImage("images/Bomb.png");
    tombImg = loadImage("images/Tomb.png");
    gameoverImg = loadImage("images/gameover.jpg");

}
function setup(){
    var canvas = createCanvas(1350,600);
    engine = Engine.create();
    world = engine.world;

    
    ground = new Ground(645,525,1350,20);
    //ground.visible=false;
    invisibleGround = createSprite(645,545,1350,20);
    invisibleGround.visible=false;
    girl = createSprite(100,480,50,50);
    girl.addAnimation("girlisrunning",girlrunning);
    girl.scale=0.2;

    score = 0;
    
    
    coinsGroup = createGroup();
    bombGroup = createGroup();
    tombGroup = createGroup();
    
}

function draw(){
    background(bgImg);
    Engine.update(engine);

  if(gameState === PLAY){

    if(keyDown("space")&& girl.y >=100){
      girl.velocityY = -12;
      }

      if(keyDown("RIGHT_ARROW")){

        girl.x = girl.x+3;
  
      }

      if(keyDown("LEFT_ARROW")){

        girl.x = girl.x-3;
  
      }

      girl.velocityY = girl.velocityY + 0.8

     girl.collide(invisibleGround);

     spawnCoins();
    spawnBomb();
    spawnTomb();

    if(coinsGroup.isTouching(girl)){

      coinsGroup.destroyEach();
      score = score+1; 

     }   

  

    else {

      if(bombGroup.isTouching(girl)|| tombGroup.isTouching(girl)){
        gameState=END;
        bombGroup.destroyEach();
        tombGroup.destroyEach();
        girl.destroy();
        coinsGroup.destroyEach();
        background(gameoverImg);

        bombGroup.setLifetimeEach(0);
       tombGroup.setLifetimeEach(0);
       coinsGroup.setLifetimeEach(0);
       girl.setLifetime(0);

      }
    }
  }
    
    
   
    ground.display();

    drawSprites();

    textSize(25);
    fill("black");
    stroke("yellow");
    strokeWeight(4);
    text("Score : "+score,1100,75);


}


function spawnCoins() {
  
    if (frameCount % 600 === 0) {
      var coins = createSprite(1350,450,10,10);
      coins.y = Math.round(random(200,500));
      coins.addImage(coinsImg);
      coins.scale = 0.06;
      coins.velocityX = -3;
      
       //assign lifetime to the variable
      coins.lifetime = 650;
      
      //adjust the depth
      coins.depth = girl.depth;
      girl.depth = girl.depth + 1;
      
     
      coinsGroup.add(coins);
    }
  }

  function spawnBomb() {
  
    if (frameCount % 120 === 0) {
      var bomb = createSprite(1350,450,10,10);
      bomb.y = Math.round(random(200,400));
      bomb.addImage(bombImg);
      bomb.scale = 0.6;
      bomb.velocityX = -3;
      
       //assign lifetime to the variable
      bomb.lifetime = 650;
      
      //adjust the depth
      bomb.depth = girl.depth;
      girl.depth = girl.depth + 1;
      
    
      bombGroup.add(bomb);
    }
  }

  function spawnTomb() {
  
    if (frameCount % 350 === 0) {
      var tomb = createSprite(1350,500,10,10);
      //tomb.y = Math.round(random(200,400));
      tomb.addImage(tombImg);
      tomb.scale = 0.7;
      tomb.velocityX = -3;
      
       //assign lifetime to the variable
      tomb.lifetime = 650;
      
      //adjust the depth
      tomb.depth = girl.depth;
      girl.depth = girl.depth + 1;
      
     
      tombGroup.add(tomb);
    }
  }

  



