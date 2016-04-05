/* Requires:
ScreenWidget.js
 */
function Alien(context, x, y)
{
    ScreenWidget.call(this, context);
    var self = this;
    self.alienImage = new Image()
    self.alienImage.src = "images/alienHit0.png";
    self.imageIndex = 0;
    self.imageXOffset = 180;
    self.imageYOffset = 0;

    self.context = context;
    self.trueWidth = 180;
    self.trueHeight = 180;
    self.scaleWidth = 80;
    self.scaleHeight = 80;
    self.hits = 0;
    //self.alive = true;

    self.x = x;
    self.y = y;
    self.switchFrame = 0; //rotate 
    self.switchDirection = 0; //switch direction

    self.targeted = false;
    //console.log(context);

    self.right = true;
    self.speed = 4;
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

    self.render = function ()
    {
        self.switchFrame = self.switchFrame + 1;
        self.switchDirection = self.switchDirection + 1;

        if(self.switchFrame % 10 == 0){
            //change image offset
            self.imageIndex = self.imageIndex + 1;
            self.imageIndex = self.imageIndex % 3;
            self.switchFrame = 0;
        }

        if(self.flashOn){
            self.flasher += 1;

            if(self.flasher % 5 == 0){
                self.flasher = 0;

                if(self.show){
                    self.show = false;
                }else{
                    self.show = true;
                }
            }

        }else{
            self.show = true;
            self.flasher = 0;
        }

        if(self.show){
            self.alienImage.src = self.currImage;
        }else{
            self.alienImage.src = "";
        }


        if(self.right){
            self.imageYOffset = 0;

       }else {
        self.imageYOffset = 180;
       }

           self.context.drawImage(self.alienImage,       //source image
            self.imageIndex * self.imageXOffset,  //sprite x offset
            self.imageYOffset,                                   //sprite y offset
            self.trueWidth,                          //sprite width
            self.trueHeight,                         //sprite height
            self.x,                              //destination x
            self.y,                              //destination y
            self.scaleWidth,                          //destination width (for scaling)
            self.scaleHeight); 

           self.context.strokeStyle = "rgb(255, 0, 0)";
           self.context.lineWidth = 1;
           self.circle.radius= (self.scaleWidth  / 2) - 10;
        self.circle.x=self.x + (self.scaleWidth/2);
        self.circle.y= self.y + (self.scaleHeight/2);
          // self.context.strokeRect(self.x, self.y, self.scaleWidth, self.scaleHeight -10);
          if(self.targeted === true) {self.context.beginPath();
                      self.context.arc(self.circle.x, self.circle.y, self.circle.radius, 0, 2 * Math.PI, false);
           
                      self.context.stroke();}
    };

    self.update = function ()
    {
        self.x +=  self.speed;
        self.checkBoundary();   
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

        if(self.hits > 3){
            self.alive = false
            self.alienImage.src = "";
            self.currImage = "";
            self.flashOn = false;
            return;
        }

        if(self.hits == 3){
            self.flashOn = true;
        }


        self.alienImage.src = "images/alienHit" + self.hits.toString() + ".png";
        self.currImage = "images/alienHit" + self.hits.toString() + ".png";

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