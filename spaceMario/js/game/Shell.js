/* Requires:
ScreenWidget.js
 */
function Shell(context, x, y, redshell)
{
    ScreenWidget.call(this, context);
    var self = this;
    self.speed = -7;
    self.image = new Image();
    self.image.src = "images/greenshell.png";
    self.x = x;
    self.y = y;
    self.context = context;
    self.trueWidth = 656;
    self.trueHeight = 550;
    self.scaleWidth = 50;
    self.scaleHeight = 42;
    self.hits = 0;
    self.alive = true;
    self.redshell = redshell;
    self.go = false;

    if(redshell){
        self.image.src = "images/redshell.png";
    }

    self.circle = {
        radius: (self.scaleWidth  / 2) - 10, 
        x: self.x + (self.scaleWidth/2),
        y: self.y + (self.scaleHeight/2)
    }

    self.enemies = [];

    console.log(context);

    self.render = function (enemies)
    {
        self.context.drawImage(self.image,       //source image
                        0,  //sprite x offset
                        0,                                   //sprite y offset
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

          //draw colision circle
           // self.context.beginPath();
           // self.context.arc(self.circle.x, self.circle.y, self.circle.radius, 0, 2 * Math.PI, false);
           // self.context.stroke();

           self.enemies = enemies;
        if(self.redshell === true && self.enemies.length > 0){
            self.enemies[0].targeted = true;
        }
    };

    self.update = function (enemies)
    {
        
        self.enemies = enemies;

        if(self.redshell === true && self.enemies.length > 0){
            //enemies[0].targeted = true;

            var d = Math.sqrt( (self.x-enemies[0].x)*(self.x-enemies[0].x) + (self.y-enemies[0].y)*(self.y-enemies[0].y) );
            var secret_sauce = (1/d) * 800;
            console.log(secret_sauce);
            self.speed = -secret_sauce;

            if(self.y > enemies[0].y){//below enemy targeted
                self.y-=secret_sauce;
            }else if(self.y < enemies[0].y){
                self.y+=secret_sauce;
            }

            if(self.x < enemies[0].x){     
                self.x+=secret_sauce;
            }else if(self.x > enemies[0].x){

                
                self.x-=secret_sauce;
            }


        }else{
            self.y += self.speed;
        }

        for(var i = 0; i < enemies.length; i ++){

            var dx = enemies[i].circle.x - self.circle.x;
            var dy = enemies[i].circle.y - self.circle.y;
            var distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < enemies[i].circle.radius + self.circle.radius) {
                enemies[i].hit();
                enemies[i].targeted = false;
                self.alive = false;
                //self.y = maxY;
                //self.speed = -1;
            }
        }

        self.checkBoundary();
    };

    self.checkBoundary = function()
    {
        if(self.y <= 0 - self.scaleHeight)
        {
            self.alive = false;
        }

    };

}

