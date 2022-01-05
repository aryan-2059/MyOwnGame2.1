var canvas, trashCount = 0, trashGroup;
var backgroundImage, spaceshipImage, background, spaceship;
var fuelImage, trash1, trash2, lifeImage, obstacle1Image, obstacle2Image, trash; 
var blastImage, blast;                 
var gameState;
var obstacleGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var play = 1;
var end = 2;
var instruction = 0;
var gameState = instruction;
var endline, p1, p2;

function preload() {
  backgroundImage = loadImage("./assets/background.png");
  blastImage = loadImage("./assets/blast.png");
  fuelImage = loadImage("./assets/fuel.png");
  trash1 = loadImage("./assets/trash1.png");
  trash2 = loadImage("./assets/trash2.jpg");
  lifeImage = loadImage("./assets/life.png");
  obstacle1Image = loadImage("./assets/obstacle1.jpg"); 
  obstacle2Image = loadImage("./assets/obstacle2.png"); 
  obstacle3 = loadImage("./assets/obstacle3.jpg");
  obstacle4 = loadImage("./assets/obstacle4.jpg");
  obstacle5 = loadImage("./assets/obstacle5.jpg");
  obstacle6 = loadImage("./assets/obstacle6.png");
  spaceshipImage = loadImage("./assets/spaceship.png"); 
}

function setup() {
  
  canvas = createCanvas(1000, 700);
  background = createSprite(250,350,30,20);
  background.addImage(backgroundImage);
  background.velocityY = (5 + trashCount/10);

  spaceship = createSprite(250,600);
  spaceship.addImage(spaceshipImage);
  spaceship.scale = 0.6;
  
  p1 = createSprite(250,600);
  p1.setCollider("rectangle",70,-27,5,265,156);
  p1.visible = false;
  p2 = createSprite(250,600); 
  p2.setCollider("rectangle",-70,-27,5,265,24);
  p2.visible = false;
  
  trashGroup = new Group();
  obstacleGroup = new Group();

  endline = createSprite(250,700,500,5);
  endline.visible = false;
  
}

function draw() {
  
  if(gameState === play){
    if(background.y > 800) {
      background.y = 300;
    }
  

  if(keyDown("up")){
    spaceship.y = spaceship.y +10;
    p1.y = p1.y + 10;
    p2.y = p2.y + 10;   
  }
    
  if(keyDown("left")){
    spaceship.x = spaceship.x - 10;
    p1.x = p1.x - 10;
      p2.x = p2.x - 10;
  }
    
  if(keyDown("right")){
    spaceship.x = spaceship.x + 10;
    p1.x = p1.x + 10;
    p2.x = p2.x + 10;
  }
    
  if(keyDown("down")){
    spaceship.y = spaceship.y -10;
    p1.y = p1.y - 10;
    p2.y = p2.y - 10;   
  }

if(spaceship.isTouching(trashGroup)){
  trashCount = trashCount + 1;
}

  if(obstacleGroup.isTouching(p2) || obstacleGroup.isTouching(p1)) {
    obstacleGroup.destroyEach();
    var blast = createSprite(spaceship.x,spaceship.y - 50);
    blast.addImage(blastImage);
    blast.lifetime = 25;
    spaceship.destroy();
    gameState = end;
  }
  trashe();
  obstacles();
  drawSprites();

  stroke("white");
  fill("white");
  textSize(30);
  text("Trash Count : " + trashCount,210,60)
  
  if(obstacleGroup.isTouching(endline)) {
    obstacleGroup.destroyEach();
    gameState = end;
  }
}// play ends


  else if(gameState === end) {
    background.velocityY = 0;
    stroke("yellow");
    fill("white");
    textSize(40);
    text("GAME OVER!",canvas.width/2-400,canvas.height/2);
    text("The asteroids destroyed the spaceship!",canvas.width/2-400,canvas.height/2+100);
    text("Your final trash count:"+trashCount,canvas.width/2-400,canvas.height/2+200);
}


  if(gameState === instruction) {
    stroke("black");
    fill("black");
    textFont("trebuchetMS")
    textSize(50);
    text("------SPACE TRASH CLEANERS------",canvas.width/2-300,canvas.height/2-300);
    text("ENJOY THE GAME!",canvas.width/2-300,canvas.height/2+100);
    stroke("yellow");
    fill("yellow");
    textSize(35);
    textFont("Apple Chancery");
    text("in the near future .....",canvas.width/2-300,canvas.height/2-250);
    text(" the humans have polluted even the outer space!",canvas.width/2-300, canvas.height/2 - 210);
    text("  You are a space cleaner...",canvas.width/2-300,canvas.height/2-170);
    text("  Space trash is nothing but old dumped satellites which still emit harmful radiation!",canvas.width/2-300,canvas.height/2-130);
    text("  use right, left, up and down arrows to move.",canvas.width/2-300,canvas.height/2-50);
    text("  press 's' to start game.",canvas.width/2,canvas.height/2-10);
    
    if(keyDown("s")) {
      gameState = play;
    } 
    if(keyDown("r")) {
      gameState = instruction;
    }
    
  }
}//draw ends
  

function obstacles() {
  if(frameCount % 110 === 0) {
  
    var obstacle = createSprite(Math.round(random(50,1350)),-20);
    obstacle.velocityY = (6 + trashCount/10);
    obstacle.lifetime = 200;
    obstacle.scale = random(0.4,0.5);

    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              obstacle.setCollider("circle",-80,10,160);
              break;
      case 2: obstacle.addImage(obstacle2);
              obstacle.setCollider("circle",50,0,150);
              break;
      case 3: obstacle.addImage(obstacle3);
              obstacle.setCollider("circle",0,0,170)
      default: break;
    }
 
    obstacleGroup.add(obstacle);
  }
}

function trashe() {
  if(frameCount % 60 === 0) {
  
    var trash = createSprite(Math.round(random(50,1150)),-20);
    trash.velocityY = (6 + trashCount/10);
    trash.lifetime = 200;
    trash.scale = random(0.4,0.5);

    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: trash.addImage(trash1);
              trash.setCollider("circle",-80,10,160);
              break;
      case 2: trash.addImage(trash2);
              trash.setCollider("circle",50,0,150);
      default: break;
    }
 
    trashGroup.add(trashe);
  }
}