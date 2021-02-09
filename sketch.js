//Create variables here
var dog,database
function preload()
{
  //load images here
  sadDog=loadImage("images/Dog.png")
  happyDog=loadImage("images/happy dog.png")
}

function setup() {
  createCanvas(800, 700);
  database=firebase.database()
foodObject=new Food()
foodStock=database.ref('Food')
foodStock.on("value",readStock)
dog=createSprite(800,200,150,150)
dog.addImage(sadDog)
dog.scale=0.15
feed=createButton("feed the dog")
feed.position(700,95)
  feed.mousePressed(addFoods)
  
}


function draw() {  
 background("blue")
 foodObject.display()
 fedTime=database.ref('feedTime')
 fedTime.on("value",function(data){
   lastFed=data.val()
 })
 if(lastFed>=12){
   text("Last Feed;"+lastFed%12+"PM",350,30)
 }
 else if(lastFed==0){
   text("Last Feed:12 AM ",350,30)
 }
 else{
  text("Last Feed;"+lastFed+"AM",350,30)
 }
  drawSprites();
  //add styles here

}
function feedDog(){
  dog.addImage(happyDog)
  if(foodObject.getFoodStock()<=0){
    foodObject.updateFoodStock(foodObject.getFoodStock()*0)
  }
  else{
    foodObject.updateFoodStock(foodObject.getFoodStock()-1)
  }
  database.ref('/').update({
    Food:foodObject.getFoodStock(),
    FeedTime:hour()
  })
}
function addFoods(){
  foods++
  database.ref('/').update({
    Food:foods
  })
}


