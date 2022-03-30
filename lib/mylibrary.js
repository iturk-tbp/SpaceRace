function bounceOff(object1,object2){
    if (object1.position.x - object2.position.x < object2.width/2-10 + object1.width/2
        && object2.position.x - object1.position.x < object2.width/2-10 + object1.width/2) {
      object1.velocityX = object1.velocityX * (-1);
      object2.velocityX = object2.velocityX * (-1);
    }
    if (object1.position.y - object2.position.y < object2.height/2 + object1.height/2
      && object2.position.y - object1.position.y < object2.height/2 + object1.height/2){
      object1.velocityY = object1.velocityY * (-1);
      object2.velocityY = object2.velocityY * (-1);
    } 
}
function isTouching(object1, object2){
    if (object1.position.x - object2.position.x < object2.width/2 + object1.width/2
      && object2.position.x - object1.position.x < object2.width/2 + object1.width/2
      && object1.position.y - object2.position.y < object2.height/2 + object1.height/2
      && object2.position.y - object1.position.y < object2.height/2 + object1.height/2) 
      {
        return true;
      }
      else {
        return false;
      }
  }
  function hasCollided(object1,object2){
    if((object1.x + object1.width)>= object2.x){
      return true;
    }
    else{
      return false;
    }
 
   }
   function keyDown(key1){
     if(keyCode == key1 ){
       return true;}
       else{
return false;
       }
     
   }
