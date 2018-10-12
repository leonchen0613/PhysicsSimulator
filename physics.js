var canvas = document.getElementById("simulator");
var ctx = canvas.getContext("2d");
var x1 = 300;
var y1 = 150;
var x2 = 900;
var y2 = 450;
var dx1 = 0;
var dy1 = 0;
var dx2 = 0;
var dy2 = 0;
var ddx1 = 0;
var ddy1 = 0;
var ddx2 = 0;
var ddy2 = 0;
var r1 = 40;
var r2 = 30;
var m1 = 4 / 3 * Math.PI * Math.pow(r1, 3);
var m2 = 4 / 3 * Math.PI * Math.pow(r2, 3);
var mu = 0.75;

function calculate() {
    var a1 = (1000000000 / (Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))) / m1;
    var a2 = (1000000000 / (Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))) / m2;
    if (x1 < x2 && y1 < y2) {
        var theta = Math.atan((y2 - y1) / (x2 - x1));
        ddx1 = a1 * Math.cos(theta);
        ddy1 = a1 * Math.sin(theta);
        ddx2 = -a2 * Math.cos(theta);
        ddy2 = -a2 * Math.sin(theta);
    }
    else if (x1 < x2 && y1 == y2) {
        ddx1 = a1;
        ddy1 = 0;
        ddx2 = -a2;
        ddy2 = 0;
    }
    else if (x1 < x2 && y1 > y2) {
        var theta = Math.atan((y1 - y2) / (x2 - x1));
        ddx1 = a1 * Math.cos(theta);
        ddy1 = -a1 * Math.sin(theta);
        ddx2 = -a2 * Math.cos(theta);
        ddy2 = a2 * Math.sin(theta);
    }
    else if (x1 == x2 && y1 < y2) {
        ddx1 = 0;
        ddy1 = a1;
        ddx2 = 0;
        ddy2 = -a2;
    }
    else if (x1 == x2 && y1 == y2) {
        ddx1 = 0;
        ddy1 = 0;
        ddx2 = 0;
        ddy2 = 0;
    }
    else if (x1 == x2 && y1 > y2) {
        ddx1 = 0;
        ddy1 = -a1;
        ddx2 = 0;
        ddy2 = a2;
    }
    else if (x1 > x2 && y1 < y2) {
        var theta = Math.atan((y2 - y1) / (x1 - x2));
        ddx1 = -a1 * Math.cos(theta);
        ddy1 = a1 * Math.sin(theta);
        ddx2 = a2 * Math.cos(theta);
        ddy2 = -a2 * Math.sin(theta);
    }
    else if (x1 > x2 && y1 == y2) {
        ddx1 = -a1;
        ddy1 = 0;
        ddx2 = a2;
        ddy2 = 0;
    }
    else if (x1 > x2 && y1 > y2) {
        var theta = Math.atan((y1 - y2) / (x1 - x2));
        ddx1 = -a1 * Math.cos(theta);
        ddy1 = -a1 * Math.sin(theta);
        ddx2 = a2 * Math.cos(theta);
        ddy2 = a2 * Math.sin(theta);
    }
}

function accelerate() {
    dx1 += ddx1;
    dy1 += ddy1;
    dx2 += ddx2;
    dy2 += ddy2;
}

function move() {
    if (Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)) <= r1 + r2) {
        dx1 = mu * -dx1;
        dy1 = mu * -dy1;
        dx2 = mu * -dx2;
        dy2 = mu * -dy2;
    }
    x1 += dx1;
    y1 += dy1;
    x2 += dx2;
    y2 += dy2;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(x1, y1, r1, 0, 2 * Math.PI);
    ctx.arc(x2, y2, r2, 0, 2 * Math.PI);
    ctx.fillStyle = "#FF0000";
    ctx.fill();
    ctx.closePath();
}

function main() {
    calculate();
    accelerate();
    move();
    draw();
    requestAnimationFrame(main);
}

main();



//-------------------------------------------------------------
/*


    if (x1 < x2) {
        ddx1 = (100000000 / Math.pow(x2 - x1, 2)) / m1;
        ddx2 = -(100000000 / Math.pow(x2 - x1, 2)) / m2;
    }
    else if (x2 < x1) {
        ddx2 = (100000000 / Math.pow(x2 - x1, 2)) / m2;
        ddx1 = -(100000000 / Math.pow(x2 - x1, 2)) / m1;
    }
    else {
        ddx1 = 0;
        ddx2 = 0;
    }
    if (y1 < y2) {
        ddy1 = (100000000 / Math.pow(y2 - y1, 2)) / m1;
        ddy2 = -(100000000 / Math.pow(y2 - y1, 2)) / m2;
    }
    else if (y2 < y1) {
        ddy2 = (100000000 / Math.pow(y2 - y1, 2)) / m2;
        ddy1 = -(100000000 / Math.pow(y2 - y1, 2)) / m1;
    }
    else {
        ddy1 = 0;
        ddy2 = 0;
    }




var ballRadius = 10;
var x = canvas.width / 2;
var y = canvas.height - 30;
var dx = 2;
var dy = -2;
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;
var rightPressed = false;
var leftPressed = false;
var brickRowCount = 5;
var brickColumnCount = 3;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var score = 0;
var lives = 3;

var bricks = [];
for (var c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (var r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

function keyDownHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = true;
    }
    else if (e.keyCode == 37) {
        leftPressed = true;
    }
}
function keyUpHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = false;
    }
    else if (e.keyCode == 37) {
        leftPressed = false;
    }
}
function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
    }
}
function collisionDetection() {
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            var b = bricks[c][r];
            if (b.status == 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if (score == brickRowCount * brickColumnCount) {
                        alert("YOU WIN, CONGRATS!");
                        document.location.reload();
                    }
                }
            }
        }
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}
function drawBricks() {
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status == 1) {
                var brickX = (r * (brickWidth + brickPadding)) + brickOffsetLeft;
                var brickY = (c * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}
function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, 8, 20);
}
function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
    collisionDetection();

    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if (y + dy < ballRadius) {
        dy = -dy;
    }
    else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        }
        else {
            lives--;
            if (!lives) {
                alert("GAME OVER");
                document.location.reload();
            }
            else {
                x = canvas.width / 2;
                y = canvas.height - 30;
                dx = 3;
                dy = -3;
                paddleX = (canvas.width - paddleWidth) / 2;
            }
        }
    }

    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    }
    else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }

    x += dx;
    y += dy;
    requestAnimationFrame(draw);
}

draw();
*/