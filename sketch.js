var unicorn,unicornImage
var poop,poopImage
var horn,hornImage
var backgroundImage
var glitterPath,glitterPathImage
var star,starImage
var gameOver,gameOverImage
var rainbowPaddle,rainbowPaddleImage
var gameState="play"
var score=0
var starsGroup,poopGroup,hornGroup,invis


function preload(){
    unicornImage=loadImage("unicorn.png")
    poopImage=loadImage("unicorn poop.png")
    hornImage=loadImage("unicorn horn.png")
    backgroundImage=loadImage("UNICORN BACKGROUND.jpg")
    glitterPathImage=loadImage("glitter.jpg")
    starImage=loadImage("stars.png")
    gameOverImage=loadImage("gameover.png")
    rainbowPaddleImage=loadImage("rainbowline.png")
}

function setup(){
    createCanvas(1400,500)
    
    bg=createSprite(0,0)
    bg.addImage(backgroundImage)
    bg.scale=4

    glitterPath=createSprite(750,1092,1500,30)
    invis=createSprite(750,510,1500,30)
    glitterPath.addImage(glitterPathImage)
    glitterPath.scale=3
    
    unicorn=createSprite(100,450,20,50)
    unicorn.scale=0.4
    unicorn.addImage(unicornImage)

    starsGroup=createGroup();
    poopGroup=createGroup();
    hornGroup=createGroup();

  gameOver=createSprite(700,250)
  gameOver.addImage(gameOverImage) 
  gameOver.scale=0.4
}

function draw(){
    background(255)
    
    gameOver.visible=false
    if(gameState==="play"){
    bg.velocityX=-2
    //glitterPath.velocityX=-2

    if(keyDown("space")){
        unicorn.velocityY=-12
    }
    unicorn.velocityY=unicorn.velocityY+0.8
    spawnPoop();
    spawnHorn();
    spawnStars();
    if(bg.x<0){
        bg.x=bg.width/2
    }
    if(glitterPath.x<0){
        glitterPath.x=glitterPath.width/2
    }

    if(hornGroup.isTouching(unicorn)){
        score=score+1
        hornGroup[0].destroy()
    }
    if(poopGroup.isTouching(unicorn)){
        gameState="End"
        
    }
    
    }
    if(gameState==="End"){
        hornGroup.setLifetimeEach(-1)
        starsGroup.setLifetimeEach(-1)
        poopGroup.setLifetimeEach(-1)
        bg.velocityX=0
        unicorn.velocityY=0
        starsGroup.setVelocityXEach(0)
        hornGroup.setVelocityXEach(0)
        poopGroup.setVelocityXEach(0)
        gameOver.visible=true

        if(mousePressedOver(gameOver)){
            gameState="play"
            
        }
    }
    invis.visible=false
    unicorn.collide(invis)

    drawSprites();
    fill("purple")
    textSize(20)
    text("Score: "+score,1050,100)
}

function spawnStars(){
    if(frameCount%110===0){
        star=createSprite(1500,100)
        star.y=Math.round(random(10,150))
        star.addImage(starImage)
        star.velocityX=-3
        star.lifetime=1000
        star.scale=0.01
        starsGroup.add(star)
    }
}

function spawnPoop(){
    if(frameCount%300===0){
        poop=createSprite(1500,450)
        poop.y=Math.round(random(300,420))
        poop.addImage(poopImage)
        poop.velocityX=-3
        poop.lifetime=1000
        poop.scale=0.04
        poopGroup.add(poop)
    }
}

function spawnHorn(){
    if(frameCount%200===0){
        horn=createSprite(1500,450)
        horn.y=Math.round(random(300,420))
        horn.addImage(hornImage)
        horn.velocityX=-3
        horn.lifetime=1000
        horn.scale=0.03
        hornGroup.add(horn)
    }
}