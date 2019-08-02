// function keycheck(e){

// }

let speed = 100;
let step = 20;
let sigane = 1180;
let simagle = 560;
let dirArr = [0, step];
let score = 0;
let color = 'green';
let go = 0;
let points = 1;
let btn = document.querySelector('button');

let highScore = window.localStorage.getItem('highScore');
let square = document.querySelectorAll('.square');

if (!highScore){
    highScore = 0;
    localStorage.setItem('highScore', highScore);
}
document.querySelector('#highScore').innerHTML = highScore;

btn.addEventListener('click', ()=>{
    if(go == 1){
        go = 0;
        btn.innerHTML = "Play";
        btn.style.backgroundColor = 'rgb(0, 200, 200)';
    }else{
        go = 1;
        btn.innerHTML = "stop";
        btn.style.backgroundColor = 'red';
    }
    
});

function createSnake(){ //creating body Snake
    

    let container = document.querySelector('.container');
    for (let i = 1; i<7; i++){
        let snake = document.querySelectorAll('.square');
        let tail = document.createElement("div");
        tail.classList.add('square');
        tail.style.left = snake[i-1].offsetLeft - step + 'px';
        tail.style.top = snake[i-1].offsetTop + 'px';
        container.appendChild(tail);
    }
}

function createApple(){//creating Apple
                
    let maxX = (sigane/step) - 1;
    let maxY = (simagle/step) - 1;

    let corX = Math.floor(Math.random() * maxX) * step;
    let corY = Math.floor(Math.random() * maxY) * step;

    let coordinates = [corX, corY];

    console.log(coordinates);
    let apple = document.createElement('div');
    apple.classList.add('apple');
    apple.style.left = corX +'px';
    apple.style.top = corY + 'px';

    let container = document.querySelector('.container');
    container.appendChild(apple);

}
function showScore(){
    score+=points;
    document.querySelector('#score').innerHTML = score;
}


function Snake(){
    this.head = document.querySelector('#head');
    this.body = document.querySelectorAll('.square');

    this.die = function(){
        let snake = this.body;

        for(let i=1; i<snake.length;i++){
            if(head.offsetLeft == snake[i].offsetLeft && head.offsetTop == snake[i].offsetTop){
                if (score>highScore){
                    window.location.reload();
                    localStorage.setItem('highScore', score);
                    alert("Game Over!Congrats You Set New Record:"+ score);
                }else{
                    window.location.reload();
                    alert("Game Over! Your Score:"+score);
                }
               
            }
        }
    
        
    }

    this.move = function(){
        let arr=[]
        let head = this.head;
        let snake = this.body
        
    
        //mooving
        for (let index = 0; index < snake.length-1; index++) {
            let coordinates={}
            coordinates.corX=snake[index].offsetLeft;
            coordinates.corY=snake[index].offsetTop;
            arr.push(coordinates);
        }
    
        if(go){
            for (let index = snake.length-1; index > 0; index-=1) {
                snake[index].style.left = arr[index - 1].corX+'px';
                snake[index].style.top = arr[index - 1].corY+'px';
                
            }
        }

        //crushing into wall
        if (head.offsetLeft == sigane || head.offsetLeft == -step || head.offsetTop == simagle || head.offsetTop == -step){
            this.die();
        }

    }
        

// changing direction
    this.changeDirectionOfWholeSnake = function(){
        let head = this.head;
        document.addEventListener('keydown', function(e){
            
            if (e.keyCode == 38) {
               if(dirArr[0] != step){
                    dirArr[0] = -step;
                    dirArr[1] = 0;
                }
            }else if (e.keyCode == 39) {
                if (dirArr[1] != -step){
                    dirArr[0] = 0;
                    dirArr[1] = step;
                }
            }else if (e.keyCode == 40){
               if (dirArr[0] != -step) {    
                    dirArr[0] = step;
                    dirArr[1] = 0;
               }            
            }else if (e.keyCode == 37) {
                if(dirArr[1] != step){
                    dirArr[0] = 0;
                    dirArr[1] = -step;
                }
           }
        });
        if(go){
            head.style.left = head.offsetLeft + dirArr[1] + 'px';
            head.style.top = head.offsetTop + dirArr[0] + 'px';
        }
    }

   

    this.addSegment = function(){
        let snake = this.body
        let indexOfLast = snake.length - 1;
        let lastSegX = snake[indexOfLast].offsetLeft;
        let lastSegY = snake[indexOfLast].offsetTop;
    
        let newSeg = document.createElement('div');
        newSeg.classList.add('square');
        newSeg.style.left = lastSegX;
        newSeg.style.top = lastSegY;
        newSeg.style.backgroundColor = color;
        

    
        let container = document.querySelector('.container');
        container.appendChild(newSeg);
    }
    this.eatApple = function(){
            createApple();
            showScore();
            this.addSegment();
            // this.changeColor();
    }

    this.checkForApple = function() {
        let apple = document.querySelector('.apple');
        let head = this.head;
        if(head.offsetLeft == apple.offsetLeft && head.offsetTop == apple.offsetTop){
            apple.remove();
            this.eatApple();
        }
    }

    
    
}


function game(){
    let snake = new Snake;

    snake.move();
    snake.changeDirectionOfWholeSnake();
    snake.checkForApple();
    snake.die();


}

window.addEventListener('DOMContentLoaded', () => {

    createSnake();
    createApple();
    setInterval(game ,100);

});


