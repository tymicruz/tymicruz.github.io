/* Requires:
ScreenWidget.js
 */
function Star(context)
{
    ScreenWidget.call(this, context);
    var self = this;
    self.speed = 1;
    self.width = 2;
    self.color = "white";

    self.render = function ()
    {
        self.context.fillStyle = self.color;
        self.context.beginPath();
        self.context.arc(self.x, self.y, self.width, 0, Math.PI * 2, true);
        self.context.fill();
    };

    self.update = function ()
    {
        self.y += self.speed;
        self.checkBoundary();
    };

    self.checkBoundary = function()
    {
        if(self.y > maxY)
        {
            //reset location
            self.y = 0;

            //change color for next go around
           // self.changeColor();

            //go somewhere else on the star field;
            if(maxX != undefined)
            {
                self.x = Math.floor(Math.random() * maxX) + 1;
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

    self.changeColor();
}

Star.makeStar = function(context, width, speed)
{
    var someStar = new Star(context);
    var red = 255;//Math.floor(Math.random() * 255);
    var green = 255;//Math.floor(Math.random() * 255);
    var blue = 255;//Math.floor(Math.random() * 255);
    someStar.color = "rgb(" + red + ", " + green + ", " + blue + ")";
    someStar.speed = speed;
    someStar.width = width;
    someStar.x = Math.floor(Math.random() * maxX);
    someStar.y = Math.floor(Math.random() * maxY);
    return someStar;
};