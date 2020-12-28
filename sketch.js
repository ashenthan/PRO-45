var squirrel, squirrelIMG
var mouse, mouseIMG
var acorn, acornIMG
var cheese,cheeseIMG 
var ground
var cage1, cage2, cage3, cageIMG
var trap1,trap2,trap3, trapIMG
var edges
var Sscore = 0
var Mscore = 0
var gameState = "Start"
var back
var lose, win
function preload(){
  squirrelIMG = loadImage("Images/squirrel.png")
  mouseIMG = loadImage("Images/mouse.png")
  acornIMG = loadImage("Images/acorn.png")
  cheeseIMG = loadImage("Images/cheese.png")
  cageIMG = loadImage("Images/cage.png")
  trapIMG = loadImage("Images/trap.png")
  back = loadImage("Images/back.jpg")
  lose = loadSound("Sounds/lose.mp3")
  win = loadSound("Sounds/win.mp3")
}
function setup() {
  
  createCanvas(1350,600);
  edges = createEdgeSprites();
  acorn = createSprite(100, 250, 50, 50);
  acorn.addImage(acornIMG)
  acorn.scale = 0.1
  cheese = createSprite(100, 550, 50, 50);
  cheese.addImage(cheeseIMG)
  cheese.scale = 0.1
 
  squirrel = createSprite(1220, 270, 50, 50);
  squirrel.addImage(squirrelIMG)  
  squirrel.scale = 1
  ground = createSprite(width/2,height/2,width,10)
  ground.shapeColor=rgb(83,32,15)
  cage1 = createSprite(400,250,10,10)
  cage1.addImage(cageIMG)
  cage1.scale = 0.15
  cage2 = createSprite(1100,250,10,10)
  cage2.addImage(cageIMG)
  cage2.scale = 0.15
  cage3 = createSprite(750,250,10,10)
  cage3.addImage(cageIMG)
  cage3.scale = 0.15
  trap1 = createSprite(750,580,10,10)
  trap1.addImage(trapIMG)
  trap1.scale = 0.3
  trap2 = createSprite(1100,580,10,10)
  trap2.addImage(trapIMG)
  trap2.scale = 0.3
  trap3 = createSprite(400,580,10,10)
  trap3.addImage(trapIMG)
  trap3.scale = 0.3
  mouse = createSprite(1220, 550, 50, 50);
  mouse.addImage(mouseIMG)
  mouse.scale = 1.1
  mouse.setCollider("circle",0,0,30)
  trap2.setCollider("circle",0,-30,30 )
  trap1.setCollider("circle",0,-30,30 )
  trap3.setCollider("circle",0,-30,30 )
  squirrel.setCollider("circle",0,0,40)
  cage2.setCollider("circle",0,30,80 )
  cage1.setCollider("circle",0,30,80 )
  cage3.setCollider("circle",0,30,80 )
acorn.setCollider("circle",0,0,80)
 
}

function draw() {
  background(back);
  text("Squirrel "+ Sscore, 1200, 70)
  text("Mouse "+ Mscore, 1200, 350)  
  squirrel.collide(ground)
  mouse.collide(edges[3])
  if(keyWentDown("space")){
  mouse.velocityX = -2
  }
  if(keyWentUp("space")){
    mouse.velocityX = 0
    }
  if(keyWentDown("r")){
    squirrel.velocityX = -2
    }
   if(keyWentUp("r")){
     squirrel.velocityX = 0
   }
   if(keyDown("e")&& squirrel.y > 215){
     squirrel.velocityY = -3
   }
  squirrel.velocityY += 0.1
  if(keyDown(UP_ARROW)&&mouse.y> 530){
    mouse.velocityY = -3
  }
 mouse.velocityY += 0.1
 if((mouse.isTouching(trap1)||mouse.isTouching(trap2)||mouse.isTouching(trap3)) && gameState!== "Send"){
   lose.play()
   mouse.setVelocity(0,0)
   squirrel.setVelocity(0,0)
   Sscore = Sscore+1
   gameState = "Send"

 }
 if ((squirrel.isTouching(cage2)||squirrel.isTouching(cage3)||squirrel.isTouching(cage1))&& gameState!=="Mend"){
   lose.play()
  mouse.setVelocity(0,0)
  squirrel.setVelocity(0,0)
  Mscore = Mscore + 1
  gameState = "Mend"

}
if (mouse.isTouching(cheese)&& gameState!== "Mend"){
  win.play()

  mouse.setVelocity(0,0)
  squirrel.setVelocity(0,0)
  Mscore = Mscore+1
gameState = "Mend"
}

if (squirrel.isTouching(acorn)&& gameState!=="Send"){
  mouse.setVelocity(0,0)
  squirrel.setVelocity(0,0)
  Sscore = Sscore+1
  win.play()

gameState = "Send"
}
 
 if (gameState === "Send"){
  text("Squirrel Wins!",650,70)
    text("Press The Left Arrow Key To Play Again",650, 110)
  mouse.setVelocity(0,0)
  squirrel.setVelocity(0,0)
}
if(gameState==="Mend"){
  text("Mouse Wins!", 650, 350)
  text("Press The Left Arrow Key To Play Again",650, 390)
  mouse.setVelocity(0,0)
  squirrel.setVelocity(0,0)
}

if(keyWentDown(LEFT_ARROW)&&( gameState==="Mend"||gameState==="Send")){
  gameState = "Start"
  squirrel.y=270
  squirrel.x=1220
  mouse.y=550
  mouse.x=1220


}
  drawSprites();}
