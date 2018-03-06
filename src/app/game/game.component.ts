import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    var canvas = <HTMLCanvasElement>document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    var com = new Image(); com.src = "assets/comed.jpg";
    var water = new Image(); water.src = "assets/water.png";
    var background = new Image(); background.src ="assets/road.png";
    var log = new Image(); log.src = "assets/ram.png";
    var cMail = new Image(); cMail.src = "assets/closemail.png";
    var oMail = new Image(); oMail.src = "assets/openmail.png";

    // frog 
    var frog = new Image(); frog.src = "assets/fouser.png";
    var sx = 0;
    var sy = 0;
    var swidth = 40;
    var sheight = 40;
    var x = 50;
    var y = 444;
    var width = 30;
    var height = 30;
    var isDead = false;

    // key movement
    var rightPressed = false;
    var leftPressed = false;
    var upPressed = false;
    var downPressed = false;
    var up = true;
    var down = true;
    var right = true;
    var left = true;

    // draw car
    var car = new Image(); car.src = "assets/car.png";
    var carWidth = 60;
    var carHeight = 40;

    var carX =[100, 500, 460, 400, 360, 60, 100, 160]; // x start
    var carSX =[0, 60, 120, 180, 0, 180, 60, 120]; // which car to draw
    var carY =[398, 398, 353, 308, 263, 353, 308, 263]; // y start


    // direction 0 = left to right, 1 = right to left
    var l1 = 4;
    var l1d = 1;

    var l2 = 3;
    var l2d = 1;

    var l3 = 4;
    var l3d = 0;

    var l4 = 5;
    var l4d = 0;


    // log var
    var logWidth = 120;
    var logHeight = 30;
    var logSpeed = 2;

    var logX1 = 300
    var logY1 = 180;

    var logX2 = 40;
    var logY2 = 180;

    var logX3 = 100;
    var logY3 = 136;

    var logX4 = 400;
    var logY4 = 136;

    var logX5 = 480;
    var logY5 = 92;

    var logX6 = 60;
    var logY6 = 92;

    var logX7 = 120;
    var logY7 = 48;

    var logX8 = 500;
    var logY8 = 48;

    // pad variable
    var padWidth = 30;
    var padHeight = 30;
    var padY = 4;
    var padX1 = 20;
    var padX2 = 120;
    var padX3 = 220;
    var padX4 = 320;
    var padX5 = 420;
    var padX6 = 520;

    var pad1 = false;
    var pad2 = false;
    var pad3 = false;
    var pad4 = false;
    var pad5 = false;
    var pad6 = false;

    var lives = 8;
    var livesLost = 0;
    var play = true;
    var victoryCondition = false;
    

    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);

    function keyDownHandler(e){
      if(e.keyCode == 39){rightPressed = true;}
      if(e.keyCode == 37){leftPressed = true;}
      if(e.keyCode == 38){upPressed = true;}
      if(e.keyCode == 40){downPressed = true;}
    }

    function keyUpHandler(e){
      if(e.keyCode == 39){rightPressed = false;}
      if(e.keyCode == 37){leftPressed = false;}
      if(e.keyCode == 38){upPressed = false;}
      if(e.keyCode == 40){downPressed = false;}
    }
    
    function drawBackground(){
      // ctx.fillStyle = "lime";
      // ctx.fillRect(0, 440, 570, 45);
      // ctx.fillRect(0, 220, 570, 45);
      ctx.drawImage(background, 0, 0)

      ctx.drawImage(com, 0, 440, 570, 45);
      ctx.drawImage(com, 0, 220, 570, 45);
      ctx.fillStyle = "black";
      ctx.fillRect(0,485, 570, 540);

      ctx.beginPath();
      ctx.moveTo(0,395);
      ctx.lineTo(570,395);
      ctx.strokeStyle = "white";
      ctx.setLineDash([5]);
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0,350);
      ctx.lineTo(570,350);
      ctx.strokeStyle = "white";
      ctx.setLineDash([0]);
      ctx.lineWidth = 4;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0,305);
      ctx.lineTo(570,305);
      ctx.strokeStyle = "white";
      ctx.setLineDash([5]);
      ctx.lineWidth = 2;
      ctx.stroke();

      // ctx.fillStyle = "blue";
      // ctx.fillRect(0, 0, 570, 220);
      ctx.drawImage(water, 0, 0, 570, 220);
    }

    function drawFrog(){
      ctx.drawImage(frog, sx, sy, swidth, sheight, x, y, width, height);
    }

    function moveFrog(){
      if(upPressed == true && up == true && y >20){
        y = y-44;
        up = false;
        sx = 0;
      }
      if(upPressed == false){
        up = true;
      }
      
      if(downPressed == true && down == true && y + height < canvas.height - 80){
        y = y+44;
        down = false;
        sx = 0;
      }
      if(downPressed == false){
        down = true;
      }

      if(leftPressed == true && left == true && x > 20){
        x = x-44;
        left = false;
        sx = 80;
      }
      if(leftPressed == false){
        left = true;
      }

      if(rightPressed == true && right == true && x + width < canvas.width - 20){
        x = x+44;
        right = false;
        sx = 40;
      }
      if(rightPressed == false){
        right = true;
      }
    }

    function drawCars(){

      var carsSX = [carSX[0], carSX[1], carSX[2], carSX[3], carSX[4], carSX[5], carSX[6], carSX[7]];
      var carsX = [carX[0], carX[1], carX[2], carX[3], carX[4], carX[5], carX[6], carX[7]];
      var carsY = [carY[0], carY[1], carY[2], carY[3], carY[4], carY[5], carY[6], carY[7]];

     

      for(var i = 0; i < carsX.length; i++){
        ctx.drawImage(car, carsSX[i], 0, 60, 35, carsX[i], carsY[i], carWidth, carHeight);
      }
    }

    function moveCars(){
     
      // Lane 1
      if(l1d == 0){
        if (carX[1] < canvas.width + 100){carX[1] = carX[1] + l1;}
        else {
          carX[1] = - 100;
          carSX[1] = (Math.floor(Math.random()*4))*60;
        }

        if (carX[0] < canvas.width + 100){carX[0] = carX[0] + l1;}
        else {
          carX[0] = -100;
          carSX[0] = (Math.floor(Math.random()*4))*60;
        }
      }
      else{
        if (carX[1] > - 100){carX[1] = carX[1] - l1;}
        else {
          carX[1] = canvas.width+100;
          carSX[1] = (Math.floor(Math.random()*4))*60;
        }

        if (carX[0] > - 100){carX[0] = carX[0] - l1;}
        else {
          carX[0] = canvas.width+100;
          carSX[0] = (Math.floor(Math.random()*4))*60;
        }
      }

      // Lane 2
      if(l2d == 0){
        if (carX[2] < canvas.width + 100){carX[2] = carX[2] + l2;}
        else {
          carX[2] = - 100;
          carSX[2] = (Math.floor(Math.random()*4))*60;
        }

        if (carX[5] < canvas.width + 100){carX[5] = carX[5] + l2;}
        else {
          carX[5] = -100;
          carSX[5] = (Math.floor(Math.random()*4))*60;
        }
      }
      else{
        if (carX[2] > - 100){carX[2] = carX[2] - l2;}
        else {
          carX[2] = canvas.width+100;
          carSX[2] = (Math.floor(Math.random()*4))*60;
        }

      if (carX[5] > - 100){carX[5] = carX[5] - l2;}
        else {
          carX[5] = canvas.width+100;
          carSX[5] = (Math.floor(Math.random()*4))*60;
        }
      }

      // lane 3
      if(l3d == 0){
        if (carX[3] < canvas.width + 100){carX[3] = carX[3] + l3;}
        else {
          carX[3] = -100;
          carSX[3] = (Math.floor(Math.random()*4))*60;
        }

        if (carX[6] < canvas.width + 100){carX[6] = carX[6] + l3;}
        else {
          carX[6] = -100;
          carSX[6] = (Math.floor(Math.random()*4))*60;
        }
      }
      else{
        if (carX[3] > - 100){carX[3] = carX[3] - l3;}
        else {
          carX[3] = canvas.width+100;
          carSX[3] = (Math.floor(Math.random()*4))*60;
        }

        if (carX[6] > - 100){carX[6] = carX[6] - l3;}
        else {
          carX[6] = canvas.width+100;
          carSX[6] = (Math.floor(Math.random()*4))*60;
        }
      }

      // lane 4
      if(l4d == 0){
        if (carX[4] < canvas.width + 100){carX[4] = carX[4] + l4;}
        else {
          carX[4] = -100;
          carSX[4] = (Math.floor(Math.random()*4))*60;
      }

        if (carX[7] < canvas.width + 100){carX[7] = carX[7] + l4;}
        else {
          carX[7] = -100;
          carSX[7] = (Math.floor(Math.random()*4))*60;
        }
      }
      else{
        if (carX[4] > - 100){carX[4] = carX[4] - l4;}
        else {
          carX[4] = canvas.width+100;
          carSX[4] = (Math.floor(Math.random()*4))*60;
        }

        if (carX[7] > - 100){carX[7] = carX[7] - l4;}
        else {
          carX[7] = canvas.width+100;
          carSX[7] = (Math.floor(Math.random()*4))*60;
        }
      }

      

    }
    
    function runOver(){
      var carsX = [carX[0], carX[1], carX[2], carX[3], carX[4], carX[5], carX[6], carX[7]];
      var carsY = [carY[0], carY[1], carY[2], carY[3], carY[4], carY[5], carY[6], carY[7]];

      for(var i = 0; i < carsX.length; i++){
        if(carsX[i] <= x + width &&
          carsX[i] + carWidth >= x &&
          carsY[i] + carHeight >= y &&
          carsY[i] <= y + height){
            isDead = true;
            livesLost ++;
          }
      }
    }

    function drawLogs(){
      ctx.fillStyle = "tan";
      var logsX = [logX1, logX2, logX3, logX4, logX5, logX6, logX7, logX8];
      var logsY = [logY1, logY2, logY3, logY4, logY5, logY6, logY7, logY8];
      for(var i = 0; i < logsX.length; i++)
        ctx.drawImage(log, logsX[i], logsY[i], logWidth, logHeight);
    }

    function moveLogs(){
      if(logX1 < canvas.width +100){
        logX1 = logX1 + logSpeed;
      }
      else{
        logX1 = -100;
      }

      if(logX2 < canvas.width +100){
        logX2 = logX2 + logSpeed;
      }
      else{
        logX2 = -100;
      }

      if(logX3 > 0-logWidth){
        logX3 = logX3 - logSpeed;
      }
      else{
        logX3 = canvas.width + 100;
      }

      if(logX4 > 0-logWidth){
        logX4 = logX4 - logSpeed;
      }
      else{
        logX4 = canvas.width + 100;
      }

      if(logX5 < canvas.width +100){
        logX5 = logX5 + logSpeed;
      }
      else{
        logX5 = -100;
      }

      if(logX6 < canvas.width +100){
        logX6 = logX6 + logSpeed;
      }
      else{
        logX6 = -100;
      }

      if(logX7 > 0-logWidth){
        logX7 = logX7 - logSpeed;
      }
      else{
        logX7 = canvas.width + 100;
      }

      if(logX8 > 0-logWidth){
        logX8 = logX8 - logSpeed;
      }
      else{
        logX8 = canvas.width + 100;
      }
    }

    function float(){
      if(y < 200){
        if(logX1 <= x + width &&
          logX1 + logWidth >= x &&
          logY1 + logHeight >= y &&
          logY1 <= y + height){
            if(x < canvas.width - 30){
              x = x + logSpeed;
            }
          }
        else if(logX2 <= x + width &&
                logX2 + logWidth >= x &&
                logY2 + logHeight >= y &&
                logY2 <= y + height){
                  if(x < canvas.width - 30){
                    x = x + logSpeed;
                  }
                }
        else if(logX3 <= x + width &&
                logX3 + logWidth >= x &&
                logY3 + logHeight >= y &&
                logY3 <= y + height){
                  if(x > 0){
                      x = x - logSpeed;
                    }
                  }
        else if(logX4 <= x + width &&
                  logX4 + logWidth >= x &&
                  logY4 + logHeight >= y &&
                  logY4 <= y + height){
                    if(x > 0){
                        x = x - logSpeed;
                      }
                    }
        else if(logX5 <= x + width &&
                  logX5 + logWidth >= x &&
                  logY5 + logHeight >= y &&
                  logY5 <= y + height){
                    if(x < canvas.width - 30){
                        x = x + logSpeed;
                      }
                    }
        else if(logX6 <= x + width &&
                  logX6 + logWidth >= x &&
                  logY6 + logHeight >= y &&
                  logY6 <= y + height){
                    if(x < canvas.width - 30){
                        x = x + logSpeed;
                      }
                    }
        else if(logX7 <= x + width &&
                  logX7 + logWidth >= x &&
                  logY7 + logHeight >= y &&
                  logY7 <= y + height){
                    if(x > 0){
                        x = x - logSpeed;
                      }
                    }
        else if(logX8 <= x + width &&
                  logX8 + logWidth >= x &&
                  logY8 + logHeight >= y &&
                  logY8 <= y + height){
                    if(x > 0){
                        x = x - logSpeed;
                      }
                    }
        else if (y < 220 && y > 44){
        y=444;
        livesLost ++;
        }
      }
    }

    function drawPads(){
      
      var padsX = [padX1, padX2, padX3, padX4, padX5, padX6]

      for(var i = 0; i < padsX.length; i++){
        ctx.drawImage(cMail, padsX[i], padY, padWidth, padHeight);
      }
    }

    function onPad(){
      if(padX1 <= x + width && 
        padX1 + padWidth >= x &&
        padY + padHeight >= y &&
        padY <= y + height){
          pad1 = true;
          y = 444;
        }
        else if(padX2 <= x + width && 
          padX2 + padWidth >= x &&
          padY + padHeight >= y &&
          padY <= y + height){
            pad2 = true;
            y = 444;
          }
        else if(padX3 <= x + width && 
          padX3 + padWidth >= x &&
          padY + padHeight >= y &&
          padY <= y + height){
            pad3 = true;
            y = 444;
          }
        else if(padX4 <= x + width && 
          padX4 + padWidth >= x &&
          padY + padHeight >= y &&
          padY <= y + height){
            pad4 = true;
            y = 444;
          }
        else if(padX5 <= x + width && 
          padX5 + padWidth >= x &&
          padY + padHeight >= y &&
          padY <= y + height){
            pad5 = true;
            y = 444;
          }
        else if(padX6 <= x + width && 
          padX6 + padWidth >= x &&
          padY + padHeight >= y &&
          padY <= y + height){
            pad6 = true;
            y = 444;
          }
        else if( y < 48){
          y = 444;
        }
      var pads = [pad1, pad2, pad3, pad4, pad5, pad6];
      var padsX = [padX1, padX2, padX3, padX4, padX5, padX6];

      for(var i = 0; i < pads.length; i++){
        if(pads[i] == true){
          ctx.drawImage(oMail, 0, 0, 40, 40, padsX[i], padY, 40, 40)
        }
      }
    }

    function drawLives(){
      if(lives - livesLost != 0){
        ctx.fillStyle ="white";
        ctx.font = "30px Arial";
        ctx.fillText("LIVES: "+(lives-livesLost),(canvas.width/2)-70, 525);
      }
    }

    function victory (){
      if(pad1 && pad2 && pad3 && pad4 && pad5 && pad6){
        ctx.fillStyle = "white";
        ctx.font = "40px Arial";
        ctx.fillText("CONGRATS, UR NOT IDIOT!",30, 250);
        ctx.font = "28px Arial";
        ctx.fillText("Refresh to play again!", 150, 465);
        victoryCondition = true;
        
      }
    }

    function gameOver(){
      if(lives - livesLost == 0){
        play = false;
        ctx.fillStyle = "white";
        ctx.font = "52px Arial";
        ctx.fillText ("YOU GOT SCAMMED!", 20, 100);
        ctx.font = "28px Arial";
        ctx.fillText("Refresh to try again!", 150, 150);
      }
    }

    function draw(){
      ctx.clearRect(0, 0, canvas.width, canvas.height);
     

      if(victoryCondition == false){
        gameOver();
        drawLives();
      }
      
      if(play){
        
        drawBackground();
        drawLives();
        if(isDead){
          ctx.drawImage(frog, sx, sy, swidth, sheight, x, y, width, height);
        }
        drawLogs();
        moveLogs();
        drawPads();
        onPad();
        if(!victoryCondition){
          drawFrog();
        }
        moveFrog();
        drawCars();
        moveCars();
        runOver();
        float();
        victory();
      }

      window.requestAnimationFrame(draw);
    }
    draw();
    
  }

}


  
