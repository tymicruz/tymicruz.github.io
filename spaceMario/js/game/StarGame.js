/*
Main file for Star Game
Requires: ScreenWidget.js
          Star.js
          SpaceShip.js
 */
function StarGame(canvas, shipImageSrc, scoreboard)
{
    var self = this;
    self.canvas = canvas;
    self.context = canvas.getContext("2d");
    self.scoreboardContext = scoreboard.getContext("2d");
    self.shipImage = new Image();
    self.shipImage.src = shipImageSrc;
    self.widgets = Array();

    self.enemies = Array();
    self.enemyBullets = Array();
    self.myBullets = Array();



    //hide mouse
    self.canvas.style.cursor = "none";

    //set up player piece
   // self.playerShip = new SpaceShip(self.context, self.shipImage, 0, 66, 64, 64);


    //set up globals
    maxX = canvas.clientWidth;
    maxY = canvas.clientHeight;

    self.alien3 = new Alien(self.context, 0, 10, true);
    self.alien2 = new Alien(self.context, maxX - 80, 10 + 80, true);

    self.alien1 = new Alien(self.context, maxX/2 - 40, 10 + 2*80, true);
    self.mario = new Mario(self.context);
    self.currentShell = new Shell(self.context, self.mario.x, self.mario.y - self.mario.ScaleHeight, false);

    self.begin = function()
    {
      self.scoreboardContext.fillStyle = "rgb(0, 100, 255)";
      self.scoreboardContext.fillRect(0, 0, maxX, maxY);

      //setTimeout(function(){
        self.init();
        self.renderLoop();
      //}, 3000)
        //self.init();
        //self.renderLoop();
    };

    //resets game state
    self.init = function()
    {
        //placing ship last puts it on top of the stars
      //  self.widgets.push(self.playerShip);
        self.enemies.push(self.alien1);
        self.enemies.push(self.alien2);
        self.enemies.push(self.alien3);

       // self.widgets.push(self.mario);

        
        //begin game
        //window.requestAnimationFrame(self.renderLoop);
    };

    self.renderLoop = function()
    {
        //clear canvas
        self.context.clearRect(0, 0, maxX, maxY);

        //paint black
        self.context.fillStyle = "rgb(0, 0, 0)";
        self.context.fillRect(0, 0, maxX, maxY);

        //render widgets
        for(var i = 0; i < self.enemies.length; i++)
        {
          if(self.enemies[i].alive === false){
            console.log("dead");
                self.enemies.splice(i, 1);
                i--;
                continue;
            }

            self.enemies[i].render();
            self.enemies[i].update();

            
        }

           for(var i = 0; i < self.enemyBullets.length; i++)
        {
            self.enemyBullets[i].render();
            self.enemyBullets[i].update();


        }

           for(var i = 0; i < self.myBullets.length; i++)
        {
            self.myBullets[i].render(self.enemies);
            self.myBullets[i].update(self.enemies);

            if(self.myBullets[i].alive === false){
                self.myBullets.splice(i, 1);
                i--;
            }
        }

        self.mario.render();
        self.mario.update();
        self.currentShell.x = self.mario.x;
        self.currentShell.y = self.mario.y - self.mario.ScaleHeight;
        self.currentShell.render(self.enemies);




        window.requestAnimationFrame(self.renderLoop);
    };

    self.canvasMouseMoved = function(evt)
    {
        //update interested parties
       // self.playerShip.mouseMoved(evt);
        self.mario.mouseMoved(evt);
    };

    self.canvasClicked = function(evt)
    {
      self.mario.jumpMario();
      var random = Math.floor(Math.random() * 2);
      //console.log(random);
      if(random === 0){
        random = false;
      }else{
        random = true;
      }
      self.myBullets.push(self.currentShell);

      self.currentShell = new Shell(self.context, self.mario.x, self.mario.y, random);
    }

    //set up event listeners
    canvas.addEventListener("mousemove", self.canvasMouseMoved, false);
    canvas.addEventListener("click", self.canvasClicked, false);

    KEY_CODES = {
      37: 'left',
      38: 'up',
      39: 'right',
      40: 'down'
    }

    self.hitAll = function(){
        for(var i = 0; i < self.widgets.length; i++){
        
            console.log(self.GetInstanceType(self.widgets[i]));
                if(self.GetInstanceType(self.widgets[i]) == "Alien"){
                    self.widgets[i].hit();
                }         
        }
    }

    self.GetInstanceType = function(obj)
    {
        var str = obj.constructor.toString();
        return str.substring(9, str.indexOf("("));
    }


    KEY_STATUS = { keyDown:false };
    for (code in KEY_CODES) {
      KEY_STATUS[KEY_CODES[code]] = false;
    }

    $(window).keydown(function (e) {

      KEY_STATUS.keyDown = true;

      // perform functionality for keydown
      if (KEY_CODES[e.keyCode]) {
          e.preventDefault();
          //alert('arrow');
          if(e.keyCode == 40)
          {
              // Arrow Down 
              //console.log("hello down")
              //self.hitAll();
              self.mario.move(0,0,1,0);
          }

          if(e.keyCode == 39)
          {
              // Arrow Right    
              self.mario.move(0,1,0,0);
          }

          if(e.keyCode == 38)
          {
              // Arrow Up    
              self.mario.move(1,0,0,0);
          }

          if(e.keyCode == 37)
          {
              // Arrow Left  
              self.mario.move(0,0,0,1);  
          }

      }

    }).keyup(function (e) {
      KEY_STATUS.keyDown = false;
      if (KEY_CODES[e.keyCode]) {          
        e.preventDefault();
        KEY_STATUS[KEY_CODES[e.keyCode]] = false;
      }
    });
}
