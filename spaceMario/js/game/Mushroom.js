/* Requires:
ScreenWidget.js
 */
function Mushroom(context, x, y)
{
    ScreenWidget.call(this, context);
    var self = this;
    self.speed = 5;
    self.image = new Image();
    self.image.src = "images/poisonMushroom.png";
    self.x = x;
    self.y = y;
    self.context = context;
    self.trueWidth = 1024;
    self.trueHeight = 1024;
    self.scaleWidth = 30;
    self.scaleHeight = 30;
    self.alive = true;
    self.missed = false;


    self.circle = {
        radius: (self.scaleWidth  / 2) + 20, 
        x: self.x + (self.scaleWidth/2),
        y: self.y + (self.scaleHeight/2)
    }

    self.mario = null;

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
           self.circle.radius= (self.scaleWidth  / 2) - 4;
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

    //self.onehit = false;
self.clamp =  function (val, min, max) {
    return Math.max(min, Math.min(max, val))
}


    self.update = function (mario)
    {

        var points = 0;
        self.circle.radius= (self.scaleWidth  / 2) - 4;
        self.circle.x=self.x + (self.scaleWidth/2);
        self.circle.y= self.y + (self.scaleHeight/2);


// Find the closest point to the circle within the rectangle
// Assumes axis alignment! ie rect must not be rotated
var closestX = self.clamp(self.circle.x, mario.rectangle.x, mario.rectangle.x + mario.rectangle.w);
var closestY = self.clamp(self.circle.y, mario.rectangle.y, mario.rectangle.y + mario.rectangle.h);

// Calculate the distance between the circle's center and this closest point
var distanceX = self.circle.x - closestX;
var distanceY = self.circle.y - closestY;

// If the distance is less than the circle's radius, an intersection occurs
var distanceSquared = (distanceX * distanceX) + (distanceY * distanceY);
var intersect = distanceSquared < (self.circle.radius * self.circle.radius);

if(intersect){
    self.alive = false;
    mario.lives-=1;
}

        //self.self.mario = mario;

        self.y += self.speed;

        // if(self.onehit == false)
        //   { mario.lives-=1; self.onehit = true;}

        // for(var i = 0; i < enemies.length; i ++){

        //     var dx = enemies[i].circle.x - self.circle.x;
        //     var dy = enemies[i].circle.y - self.circle.y;
        //     var distance = Math.sqrt(dx * dx + dy * dy);

        //     if (distance < enemies[i].circle.radius + self.circle.radius) {
        //         enemies[i].hit();
        //         enemies[i].targeted = false;
        //         self.alive = false;
        //         points = 1;
        //         break;
        //         //self.y = maxY;
        //         //self.speed = -1;
        //     }
        // }

        self.checkBoundary();

        return points;
    };

    self.checkBoundary = function()
    {
        if(self.y >= maxY)
        {
            self.missed = true;
            self.alive = false;
        }

    };

}

