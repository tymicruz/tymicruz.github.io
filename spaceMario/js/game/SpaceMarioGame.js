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
    self.score = 0;
    self.streak = 0;

    self.time = 0;


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
    self.currentShell = new Shell(self.context, self.mario.x, self.mario.y - self.mario.scaleHeight, false);

    self.timeTick = function(){
      setTimeout(function(){
        self.time+=1;
        self.timeTick();
      }, 1000);
    }

    self.beginLevel1 = function(){

        self.scoreboardContext.fillStyle = "rgb(0, 20, 255)";
        self.scoreboardContext.fillRect(0,0, maxX, maxY);
        self.scoreboardContext.fillStyle = "rgb(255, 255, 255)";
        self.scoreboardContext.fillText("Score:", 10, 50);
        self.scoreboardContext.fillText(self.score.toString(), 10, 100);

      setTimeout(function(){
        self.context.clearRect(0, 0, maxX, maxY);
        self.context.fillStyle = "black";
        self.context.fillRect(0,0,maxX, maxY);
        self.context.fillStyle = "lime";
        self.context.textAlign = "center";
        self.context.font = "48px sans-serif";
        self.context.fillText("Level 1", 250, 250);
      }, 0000);
      setTimeout(function(){
        self.context.clearRect(0, 0, maxX, maxY);
        self.context.fillStyle = "black";
        self.context.fillRect(0,0,maxX, maxY);
        self.context.fillStyle = "lime";
        self.context.textAlign = "center";
        self.context.font = "48px sans-serif";
      self.context.fillText("3...", 250, 250);
      }, 1000);

      setTimeout(function(){
        self.context.clearRect(0, 0, maxX, maxY);
        self.context.fillStyle = "black";
        self.context.fillRect(0,0,maxX, maxY);
        self.context.fillStyle = "lime";
self.context.textAlign = "center";
        self.context.font = "48px sans-serif";
      self.context.fillText("2..", 250, 250);
      }, 2000);

      setTimeout(function(){
        self.context.clearRect(0, 0, maxX, maxY);
        self.context.fillStyle = "black";
        self.context.fillRect(0,0,maxX, maxY);
        self.context.fillStyle = "lime";
        self.context.textAlign = "center";
        self.context.font = "48px sans-serif";
        self.context.fillText("1.", 250, 250);
        
      }, 3000);

      setTimeout(function(){
        self.timeTick();
        self.begin();
      }, 4000);
    }


    self.begin = function()
    {

      //self.scoreboardContext.font = "48px serif";
      //self.scoreboardContext.fillText("Hello world", 10, 50);

      //self.scoreboardContext.fillStyle = "rgb(0, 100, 255)";
      //self.scoreboardContext.fillRect(0, 0, maxX, maxY);

        self.init();
        self.renderLoop();
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

        self.scoreboardContext.clearRect(0, 0, maxX, maxY);
        self.scoreboardContext.fillStyle = "rgb(0, 20, 255)";
        self.scoreboardContext.fillRect(0,0, maxX, maxY);
        self.scoreboardContext.fillStyle = "rgb(255, 255, 255)";
        self.scoreboardContext.font = "48px sans-serif";
        self.scoreboardContext.fillText("Score:", 10, 50);
        self.scoreboardContext.fillText(self.score.toString(), 10, 100);
        self.scoreboardContext.fillText("Time:", 10, 150);
        self.scoreboardContext.fillText(self.time.toString(), 10, 200);

        //paint black
        self.context.fillStyle = "rgb(0, 0, 0)";
        self.context.fillRect(0, 0, maxX, maxY);

        self.mario.update();
        self.mario.render();
        
        self.currentShell.x = self.mario.x;
        self.currentShell.y = self.mario.y - self.mario.scaleHeight;
        self.currentShell.render(self.enemies);

        if(self.enemies.length === 0){
          //go to another level
          self.alien3 = new Alien(self.context, 0, 10, true);
          self.alien2 = new Alien(self.context, maxX - 80, 10 + 80, true);
          self.alien1 = new Alien(self.context, maxX/2 - 40, 10 + 2*80, true);

            self.enemies.push(self.alien1);
        self.enemies.push(self.alien2);
        self.enemies.push(self.alien3);
          //return;
        }

        //render widgets
        for(var i = 0; i < self.enemies.length; i++)
        {
          if(self.enemies[i].alive === false){
            console.log("dead");
                self.enemies.splice(i, 1);
                i--;
                continue;
            }

            
            self.enemies[i].update();
            self.enemies[i].render();
            
        }

           for(var i = 0; i < self.enemyBullets.length; i++)
        {
            
            self.enemyBullets[i].update();
            self.enemyBullets[i].render();

        }

           for(var i = 0; i < self.myBullets.length; i++)
        {
            self.myBullets[i].render(self.enemies);
            self.score+=self.myBullets[i].update(self.enemies);

            if(self.myBullets[i].alive === false){
                self.myBullets.splice(i, 1);
                i--;
            }
        }


        window.requestAnimationFrame(self.renderLoop);
    };

    self.canvasMouseMoved = function(evt)
    {
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
