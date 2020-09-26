//Create variables here
var dog,happyDog;
var database,foodS,foodStock;
var fedDog,addFood;
var fedTime,lastFed;
var foodObj;

function preload()
{
  //load images here
  dogImg=loadImage("images/dogImg.png");
  dogImg1=loadImage("images/dogImg1.png");
}

function setup() {
	createCanvas(500,500);
  var dog=createSprite(400,400,30,40);
  dog.addImage(dogImg);

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  

  fedDog=createButton("FEED THE DOG");
  fedDog.position(700,95);
  fedDog.mousePressed(feedDog);

  addFood=createButton("ADD FOOD");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}



function draw() {  
  background(46,139,87);
  dog.display();

  foodObj.display();

  fedTime=database.ref('FeedTime')
  fedTime.on("value",function(data){
    lastFed=data.val();
  })

  fill (255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + "PM",350,30);
  }else if(lastFed==0){
    text("Last Feed : 12 AM",350,30);
  }else{
    text("Last Feed :"+ lastFed +"AM",350,30);
  }

  drawSprites();
  //add styles here

}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){
  if(x+=0){
    x=0;
  }else{
    x-x-1;
  }
  database.ref('/').update({
    Food:x
  })
}
function addFoods() {
  foodS++;
  database.ref("/").update({
    Food:foodS
  })
}

function fedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref("/").update({
    food:foodObj.getFoodStock(),
    fedTime:hour ()
  })
}


