

const cv = document.getElementById("cv");
const ctx = cv.getContext("2d");

let appleIcon = new Image();
appleIcon.src = './images/apple.png';

document.addEventListener('keydown', keyPush);

let snake = [];
const bodySize = 18;
const blockSize = 20;
var apple = {x: 10, y: 10};
const MIN = 2;
let len = MIN;
let score = 0;
let timer;
let isLive = true;
let head, tail;

let px = py = 10;
let dx = 0, dy = 1;

snake.unshift({x: px, y: py});

timer = setInterval(init, 400);
function init() {

    head = snake.unshift({x: snake[0].x + dx, y: snake[0].y+dy});
    tail = snake.pop();
    //hit top bottom right left border then snake will die
    if (snake[0].x == 20 || snake[0].x == -1 || snake[0].y == 20 || snake[0].y == -1) {
        isLive = false;
    }

    // if snake died then restore the previous state of snake
    if (!isLive) {
        snake.shift(head);
        snake.push(tail);
        killSnake();
    }

    ctx.fillStyle = "black";
    ctx.fillRect(0,0,cv.width,cv.height);
    ctx.fillStyle = "lime";

    //draw snake
    for(let i=0; i<snake.length; i++) {

        ctx.fillRect(snake[i].x*blockSize, snake[i].y*blockSize, bodySize, bodySize);

        // if snake hit apple add a new block to its tail
        if (snake[i].x == apple.x && snake[i].y == apple.y) {
            len++;
            score++;
            apple.x = Math.floor(Math.random()*cv.width/blockSize);
            apple.y = Math.floor(Math.random()*cv.height/blockSize);
            snake.push(tail);
        }
        //if snake hit its body then body length -1
        if (snake[0].x === snake[i].x && snake[0].y === snake[i].y && i!=0) {
            len--;
        }
        
        
    }
    
    while (snake.length > len) {
        snake.pop();
    }

    //set score
    let text = "Score: ".concat(score.toString());
    ctx.fillStyle = "white";
    ctx.font = 20;
    ctx.fillText(text, 330, 30);

    // create apple
    ctx.drawImage(appleIcon, apple.x*blockSize, apple.y*blockSize, 20, 20);

};

//key event
function keyPush(event) {
    switch (event.key) {
        case 'ArrowDown':
            dx = 0;
            dy = 1;
            break;
        case 'ArrowLeft':
            dx = -1;
            dy = 0;
            break;
        case 'ArrowRight':
            dx =1;
            dy = 0;
            break;
        case 'ArrowUp':
            dx = 0;
            dy = -1;
    }
}
//restart game after snake died
function reStart() {
    if (!isLive) {
        len = MIN;
        score = 0;
        snake = [];
        snake.unshift({x: px, y: py});
        timer = setInterval(init, 400);
        isLive = true;
    }
}
// pause/continue game
function pause() {
    if (isLive) {
        if (timer) {
            clearInterval(timer);
            timer = null;
            return;
        }
        timer = setInterval(init, 400);
        
    }
}
// kill snake if isLive flag is false
function killSnake() {
    if (!isLive) {
        clearInterval(timer);
    }
}