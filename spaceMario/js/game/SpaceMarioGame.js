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
            self.timeStop = 0;
            self.pause = true;
            self.level = 1;

            self.shellsThrown = 0;
            self.shellsHit = 0;
            self.begin = false;
            self.stars = Array();


    //hide mouse
    self.canvas.style.cursor = "pointer";

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

    self.win = function(){
      self.time = self.timeStop;

        self.context.clearRect(0, 0, maxX, maxY);
        self.context.fillStyle = "black";
        self.context.fillRect(0,0,maxX, maxY);
        self.context.fillStyle = "lime";
        self.context.textAlign = "center";
        self.context.font = "48px sans-serif";
        self.context.fillText("You Win!", 250, 250);
        var rating = Math.ceil((((self.score/self.time)*((self.shellsHit/self.shellsThrown))*self.mario.lives)*1000)).toString();

        self.context.fillText("Rating: "+rating, 250, 300);

    }

      self.gameOver = function(){
      self.time = self.timeStop;

        self.context.clearRect(0, 0, maxX, maxY);
        self.context.fillStyle = "black";
        self.context.fillRect(0,0,maxX, maxY);
        self.context.fillStyle = "lime";
        self.context.textAlign = "center";
        self.context.font = "48px sans-serif";
        self.context.fillText("Game Over", 250, 250);
        var rating = "0";
        self.context.fillStyle = "red";
        self.context.fillText("Rating: "+rating, 250, 300);
    }

    self.drawScoreboard = function(){
      self.scoreboardContext.clearRect(0, 0, maxX, maxY);
      self.scoreboardContext.fillStyle = "rgb(0, 0, 0)";
      self.scoreboardContext.fillRect(0,0, maxX, maxY);
      self.scoreboardContext.fillStyle = "rgb(255, 255, 255)";
      self.scoreboardContext.font = "48px sans-serif";
      self.scoreboardContext.fillText("Score:", 10, 50);
      self.scoreboardContext.fillText(self.score.toString(), 200, 50);
      self.scoreboardContext.fillText("Time:", 10, 150);
      self.scoreboardContext.fillText(self.time.toString(), 150, 150);
      self.scoreboardContext.fillText("Lives:", 10, 250);

      for(var i = 0; i < self.mario.lives; i++){

            self.scoreboardContext.strokeStyle = "red";
            self.scoreboardContext.fillStyle = "red";
            self.scoreboardContext.beginPath();
            self.scoreboardContext.arc(50 *(i + 1) + 140, 245, 20, 0, 2 * Math.PI, false);
            self.scoreboardContext.stroke();
            self.scoreboardContext.fill();
      }

      self.scoreboardContext.fillStyle = "rgb(255, 255, 255)";
      self.scoreboardContext.fillText("Level:", 10, 350);
      self.scoreboardContext.fillText(self.level.toString(), 200, 350);

      self.scoreboardContext.fillStyle = "rgb(255, 255, 255)";
      self.scoreboardContext.fillText("Accuracy:", 10, 450);
      self.scoreboardContext.fillText(self.shellsHit.toString() + "/" + self.shellsThrown.toString(), 250, 450);


    }


        self.beginLevel4 = function(){

self.drawScoreboard();

      setTimeout(function(){
        self.context.clearRect(0, 0, maxX, maxY);
        self.context.fillStyle = "black";
        self.context.fillRect(0,0,maxX, maxY);
        self.context.fillStyle = "lime";
        self.context.textAlign = "center";
        self.context.font = "48px sans-serif";
        self.context.fillText("Final Level", 250, 250);
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
        self.time = self.timeStop;
        self.alien3 = new Alien(self.context, 0, 10, true);
        self.alien2 = new Alien(self.context, maxX - 80, 10 + 80, true);
        self.alien1 = new Alien(self.context, maxX/2 - 40, 10 + 2*80, true);
        //self.enemies.push(self.alien1);
        //self.enemies.push(self.alien2);
        self.enemies.push(self.alien3);
        self.pause = false;
        self.renderLoop();
      }, 4000);
    }

        self.beginLevel3 = function(){

    self.drawScoreboard();

      setTimeout(function(){
        self.context.clearRect(0, 0, maxX, maxY);
        self.context.fillStyle = "black";
        self.context.fillRect(0,0,maxX, maxY);
        self.context.fillStyle = "lime";
        self.context.textAlign = "center";
        self.context.font = "48px sans-serif";
        self.context.fillText("Level 3", 250, 250);
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
        self.time = self.timeStop;
        self.alien3 = new Alien(self.context, 0, 10, true);
        self.alien2 = new Alien(self.context, maxX - 80, 10 + 80, true);
        self.alien1 = new Alien(self.context, maxX/2 - 40, 10 + 2*80, true);
        self.enemies.push(self.alien1);
        self.enemies.push(self.alien2);
        self.enemies.push(self.alien3);
        self.pause = false;
        self.renderLoop();
      }, 4000);
    }

    self.beginLevel2 = function(){

  self.drawScoreboard();

      setTimeout(function(){
        self.context.clearRect(0, 0, maxX, maxY);
        self.context.fillStyle = "black";
        self.context.fillRect(0,0,maxX, maxY);
        self.context.fillStyle = "lime";
        self.context.textAlign = "center";
        self.context.font = "48px sans-serif";
        self.context.fillText("Level 2", 250, 250);
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
        self.time = self.timeStop;
        self.alien3 = new Alien(self.context, 0, 10, true);
        self.alien2 = new Alien(self.context, maxX - 80, 10 + 80, true);
        self.alien1 = new Alien(self.context, maxX/2 - 40, 10 + 2*80, true);
        self.enemies.push(self.alien1);
        self.enemies.push(self.alien2);
        self.enemies.push(self.alien3);
        self.pause = false;
        self.renderLoop();
      }, 4000);
    }

    self.beginLevel1 = function(){

self.drawScoreboard();

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
        

        self.alien3 = new Alien(self.context, 0, 10, true);
        self.alien2 = new Alien(self.context, maxX - 80, 10 + 80, true);
        self.alien1 = new Alien(self.context, maxX/2 - 40, 10 + 2*80, true);
        self.enemies.push(self.alien1);
        self.enemies.push(self.alien2);
        self.enemies.push(self.alien3);
    
        self.timeTick();
        self.pause = false;
        self.renderLoop();
      }, 4000);
    }



    self.displayStart = function(){
        self.context.clearRect(0, 0, maxX, maxY);
        self.context.fillStyle = "black";
        self.context.fillRect(0,0,maxX, maxY);
        self.context.fillStyle = "lime";
        self.context.textAlign = "center";
        self.context.font = "48px sans-serif";
        self.context.fillText("Click To Play", 250, 250);

        self.drawScoreboard();

        for(var i = 0; i < 100; i++){
          self.stars.push(Star.makeStar(self.context, Math.floor(Math.random() * (4 - 1)) + 1, Math.floor(Math.random() * (15 - 4)) + 4));
        }
    }



      self.renderLoop = function()
      {
        //clear canvas
        self.context.clearRect(0, 0, maxX, maxY);

        self.drawScoreboard();

        //paint black
        self.context.fillStyle = "rgb(0, 0, 0)";
        self.context.fillRect(0, 0, maxX, maxY);

        if(self.mario.lives <= 0){
          self.gameOver();
          return;
        }

        self.mario.update();
        self.mario.render();
        
        self.currentShell.x = self.mario.x;
        self.currentShell.y = self.mario.y - self.mario.scaleHeight;
        self.currentShell.render(self.enemies);

        if(self.enemies.length === 0){
          //go to another level

          self.level += 1;

          self.pause = true;

          self.timeStop = self.time;
          self.alien3 = new Alien(self.context, 0, 10, true);
          self.alien2 = new Alien(self.context, maxX - 80, 10 + 80, true);
          self.alien1 = new Alien(self.context, maxX/2 - 40, 10 + 2*80, true);


          //clear enemy's bullets from previous level
          for(var i = 0; i < self.enemyBullets.length; i++)
          {

           self.enemyBullets.splice(i, 1);
           i--;

         }

         //clear all my bullets from previous level
         for(var i = 0; i < self.myBullets.length; i++)
         {
          self.myBullets.splice(i, 1);
          i--;
          
        }

        if(self.level == 2)
        { 
          self.beginLevel2();
        }
        else if(self.level == 3)
        { 

          self.beginLevel3();
        }
        else if(self.level == 4)
        { 
          //boss level
          self.beginLevel4();
        }
        else if(self.level == 5){
          //you win
          self.win();
        }


          return;//kill this render loop
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

          var mushroom = self.enemies[i].update();
          if(mushroom){
            self.enemyBullets.push(mushroom);
          }



          self.enemies[i].render();      
        }

        //update and render enemy bullets
        for(var i = 0; i < self.enemyBullets.length; i++)
        {

          self.enemyBullets[i].update(self.mario);
          self.enemyBullets[i].render();

          if(self.enemyBullets[i].alive === false){

            self.enemyBullets.splice(i, 1);
            i--;
          }

        }

          //update and render my bullets
          for(var i = 0; i < self.myBullets.length; i++)
          {
            self.myBullets[i].render(self.enemies);
            self.score+=self.myBullets[i].update(self.enemies);

            if(self.myBullets[i].alive === false){

              if(self.myBullets[i].missed == false){
                self.shellsHit+=1;
              }

              self.myBullets.splice(i, 1);
              i--;
            }
          }

          for(var i = 0; i < self.stars.length; i++){
            self.stars[i].update();
            self.stars[i].render();
          }


          window.requestAnimationFrame(self.renderLoop);
        };

        self.canvasMouseMoved = function(evt)
        {
          self.mario.mouseMoved(evt);
        };

        self.canvasClicked = function(evt)
        {
          if(self.begin === false){
            self.begin = true;
            self.beginLevel1();
            return;
          }


          self.mario.jumpMario();
          var random = Math.floor(Math.random() * 2);

          if(random === 0){
            random = false;
          }else{
            random = true;
          }
          if(self.pause == false)
          {
            self.shellsThrown+=1;
            self.myBullets.push(self.currentShell);

            self.currentShell = new Shell(self.context, self.mario.x, self.mario.y, random);
          }
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

    self.throw12 = function(){
      for(var i = 0; i < 12; i++)
        {self.myBullets.push(new Shell(self.context, self.mario.x, self.mario.y, true));}
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
