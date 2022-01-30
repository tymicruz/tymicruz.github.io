/* Requires:
ScreenWidget.js
*/
function Star(context, scoreboard)
{
    ScreenWidget.call(this, context);
    var self = this;
    self.speed = 1;
    self.width = 2;
    self.color = "white";
    self.x_velocity = 1;
    self.y_velocity = 1;
    self.scoreboard = scoreboard;

    self.render = function ()
    {
        self.context.fillStyle = self.color;
        self.context.beginPath();
        self.context.arc(self.x, self.y, self.width, 0, Math.PI * 2, true);
        self.context.fill();
    };

    self.update = function ()
    {
        if(self.scoreboard == true){
            self.y += self.y + Math.pow(self.x, 2);//self.y_velocity;
        }
        else{
            self.y+= self.y_velocity;
        }
        self.x += self.x_velocity;

       self.checkBoundary();
   };

   self.checkBoundary = function()
   {
    if(self.y >= maxY + self.width || self.x >= maxX + self.width ||
        self.y <= 0 - self.width || self.x <= 0 - self.width)
    {
        self.width  = Math.floor(Math.random() * (5 - 1)) + 1;
        var coin = Math.floor(Math.random() * 2);

    //choose a wall
    var wall = Math.floor(Math.random() * (10 - 1)) + 1;

    self.x_velocity = Math.floor(Math.random() * (5 - 1)) + 1;//either
    self.y_velocity = Math.floor(Math.random() * (5 - 1)) + 1;//must pos

    console.log(wall);
    //come from top (y = 0, random x, -yspeed)
    if(wall === 1){
        self.x = Math.floor(Math.random() * (maxX - self.width/2));
        self.y = self.width/2;//top

        //choose negative or positive for x vel
        if(coin === 1){
            self.x_velocity*=(-1);
        }
        
        //y must be positive
    }
    //come from right (x = maxX - width)
    if(wall === 2){
        self.x = maxX - self.width/2;//right
        self.y = Math.floor(Math.random() * (maxY - self.width/2));

        //y vel can be - or +
        if(coin === 1){
            self.y_velocity *= (-1);
        }

        //x vel must be -
        self.x_velocity*=(-1);
    }

    //come from bottom
    if(wall === 3){
        self.x = Math.floor(Math.random() * (maxX - self.width/2));
        self.y = maxY - self.width/2;//bottom

        //x vel can be + or -
        if(coin === 1){
            self.x_velocity*=(-1);
        }

        //y vel must be -
        self.y_velocity*=(-1);

    }
    //come from left
    if(wall === 4){
        self.x = self.width/2; //left
        self.y = Math.floor(Math.random() * (maxY - self.width/2));

        //y can be - or + from the left
        if(coin===1){
            self.y_velocity*=(-1);
        }
    }
}
};

    //sets star to new random color
    self.changeColor = function()
    {
        var red = Math.floor(Math.random() * 255);
        var green = Math.floor(Math.random() * 255);
        var blue = Math.floor(Math.random() * 255);
        self.color = "rgb(" + red + ", " + green + ", " + blue + ")";
    };

   // self.changeColor();
}

Star.makeStar = function(context, width, speed, scoreboard)
{
    var someStar = new Star(context);
    var red = 255;//Math.floor(Math.random() * 255);
    var green = 255;//Math.floor(Math.random() * 255);
    var blue = 255;//Math.floor(Math.random() * 255);
    someStar.color = "rgb(" + red + ", " + green + ", " + blue + ")";
    someStar.speed = speed;
    someStar.width = width;
    someStar.scoreboard = scoreboard;

    var coin = Math.floor(Math.random() * 2);

    //choose a wall
    var wall = Math.floor(Math.random() * (5 - 1)) + 1;

    someStar.x_velocity = 1;//Math.floor(Math.random() * (5 - 1)) + 1;//either
    someStar.y_velocity = 1;//Math.floor(Math.random() * (5 - 1)) + 1;//must pos

    console.log(wall);
    //come from top (y = 0, random x, -yspeed)
    if(wall === 1){
        someStar.x = Math.floor(Math.random() * (maxX - someStar.width/2));
        someStar.y = someStar.width/2;//top

        //choose negative or positive for x vel
        if(coin === 1){
            someStar.x_velocity*=(-1);
        }
        
        //y must be positive
    }
    //come from right (x = maxX - width)
    if(wall === 2){
        someStar.x = maxX - someStar.width/2;//right
        someStar.y = Math.floor(Math.random() * (maxY - someStar.width/2));

        //y vel can be - or +
        if(coin === 1){
            someStar.y_velocity *= (-1);
        }

        //x vel must be -
        someStar.x_velocity*=(-1);
    }

    //come from bottom
    if(wall === 3){
        someStar.x = Math.floor(Math.random() * (maxX - someStar.width/2));
        someStar.y = maxY - someStar.width/2;//bottom

        //x vel can be + or -
        if(coin === 1){
            someStar.x_velocity*=(-1);
        }

        //y vel must be -
        someStar.y_velocity*=(-1);

    }
    //come from left
    if(wall === 4){
        someStar.x = someStar.width/2; //left
        someStar.y = Math.floor(Math.random() * (maxY - someStar.width/2));

        //y can be - or + from the left
        if(coin===1){
            someStar.y_velocity*=(-1);
        }


    }

    return someStar;
};