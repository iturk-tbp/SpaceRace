class Form{
    constructor(){
        this.input = createInput("").attribute("placeholder","Name please: ")
        this.playButton = createButton("PLAY");
        this.greeting = createElement("h2");
    }
    setElementPosition(){
        this.input.position(width/2-110,height/2-80)
        this.playButton.position(width/2-90,height/2-20)
        this.greeting.position(width/2-300,height/2-100)
    }
    setStyle(){
        this.input.class("customInput");
        this.playButton.class("customButton");
        this.greeting.class("greeting");
    }
    hide(){
        this.input.hide();
        this.playButton.hide();
        this.greeting.hide();
    }
    handleMousePressed(){
        this.playButton.mousePressed(() =>{
            this.input.hide();
            this.playButton.hide();
            var message = `Welcome to this game, dear ${this.input.value()} </br> Wait for another player to join.`
            this.greeting.html(message);
            playerCount = playerCount + 1;
            player.name = this.input.value();
            player.index = playerCount;
            player.addPlayer();
            player.updateCount(player.index)
        })
    }
    display(){
        this.setElementPosition();
        this.setStyle();
        this.handleMousePressed();
        
    }
}