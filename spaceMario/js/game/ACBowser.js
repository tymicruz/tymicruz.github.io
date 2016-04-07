/* Requires:
ScreenWidget.js
 */
function Bowser(context, x, y)
{
    ScreenWidget.call(this, context);
    var self = this;
    self.alienImage = new Image()
    self.alienImage.src = "images/AdamBowser.png";
    self.imageIndex = 0;
    self.imageXOffset = 180;
    self.imageYOffset = 0;

    self.context = context;
    self.trueWidth = 276;
    self.trueHeight = 290;
    self.scaleWidth = 276 / 2;
    self.scaleHeight = 290 / 2;
    self.hits = 0;
    //self.alive = true;

    self.x = maxX/2;
    self.y = maxY/2 - 200;
    self.switchFrame = 0; //rotate 
    self.switchDirection = 0; //switch direction

    self.targeted = false;
    //console.log(context);

    self.right = true;
    self.speed = 2;
    self.alive = true;

    self.flasher = 0;
    self.flashOn = false;
    self.show = true; // for flashing
    self.currImage = self.alienImage.src;


    self.circle = {
        radius: (self.scaleWidth  / 2) - 10, 
        x: self.x + (self.scaleWidth/2),
        y: self.y + (self.scaleHeight/2)
    }


    self.shoot = false;
    self.shootTick = 0;
    self.shootMod = Math.floor(Math.random() * (200 - 50)) + 50;

    self.render = function ()
    {
       // self.switchFrame = self.switchFrame + 1;
       // self.switchDirection = self.switchDirection + 1;
        self.shootTick+= 1;

        if(self.shootTick % self.shootMod == 0){
            self.shoot = true;
            self.shootMod = Math.floor(Math.random() * (200 - 50)) + 50;
            self.shootTick = 0;
        }else{
            self.shoot = false;
        }

           self.context.drawImage(self.alienImage,       //source image
            0,  //sprite x offset
            0,                                   //sprite y offset
            self.trueWidth,                          //sprite width
            self.trueHeight,                         //sprite height
            self.x,                              //destination x
            self.y,                              //destination y
            self.scaleWidth,                          //destination width (for scaling)
            self.scaleHeight); 

           self.context.strokeStyle = "rgb(255, 0, 0)";
           self.context.lineWidth = 4;
          self.circle.radius= (self.scaleWidth  / 2) - 10;
        self.circle.x=self.x + (self.scaleWidth/2);
       self.circle.y= self.y + (self.scaleHeight/2);
       self.context.beginPath();
 self.context.arc(self.circle.x, self.circle.y, self.circle.radius, 0, 2 * Math.PI, false);
           
                      self.context.stroke();
         // self.context.strokeRect(self.x, self.y, self.scaleWidth, self.scaleHeight -10);
         
    };

    self.update = function ()
    {
        //if(self.free) return;

        self.x +=  self.speed;
        self.checkBoundary(); 

        //update returns bullets  

        if(self.shoot == true){
            //self.free = true;
            return new Mushroom(self.context, self.x + self.scaleWidth/2 - 55, self.y + self.scaleHeight /2 -35);
        }else{
            return null;
        }
    };

    self.checkBoundary = function()
    {

        //in boundary, decrement y

        if(self.x + (self.scaleWidth) > maxX)
        {
            //reset location
            self.speed = self.speed * (-1);
            self.right = false;
            //self.alienImage.src = "";

        }
        else if (self.x <= 0){
            self.speed = self.speed * (-1);
            self.right = true;
        }
    };

    self.hit = function(){

        console.log("i'm hit!");

        if(self.alive == false){
            return;
        }

        self.hits = self.hits + 1;

        if(self.hits > 5){
            self.alive = false
            //self.alienImage.src = "";
            //self.currImage = "";
            //self.flashOn = false;
            return;
        }

        if(self.hits == 5){
            self.flashOn = true;
        }


        //self.alienImage.src = "images/alienHit" + self.hits.toString() + ".png";
        //self.currImage = "images/alienHit" + self.hits.toString() + ".png";

    };

    // //sets star to new random color
    // self.changeColor = function()
    // {
        
    // };

    // self.changeColor();
}

// Alien.makeStar = function(context, width, speed)
// {

// };