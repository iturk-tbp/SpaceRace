class Game{
    constructor(){
        this.resetButton = createButton("");
        this.leaderBoardTitle = createElement("h2");
        this.leader1 = createElement("h2");
        this.leader2 = createElement("h2");
        
    }
    getState(){
        var gamestateref = database.ref("gameState")
        gamestateref.on("value", function(data){
            gameState = data.val();
        })
    }
    updateState(state){
        database.ref("/").update({
            gameState: state
        })
    }
    start(){
        form = new Form();
        form.display();
        player = new Player();
        playerCount = player.getCount();

        rocket1 = createSprite(200,500,100,100);
        rocket1.addImage("r1",r1);
        rocket1.scale = 0.3;
        rocket2 = createSprite(1200,500,100,100);
        rocket2.addImage("r2",r2);
        rocket2.scale = 0.3;

        rockets = [rocket1,rocket2]

        alPos = [
            {x: width/2+250, y:height-800,image:al},
            {x: width/2-150, y:height-1300,image:al}, 
            {x: width/2+250, y:height-1800,image:al}, 
            {x: width/2-180, y:height-2300,image:al}, 
            {x: width/2, y:height-2800,image:al}, 
            {x: width/2-180, y:height-3300,image:al}, 
            {x: width/2+180, y:height-3300,image:al}, 
            {x: width/2+250, y:height-3800,image:al}, 
            {x: width/2-150, y:height-4300,image:al}, 
            {x: width/2+250, y:height-4800,image:al}
        ]

        alien = new Group();
        galien = new Group();

        this.addSprites(alien,10,al,0.075,alPos);
        this.addSprites(galien,4,alg,0.075);
    }
    play(){
        textSize(30);
        fill("white");
        text("Only kill the green aliens, the yellow aliens are good and killing them will reduce your consciousness",300,200,500,200)
        Player.getPlayersInfo();
        this.handleElements();
        this.handleResetButton();
        this.handlePlayerControls();
        player.getRocketAtEnd();
        if(allPlayers!== undefined){
            image(bg2,0,-height*5,width,height*6)
            this.showScore();
            var index = 0
            for(plr in allPlayers){
                index = index + 1
                var x = allPlayers[plr].positionx
                var y = height-allPlayers[plr].positiony
                rockets[index-1].position.x = x;
                rockets[index-1].position.y = y;
                if(index === player.index){
                    stroke(10)
                    fill("red")
                    ellipse(x,y,60,120);
                    this.playerAlien();
                    this.playerGAlien();
                    camera.position.y = rockets[index-1].position.y
                }
                
            }
        }

       
        drawSprites();       
        if(player.score > 20){
            gameState = 2;
            player.rank +=1 ;
            Player.updateRocket(player.rank);
            player.update();
            this.showRank();
          }
          this.showConscious();
    }
    handleElements(){
        form.hide();
        this.resetButton.position(width/2+500,15);
        this.resetButton.class("resetButton");
        this.leader1.class("leadersText");
        this.leader1.position(100,80);
        this.leader2.class("leadersText");
        this.leader2.position(100,130);
    }
    handleResetButton(){
        this.resetButton.mousePressed(() =>{
            database.ref("/").set({
                playerCount: 0,
                gameState: 0,
                players: {}
            })
        window.location.reload();
        })
    }

    handlePlayerControls(){
        if(keyDown(UP_ARROW)){
            player.positiony += 10;
            player.update();
        }
        if(keyDown(LEFT_ARROW) && player.positionx > width/3 - 50){
            player.positionx -= 5;
            player.update();
        }
        if(keyDown(RIGHT_ARROW)&& player.positionx < width/2 + 300){
            player.positionx += 5;
            player.update();
        }
    }

    spawnAliens(){
        if(frameCount%150 === 0){
            all = createSprite(random(100,1300),random(0,300),50,50);
            all.velocity.x = random(2,4);
            all.addImage("a",al);
            all.scale = 0.125;
            alien.add(all);
        }
        
    }

    playerAlien(){
        rockets[player.index-1].overlap(alien,function(collector,collected){
            player.score += 5;
            player.update();
            collected.remove();
        })
    }

    playerGAlien(){
        rockets[player.index-1].overlap(galien,function(collector,collected){
            if(player.conscious > 123){
                player.conscious = player.conscious - 62;
                swal({
                    title:  `Don't kill Yellow Aliens!`,
                    text: "Yellow aliens are good, killing them decreases consciousness!",
                    imageUrl: "https://previews.123rf.com/images/thomaspajot/thomaspajot1102/thomaspajot110200063/8889243-friend-button.jpg" ,
                    imageSize: "100x100",
                    confirmButtonText: "Okay", 
                    })
            }
            else{
                player.conscious = 0;
                gameState = 2;
                swal({
                title:  `Sorry!`,
                text: "You lost the game because you killed the good aliens!",
                imageUrl: "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png" ,
                imageSize: "100x100",
                confirmButtonText: "Okay", 
                })
            }
            player.update();
            collected.remove();
        })
    }

    showConscious(){
        push();
        image(lifee,width/2-130,height-player.positiony-350,20,20)
        fill("white");
        rect(width/2 - 100, height-player.positiony-350,186,20)
        fill("green");
        rect(width/2-100,height-player.positiony-350,player.conscious,20)
    }

    showScore(){
        var leader1, leader2
        var players = Object.values(allPlayers);
          leader1 = 
          players[0].name +
          "&emsp;" +
          players[0].score
    
          leader2 = 
          players[1].name +
          "&emsp;" +
          players[1].score
        this.leader1.html(leader1);
        this.leader2.html(leader2);
      }
    
    showRank(){
        swal({
            title:  `Awesome!${"\n"}Rank${"\n"}${player.rank}`,
            text: "CONGRATULATIONS! YOU FINISHED THE GAME!",
            imageUrl: "https://raw.githubusercontent.com/vishalgaddam873/p5-multiplayer-car-race-game/master/assets/cup.png" ,
            imageSize: "100x100",
            confirmButtonText: "Okay",
       
       
           })
    }

    addSprites(spriteGrp, NumberOfSprites, spriteImg, scale, positions = []){
        for(var i = 0; i < NumberOfSprites; i++){
          var x,y
          if(positions.length>0){
            x = positions[i].x
            y = positions[i].y
            spriteImg = positions[i].image
          }
          else{
            x = random(width/2+150,width/2-150);
            y = random(-height*4.5,height-400)
          }
          var sprite = createSprite(x,y)
          sprite.addImage("sprite",spriteImg);
          sprite.scale = scale;
          spriteGrp.add(sprite);
        }
      }
    
}