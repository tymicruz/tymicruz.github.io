/*
Requires: ScreenWidget.js
*/
function Mario(context)
{
    ScreenWidget.call(this, context);
    var self = this;
    self.marioImage = new Image();
    self.marioImage.src = "images/mario.png";
    self.imageIndex = 0;
    self.imageOffset = 21;
    self.TrueWidth = 21;
    self.TrueHeight = 36;
    
    self.ScaleWidth = 30;
    self.ScaleHeight = 50;
    self.switchFrame = 0;
    self.speed = 10;

    self.x = maxX / 2;
    self.y = maxY - self.ScaleHeight;


    self.jump = true;
    self.marioJumpImage = new Image();
    self.marioJumpImage.src = "images/marioJump.png";
    self.imageJumpIndex = 6;
    self.imageJumpOffset = 26;
    self.TrueJumpWidth = 26;
    self.TrueJumpHeight = 35;
    self.ScaleJumpWidth = 30;
    self.ScaleJumpHeight = 50;
    self.switchJumpFrame = 0;


    self.render = function()
    {

        update:

        if(self.jump){
            self.switchJumpFrame += 1;

            if(self.switchJumpFrame % 3 == 0){
                self.imageJumpIndex -= 1;
                self.switchJumpFrame = 0;

                if(self.imageJumpIndex < 0){
                    self.jump = false;
                    self.switchJumpFrame = 0;
                    self.imageJumpIndex = 6;

                    self.switchFrame += 1;

                    if(self.switchFrame % 6 == 0){
                        self.imageIndex += 1;
                        self.imageIndex = self.imageIndex % 8;
                        self.switchFrame = 0;
                    }

                    self.context.drawImage(self.marioImage,       //source image
                        self.imageIndex * self.imageOffset,  //sprite x offset
                        0,                                   //sprite y offset
                        self.TrueWidth,                          //sprite width
                        self.TrueHeight,                         //sprite height
                        self.x,                              //destination x
                        self.y,                              //destination y
                        self.ScaleWidth,                          //destination width (for scaling)
                        self.ScaleHeight); 

                    return;
                }

            }

            self.context.drawImage(self.marioJumpImage,       //source image
            self.imageJumpIndex * self.imageJumpOffset,  //sprite x offset
            0,                                   //sprite y offset
            self.TrueJumpWidth,                          //sprite width
            self.TrueJumpHeight,                         //sprite height
            self.x,                              //destination x
            self.y,                              //destination y
            self.ScaleJumpWidth,                          //destination width (for scaling)
            self.ScaleJumpHeight);  

            return;
        }

        //update:

        self.switchFrame += 1;

        if(self.switchFrame % 6 == 0){
            self.imageIndex += 1;
            self.imageIndex = self.imageIndex % 8;
            self.switchFrame = 0;
        }

        

        self.context.drawImage(self.marioImage,       //source image
            self.imageIndex * self.imageOffset,  //sprite x offset
            0,                                   //sprite y offset
            self.TrueWidth,                          //sprite width
            self.TrueHeight,                         //sprite height
            self.x,                              //destination x
            self.y,                              //destination y
            self.ScaleWidth,                          //destination width (for scaling)
            self.ScaleHeight);                        //destination height (for scaling)
    };

    self.update = function(){

    }

    self.move = function(up, right, down, left){
        if(up){
           // console.log("move up");
           self.y -= self.speed;
       }
       if(right){
           // console.log("move right");
           self.x += self.speed;
       }
       if(down){
           // console.log("move down");
           self.y += self.speed;
       }
       if(left){
           // console.log("move left");
           self.x -= self.speed;
       }
   }

   self.jumpMario = function(){
    self.jump = true;
   }

   self.mouseMoved = function(evt)
   {
    
    self.x = evt.clientX - self.ScaleWidth / 2;
    if(evt.clientY - self.ScaleHeight / 2 > maxY - 100)
    {self.y = evt.clientY - self.ScaleHeight / 2;}
}
}