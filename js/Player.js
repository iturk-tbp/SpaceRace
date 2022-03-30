class Player {
  constructor() {
    this.name = null;
    this.index = null;
    this.positionx = 0;
    this.positiony = 0;
    this.score = 0;
    this.rank = 0;
    this.conscious = 186;
  }
  addPlayer(){
    var playerIndex = "players/player" + this.index;
    if(this.index === 1){
      this.positionx = width/2 - 250;
    }
    else{
      this.positionx = width/2 + 250;
    }
    database.ref(playerIndex).set({
      name: this.name,
      positionx: this.positionx,
      positiony: this.positiony,
      score: this.score,
      rank: this.rank,
      conscious: this.conscious      
    })
  }

  getDistance(){
    var playerDistanceref = database.ref("players/player"+this.index)
    playerDistanceref.on("value",data=>{
      var data = data.val()
      this.positionx = data.positionx
      this.positiony = data.positiony
    })
  }

  getCount(){
    var countref = database.ref("playerCount")
    countref.on("value",data => {
      playerCount = data.val()
    })
  }
  updateCount(count){
    database.ref("/").update({
      playerCount: count
    })
  }

  getRocketAtEnd(){
    database.ref("Rockets").on("value",data=>{
      this.rank = data.val();
    })
  }

  update(){
    var playerIndex = "players/player" + this.index
    database.ref(playerIndex).update({
      positionx: this.positionx,
      positiony: this.positiony,
      score: this.score,
      rank: this.rank,
      conscious: this.conscious 

    })
  }
  static getPlayersInfo(){
    var playerInforef = database.ref("players")
    playerInforef.on("value",data =>{
      allPlayers = data.val();
    })
  }

  static updateRocket(rank){
    database.ref("/").update({
      Rockets: rank
    })
  }

}
